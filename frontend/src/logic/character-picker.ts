import { CHARACTER } from './util/enums'

/**
 * Handles picking a character to play.
 */
export class CharacterPicker {
  #chosenCharacter

  constructor() {
    this.#chosenCharacter = CHARACTER.GUNNER
  }

  get chosenCharacter() {
    return this.#chosenCharacter
  }

  set chosenCharacter(newCharacter: CHARACTER) {
    this.#chosenCharacter = newCharacter
  }
}
