import type { TEntity } from '@/types/types'

/**
 * Handles collision checks between entities.
 */
export class CollisionChecker {
  /**
   * Checks collision between two rectangular entities.
   *
   * @param rect1 A rectangle entity.
   * @param rect2 A rectangle entity.
   * @returns True if colliding.
   */
  checkRectRectCollision(rect1: TEntity, rect2: TEntity) {
    return (
      rect1.position.x + rect1.size.width >= rect2.position.x &&
      rect1.position.x <= rect2.position.x + rect2.size.width &&
      rect1.position.y <= rect2.position.y + rect2.size.height &&
      rect1.position.y + rect1.size.height >= rect2.position.y
    )
  }

  /**
   * Checks collision between a rectangular and a circular entity.
   *
   * @param circle A circular entity.
   * @param rect A rectangular entity.
   * @returns True if collidiing.
   */
  checkCircleRectCollision(circle: TEntity, rect: TEntity) {
    const circleRad = circle.size.width
    const distX = Math.abs(
      circle.position.x - rect.position.x - rect.size.width / 2
    )
    const distY = Math.abs(
      circle.position.y - rect.position.y - rect.size.height / 2
    )

    if (distX > rect.size.width / 2 + circleRad) {
      return false
    }
    if (distY > rect.size.height / 2 + circleRad) {
      return false
    }

    if (distX <= rect.size.width / 2) {
      return true
    }
    if (distY <= rect.size.height / 2) {
      return true
    }

    const dx = distX - rect.size.width / 2
    const dy = distY - rect.size.height / 2
    return dx * dx + dy * dy <= circleRad * circleRad
  }

  isWithinMinXBounds(minX: number, comparedX: number) {
    return comparedX >= minX
  }

  isWithinMaxXBounds(maxX: number, comparedX: number) {
    return comparedX <= maxX
  }
}
