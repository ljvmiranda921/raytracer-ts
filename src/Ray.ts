import Color from './Color'
import Point from './Point'
import Vec3 from './Vec3'
import { hitSphere } from './Hittable'

export default class Ray {
  orig: Point
  dir: Vec3

  constructor(origin: Point, direction: Vec3) {
    this.orig = origin
    this.dir = direction
  }

  at(t: number) {
    return this.orig.add(this.dir.scale(t))
  }

  /* Return the color of the background (a simple gradient) */
  color() {
    const hit = hitSphere(new Point(0, 0, -1), 0.5, this)
    if (hit) {
      var rayColor = new Color(1, 0, 0)
    } else {
      let unitDirection = this.dir.unit()
      let t = 0.5 * (unitDirection.y + 1.0)
      let c = new Color(1.0, 1.0, 1.0)
        .scale(1.0 - t)
        .add(new Color(0.5, 0.7, 1.0).scale(t))
      var rayColor = new Color(c.x, c.y, c.z)
    }
    //FIXME process.stderr.write(`hit=${hit}, color=${rayColor}`)
    return rayColor
  }
}
