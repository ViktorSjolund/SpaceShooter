import { Enemy } from '../entities/enemy'
import { Gigantor } from '../entities/enemy-types/boss-types/gigantor'
import { Splitter } from '../entities/enemy-types/splitter'
import { Game } from '../game'
import { ENEMY, GAME_STATE } from '../util/enums'

/**
 * Handles any utlity the levels use.
 */
export class LevelUtil {
  #game
  #difficultyMultiplier
  #baseDifficultyMultiplier
  #difficultyScaling

  constructor(game: Game, baseDifficultyMultiplier: number) {
    this.#game = game
    this.#difficultyMultiplier = 1
    this.#baseDifficultyMultiplier = baseDifficultyMultiplier
    this.#difficultyScaling = 1
  }

  get difficultyMultiplier() {
    return this.#difficultyMultiplier
  }

  set difficultyMultiplier(newMultiplier: number) {
    this.#difficultyMultiplier = newMultiplier
  }

  /**
   * Increases the difficulty scaling.
   */
  incDifficultyScaling() {
    this.#difficultyScaling = this.#difficultyMultiplier * this.#baseDifficultyMultiplier
  }

  /**
   * Gets a random X-position value within the borders of the canvas.
   * 
   * @returns The X-position value.
   */
  #randomPosXValue() {
    const maxPosX = this.#game.canvasRef.canvas.width * 0.9
    const minPosX = this.#game.canvasRef.canvas.width * 0.1
    return Math.floor(Math.random() * (maxPosX - minPosX) + minPosX)
  }

  /**
   * Adds a gigantor enemy to the game.
   * 
   * @param image An image of the gigantor.
   */
  #addGigantor(image: HTMLImageElement) {
    const size = 150

    const width = size
    const height = size

    const minPosX = 0
    const maxPosX = this.#game.canvasRef.canvas.width - size
    const posX = Math.random() * (maxPosX - minPosX) + minPosX

    const baseVelocity = 40
    const velY = (baseVelocity / size) * 3

    const baseHp = 50
    const hitpoints = baseHp * size * 15 * this.#difficultyScaling

    this.#game.addEnemyToArray(
      new Gigantor({
        position: {
          x: posX,
          y: 0 - size * (Math.random() * (1.6 - 1.1) + 1.1),
        },
        velocity: {
          x: 0,
          y: velY,
        },
        size: {
          width,
          height,
        },
        hitpoints: {
          current: hitpoints,
          default: hitpoints,
        },
        canvasRef: this.#game.canvasRef,
        image,
        dodgeChance: 0.5,
        isWinCondition: false,
        game: this.#game,
      })
    )
  }

  /**
   * Adds a ufo enemy to the game.
   * 
   * @param image An image of the ufo.
   */
  #addUfo(image: HTMLImageElement) {
    const size = 25

    const height = size
    const width = size

    const baseVelocity = 80
    const velY = baseVelocity / size

    const baseHp = 50
    const hitpoints = ((baseHp * size) / 2) * this.#difficultyScaling

    this.#game.addEnemyToArray(
      new Enemy({
        position: {
          x: this.#randomPosXValue(),
          y: 0 - size * 1.1,
        },
        velocity: {
          x: 0,
          y: velY,
        },
        size: {
          width,
          height,
        },
        hitpoints: {
          current: hitpoints,
          default: hitpoints,
        },
        canvasRef: this.#game.canvasRef,
        image,
        dodgeChance: 0,
        isWinCondition: false,
      })
    )
  }

  /**
   * Adds an asteroid enemy to the game.
   * 
   * @param image An image of the asteroid.
   */
  #addAsteroid(image: HTMLImageElement) {
    const minSize = 30
    const maxSize = 50
    const randomSize = Math.floor(Math.random() * (maxSize - minSize) + minSize)

    const width = randomSize
    const height = randomSize

    const baseVelocity = 50
    const velY = baseVelocity / randomSize

    const baseHp = 50
    const hitpoints = baseHp * randomSize * this.#difficultyScaling

    this.#game.addEnemyToArray(
      new Enemy({
        position: {
          x: this.#randomPosXValue(),
          y: 0 - randomSize * 1.1,
        },
        velocity: {
          x: 0,
          y: velY,
        },
        size: {
          width,
          height,
        },
        hitpoints: {
          current: hitpoints,
          default: hitpoints,
        },
        canvasRef: this.#game.canvasRef,
        image,
        dodgeChance: 0,
        isWinCondition: false,
      })
    )
  }

  /**
   * Adds a splitter enemy to the game.
   * 
   * @param image An image of the splitter.
   */
  #addSplitter(image: HTMLImageElement) {
    const size = 40

    const width = size
    const height = size

    const baseVelocity = 50
    const velY = baseVelocity / size

    const baseHp = 50
    const hitpoints = baseHp * size * this.#difficultyScaling

    this.#game.addEnemyToArray(
      new Splitter({
        position: {
          x: this.#randomPosXValue(),
          y: 0 - size * 1.1,
        },
        velocity: {
          x: 0,
          y: velY,
        },
        size: {
          width,
          height,
        },
        hitpoints: {
          current: hitpoints,
          default: hitpoints,
        },
        canvasRef: this.#game.canvasRef,
        image,
        game: this.#game,
        isSplit: false,
        dodgeChance: 0,
        isWinCondition: false,
      })
    )
  }

  /**
   * Creates the given enemy X amount of times.
   * 
   * @param enemyType The enemy that is to be created.
   * @param image The image of the enemy.
   * @param enemyCount The amount of times the enemy is to be created.
   * @returns 
   */
  createEnemy(enemyType: ENEMY, image: HTMLImageElement, enemyCount: number) {
    if (this.#game.gamestate === GAME_STATE.PAUSED) {
      return
    }

    for (let i = 0; i < enemyCount; i++) {
      if (enemyType === ENEMY.SPLITTER) {
        this.#addSplitter(image)
      } else if (enemyType === ENEMY.ASTEROID) {
        this.#addAsteroid(image)
      } else if (enemyType === ENEMY.UFO) {
        this.#addUfo(image)
      } else if (enemyType === ENEMY.GIGANTOR) {
        this.#addGigantor(image)
      }
    }
  }
}
