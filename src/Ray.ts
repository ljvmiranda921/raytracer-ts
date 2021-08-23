import Vec3 from './Vec3'

export default class Ray {
  orig: Vec3
  dir: Vec3

  constructor(origin: Vec3, direction: Vec3) {
    this.orig = origin
    this.dir = direction
  }

  at(t: number) {
    return this.orig.add(this.dir.scale(t))
  }
}
