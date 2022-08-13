import { THealer } from '@/types/types'
import { Enemy } from '../enemy'
import { Healthbar } from '../entity-misc/healthbar'
import { HealNumber } from '../heal-number'

/**
 * Handles the healer enemy.
 */
export class Healer extends Enemy {
  #enemy
  #updates
  #healAmount
  #healthbar
  #healNumbers: HealNumber[]
  #xp
  #currency

  constructor({
    position,
    velocity,
    size,
    hitpoints,
    canvasRef,
    image,
    dodgeChance,
    isWinCondition,
    enemy,
  }: THealer) {
    super({
      position,
      velocity,
      size,
      hitpoints,
      canvasRef,
      image,
      dodgeChance,
      isWinCondition,
    })
    this.#enemy = enemy
    this.#updates = 0
    this.#healAmount = 1000
    this.#healthbar = new Healthbar(this)
    this.#healNumbers = []
    this.#xp = 10
    this.#currency = 10
  }

  get currency() {
    return this.#currency
  }

  get xp() {
    return this.#xp
  }

  /**
   * Adds hitpoints to the enemy the healer is attached to.
   */
  #healEnemy() {
    if (
      this.#enemy.hitpoints.current + this.#healAmount >
      this.#enemy.hitpoints.default
    ) {
      this.#enemy.hitpoints.current = this.#enemy.hitpoints.default
    } else {
      this.#enemy.hitpoints.current += this.#healAmount
    }
    this.#healNumbers.push(
      new HealNumber({
        position: {
          x: this.#enemy.position.x + this.#enemy.size.width / 2,
          y: this.#enemy.position.y + this.#enemy.size.height / 2,
        },
        canvasRef: this.canvasRef,
        healAmount: this.#healAmount,
      })
    )
  }

  /**
   * Draws the enemy.
   */
  #draw() {
    this.#healthbar.draw()
    this.canvasRef.ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    )
  }

  /**
   * Updates the enemy.
   */
  update() {
    this.#draw()
    this.#updates++
    this.position.y += this.velocity.y

    if (this.#updates % 200 === 0) {
      this.#healEnemy()
    }

    this.#healNumbers.forEach((healNumber, index, object) => {
      if (healNumber.isActive) {
        healNumber.update()
      } else {
        object.splice(index, 1)
      }
    })
  }
}
