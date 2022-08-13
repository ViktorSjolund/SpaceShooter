import { TTimer } from '../types/types'
import moment from 'moment'

/**
 * Handles the game's timer.
 */
export class Timer {
  #time
  #canvasRef
  #pausedTime
  #endTime

  constructor({ canvasRef }: TTimer) {
    this.#time = moment()
    this.#pausedTime = moment()
    this.#canvasRef = canvasRef
    this.#endTime = ''
  }

  get endTime() {
    return this.#endTime
  }

  /**
   * Starts a timer for the amount of time the game has been paused.
   */
  startPausedTime() {
    this.#pausedTime = moment()
  }

  /**
   * Subtracts the amount of time the game has been paused from the game's total time it has been running.
   */
  subtractPausedTime() {
    const currentTime = moment()
    const timeDiff = moment.duration(currentTime.diff(this.#pausedTime))
    this.#time.add(timeDiff)
  }

  /**
   * Draws the timer.
   */
  #draw() {
    const currentTime = moment()
    const timeDiff = currentTime.diff(this.#time)
    const formatedTime = moment.utc(timeDiff).format('mm:ss:SSS')
    this.#endTime = formatedTime.split(':').join('')

    this.#canvasRef.ctx.font = '20px VT323'
    this.#canvasRef.ctx.fillStyle = '#ababab'
    this.#canvasRef.ctx.fillText(
      formatedTime,
      this.#canvasRef.canvas!.width * 0.02 - 15,
      this.#canvasRef.canvas!.height * 0.98
    )

    this.#canvasRef.ctx.font = '20px VT323'
    this.#canvasRef.ctx.fillStyle = '#ffffff'
    this.#canvasRef.ctx.fillText(
      formatedTime,
      this.#canvasRef.canvas!.width * 0.02 - 15 + 1,
      this.#canvasRef.canvas!.height * 0.98 + 1
    )
  }

  /**
   * Updates the timer.
   */
  update() {
    this.#draw()
  }
}
