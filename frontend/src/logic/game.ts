import { Enemy } from './entities/enemy'
import { Background } from './background'
import { UpgradesHandler } from './upgrade-logic/upgrades-handler'
import { LevelPicker } from './level-picker'
import { Splitter } from './entities/enemy-types/splitter'
import { LevelOne } from './levels/level-one'
import { CHARACTER, GAME_STATE, LEVEL, UPGRADE_ID } from './util/enums'
import { Particle } from './entities/particle'
import { TCanvasRef } from '../types/types'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import {
  LeaderboardDocument,
  MeDocument,
  UpdateCurrencyDocument,
  UpdateCurrencyMutationResult,
  UpdateExperienceDocument,
  UpdateExperienceMutationResult,
  UpdateLeaderboardDocument,
  UpdateLeaderboardMutationResult,
  UpgradesDocument,
  UpgradesQueryResult,
} from '../generated/graphql'
import { CharacterPicker } from './character-picker'
import { Gunner } from './entities/characters/gunner'
import { CharacterInterface } from './entities/characters/character-interface'
import { Beamer } from './entities/characters/beamer'
import { LevelEndless } from './levels/level-endless'
import { Timer } from './timer'
import { ImageHandler } from '../misc/image-handler'
import { CurrencyDisplay } from './currency-display'
import { TStateChangeCb } from '../types/types'

export class Game {
  #canvasRef
  #player!: CharacterInterface
  #enemies: Enemy[]
  #background: Background
  #upgrades: UpgradesHandler
  #levelPicker: LevelPicker
  #currencyEarned: number
  #gamestate: GAME_STATE
  #particles: Particle[]
  #isExploding
  #apolloClient
  #characterPicker
  #xpEarned
  #timer
  #imageHandler
  #previousFrameTime
  #currentFrameTime
  #fps
  #frameInterval
  #currencyDisplay
  #stateChangeCb

  constructor(
    lvlPicker: LevelPicker,
    canvasRef: TCanvasRef,
    characterPicker: CharacterPicker,
    client: ApolloClient<NormalizedCacheObject>,
    stateChangeCb: TStateChangeCb
  ) {
    this.#canvasRef = canvasRef
    this.#apolloClient = client
    this.#enemies = []
    this.#background = new Background()
    this.#upgrades = new UpgradesHandler(client)
    this.#levelPicker = lvlPicker
    this.#currencyEarned = 0
    this.#gamestate = GAME_STATE.PLAYING
    this.#particles = []
    this.#isExploding = false
    this.#characterPicker = characterPicker
    this.#xpEarned = 0
    this.#timer = new Timer({ canvasRef })
    this.#imageHandler = new ImageHandler()
    this.#currencyDisplay = new CurrencyDisplay({ canvasRef })
    this.#previousFrameTime = Date.now()
    this.#currentFrameTime = Date.now()
    this.#fps = 60
    this.#frameInterval = 1000 / this.#fps
    this.#stateChangeCb = stateChangeCb
  }

  get gamestate() {
    return this.#gamestate
  }

  get currencyEarned() {
    return this.#currencyEarned
  }

  get canvasRef() {
    return this.#canvasRef
  }

  set gamestate(gameState: GAME_STATE) {
    this.#gamestate = gameState
  }

  addEnemyToArray(enemy: Enemy) {
    this.#enemies.push(enemy)
  }

  /**
   * Adds necessary listeners for controlling the character and controlling the game's pause state.
   */
  #addCharacterListeners() {
    this.#canvasRef.canvas!.addEventListener('mousemove', (e) => {
      this.#player.position.x = e.offsetX
    })
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.#gamestate === GAME_STATE.PAUSED) {
          this.unpause()
        } else {
          this.#pause()
        }
      } else if (e.key === ' ') {
        this.#player.useAbility()
      }
    })
    window.addEventListener('blur', (e) => {
      this.#pause()
    })
  }

  /**
   * Pauses the game.
   */
  #pause() {
    if (
      this.#gamestate === GAME_STATE.WON ||
      this.#gamestate === GAME_STATE.OVER
    ) {
      return
    }
    this.#gamestate = GAME_STATE.PAUSED
    this.#stateChangeCb(this.#gamestate)
    this.#timer.startPausedTime()
  }

  /**
   * Unpauses the game.
   */
  unpause() {
    this.#gamestate = GAME_STATE.PLAYING
    this.#stateChangeCb(this.#gamestate)
    this.#timer.subtractPausedTime()
    this.#loop()
  }

  /**
   * Loads the gunner and sets the player to the gunner character.
   */
  async #loadGunner() {
    const gunnerImg = await this.#imageHandler.getImage('/img/spaceship.png')
    const projImg = await this.#imageHandler.getImage('/img/bullet.png')

    this.#player = new Gunner({
      position: {
        x: this.#canvasRef.canvas.width / 2 - 25,
        y: this.#canvasRef.canvas.height * 0.87,
      },
      velocity: {
        x: 0,
        y: 0,
      },
      size: {
        width: 50,
        height: 50,
      },
      canvasRef: this.#canvasRef,
      images: {
        playerImage: gunnerImg,
        projImage: projImg,
      },
      properties: {
        attackRate: 200,
        numberOfProjectiles: 7,
        pierceAmount: 0,
        damage: 6650,
      },
      enemies: this.#enemies,
    })

    await this.#applyGunnerUpgrades()

    const shootInterval = setInterval(() => {
      if (this.#gamestate === GAME_STATE.PLAYING) {
        this.#player.shoot()
      } else if (
        this.#gamestate === GAME_STATE.OVER ||
        this.#gamestate === GAME_STATE.WON
      ) {
        clearInterval(shootInterval)
      }
    }, this.#player.properties.attackRate)
  }

  /**
   * Loads the beamer and sets the player to the beamer character.
   */
  async #loadBeamer() {
    const beamerImg = await this.#imageHandler.getImage('/img/beamer.png')
    const beamImg = await this.#imageHandler.getImage('/img/beam.png')
    const beamStartImg = await this.#imageHandler.getImage('/img/beamstart.png')

    this.#player = new Beamer({
      position: {
        x: this.#canvasRef.canvas.width / 2 - 25,
        y: this.#canvasRef.canvas.height * 0.87,
      },
      velocity: {
        x: 0,
        y: 0,
      },
      size: {
        width: 50,
        height: 50,
      },
      canvasRef: this.#canvasRef,
      images: {
        beamerImg,
        beamImg,
        beamStartImg,
      },
      properties: {
        attackRate: 1,
        numberOfProjectiles: 0,
        pierceAmount: 0,
        damage: 200,
      },
      enemies: this.#enemies,
    })

    await this.#applyBeamerUpgrades()
    this.#player.shoot()
  }

  /**
   * Creates the background.
   */
  #createBackground() {
    this.#background.initzializeBackground(this.#canvasRef)

    const starInterval = 2000

    setInterval(() => {
      if (this.#gamestate === GAME_STATE.PAUSED) {
        return
      }
      this.#background.addStar(this.#canvasRef, -5)
    }, starInterval)
  }

  /**
   * Applies upgrades for the gunner character.
   */
  async #applyGunnerUpgrades() {
    const result = await this.#apolloClient.query({
      query: UpgradesDocument,
      variables: {
        characterId: CHARACTER.GUNNER,
      },
    }) as UpgradesQueryResult

    if (!result.data?.upgrades) {
      return
    }

    result.data.upgrades.forEach(dbUpgrade => {
      this.#upgrades.upgrades.forEach(defaultUpgrade => {
        if (dbUpgrade.upgrade_id === defaultUpgrade.id) {
          if (defaultUpgrade.id === UPGRADE_ID.ADD_PROECTILE) {
            this.#player.properties.numberOfProjectiles += 1
          } else if (defaultUpgrade.id === UPGRADE_ID.DUPLICATE_PROECTILES) {
            this.#player.properties.numberOfProjectiles *= 2
          } else if (defaultUpgrade.id === UPGRADE_ID.ADD_PIERCE) {
            this.#player.properties.pierceAmount += 1
          } else if (defaultUpgrade.id === UPGRADE_ID.ADD_DAMAGE_TEN) {
            this.#player.properties.damage *= 1.1
          } else if (defaultUpgrade.id === UPGRADE_ID.ADD_DAMAGE_TWENTY) {
            this.#player.properties.damage *= 1.2
          } else if (defaultUpgrade.id === UPGRADE_ID.ADD_DAMAGE_THIRTY) {
            this.#player.properties.damage *= 1.3
          } else if (defaultUpgrade.id === UPGRADE_ID.ADD_ATTACK_RATE_TEN) {
            this.#player.properties.attackRate /= 1.1
          } else if (defaultUpgrade.id === UPGRADE_ID.ADD_ATTACK_RATE_TWENTY) {
            this.#player.properties.attackRate /= 1.2
          } else if (defaultUpgrade.id === UPGRADE_ID.ADD_ATTACK_RATE_THIRTY) {
            this.#player.properties.attackRate /= 1.3
          }
        }
      })
    })
  }

  /**
   * Applies upgrades for the beamer character
   */
  async #applyBeamerUpgrades() {
    const result = await this.#apolloClient.query({
      query: UpgradesDocument,
      variables: {
        characterId: CHARACTER.BEAMER,
      },
    }) as UpgradesQueryResult

    if (!result.data?.upgrades) {
      return
    }

    result.data.upgrades.forEach(dbUpgrade => {
      this.#upgrades.upgrades.forEach(defaultUpgrade => {
        if (dbUpgrade.upgrade_id === defaultUpgrade.id) {
          if (defaultUpgrade.id === UPGRADE_ID.ADD_DAMAGE_TEN) {
            this.#player.properties.damage *= 1.1
          } else if (defaultUpgrade.id === UPGRADE_ID.ADD_DAMAGE_TWENTY) {
            this.#player.properties.damage *= 1.2
          } else if (defaultUpgrade.id === UPGRADE_ID.ADD_DAMAGE_THIRTY) {
            this.#player.properties.damage *= 1.3
          } else if (defaultUpgrade.id === UPGRADE_ID.ADD_ATTACK_RATE_TEN) {
            this.#player.properties.attackRate /= 1.1
          } else if (defaultUpgrade.id === UPGRADE_ID.ADD_ATTACK_RATE_TWENTY) {
            this.#player.properties.attackRate /= 1.2
          } else if (defaultUpgrade.id === UPGRADE_ID.ADD_ATTACK_RATE_THIRTY) {
            this.#player.properties.attackRate /= 1.3
          }
        }
      })
    })
  }

  /**
   * Initizalises the picked level.
   */
  #initLevel() {
    if (this.#levelPicker.currentLevel === LEVEL.ENDLESS) {
      const levelEndless = new LevelEndless(this, 1, this.#imageHandler)
      levelEndless.play()
    } else if (this.#levelPicker.currentLevel === LEVEL.ONE) {
      const levelOne = new LevelOne(this, 1)
      levelOne.play()
    }
  }

  /**
   * Clears the canvas.
   */
  #clearCanvas() {
    this.#canvasRef.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
    this.#canvasRef.ctx.fillRect(
      0,
      0,
      this.#canvasRef.canvas.width,
      this.#canvasRef.canvas.height
    )
  }

  /**
   * Updates the stars in the background.
   */
  #updateBackground() {
    this.#background.stars.forEach((star, index, object) => {
      if (star.isActive) {
        star.update()
      } else {
        object.splice(index, 1)
      }
    })
  }

  /**
   * Adds a certain amount of particles with slow velocity to the game.
   *
   * @param x The starting X-position of the particle.
   * @param y The starting Y-position of the particle.
   * @param numberOfParticles The amount of particles to be added.
   */
  #createParticles(x: number, y: number, numberOfParticles: number) {
    const size = 5
    const width = size
    const height = size

    for (let i = 0; i < numberOfParticles; i++) {
      this.#particles.push(
        new Particle({
          position: {
            x,
            y,
          },
          velocity: {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2,
          },
          size: {
            width,
            height,
          },
          canvasRef: this.#canvasRef,
        })
      )
    }
  }

  /**
   * Adds a certain amount of particles with fast velocity to the game.
   *
   * @param x The starting X-position of the particle.
   * @param y The starting Y-position of the particle.
   * @param numberOfParticles The amount of particles to be added.
   */
  #createParticlesExplosion(x: number, y: number, numberOfParticles: number) {
    const size = 5
    const width = size
    const height = size

    for (let i = 0; i < numberOfParticles; i++) {
      this.#particles.push(
        new Particle({
          position: {
            x,
            y,
          },
          velocity: {
            x: (Math.random() - 0.5) * 8,
            y: (Math.random() - 0.5) * 6,
          },
          size: {
            width,
            height,
          },
          canvasRef: this.#canvasRef,
          friction: 0.996,
        })
      )
    }
  }

  /**
   * Does every general action when an enemy dies.
   *
   * @param enemy The enemy that was killed.
   */
  #enemyKilled(enemy: Enemy) {
    this.#playKillSound()
    if (enemy.isWinCondition) {
      this.#gamestate = GAME_STATE.WON
    }
    this.#currencyEarned += enemy.currency
    this.#xpEarned += enemy.xp
    this.#createParticles(enemy.position.x, enemy.position.y, 10)
  }

  /**
   * Updates every enemy within the game.
   */
  #updateEnemies() {
    this.#enemies.forEach((enemy, index, object) => {
      if (enemy.hitpoints.current > 0) {
        if (enemy.reachedEnd) {
          this.#gamestate = GAME_STATE.OVER
          return
        } else {
          enemy.update()
        }
      } else if (enemy instanceof Splitter) {
        enemy.update()
        this.#enemyKilled(enemy)
        object.splice(index, 1)
      } else {
        this.#enemyKilled(enemy)
        object.splice(index, 1)
      }
      if (enemy.flash) {
        if (enemy.flash.alpha > 0) {
          enemy.flash.update()
        }
      }
    })
  }

  /**
   * Plays an audio snippet of an enemy dying.
   */
  #playKillSound() {
    const killSound = new Audio('/sound/explosion2.mp3')
    killSound.loop = false
    killSound.volume = 0.5
    killSound.play()
  }

  /**
   * Updates all particles within the game.
   */
  #updateParticles() {
    this.#particles.forEach((particle, index, object) => {
      if (particle.alpha > 0) {
        particle.update()
      } else {
        object.splice(index, 1)
      }
    })
  }

  /**
   * Updates the players currency within the database.
   */
  async #updatePlayerCurrency() {
    await this.#apolloClient.mutate({
      mutation: UpdateCurrencyDocument,
      variables: {
        currency: this.#currencyEarned,
      },
      refetchQueries: [{ query: MeDocument }],
    }) as UpdateCurrencyMutationResult
  }

  /**
   * Updates the players xp within the database.
   */
  async #updatePlayerXp() {
    await this.#apolloClient.mutate({
      mutation: UpdateExperienceDocument,
      variables: {
        experience: this.#xpEarned,
      },
      refetchQueries: [{ query: MeDocument }],
    }) as UpdateExperienceMutationResult
  }

  /**
   * Initializes the players chosen character.
   */
  async #initCharacter() {
    if (this.#characterPicker.chosenCharacter === CHARACTER.GUNNER) {
      await this.#loadGunner()
    } else if (this.#characterPicker.chosenCharacter === CHARACTER.BEAMER) {
      await this.#loadBeamer()
    } else if (this.#characterPicker.chosenCharacter === CHARACTER.THREE) {
    }
  }

  /**
   * Updates the leaderboard in the database.
   */
  async #updateLeaderboard() {
    await this.#apolloClient.mutate({
      mutation: UpdateLeaderboardDocument,
      variables: {
        time: this.#timer.endTime,
      },
      refetchQueries: [{ query: LeaderboardDocument }],
    }) as UpdateLeaderboardMutationResult
  }

  /**
   * Ends the game.
   */
  #endGame() {
    this.#stateChangeCb(this.#gamestate)
    this.#updatePlayerCurrency()
    this.#updatePlayerXp()
    if (this.#levelPicker.currentLevel === LEVEL.ENDLESS) {
      this.#updateLeaderboard()
    }
  }

  /**
   * Starts the game.
   */
  async play() {
    this.#createBackground()
    await this.#initCharacter()
    this.#addCharacterListeners()
    this.#initLevel()
    this.#loop()
  }

  /**
   * Constantly updates everything within the game.
   */
  #loop() {
    if (this.#gamestate === GAME_STATE.OVER) {
      this.#endGame()
      return
    } else if (this.#gamestate === GAME_STATE.PAUSED) {
      return
    } else if (
      this.#gamestate === GAME_STATE.WON &&
      this.#particles.length === 0
    ) {
      this.#endGame()
      return
    }

    window.requestAnimationFrame(() => this.#loop())

    this.#currentFrameTime = Date.now()
    const timeDiffernce = this.#currentFrameTime - this.#previousFrameTime

    if (timeDiffernce <= this.#frameInterval) {
      return
    }

    this.#previousFrameTime =
      this.#currentFrameTime - (timeDiffernce % this.#frameInterval)
    this.#clearCanvas()
    this.#updateBackground()
    this.#updateParticles()
    this.#player.update()
    if (this.#gamestate === GAME_STATE.WON) {
      if (this.#isExploding) {
        return
      } else {
        this.#createParticlesExplosion(
          this.#canvasRef.canvas.width / 2,
          this.#canvasRef.canvas.height / 2,
          350
        )
        this.#isExploding = true
        return
      }
    }
    this.#updateEnemies()
    this.#timer.update()
    this.#currencyDisplay.update(this.#currencyEarned)
  }
}
