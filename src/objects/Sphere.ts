import Hittable from '../Hittable'
import HitRecord from '../HitRecord'
import type Point from '../Point'
import type Ray from '../Ray'

export default class Sphere extends Hittable {
  center: Point
  radius: number

  constructor(center: Point, radius: number) {
    super()
    this.center = center
    this.radius = radius
  }

  hit(r: Ray, t_min: number, t_max: number, rec: HitRecord) {
    const oc = r.orig.subtract(this.center)
    const a = r.dir.lengthSquared()
    const halfB = oc.dot(r.dir)
    const c = oc.lengthSquared() - Math.pow(this.radius, 2)

    const discriminant = Math.pow(halfB, 2) - a * c
    const sqrtD = Math.sqrt(discriminant)

    if (discriminant < 0) {
      // Ray didn't touch the sphere
      var hitValue = false
    } else {
      var root = (-halfB - sqrtD) / a
      if (root < t_min || t_max < root) {
        root = (-halfB + sqrtD) / a
        if (root < t_min || t_max < root) {
          // Roots aren't within acceptable range
          var hitValue = false
        }
      }
      // Ray hits the sphere
      rec.t = root
      rec.p = r.at(rec.t)
      rec.normal = rec.p.subtract(this.center).scale(1 / this.radius)
      hitValue = true
    }

    return hitValue
  }
}
