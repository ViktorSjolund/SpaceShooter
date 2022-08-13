import { TTestEntity } from '@/types/types'

/**
 * Entity used for testing only.
 */
export class TestEntity {
  position
  velocity
  size

  constructor({ position, velocity, size }: TTestEntity) {
    this.position = position
    this.velocity = velocity
    this.size = size
  }
}
