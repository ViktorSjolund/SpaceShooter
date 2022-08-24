import type { TDamageNumber } from '@/types/types'

/**
 * Handles a damage number.
 */
export class DamageNumber {
  #position
  #canvasRef
  #damage
  #isActive
  #startTime: number
  #didMiss
  #fontSize

  constructor({ position, canvasRef, damage, didMiss }: TDamageNumber) {
    this.#position = position
    this.#canvasRef = canvasRef
    this.#damage = damage
    this.#isActive = true
    this.#startTime = Date.now()
    this.#didMiss = didMiss
    this.#fontSize = 1
    this.#position.x += Math.random() - 0.5 * 30
    this.#position.y += Math.random() - 0.5 * 30
  }

  get isActive() {
    return this.#isActive
  }

  /**
   * Draws the damage number.
   */
  #draw() {
    this.#canvasRef.ctx.font = `${this.#fontSize}px VT323`
    if (this.#didMiss) {
      this.#canvasRef.ctx.fillStyle = 'green'
    } else if (this.#damage >= 1000) {
      this.#canvasRef.ctx.fillStyle = 'orange'
    } else {
      this.#canvasRef.ctx.fillStyle = 'yellow'
    }

    if (this.#didMiss) {
      this.#canvasRef.ctx.fillText('Missed!', this.#position.x, this.#position.y)
    } else {
      let damageString = this.#damage.toFixed(0).toString()
      if (this.#damage >= 1000) {
        damageString = (this.#damage / 1000).toFixed(1) + 'K'
      }
      this.#canvasRef.ctx.fillText(damageString, this.#position.x, this.#position.y)
    }
  }

  /**
   * Updates the damage number.
   */
  update() {
    this.#draw()
    this.#fontSize += 0.28
    if (Date.now() - this.#startTime > 1000) {
      this.#isActive = false
    }
  }
}
