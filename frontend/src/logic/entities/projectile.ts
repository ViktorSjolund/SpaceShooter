import type { TProjectile } from '@/types/types'
import { DamageNumber } from './damage-number'
import type { Enemy } from './enemy'
import { Entity } from './entity'
import { EnemyFlash } from './enemy-flash'

/**
 * Handles a projectile entity.
 */
export class Projectile extends Entity {
  isActive
  #damage
  damageNumbers: DamageNumber[]
  #collisionCheck
  #piercedEnemies: Enemy[]
  #pierceAmount
  #image

  constructor({
    position,
    velocity,
    size,
    canvasRef,
    isActive,
    damage,
    pierceAmount,
    image,
    damageNumbers,
    collisionChecker,
  }: TProjectile) {
    super({ position, velocity, size, canvasRef })
    this.isActive = isActive
    this.#damage = damage
    this.damageNumbers = damageNumbers
    this.#collisionCheck = collisionChecker
    this.#piercedEnemies = []
    this.#pierceAmount = pierceAmount
    this.#image = image
  }

  /**
   * Draws the projectile.
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
   * Updates the projectile.
   *
   * @param enemies The game's enemies array.
   * @returns
   */
  update(enemies: Enemy[]) {
    this.#draw()
    this.position.y += this.velocity.y
    this.position.x += this.velocity.x

    if (this.position.y < 0) {
      this.isActive = false
      return
    }

    enemies.forEach((enemy) => {
      if (
        this.#collisionCheck.checkRectRectCollision(this, enemy) &&
        !this.#piercedEnemies.includes(enemy)
      ) {
        let didMiss = false
        const randomNumber = Math.random()
        const minDamage = this.#damage * 0.9
        const maxDamage = this.#damage * 1.1
        const variedDamage = Math.random() * (maxDamage - minDamage) + minDamage

        if (randomNumber < enemy.dodgeChance) {
          didMiss = true
        } else {
          enemy.hitpoints.current -= variedDamage
        }

        enemy.flash = new EnemyFlash({
          position: {
            x: enemy.position.x,
            y: enemy.position.y,
          },
          size: {
            width: enemy.size.width,
            height: enemy.size.height,
          },
          velocity: {
            x: 0,
            y: 0,
          },
          canvasRef: this.canvasRef,
          image: enemy.image,
          enemy: enemy,
        })

        this.damageNumbers.push(
          new DamageNumber({
            position: {
              x: this.position.x,
              y: this.position.y,
            },
            canvasRef: this.canvasRef,
            damage: variedDamage,
            didMiss,
          })
        )
        if (this.#pierceAmount === this.#piercedEnemies.length) {
          this.isActive = false
        }
        this.#piercedEnemies.push(enemy)
      }
    })
  }
}
