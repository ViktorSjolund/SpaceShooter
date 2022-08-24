import { Enemy } from '../enemy'

/**
 * Handles an enemy healthbar.
 */
export class Healthbar {
  #enemy

  constructor(enemy: Enemy) {
    this.#enemy = enemy
  }

  /**
   * Draws the healthbar for the enemy.
   *
   * @returns
   */
  draw() {
    if (this.#enemy.hitpoints.current === this.#enemy.hitpoints.default) {
      return
    }
    const redbarWidthOffset = 1 - this.#enemy.hitpoints.current / this.#enemy.hitpoints.default
    const redbarPosOffset = this.#enemy.hitpoints.current / this.#enemy.hitpoints.default

    this.#enemy.canvasRef.ctx.fillStyle = 'limegreen'
    this.#enemy.canvasRef.ctx.fillRect(
      this.#enemy.position.x,
      this.#enemy.position.y + this.#enemy.size.height,
      this.#enemy.size.width,
      this.#enemy.size.height / 10
    )

    this.#enemy.canvasRef.ctx.fillStyle = 'red'
    this.#enemy.canvasRef.ctx.fillRect(
      this.#enemy.position.x + this.#enemy.size.width * redbarPosOffset,
      this.#enemy.position.y + this.#enemy.size.height,
      this.#enemy.size.width * redbarWidthOffset,
      this.#enemy.size.height / 10
    )

    this.#enemy.canvasRef.ctx.strokeStyle = 'white'
    this.#enemy.canvasRef.ctx.lineJoin = 'bevel'
    this.#enemy.canvasRef.ctx.lineWidth = 0.5
    this.#enemy.canvasRef.ctx.strokeRect(
      this.#enemy.position.x,
      this.#enemy.position.y + this.#enemy.size.height,
      this.#enemy.size.width,
      this.#enemy.size.height / 10
    )
  }
}
