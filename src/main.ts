import Color from './Color'
import Vec3 from './Vec3'
import Ray from './Ray'

// Image settings
const aspectRatio = 16.0 / 9.0
const imageWidth = 400
const imageHeight = imageWidth / aspectRatio

// Camera settings
const viewportHeight = 2.0
const viewportWidth = aspectRatio * viewportHeight
const focalLength = 1.0

const origin = new Vec3(0, 0, 0)
const horizontal = new Vec3(viewportWidth, 0, 0)
const vertical = new Vec3(0, viewportHeight, 0)
const lowerLeftCorner = origin
  .subtract(horizontal.scale(0.5))
  .subtract(vertical.scale(0.5))
  .subtract(new Vec3(0, 0, focalLength))

// Render
console.log(`P3\n${imageWidth} ${imageHeight}\n255`)

for (let j = imageHeight - 1; j >= 0; j--) {
  process.stderr.clearLine(0)
  process.stderr.cursorTo(0)
  process.stderr.write(`Scanlines remaining: ${j}`)

  for (let i = 0; i < imageWidth; i++) {
    let u = i / (imageWidth - 1)
    let v = j / (imageHeight - 1)
    let r = new Ray(
      origin,
      lowerLeftCorner
        .add(horizontal.scale(u))
        .add(vertical.scale(v))
        .subtract(origin)
    )

    let pixelColor = r.color()
    pixelColor.write()
  }
}

process.stderr.write(`\nDone.`)
