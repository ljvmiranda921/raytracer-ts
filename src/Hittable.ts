import Point from './Point'
import Ray from './Ray'

export function hitSphere(center: Point, radius: number, r: Ray) {
  let oc = r.orig.subtract(center)
  let a = r.dir.lengthSquared()
  let half_b = oc.dot(r.dir)
  let c = oc.lengthSquared() - Math.pow(radius, 2)
  let discriminant = Math.pow(half_b, 2) - a * c

  if (discriminant < 0) {
    var hitPoint = -1.0
  } else {
    var hitPoint = (-half_b - Math.sqrt(discriminant)) / a
  }
  return hitPoint
}
