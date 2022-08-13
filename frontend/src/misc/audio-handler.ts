/**
 * Handles the game's audio.
 */
export class AudioHandler {
  #themeSong: HTMLAudioElement | null
  #isThemePlaying

  constructor() {
    this.#themeSong = null
    this.#isThemePlaying = false
  }

  get isThemePlaying() {
    return this.#isThemePlaying
  }

  /**
   * Plays a clicking sound.
   */
  playClickSound() {
    const clickSound = new Audio('/sound/click.mp3')
    clickSound.volume = 0.2
    clickSound.play()
  }

  /**
   * Pauses the theme song.
   */
  pauseThemeSong() {
    if (!this.#themeSong) return
    this.#themeSong.pause()
    this.#isThemePlaying = false
  }

  /**
   * Plays the theme song.
   */
  playThemeSong() {
    if (!this.#themeSong) return
    this.#themeSong.play()
    this.#isThemePlaying = true
  }

  /**
   * Initializes the theme song.
   */
  initThemeSong() {
    this.#themeSong = new Audio('/sound/themesong.ogg')
    this.#themeSong.loop = true
    this.#themeSong.volume = 0.02
  }
}
