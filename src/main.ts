import Camera from './Camera'
import Color from './Color'
import Hittables from './Hittables'
import Point from './Point'
import { LambertianMatte } from './materials'
import Sphere from './objects/Sphere'
import random from './random'

// Image
const aspectRatio: number = 16.0 / 9.0
const imageWidth: number = 400
const imageHeight: number = imageWidth / aspectRatio
const samplesPerPixel: number = 100
const maxDepth: number = 50

// World
const world = new Hittables()
world.add(
    new Sphere(
        new Point(0, 0, -1),
        0.5,
        new LambertianMatte(new Color(0.5, 0.5, 0.5))
    )
)
world.add(
    new Sphere(
        new Point(0, -100.5, -1),
        100,
        new LambertianMatte(new Color(0.5, 0.5, 0.5))
    )
)

// Camera
const camera = new Camera()

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
