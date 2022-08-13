import { Game } from '../game'
import { LevelUtil } from './level-util'

/**
 * Handles the first level.
 */
export class LevelOne {
  #levelUtil
  #baseDifficultyMultiplier

  constructor(game: Game, baseDifficultyMultiplier: number) {
    this.#levelUtil = new LevelUtil(game, baseDifficultyMultiplier)
    this.#baseDifficultyMultiplier = baseDifficultyMultiplier
  }

  /**
   * Plays the level.
   */
  play() {
  }
}
