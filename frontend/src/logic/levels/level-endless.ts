import { Game } from '../game'
import { ImageHandler } from '../../misc/image-handler'
import { EnemyType, GameState } from '../util/enums'
import { LevelUtil } from './level-util'

/**
 * Handles an endless level.
 */
export class LevelEndless {
  #levelUtil
  #imageHandler
  #game

  constructor(game: Game, baseDifficultyMultiplier: number, imageHandler: ImageHandler) {
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
      if (this.#game.gamestate === GameState.Paused) {
        return
      }
      this.#levelUtil.difficultyMultiplier += 0.1
      this.#levelUtil.incDifficultyScaling()
    }, 1000)

    setInterval(() => {
      const amount = Math.random() * (4 - 1) + 1
      this.#levelUtil.createEnemy(EnemyType.Splitter, splitterImg, amount)
    }, 1000)

    setInterval(() => {
      const amount = Math.random() * (4 - 1) + 1
      this.#levelUtil.createEnemy(EnemyType.Asteroid, asteroidImg, amount)
    }, 500)

    setInterval(() => {
      const amount = Math.random() * (4 - 1) + 1
      this.#levelUtil.createEnemy(EnemyType.Ufo, ufoImg, amount)
    }, 2000)

    setInterval(() => {
      const amount = Math.random() * (3 - 1) + 1
      this.#levelUtil.createEnemy(EnemyType.Gigantor, gigantorImg, amount)
    }, 10000)
  }
}
