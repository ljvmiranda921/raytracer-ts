import Camera from './Camera'
import Color from './Color'
import Hittables from './Hittables'
import Point from './Point'
import { LambertianMatte, Metal, Dielectric } from './materials'
import Sphere from './objects/Sphere'
import Vec3 from './Vec3'
import random from './random'

// Image
const aspectRatio = 16.0 / 9.0
const imageWidth = 400
const imageHeight = imageWidth / aspectRatio
const samplesPerPixel = 100
const maxDepth = 50

// World

const world = new Hittables()

const materialGround = new LambertianMatte(new Color(0.8, 0.8, 0.0))
const materialCenter = new LambertianMatte(new Color(0.1, 0.2, 0.5))
const materialLeft = new Dielectric(1.5)
const materialRight = new Metal(new Color(0.8, 0.6, 0.2), 0.0)

world.add(new Sphere(new Point(0, -100.5, -1), 100, materialGround))
world.add(new Sphere(new Point(0, 0, -1), 0.5, materialCenter))
world.add(new Sphere(new Point(-1, 0, -1), 0.5, materialLeft))
world.add(new Sphere(new Point(-1, 0, -1), -0.4, materialLeft))
world.add(new Sphere(new Point(1, 0, -1), 0.5, materialRight))

// Camera
const lookFrom = new Point(-2, 2, 2)
const lookAt = new Point(0, 0, -1)
const vup = new Vec3(0, 1, 0)
const distToFocus = lookFrom.subtract(lookAt).length()
const aperture = 1.0
const camera = new Camera(
    lookFrom,
    lookAt,
    vup,
    90,
    aspectRatio,
    aperture,
    distToFocus
)

// Render
console.log(`P3\n${imageWidth} ${imageHeight}\n255`)

for (let j = imageHeight - 1; j >= 0; j--) {
    process.stderr.clearLine(0)
    process.stderr.cursorTo(0)
    process.stderr.write(`Scanlines remaining: ${j}`)

    for (let i = 0; i < imageWidth; i++) {
        const colorSamples = []

        for (let s = 0; s < samplesPerPixel; s++) {
            const u = (i + random(-1, 1)) / (imageWidth - 1)
            const v = (j + random(-1, 1)) / (imageHeight - 1)

            const r = camera.getRay(u, v)
            const sampledColor = r.color(world, maxDepth)
            colorSamples.push(sampledColor)
        }

        const pixelColor = Color.average(colorSamples)
        pixelColor.write()
    }
}

process.stderr.write(`\nDone.`)
