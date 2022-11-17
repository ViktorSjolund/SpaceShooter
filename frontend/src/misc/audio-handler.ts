/**
 * Handles the game's audio.
 */
export class AudioHandler {
  #volume
  #volumeMultiplier
  #musicVolumeMultiplier
  #themeSong: HTMLAudioElement | null
  #musicVolume

  constructor() {
    this.#themeSong = null
    this.#volumeMultiplier = 0.5
    this.#musicVolumeMultiplier = 0
    this.#volume = 50
    this.#musicVolume = 0
  }

  get volume() {
    return this.#volume
  }

  set volume(value: number) {
    this.#volume = value
  }

  get musicVolume() {
    return this.#musicVolume
  }

  set musicVolume(value: number) {
    this.#musicVolume = value
  }

  set volumeMultiplier(value: number) {
    this.#volumeMultiplier = value
  }

  set musicVolumeMultiplier(value: number) {
    this.#musicVolumeMultiplier = value
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
   * Plays an audio snippet of an enemy dying.
   */
  playKillSound() {
    const killSound = new Audio('/sound/explosion2.mp3')
    killSound.loop = false
    killSound.volume = 0.5 * this.#volumeMultiplier
    killSound.play()
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
    if (this.#themeSong) {
      this.#themeSong.volume = 0.02 * this.#volumeMultiplier * this.#musicVolumeMultiplier
    }
  }
}
