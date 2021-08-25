import Vec3 from './Vec3'

export default class Color extends Vec3 {
    write(samplesPerPixel: number) {
        let r = this.x
        let g = this.y
        let b = this.z

        const scale = 1.0 / samplesPerPixel
        r *= scale
        g *= scale
        b *= scale

        const ir = Math.floor(256 * clamp(r, 0.0, 0.999))
        const ig = Math.floor(256 * clamp(g, 0.0, 0.999))
        const ib = Math.floor(256 * clamp(b, 0.0, 0.999))
        console.log(`${ir} ${ig} ${ib}`)
    }

    static fromVec3(vec: Vec3): Color {
        return new Color(vec.x, vec.y, vec.z)
    }
}

function clamp(x: number, min: number, max: number): number {
    if (x < min) {
        return min
    }
    if (x > max) {
        return max
    }
    return x
}
