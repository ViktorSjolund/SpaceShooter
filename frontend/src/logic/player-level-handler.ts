/**
 * Handles the player level calculations.
 */
export class PlayerLevelHandler {
  /**
   * Calculates the player's current level.
   *
   * @param playerXp The player's current xp.
   * @returns The player's level.
   */
  getPlayerLevel(playerXp: number) {
    return Math.floor(Math.sqrt(playerXp) / 20) + 1
  }

  /**
   * Calculates the player's current xp.
   *
   * @param level The player's current level.
   * @returns The player's xp.
   */
  levelToXp(level: number) {
    return Math.pow((level - 1) * 20, 2)
  }

  /**
   * Calculates the progress towards the next level.
   *
   * @param currentLevel The player's level.
   * @param currentXp The player's xp.
   * @returns A unit interval of the progress towards the next level.
   */
  progressToNextLevel(currentLevel: number, currentXp: number) {
    const currentLevelXp = this.levelToXp(currentLevel)
    const nextLevelXp = this.levelToXp(currentLevel + 1)

    const xpNeeded = nextLevelXp - currentLevelXp
    const progressXp = currentXp - currentLevelXp

    return progressXp / xpNeeded
  }
}
