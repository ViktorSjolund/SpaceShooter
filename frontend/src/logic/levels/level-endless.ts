import { Game } from '../game'
import { ImageHandler } from '../../misc/image-handler'
import { ENEMY, GAME_STATE } from '../util/enums'
import { LevelUtil } from './level-util'

/**
 * Handles an endless level.
 */
export class LevelEndless {
  #levelUtil
  #imageHandler
  #game

  constructor(
    game: Game,
    baseDifficultyMultiplier: number,
    imageHandler: ImageHandler
  ) {
    this.#game = game
    this.#levelUtil = new LevelUtil(game, baseDifficultyMultiplier)
    this.#imageHandler = imageHandler
  }

  /**
   * Plays the level.
   */
  async play() {
    const splitterImg = await this.#imageHandler.getImage('/img/cell.png')
    const asteroidImg = await this.#imageHandler.getImage('/img/Asteroid.png')
    const ufoImg = await this.#imageHandler.getImage('/img/ufo.png')
    const gigantorImg = await this.#imageHandler.getImage('/img/boss1.png')

    setInterval(() => {
      if (this.#game.gamestate === GAME_STATE.PAUSED) {
        return
      }
      this.#levelUtil.difficultyMultiplier += 0.1
      this.#levelUtil.incDifficultyScaling()
    }, 1000)

    setInterval(() => {
      const amount = Math.random() * (4 - 1) + 1
      this.#levelUtil.createEnemy(ENEMY.SPLITTER, splitterImg, amount)
    }, 1000)

    setInterval(() => {
      const amount = Math.random() * (4 - 1) + 1
      this.#levelUtil.createEnemy(ENEMY.ASTEROID, asteroidImg, amount)
    }, 500)

    setInterval(() => {
      const amount = Math.random() * (4 - 1) + 1
      this.#levelUtil.createEnemy(ENEMY.UFO, ufoImg, amount)
    }, 2000)

    setInterval(() => {
      const amount = Math.random() * (3 - 1) + 1
      this.#levelUtil.createEnemy(ENEMY.GIGANTOR, gigantorImg, amount)
    }, 10000)
  }
}
