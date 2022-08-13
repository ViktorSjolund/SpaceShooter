import { TestEntity } from '../logic/entities/test-entities/test-entity'
import { CollisionChecker } from '../logic/util/collision-check'

const collisionChecker = new CollisionChecker()

it('Expect rectangles to be colliding on X-axis', () => {
  const rect1 = new TestEntity({
    position: {
      x: 10,
      y: 0
    },
    velocity: {
      x: 0,
      y: 0
    },
    size: {
      width: 40,
      height: 50
    }
  })

  const rect2 = new TestEntity({
    position: {
      x: 35,
      y: 0
    },
    velocity: {
      x: 0,
      y: 0
    },
    size: {
      width: 40,
      height: 50
    }
  })

  const isColliding = collisionChecker.checkRectRectCollision(rect1, rect2)
  expect(isColliding).toBe(true)
})

it('Expect rectangles to NOT be colliding on X-axis', () => {
  const rect1 = new TestEntity({
    position: {
      x: 10,
      y: 0
    },
    velocity: {
      x: 0,
      y: 0
    },
    size: {
      width: 40,
      height: 50
    }
  })

  const rect2 = new TestEntity({
    position: {
      x: 51,
      y: 0
    },
    velocity: {
      x: 0,
      y: 0
    },
    size: {
      width: 40,
      height: 50
    }
  })

  const isColliding = collisionChecker.checkRectRectCollision(rect1, rect2)
  expect(isColliding).toBe(false)
})

it('Expect rectangles to be colliding on Y-axis', () => {
  const rect1 = new TestEntity({
    position: {
      x: 0,
      y: 10
    },
    velocity: {
      x: 0,
      y: 0
    },
    size: {
      width: 40,
      height: 50
    }
  })

  const rect2 = new TestEntity({
    position: {
      x: 0,
      y: 50
    },
    velocity: {
      x: 0,
      y: 0
    },
    size: {
      width: 40,
      height: 50
    }
  })

  const isColliding = collisionChecker.checkRectRectCollision(rect1, rect2)
  expect(isColliding).toBe(true)
})

it('Expect rectangles to NOT be colliding on Y-axis', () => {
  const rect1 = new TestEntity({
    position: {
      x: 0,
      y: 10
    },
    velocity: {
      x: 0,
      y: 0
    },
    size: {
      width: 40,
      height: 50
    }
  })

  const rect2 = new TestEntity({
    position: {
      x: 0,
      y: 61
    },
    velocity: {
      x: 0,
      y: 0
    },
    size: {
      width: 40,
      height: 50
    }
  })

  const isColliding = collisionChecker.checkRectRectCollision(rect1, rect2)
  expect(isColliding).toBe(false)
})

it('Expect circle and rectangle to be colliding on Y-axis', () => {
  const circ = new TestEntity({
    position: {
      x: 0,
      y: 10
    },
    velocity: {
      x: 0,
      y: 0
    },
    size: {
      width: 40,
      height: 40
    }
  })

  const rect = new TestEntity({
    position: {
      x: 0,
      y: 50
    },
    velocity: {
      x: 0,
      y: 0
    },
    size: {
      width: 40,
      height: 50
    }
  })

  const isColliding = collisionChecker.checkCircleRectCollision(circ, rect)
  expect(isColliding).toBe(true)
})

it('Expect circle and rectangle to NOT be colliding on Y-axis', () => {
  const circ = new TestEntity({
    position: {
      x: 0,
      y: 10
    },
    velocity: {
      x: 0,
      y: 0
    },
    size: {
      width: 40,
      height: 40
    }
  })

  const rect = new TestEntity({
    position: {
      x: 0,
      y: 60
    },
    velocity: {
      x: 0,
      y: 0
    },
    size: {
      width: 40,
      height: 50
    }
  })

  const isColliding = collisionChecker.checkCircleRectCollision(circ, rect)
  expect(isColliding).toBe(false)
})

it('Expect circle and rectangle to NOT be colliding on X-axis', () => {
  const circ = new TestEntity({
    position: {
      x: 0,
      y: 0
    },
    velocity: {
      x: 0,
      y: 0
    },
    size: {
      width: 40,
      height: 40
    }
  })

  const rect = new TestEntity({
    position: {
      x: 51,
      y: 0
    },
    velocity: {
      x: 0,
      y: 0
    },
    size: {
      width: 40,
      height: 50
    }
  })

  const isColliding = collisionChecker.checkCircleRectCollision(circ, rect)
  expect(isColliding).toBe(false)
})

it('Expect circle and rectangle to be colliding on X-axis', () => {
  const circ = new TestEntity({
    position: {
      x: 0,
      y: 0
    },
    velocity: {
      x: 0,
      y: 0
    },
    size: {
      width: 40,
      height: 40
    }
  })

  const rect = new TestEntity({
    position: {
      x: 35,
      y: 0
    },
    velocity: {
      x: 0,
      y: 0
    },
    size: {
      width: 40,
      height: 50
    }
  })

  const isColliding = collisionChecker.checkCircleRectCollision(circ, rect)
  expect(isColliding).toBe(true)
})

it('Expect circle and rectangle to be colliding on top left of circle', () => {
  const circ = new TestEntity({
    position: {
      x: 40,
      y: 50
    },
    velocity: {
      x: 0,
      y: 0
    },
    size: {
      width: 40,
      height: 40
    }
  })

  const rect = new TestEntity({
    position: {
      x: 0,
      y: 0
    },
    velocity: {
      x: 0,
      y: 0
    },
    size: {
      width: 40,
      height: 50
    }
  })

  const isColliding = collisionChecker.checkCircleRectCollision(circ, rect)
  expect(isColliding).toBe(true)
})

it('Expect circle and rectangle to be colliding on top right of circle', () => {
  const circ = new TestEntity({
    position: {
      x: 40,
      y: 50
    },
    velocity: {
      x: 0,
      y: 0
    },
    size: {
      width: 40,
      height: 40
    }
  })

  const rect = new TestEntity({
    position: {
      x: 80,
      y: 0
    },
    velocity: {
      x: 0,
      y: 0
    },
    size: {
      width: 40,
      height: 50
    }
  })

  const isColliding = collisionChecker.checkCircleRectCollision(circ, rect)
  expect(isColliding).toBe(true)
})