import Hittable from './Hittable'
import HitRecord from './HitRecord'
import type Ray from './Ray'

export default class Hittables extends Hittable {
  objects: Hittable[] = []

  clear() {
    this.objects = []
  }

  add(object: Hittable): void {
    this.objects.push(object)
  }

  /**
   * Return a hit for the closest item in this list of objects
   * @see https://raytracing.github.io/books/RayTracingInOneWeekend.html#surfacenormalsandmultipleobjects/alistofhittableobjects
   */
  hit(r: Ray, t_min: number, t_max: number, rec: HitRecord) {
    let tempRec: HitRecord
    var hitAnything = false
    var closestSoFar = t_max

    for (const obj of this.objects) {
      const objectHit = obj.hit(r, t_min, closestSoFar, tempRec)
      if (objectHit) {
        hitAnything = true
        closestSoFar = tempRec.t
        rec = tempRec
      }
    }
    return hitAnything
  }
}
