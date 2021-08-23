import Color from './Color'

const imageWidth = 256
const imageHeight = 256

console.log(`P3\n${imageWidth} ${imageHeight}\n255`)

for (let j = imageHeight - 1; j >= 0; j--) {
  process.stderr.clearLine(0)
  process.stderr.cursorTo(0)
  process.stderr.write(`Scanlines remaining: ${j}`)

  for (let i = 0; i < imageWidth; i++) {
    let color = new Color(i / (imageWidth - 1), j / (imageHeight - 1), 0.25)
    color.write()
  }
}

process.stderr.write(`\nDone.`)
