import type Point from './Point'
import type Ray from './Ray'
import type Vec3 from './Vec3'

export default class HitRecord {
    p: Point
    normal: Vec3
    t: number
    frontFace: boolean

    constructor(r: Ray, t: number, outwardNormal: Vec3) {
        this.p = r.at(t)
        this.t = t
        this.frontFace = r.dir.dot(outwardNormal) < 0
        this.normal = this.frontFace ? outwardNormal : outwardNormal.negate()
    }
}
