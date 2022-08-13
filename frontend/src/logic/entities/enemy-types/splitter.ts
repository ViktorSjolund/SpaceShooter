import { TSplitter } from '@/types/types'
import { Enemy } from '../enemy'
import { EnemyFlash } from '../enemy-flash'
import { Healthbar } from '../entity-misc/healthbar'

/**
 * Handles the splitter enemy.
 */
export class Splitter extends Enemy {
  #image
  #isSplit: boolean
  #game
  #reachedEnd: boolean
  #dodgeChance
  #isWinCondition
  #healthbar
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
    game,
    isSplit,
    dodgeChance,
    isWinCondition,
  }: TSplitter) {
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
    this.#image = image
    this.#isSplit = isSplit
    this.#game = game
    this.#reachedEnd = false
    this.#dodgeChance = dodgeChance
    this.#isWinCondition = isWinCondition
    this.#healthbar = new Healthbar(this)
    this.#flash = null
    this.#xp = 20
    this.#currency = 10
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

  get dodgeChance() {
    return this.#dodgeChance
  }

  get isWinCondition() {
    return this.#isWinCondition
  }

  get reachedEnd() {
    return this.#reachedEnd
  }

  set flash(newFlash: EnemyFlash) {
    this.#flash = newFlash
  }

  /**
   * Draws the enemy.
   *
   * @returns
   */
  #draw() {
    if (this.hitpoints.current <= 0) {
      return
    }
    this.canvasRef.ctx.drawImage(
      this.#image,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    )
    this.#healthbar.draw()
  }

  #addSplitEnemy(posX: number) {
    this.#game.addEnemyToArray(
      new Splitter({
        position: {
          x: posX,
          y: this.position.y + this.size.height - Math.random() * (25 - 5) + 5,
        },
        velocity: {
          x: this.velocity.x,
          y: this.velocity.y,
        },
        size: {
          width: this.size.width / 2,
          height: this.size.height / 2,
        },
        canvasRef: this.canvasRef,
        game: this.#game,
        isSplit: true,
        image: this.#image,
        hitpoints: {
          current: this.hitpoints.default,
          default: this.hitpoints.default,
        },
        dodgeChance: 0,
        isWinCondition: false,
      })
    )
  }

  update() {
    this.#draw()
    this.position.y += this.velocity.y
    if (this.hitpoints.current <= 0 && !this.#isSplit) {
      this.#isSplit = true
      this.#addSplitEnemy(this.position.x + 20)
      this.#addSplitEnemy(this.position.x - 20)
    }
    if (this.position.y > this.canvasRef.canvas!.height) {
      this.#reachedEnd = true
    }
  }
}
