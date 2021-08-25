import Point from './Point'
import Ray from './Ray'
import Vec3 from './Vec3'

export default class Camera {
    origin: Point
    horizontal: Vec3
    vertical: Vec3
    lowerLeftCorner: Vec3

    constructor(
        aspectRatio: number = 16.0 / 9.0,
        viewportHeight: number = 2.0,
        focalLength: number = 1.0
    ) {
        let viewportWidth: number = aspectRatio * viewportHeight
        this.origin = new Point(0, 0, 0)
        this.horizontal = new Vec3(viewportWidth, 0.0, 0.0)
        this.vertical = new Vec3(0.0, viewportHeight, 0.0)
        this.lowerLeftCorner = this.origin
            .subtract(this.horizontal.scale(0.5))
            .subtract(this.vertical.scale(0.5))
            .subtract(new Vec3(0, 0, focalLength))
    }

    getRay(u: number, v: number): Ray {
        let direction = this.lowerLeftCorner
            .add(this.horizontal.scale(u))
            .add(this.vertical.scale(v))
            .subtract(this.origin)
        return new Ray(this.origin, direction)
    }
}
