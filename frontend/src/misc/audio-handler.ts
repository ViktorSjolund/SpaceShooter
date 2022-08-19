/**
 * Handles the game's audio.
 */
export class AudioHandler {
  #volume
  #volumeMultiplier
  #themeSong: HTMLAudioElement | null

  constructor() {
    this.#themeSong = null
    this.#volumeMultiplier = 0
    this.#volume = 0
  }

  get volume() {
    return this.#volume
  }

  set volume(value: number) {
    this.#volume = value
  }

  set volumeMultiplier(value: number) {
    this.#volumeMultiplier = value
  }

  /**
   * Plays a clicking sound.
   */
  playClickSound() {
    const clickSound = new Audio('/sound/click.mp3')
    clickSound.volume = 0.2 * this.#volumeMultiplier
    clickSound.play()
  }

  /**
   * Plays the theme song.
   */
  playThemeSong() {
    this.#themeSong = new Audio('/sound/themesong.ogg')
    this.#themeSong.loop = true
    this.refreshThemeVolume()
    this.#themeSong.play()
  }

  refreshThemeVolume() {
    this.#themeSong!.volume = 0.02 * this.#volumeMultiplier
  }
}
