import { TBeam } from '@/types/types'
import { DamageNumber } from './damage-number'
import { Enemy } from './enemy'
import { Entity } from './entity'

/**
 * Handles the beam entity.
 */
export class Beam extends Entity {
  #damage
  #updates
  #collisionChecker
  #damageNumbers
  #images
  #attackRate

  constructor({
    position,
    size,
    velocity,
    damage,
    canvasRef,
    collisionChecker,
    damageNumbers,
    images,
    attackRate,
  }: TBeam) {
    super({ position, velocity, size, canvasRef })
    this.#damage = damage
    this.#updates = 0
    this.#collisionChecker = collisionChecker
    this.#damageNumbers = damageNumbers
    this.#images = images
    this.#attackRate = attackRate
  }

  /**
   * Draws the beam.
   */
  #draw() {
    this.canvasRef.ctx.drawImage(
      this.#images.beamImg,
      this.position.x + 4,
      this.position.y,
      this.size.width,
      this.size.height
    )
    this.canvasRef.ctx.drawImage(
      this.#images.beamStartImg,
      this.position.x - 9,
      this.size.height - 47,
      this.size.width + 20,
      50
    )
  }

  /**
   * Updates the beam.
   *
   * @param posX The X-position of a character.
   * @param enemies An array of enemies the beam can hit.
   */
  update(posX: number, enemies: Enemy[]) {
    this.#draw()
    this.position.x = posX

    const dmgInterval = 30 / this.#attackRate

    if (this.#updates % dmgInterval === 0) {
      enemies.forEach((enemy) => {
        if (this.#collisionChecker.checkRectRectCollision(this, enemy)) {
          enemy.hitpoints.current -= this.#damage
          this.#damageNumbers.push(
            new DamageNumber({
              position: {
                x: enemy.position.x,
                y: enemy.position.y,
              },
              canvasRef: this.canvasRef,
              damage: this.#damage,
              didMiss: false,
            })
          )
        }
      })
    }
  }
}
