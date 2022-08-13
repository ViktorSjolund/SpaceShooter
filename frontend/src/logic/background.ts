import { TCanvasRef } from '../types/types'
import { Star } from './entities/star'

/**
 * Handles the game's background.
 */
export class Background {
  stars: Star[]

  constructor() {
    this.stars = []
  }

  /**
   * Adds a star to the background.
   *
   * @param canvasRef The canvas reference object.
   * @param posY The Y-position of the star.
   */
  addStar(canvasRef: TCanvasRef, posY: number) {
    const maxPosX = canvasRef.canvas!.width * 0.95
    const minPosX = canvasRef.canvas!.width * 0.05
    const posX = Math.floor(Math.random() * (maxPosX - minPosX) + minPosX)

    const minSize = 1
    const maxSize = 3
    const randomSize = Math.floor(Math.random() * (maxSize - minSize) + minSize)

    const yVelocity = 0.05

    this.stars.push(
      new Star({
        position: {
          x: posX,
          y: posY,
        },
        velocity: {
          x: 0,
          y: yVelocity,
        },
        size: {
          width: randomSize,
          height: randomSize,
        },
        canvasRef,
      })
    )
  }

  /**
   * Creates the starting background.
   *
   * @param canvasRef The canvas reference object.
   */
  initzializeBackground(canvasRef: TCanvasRef) {
    for (let i = 0; i < 20; i++) {
      const maxPosY = canvasRef.canvas!.height * 0.9
      const minPosY = canvasRef.canvas!.height * 0.1
      const posY = Math.floor(Math.random() * (maxPosY - minPosY) + minPosY)

      this.addStar(canvasRef, posY)
    }
  }
}
