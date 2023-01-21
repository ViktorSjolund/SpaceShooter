import { Character } from './util/enums'

/**
 * Handles picking a character to play.
 */
export class CharacterPicker {
  #chosenCharacter

  constructor() {
    this.#chosenCharacter = Character.Gunner
  }

  get chosenCharacter() {
    return this.#chosenCharacter
  }

  set chosenCharacter(newCharacter: Character) {
    this.#chosenCharacter = newCharacter
  }
}
