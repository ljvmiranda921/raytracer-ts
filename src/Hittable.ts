import HitRecord from './HitRecord'
import Ray from './Ray'

export default abstract class Hittable {
  abstract hit(ray: Ray, t_min: number, t_max: number, rec: HitRecord): boolean
}
