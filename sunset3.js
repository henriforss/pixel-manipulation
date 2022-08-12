/* Get canvas and ctx. */
const canvas = document.getElementById("canvas6")
const ctx = canvas.getContext("2d")
const CANVAS_WIDTH = canvas.width = 350
const CANVAS_HEIGHT = canvas.height = 467

/* Assign images. Small one for manipulation, larger for show. */
const largeImage = new Image()
largeImage.src = "sunset-large.png"

const smallImage = new Image()
smallImage.src = "sunset-small.png"

/* Define drawSunset(). */
function drawSunset() {
  /* Draw smaller image on screen. */
  ctx.drawImage(smallImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

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
  function animateSunset() {
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    
    for (let i = 0; i < tilesArray.length; i++) {
      tilesArray[i].update()
      tilesArray[i].draw()
    }
    
    if (cycles < 70) {
      requestAnimationFrame(animateSunset)
    } else {
      drawText()
    }
    
    cycles++
  }

  animateSunset()
}

/* Define drawText(). */
function drawText() {

  /* Define cycles. */
  let cycles = 0

  /* Define variables. */
  let i = -1
  let j = 489
  let k = -218
  let l = 370

  /* Define animateText(). */
  function animateText() {
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    ctx.fillStyle = "black"
    ctx.font = "30px bold Arial"
    ctx.textAlign = "left"
    ctx.fillText("Kiitos", 173 / 2, i)
    ctx.fillText("ajastasi!", 335 / 2, j)
    ctx.fillRect(k, 260, 200, 2)
    ctx.fillRect(l, 205, 200, 2)
    i = i + 5
    j = j - 5
    k = k + 6
    l = l - 6
    cycles++
    
    if (cycles < 50) {
      requestAnimationFrame(animateText)
    } else {
      return
    } 
  }

  animateText()
}

/* Variable to control animation. */
let readyToRun = true

/* When page (mainly images) has loaded, execute functions. */
window.addEventListener("load", () => {
  /* Draw large image on screen. */
  ctx.drawImage(largeImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

  /* Event listerner to start animation. */
  canvas.addEventListener("click", () => {
    if (readyToRun) {
      readyToRun = false
      drawSunset()  
    }
  })

  /* Event listener to reload page. */
  canvas.addEventListener("dblclick", () => {
    location.reload()
  })
})
