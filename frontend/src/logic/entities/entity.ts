import type { TEntity } from '@/types/types'

/**
 * Handles an entity.
 */
export class Entity {
  position
  velocity
  size
  canvasRef

  constructor({ position, velocity, size, canvasRef }: TEntity) {
    this.position = position
    this.velocity = velocity
    this.size = size
    this.canvasRef = canvasRef
  }
}
