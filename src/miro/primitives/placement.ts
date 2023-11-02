export class Size {
  readonly width: number
  readonly height: number

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
  }
}

export class Offset {
  readonly left: number
  readonly right: number
  readonly top: number
  readonly bottom: number

  constructor(left: number, right: number, top: number, bottom: number) {
    this.left = left
    this.right = right
    this.top = top
    this.bottom = bottom
  }

  static from(n: [number] | [number, number] | [number, number, number, number]): Offset {
    let dx, dy, dw, dh: number
    if (n.length === 1) {
      dx = dy = dw = dh = n[0]
    } else if (n.length === 2) {
      dx = dw = n[0]
      dy = dh = n[1]
    } else if (n.length === 4) {
      dx = n[0]
      dy = n[1]
      dw = n[2]
      dh = n[3]
    } else {
      throw new Error('Invalid number of sizes in array')
    }
    return new Offset(dx, dy, dw, dh)
  }

  static two(x: number, y: number): Offset {
    return new Offset(x, x, y, y)
  }

  toArray(): [number, number, number, number] {
    return [ this.left, this.top, this.right, this.bottom ]
  }
}

export class Placement {
  readonly x: number
  readonly y: number
  readonly w: number
  readonly h: number

  constructor(x: number, y: number, w: number, h: number) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }

  withOffset(n: Offset): Placement {
    const [ dx, dy, dw, dh ] = n.toArray()
    return new Placement(this.x + dx, this.y + dy, this.w - dw - dx, this.h - dh - dy)
  }

  withPadding(n: [number] | [number, number] | [number, number, number, number]): Placement {
    let dx, dy, dw, dh: number
    if (n.length === 1) {
      dx = dy = dw = dh = n[0]
    } else if (n.length === 2) {
      dx = dw = n[0]
      dy = dh = n[1]
    } else if (n.length === 4) {
      dx = n[0]
      dy = n[1]
      dw = n[2]
      dh = n[3]
    } else {
      throw new Error('Invalid number of sizes in array')
    }
    return new Placement(this.x + dx, this.y + dy, this.w - dw - dx, this.h - dh - dy)
  }

  withSize(s: Size): Placement {
    return new Placement(
      this.x,
      this.y, 
      s.width,
      s.height
    )
  }

  calcOffset(p: Placement): Offset {
    return new Offset(
      this.x - p.x,
      (p.x + p.w) - (this.x + this.w), 
      this.y - p.y,
      (p.y + p.h) - (this.y + this.h)
    )
  }
}
