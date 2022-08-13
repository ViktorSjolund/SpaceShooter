import { THealNumber } from '@/types/types'

/**
 * Handles hitpoint gain numbers.
 */
export class HealNumber {
  #position
  #canvasRef
  #healAmount
  #isActive
  #startTime: number
  #fontSize

  constructor({ position, canvasRef, healAmount }: THealNumber) {
    this.#position = position
    this.#canvasRef = canvasRef
    this.#healAmount = healAmount
    this.#isActive = true
    this.#startTime = Date.now()
    this.#fontSize = 1
    this.#position.x += Math.random() - 0.5 * 30
    this.#position.y += Math.random() - 0.5 * 30
  }

  get isActive() {
    return this.#isActive
  }

  /**
   * Draws the healing number.
   */
  #draw() {
    this.#canvasRef.ctx.font = `${this.#fontSize}px VT323`
    this.#canvasRef.ctx.fillStyle = '#09ff00'

    let healString = this.#healAmount.toFixed(0).toString()
    if (this.#healAmount >= 1000) {
      healString = '+ ' + (this.#healAmount / 1000).toFixed(1) + 'K'
    }
    this.#canvasRef.ctx.fillText(healString, this.#position.x, this.#position.y)
  }

  /**
   * Updates the healing number.
   */
  update() {
    this.#draw()
    this.#fontSize += 0.12
    if (Date.now() - this.#startTime > 1000) {
      this.#isActive = false
    }
  }
}
