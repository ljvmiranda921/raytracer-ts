import Point from './Point'
import Ray from './Ray'

export function hitSphere(center: Point, radius: number, r: Ray) {
  let oc = r.orig.subtract(center)
  let a = r.dir.dot(r.dir)
  let b = 2.0 * oc.dot(r.dir)
  let c = oc.dot(oc) - Math.pow(radius, 2)
  let discriminant = Math.pow(b, 2) - 4 * a * c
  return discriminant > 0
}
