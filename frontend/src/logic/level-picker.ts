import { Level } from './util/enums'

/**
 * Handles picking a level.
 */
export class LevelPicker {
  #currentLevel: Level

  constructor() {
    this.#currentLevel = Level.One
  }

  get currentLevel() {
    return this.#currentLevel
  }

  set currentLevel(newLevel: Level) {
    this.#currentLevel = newLevel
  }

  /**
   * Gets an array of the order in which the levels are positioned.
   *
   * @returns An array of the levels in the correct order.
   */
  getLevelsOrderArray() {
    const orderArray = [Level.One, Level.Two]
    return orderArray
  }
}
