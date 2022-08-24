import { Entity } from './entity'
import type { TEnemy } from '@/types/types'
import { EnemyInterface } from './enemy-interface'
import { Healthbar } from './entity-misc/healthbar'
import { EnemyFlash } from './enemy-flash'

/**
 * Handles an enemy entity.
 */
export class Enemy extends Entity implements EnemyInterface {
  hitpoints
  #image
  #reachedEnd: boolean
  #dodgeChance
  #isWinCondition
  #healthbar
  #numberOfUpdates
  #flash: EnemyFlash | null
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
  }: TEnemy) {
    super({ position, velocity, size, canvasRef })
    this.hitpoints = hitpoints
    this.#image = image
    this.#reachedEnd = false
    this.#dodgeChance = dodgeChance
    this.#isWinCondition = isWinCondition
    this.#healthbar = new Healthbar(this)
    this.#numberOfUpdates = 0
    this.#flash = null
    this.#xp = 30
    this.#currency = 20
  }

  get currency() {
    return this.#currency
  }

  get xp() {
    return this.#xp
  }

  get flash() {
    return this.#flash!
  }

  get image() {
    return this.#image
  }

  get isWinCondition() {
    return this.#isWinCondition
  }

  get dodgeChance() {
    return this.#dodgeChance
  }

  get reachedEnd() {
    return this.#reachedEnd
  }

  set flash(newFlash: EnemyFlash) {
    this.#flash = newFlash
  }

  /**
   * Draws the enemy.
   */
  #draw() {
    this.canvasRef.ctx.drawImage(
      this.#image,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    )
    this.#healthbar.draw()
  }

  /**
   * Updates the enemy.
   */
  update() {
    this.#draw()
    this.#numberOfUpdates++

    if (this.#numberOfUpdates % 200 === 0) {
      this.velocity.x = (Math.random() - 0.5) * 5
    } else if (this.#numberOfUpdates % 100 === 0) {
      this.velocity.x = 0
    }

    if (this.position.x + this.velocity.x < 0 + this.size.width) {
      this.velocity.x = Math.abs(this.velocity.x)
    } else if (this.position.x + this.velocity.x > this.canvasRef.canvas!.width - this.size.width) {
      this.velocity.x = -this.velocity.x
    }

    this.position.y += this.velocity.y
    this.position.x += this.velocity.x
    if (this.position.y > this.canvasRef.canvas!.height) {
      this.#reachedEnd = true
    }
  }
}
