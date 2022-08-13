import { LEVEL } from './util/enums'

/**
 * Handles picking a level.
 */
export class LevelPicker {
  #currentLevel: LEVEL

  constructor() {
    this.#currentLevel = LEVEL.ONE
  }

  get currentLevel() {
    return this.#currentLevel
  }

  set currentLevel(newLevel: LEVEL) {
    this.#currentLevel = newLevel
  }

  /**
   * Gets an array of the order in which the levels are positioned.
   * 
   * @returns An array of the levels in the correct order.
   */
  getLevelsOrderArray() {
    const orderArray = [LEVEL.ONE, LEVEL.TWO]
    return orderArray
  }
}
