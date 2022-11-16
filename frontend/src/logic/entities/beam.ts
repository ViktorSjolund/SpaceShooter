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
  #alpha
  #alphaAdder
  #brightness
  #brightnessAdder

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
    this.#alpha = 1
    this.#alphaAdder = -0.01
    this.#brightness = 100
    this.#brightnessAdder = 1
  }

  /**
   * Draws the beam.
   */
  #draw() {
    const { ctx } = this.canvasRef

    ctx.save()
    ctx.filter = `brightness(${this.#brightness}%)`
    ctx.globalAlpha = this.#alpha
    ctx.drawImage(
      this.#images.beamImg,
      this.position.x + 4,
      this.position.y,
      this.size.width,
      this.size.height
    )
    ctx.drawImage(
      this.#images.beamStartImg,
      this.position.x - 9,
      this.size.height - 47,
      this.size.width + 20,
      50
    )
    ctx.restore()
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

    if (this.#alpha < 0.7) {
      this.#alphaAdder = 0.01
    } else if (this.#alpha > 1) {
      this.#alphaAdder = -0.01
    }
    this.#alpha += this.#alphaAdder

    if (this.#brightness > 170) {
      this.#brightnessAdder = -1
    } else if (this.#brightness < 100) {
      this.#brightnessAdder = 1
    }
    this.#brightness += this.#brightnessAdder

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
