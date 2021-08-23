export default class Vec3 {
  x: number
  y: number
  z: number

  constructor(x: number, y: number, z: number) {
    this.x = x
    this.y = y
    this.z = z
  }

  negate() {
    return new Vec3(-this.x, -this.y, -this.z)
  }

  invert() {
    return new Vec3(1 / this.x, 1 / this.y, 1 / this.z)
  }

  add(t: Vec3) {
    return new Vec3(this.x + t.x, this.y + t.y, this.z + t.z)
  }

  subtract(t: Vec3) {
    return this.add(t.negate())
  }

  mul(t: Vec3) {
    return new Vec3(this.x * t.x, this.y * t.y, this.z * t.z)
  }

  divide(t: Vec3) {
    return this.mul(t.invert())
  }

  dot(t: Vec3) {
    return this.x * t.x + this.y * t.y + this.z * t.z
  }

  cross(t: Vec3) {
    return new Vec3(
      this.y * t.z - this.z * t.y,
      this.z * t.x - this.x * t.z,
      this.x * t.y - this.y * t.x
    )
  }

  scale(f: number) {
    return new Vec3(this.x * f, this.y * f, this.z * f)
  }

  lengthSquared() {
    return Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2)
  }

  length() {
    return Math.sqrt(this.lengthSquared())
  }

  toString() {
    return `${this.x} ${this.y} ${this.z}`
  }

  unit() {
    return this.scale(1 / this.length())
  }
}
