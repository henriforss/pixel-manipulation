/* Get canvas and ctx. */
const canvas = document.getElementById("canvas5")
const ctx = canvas.getContext("2d")
const CANVAS_WIDTH = canvas.width = 350
const CANVAS_HEIGHT = canvas.height = 620

/* Get image. */
const sunsetImage = new Image()
sunsetImage.src = "sunset.png"

/* When image is loaded. */
sunsetImage.addEventListener("load", () => {
  /* Draw image on screen. */
  ctx.drawImage(sunsetImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

  /* Define class. */
  class Tile {
    constructor(data, x, y) {
      this.data = data
      this.x = x
      this.y = y
      this.yspeed = Math.random() * 10 + 10
      this.xspeed = (Math.round(Math.random()) * 2 - 1) * (Math.random() * 1)
    }

    /* Class method. */
    update() {
      this.y = this.y + this.yspeed
      this.x = this.x + this.xspeed
    }

    /* Class method. */
    draw() {
      if (this.data != null) {
        ctx.putImageData(this.data, this.x, this.y)
      }
    }
  }

  /* Create empty array. */
  let tilesArray = []

  /* Define tile size. */
  const TILE_SIZE = 10

  /* Loop through image coords and push new Tile instances into array. */
  for (let y = 0; y < CANVAS_HEIGHT; y = y + TILE_SIZE) {
    for (let x = 0; x < CANVAS_WIDTH; x = x + TILE_SIZE) {
      const imageData = ctx.getImageData(x, y, TILE_SIZE, TILE_SIZE)
      const xco = x
      const yco = y
      const tile = new Tile(imageData, xco, yco)
      tilesArray.push(tile)
    }
  }

  /* Variabel to keep track of animation cycles. */
  let cycles = 0

  /* Define animate(). */
  function animate() {
    cycles++
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  
    for (let i = 0; i < tilesArray.length; i++) {
      tilesArray[i].update()
      tilesArray[i].draw()
    }

    if (cycles > 70) {
      window.location.reload()
    }

    requestAnimationFrame(animate) // Comment out this one to stop animation
  }

  /* Add event listener to run animation. */
  canvas.addEventListener("click", () => {
      animate()
  })
})
