import { TEnemyFlash } from '@/types/types'
import { Entity } from './entity'

/**
 * Handles an enemy flash image.
 */
export class EnemyFlash extends Entity {
  #enemy
  #image
  #alpha

  constructor({ position, velocity, size, canvasRef, enemy, image }: TEnemyFlash) {
    super({ position, velocity, size, canvasRef })
    this.#enemy = enemy
    this.#image = image
    this.#alpha = 1
  }

  get alpha() {
    return this.#alpha
  }

  /**
   * Draws the flash image.
   */
  #draw() {
    this.canvasRef.ctx.save()
    this.canvasRef.ctx.globalAlpha = this.#alpha
    this.canvasRef.ctx.filter = 'brightness(300%)'
    this.canvasRef.ctx.drawImage(
      this.#image,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    )
    this.canvasRef.ctx.restore()
  }

  /**
   * Updates the flash image.
   */
  update() {
    this.#draw()
    this.#alpha -= 0.05
    this.position.x = this.#enemy.position.x
    this.position.y = this.#enemy.position.y
  }
}
