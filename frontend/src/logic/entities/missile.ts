import { TMissile } from '@/types/types'
import { Enemy } from './enemy'
import { Entity } from './entity'
import { Explosion } from './explosion'

/**
 * Handles a missile entity.
 */
export class Missile extends Entity {
  #image
  #collisionChecker
  #damage
  #explosions
  #isActive
  #damageNumbers

  constructor({
    position,
    velocity,
    size,
    canvasRef,
    image,
    damage,
    explosions,
    damageNumbers,
    collisionChecker,
  }: TMissile) {
    super({ position, velocity, size, canvasRef })
    this.#image = image
    this.#collisionChecker = collisionChecker
    this.#damage = damage
    this.#explosions = explosions
    this.#isActive = true
    this.#damageNumbers = damageNumbers
  }

  get isActive() {
    return this.#isActive
  }

  /**
   * Draws the missile.
   */
  #draw() {
    this.canvasRef.ctx.drawImage(
      this.#image,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    )
  }

  /**
   * Updates the missile.
   *
   * @param enemies The game's enemies array.
   */
  update(enemies: Enemy[]) {
    this.#draw()
    this.position.y -= this.velocity.y
    enemies.forEach((enemy) => {
      if (this.#collisionChecker.checkRectRectCollision(enemy, this)) {
        this.#explosions.push(
          new Explosion({
            position: {
              x: this.position.x + this.size.width / 2,
              y: this.position.y,
            },
            velocity: {
              x: 0,
              y: 0,
            },
            size: {
              width: 150,
              height: 150,
            },
            canvasRef: this.canvasRef,
            damage: this.#damage,
            damageNumbers: this.#damageNumbers,
            collisionChecker: this.#collisionChecker,
          })
        )
        this.#isActive = false
      }
    })
  }
}
