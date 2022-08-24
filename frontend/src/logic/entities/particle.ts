import { TParticle } from '@/types/types'
import { Entity } from './entity'

/**
 * Handles a particle entity.
 */
export class Particle extends Entity {
  #alpha
  #friction
  #color

  constructor({ position, velocity, size, canvasRef, friction }: TParticle) {
    super({ position, velocity, size, canvasRef })
    this.#alpha = 1
    this.#friction = friction || 0.994
    this.#color = {
      r: '',
      g: '',
      b: '',
    }
  }

  get alpha() {
    return this.#alpha
  }

  /**
   * Picks a random rgb color from given choices.
   */
  #pickRandomColor() {
    const randomNumber = Math.floor(Math.random() * (4 - 1) + 1)
    if (randomNumber === 1) {
      this.#color.r = '0'
      this.#color.g = '168'
      this.#color.b = '45'
    } else if (randomNumber === 2) {
      this.#color.r = '0'
      this.#color.g = '66'
      this.#color.b = '189'
    } else {
      this.#color.r = '184'
      this.#color.g = '6'
      this.#color.b = '0'
    }
  }

  /**
   * Draws the particle.
   */
  #draw() {
    if (!this.#color.r && !this.#color.g && !this.#color.b) {
      this.#pickRandomColor()
    }
    this.canvasRef.ctx.fillStyle = `rgba(${this.#color.r}, ${this.#color.g}, ${this.#color.b}, ${
      this.#alpha
    })`
    this.canvasRef.ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height)
  }

  /**
   * Updates the particle.
   */
  update() {
    this.#draw()
    this.#alpha -= 0.01
    this.velocity.x *= this.#friction
    this.velocity.y *= this.#friction
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}
