import { TPlayerProperties, TPosition } from '@/types/types'

/**
 * Interface for creating characters.
 */
export interface CharacterInterface {
  position: TPosition
  properties: TPlayerProperties

  /**
   * Makes the character shoot.
   */
  shoot(): void

  /**
   * Updates the character.
   */
  update(): void

  /**
   * Makes the character use it's ability.
   */
  useAbility(): void
}
