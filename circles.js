/* Canvas properties etc. */
const canvas = document.getElementById("canvas2")
const ctx = canvas.getContext("2d")
canvas.width = 350
canvas.height = 350

/* Declare variable and array. */
const numberOfCircles = 30
let circlesArray = []

/* Define class Cricle. With constructor, of course. */
class Circle {
  constructor() {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.radius = 0
    this.color = `rgb(0, ${Math.random() * 255}, 0)`
    this.grow = true
  }

  /* Method: update(). */
  update() {

    if (this.grow == true) {
      this.radius = this.radius + 1
    } else {
      this.radius = this.radius - 1
    }

    if (this.radius >= 30) {
      this.grow = !this.grow
    }

    if (this.radius <= 0) {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.grow = !this.grow
    }
  }

  /* Method: draw(). */
  draw() {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
  }
}

/* Create particles to initialize. */
function init() {
  for (let i = 0; i < numberOfCircles; i++) {
    circlesArray.push(new Circle)
  }
}

/* Animate with custom function. */
function animate() {
  
  /* Black on the background. */
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  /* Circles everywhere. */
  for (let i = 0; i < circlesArray.length; i++) {
    circlesArray[i].update()
    circlesArray[i].draw()
  }

  if (runAnimation == false) {
    return
  }

  /* Built-in function to animate. By recursion. */
  requestAnimationFrame(animate)
}

/* Variable. */
let runAnimation = false

/* Button to start animation. */
const startButton = document.getElementById("start")
startButton.addEventListener("click", () => {
  if (runAnimation == false) {
    runAnimation = true
    init()
    animate()
    console.log(circlesArray)
  }
})

/* Button to stop animation. */
const stopButton = document.getElementById("stop")
stopButton.addEventListener("click", () => {
  runAnimation = false
  circlesArray = []
  console.log(circlesArray)
})