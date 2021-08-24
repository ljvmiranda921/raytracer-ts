import Vec3 from './Vec3'

export default class Color extends Vec3 {
  write() {
    const ir = Math.round(255.999 * this.x)
    const ig = Math.round(255.999 * this.y)
    const ib = Math.round(255.999 * this.z)
    console.log(`${ir} ${ig} ${ib}`)
  }

  static fromVec3(vec: Vec3): Color {
    return new Color(vec.x, vec.y, vec.z)
  }
}
