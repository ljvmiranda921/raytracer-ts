import type Point from './Point'
import type Vec3 from './Vec3'
import type Ray from './Ray'

export default class HitRecord {
  p: Point
  normal: Vec3
  t: number
  frontFace: boolean

  setFaceNormal(r: Ray, outwardNormal: Vec3) {
    this.frontFace = r.dir.dot(outwardNormal) < 0
    this.normal = this.frontFace ? outwardNormal : outwardNormal.negate()
  }
}
