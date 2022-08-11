const canvas = document.getElementById("canvas4")
const ctx = canvas.getContext("2d")
const CANVAS_WIDTH = canvas.width = 350
const CANVAS_HEIGHT = canvas.height = 622

const sunsetImage = new Image()
sunsetImage.src = "sunset.png"

sunsetImage.addEventListener("load", () => {
  ctx.drawImage(sunsetImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  const pixels = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  
  let mappedImage = []
  for (let y = 0; y < CANVAS_HEIGHT; y++) {
    let row = []
    for (let x = 0; x < CANVAS_WIDTH; x++) {
      const red = pixels.data[(y * 4 * pixels.width) + (x * 4)]
      const green = pixels.data[(y * 4 * pixels.width) + (x * 4 + 1)]
      const blue = pixels.data[(y * 4 * pixels.width) + (x * 4 + 2)]
      const alpha = pixels.data[(y * 4 * pixels.width) + (x * 4 + 3)]
      const cell = [red, green, blue, alpha]
      row.push(cell)
    }
    mappedImage.push(row)
  }

  class Pixel {
    constructor(x, y, color) {
      this.x = x
      this.y = y
      this.red = color[0]
      this.green = color[1]
      this.blue = color[2]
      this.alpha = color[3]
      this.speed = Math.random() * 40
    }

    update() {
      this.y = this.y + this.speed
    }

    draw() {
      ctx.fillStyle = `rgb(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`
      ctx.fillRect(this.x, this.y, 1, 1)
    }
  }

  let pixelsArray = []

  function init() {
    for (let y = 0; y < CANVAS_HEIGHT; y++) {
      for (let x = 0; x < CANVAS_WIDTH; x++) {
        pixelsArray.push(new Pixel(x, y, mappedImage[y][x]))
      }
    }
  }
  
  function animate() {
    ctx.fillStyle = "rgb(0, 0, 0)"
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  
    for (let i = 0; i < pixelsArray.length; i++) {
      // pixelsArray[i].update()
      pixelsArray[i].draw()
    }

    // requestAnimationFrame(animate)
  }

  init()
  animate()
})

canvas.addEventListener("click", () => {
  console.log("moi")
})
