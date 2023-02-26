import { TCharacter } from '@/types/types'
import { CollisionChecker } from '../../util/collision-check'
import { DamageNumber } from '../damage-number'
import { Explosion } from '../explosion'
import { Missile } from '../missile'
import { Projectile } from '../projectile'
import { CharacterInterface } from './character-interface'

export class Gunner implements CharacterInterface {
  #position
  #images
  #canvasRef
  #size
  #properties
  #velocity
  #projectiles: Projectile[]
  #damageNumbers: DamageNumber[]
  #collisionChecker
  #missiles: Missile[]
  #explosions: Explosion[]
  #enemies
  #audioHandler

  constructor({ position, images, canvasRef, size, properties, velocity, enemies, audioHandler }: TCharacter) {
    this.#position = position
    this.#images = images
    this.#canvasRef = canvasRef
    this.#size = size
    this.#properties = properties
    this.#velocity = velocity
    this.#projectiles = []
    this.#damageNumbers = []
    this.#missiles = []
    this.#collisionChecker = new CollisionChecker()
    this.#explosions = []
    this.#enemies = enemies
    this.#audioHandler = audioHandler
  }

  get position() {
    return this.#position
  }

  get projectiles() {
    return this.#projectiles
  }

  get properties() {
    return this.#properties
  }

  get explosions() {
    return this.#explosions
  }

  get missilies() {
    return this.#missiles
  }

  get damageNumbers() {
    return this.#damageNumbers
  }

  useAbility() {
    const img = new Image()
    img.src = '/img/missile.png'
    img.onerror = () => {
      console.error('Missile image not found')
    }
    img.onload = () => {
      const damage = 1500
      const minDamage = damage * 0.9
      const maxDamage = damage * 1.1
      const variedDamage = Math.random() * (maxDamage - minDamage) + minDamage

      this.#missiles.push(
        new Missile({
          position: {
            x: this.#position.x + this.#size.width / 2,
            y: this.#position.y,
          },
          size: {
            width: 30,
            height: 40,
          },
          velocity: {
            x: 0,
            y: 5,
          },
          canvasRef: this.#canvasRef,
          damage: variedDamage,
          explosions: this.#explosions,
          image: img,
          damageNumbers: this.#damageNumbers,
          collisionChecker: this.#collisionChecker,
        })
      )
    }
  }

  shoot() {
    this.#audioHandler.playShootSound()
    const projSize = 6
    let projAngle = 0
    let isNegative = false

    for (let i = 0; i < this.#properties.numberOfProjectiles; i++) {
      if (isNegative) {
        projAngle += 3
      }
      this.#projectiles.push(
        new Projectile({
          position: {
            x: this.#position.x + this.#size.width / 2 - projSize / 2,
            y: this.#position.y,
          },
          velocity: {
            x: isNegative ? -projAngle : projAngle,
            y: -25,
          },
          size: {
            width: projSize,
            height: projSize,
          },
          canvasRef: this.#canvasRef,
          isActive: true,
          damage: this.#properties.damage,
          pierceAmount: this.#properties.pierceAmount,
          image: this.#images.projImage,
          damageNumbers: this.#damageNumbers,
          collisionChecker: this.#collisionChecker,
        })
      )
      isNegative = !isNegative
    }
  }

  /**
   * Draws the character.
   */
  #draw() {
    this.#canvasRef.ctx.drawImage(
      this.#images.playerImage,
      this.#position.x,
      this.#position.y,
      this.#size.width,
      this.#size.height
    )
  }

  update() {
    this.#draw()
    if (!this.#collisionChecker.isWithinMinXBounds(0, this.#position.x)) {
      this.#position.x = 0
    }

    if (
      !this.#collisionChecker.isWithinMaxXBounds(
        this.#canvasRef.canvas?.width!,
        this.#position.x + this.#size.width
      )
    ) {
      this.#position.x = this.#canvasRef.canvas?.width! - this.#size.width
    }

    this.#projectiles.forEach((projectile, index, object) => {
      if (projectile.isActive) {
        projectile.update(this.#enemies)
      } else {
        object.splice(index, 1)
      }
    })

    this.#damageNumbers.forEach((damageNumber, index, object) => {
      if (damageNumber.isActive) {
        damageNumber.update()
      } else {
        object.splice(index, 1)
      }
    })

    this.missilies.forEach((missile, index, object) => {
      if (missile.isActive) {
        missile.update(this.#enemies)
      } else {
        object.splice(index, 1)
      }
    })

    this.#explosions.forEach((explosion, index, object) => {
      if (explosion.alpha > 0) {
        explosion.update(this.#enemies)
      } else {
        object.splice(index, 1)
      }
    })
  }
}
