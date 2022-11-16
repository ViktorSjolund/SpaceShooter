import { TGigantor } from '@/types/types'
import { EnemyFlash } from '../../enemy-flash'
import { Healthbar } from '../../entity-misc/healthbar'
import { Boss } from '../boss'
import { Healer } from '../healer'

/**
 * Handles the gigantor enemy.
 */
export class Gigantor extends Boss {
  hitpoints
  #image
  #reachedEnd: boolean
  #dodgeChance
  #isWinCondition
  #healthbar
  #flash: EnemyFlash | null
  #updateCount
  #game
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
    game,
  }: TGigantor) {
    super({
      position,
      velocity,
      size,
      canvasRef,
      hitpoints,
      image,
      dodgeChance,
      isWinCondition,
    })
    this.hitpoints = hitpoints
    this.#image = image
    this.#game = game
    this.#reachedEnd = false
    this.#dodgeChance = dodgeChance
    this.#isWinCondition = isWinCondition
    this.#healthbar = new Healthbar(this)
    this.#flash = null
    this.#updateCount = 0
    this.#xp = 400
    this.#currency = 100
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

  get reachedEnd() {
    return this.#reachedEnd
  }

  get dodgeChance() {
    return this.#dodgeChance
  }

  set flash(newFlash: EnemyFlash) {
    this.#flash = newFlash
  }

  /**
   * Adds a healer enemy to the game.
   */
  #spawnHealer() {
    this.#game.addEnemyToArray(
      new Healer({
        position: {
          x: this.position.x - this.size.width + Math.random() * 100,
          y: this.position.y + (Math.random() - 0.5) * 100,
        },
        velocity: {
          x: 0,
          y: this.velocity.y,
        },
        size: {
          width: 30,
          height: 30,
        },
        dodgeChance: 0.5,
        canvasRef: this.canvasRef,
        hitpoints: {
          current: 1000,
          default: 1000,
        },
        image: this.#image,
        isWinCondition: false,
        enemy: this,
      })
    )
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
    this.#updateCount++
    this.position.y += this.velocity.y

    const healerSpawnInterval = 200
    const healerSpawnDelay = 1000

    if (this.#updateCount % healerSpawnInterval === 0 && this.#updateCount > healerSpawnDelay) {
      this.#spawnHealer()
    }

    if (this.position.y > this.canvasRef.canvas!.height) {
      this.#reachedEnd = true
    }
  }
}
