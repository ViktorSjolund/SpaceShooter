import type { TStar } from '@/types/types'
import { Entity } from './entity'

/**
 * Handles a star entity.
 */
export class Star extends Entity {
  #isActive

  constructor({ position, velocity, size, canvasRef }: TStar) {
    super({ position, velocity, size, canvasRef })
    this.#isActive = true
  }

  get isActive() {
    return this.#isActive
  }

  /**
   * Draws the star.
   */
  #draw() {
    this.canvasRef.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
    this.canvasRef.ctx.fillRect(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    )
  }

  /**
   * Updates the star.
   */
  update() {
    this.#draw()
    this.position.y += this.velocity.y

    if (this.position.y > this.canvasRef.canvas!.height) {
      this.#isActive = false
    }
  }
}
