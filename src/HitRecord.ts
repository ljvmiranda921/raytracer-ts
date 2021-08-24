import type Point from './Point'
import type Vec3 from './Vec3'

export default class HitRecord {
  p: Point
  normal: Vec3
  t: number
}
