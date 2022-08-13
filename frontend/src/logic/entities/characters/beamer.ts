import { TBeamer } from '@/types/types'
import { CollisionChecker } from '../../util/collision-check'
import { Beam } from '../beam'
import { DamageNumber } from '../damage-number'
import { CharacterInterface } from './character-interface'

/**
 * Handles the beamer character.
 */
export class Beamer implements CharacterInterface {
  position
  #images
  #canvasRef
  #size
  properties
  #velocity
  #collisionChecker
  #beam: Beam | null
  #enemies
  #damageNumbers: DamageNumber[]

  constructor({
    position,
    images,
    canvasRef,
    size,
    properties,
    velocity,
    enemies,
  }: TBeamer) {
    this.position = position
    this.#images = images
    this.#canvasRef = canvasRef
    this.#size = size
    this.properties = properties
    this.#velocity = velocity
    this.#collisionChecker = new CollisionChecker()
    this.#beam = null
    this.#enemies = enemies
    this.#damageNumbers = []
  }

  useAbility() {}

  shoot() {
    this.#beam = new Beam({
      position: {
        x: this.position.x,
        y: 0,
      },
      size: {
        width: this.#size.width,
        height: this.position.y,
      },
      canvasRef: this.#canvasRef,
      damage: this.properties.damage,
      velocity: {
        x: 0,
        y: 0,
      },
      collisionChecker: this.#collisionChecker,
      damageNumbers: this.#damageNumbers,
      images: {
        beamImg: this.#images.beamImg,
        beamStartImg: this.#images.beamStartImg,
      },
      attackRate: this.properties.attackRate,
    })
  }

  /**
   * Draws the character.
   */
  #draw() {
    this.#canvasRef.ctx.drawImage(
      this.#images.beamerImg,
      this.position.x,
      this.position.y,
      this.#size.width,
      this.#size.height
    )
  }

  update() {
    this.#draw()

    if (this.#beam) {
      this.#beam.update(this.position.x, this.#enemies)
    }

    this.#damageNumbers.forEach((damageNumber, index, object) => {
      if (damageNumber.isActive) {
        damageNumber.update()
      } else {
        object.splice(index, 1)
      }
    })
  }
}
