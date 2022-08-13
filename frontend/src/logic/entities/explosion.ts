import { TExplosion } from '@/types/types'
import { DamageNumber } from './damage-number'
import { Enemy } from './enemy'
import { Entity } from './entity'

/**
 * Handles an explosion entity.
 */
export class Explosion extends Entity {
  #alpha
  #radii
  #isActive
  #damage
  #didCollide
  #damageNumbers
  #collisionChecker

  constructor({
    position,
    velocity,
    size,
    canvasRef,
    damage,
    damageNumbers,
    collisionChecker,
  }: TExplosion) {
    super({ position, velocity, size, canvasRef })
    this.#alpha = 0.5
    this.#radii = this.size.width / 2
    this.#isActive = true
    this.#damage = damage
    this.#didCollide = false
    this.#damageNumbers = damageNumbers
    this.#collisionChecker = collisionChecker
  }

  get alpha() {
    return this.#alpha
  }

  /**
   * Draws the explosion.
   */
  #draw() {
    this.canvasRef.ctx.beginPath()
    this.canvasRef.ctx.arc(
      this.position.x,
      this.position.y,
      this.#radii,
      0,
      2 * Math.PI
    )
    this.canvasRef.ctx.fillStyle = `rgba(255, 255, 255, ${this.#alpha})`
    this.canvasRef.ctx.fill()
  }

  /**
   * Updates the explosion.
   *
   * @param enemies The game's enemies array.
   */
  update(enemies: Enemy[]) {
    this.#draw()
    this.#alpha -= 0.025
    enemies.forEach((enemy) => {
      if (this.#collisionChecker.checkCircleRectCollision(this, enemy)) {
        if (this.#isActive) {
          enemy.hitpoints.current -= this.#damage
          this.#didCollide = true
          this.#damageNumbers.push(
            new DamageNumber({
              position: {
                x: enemy.position.x + enemy.size.width / 2,
                y: enemy.position.y + enemy.size.height,
              },
              canvasRef: this.canvasRef,
              damage: this.#damage,
              didMiss: false,
            })
          )
        }
      }
    })
    if (this.#didCollide) {
      this.#isActive = false
    }
  }
}
