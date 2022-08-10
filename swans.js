const swansImage = new Image()
swansImage.src = "swans.png"

swansImage.addEventListener("load", () => {
  const canvas = document.getElementById("canvas3")
  const ctx = canvas.getContext("2d")
  const CANVAS_WIDTH = canvas.width = 350
  const CANVAS_HEIGHT = canvas.height = 234

  const numberOfSnowflakes = 100
  const numberOfSmallSnowflakes = 100
  let snowflakesArray = []
  let smallSnowflakesArray = []


  class SmallSnowflake {
    constructor() {
      this.x = Math.random() * CANVAS_WIDTH
      this.y = Math.random() * CANVAS_HEIGHT
      this.z = Math.random() * 2
      this.radiusY = this.z
      this.radiusX = this.z 
      this.rotation = Math.random()
      this.opacity = this.z
      this.color = `rgb(255, 255, 255, ${this.opacity})`
      this.speed = this.z * 0.2
    }

    update() {
      this.x = this.x + 0.1
      this.y = this.y + this.speed
      this.rotation++

      if (this.y >= CANVAS_HEIGHT * (this.z / 5)) {
        this.opacity = this.opacity - 0.01
        this.color = `rgb(255, 255, 255, ${this.opacity})`
      }

      if (this.y >= CANVAS_HEIGHT * (this.z / 3) || this.opacity <= 0) {
        this.x = Math.random() * CANVAS_WIDTH
        this.y = 0
        this.z = Math.random() * 2
        this.radiusX = this.z 
        this.radiusY = this.z
        this.opacity = this.z
        this.color = `rgb(255, 255, 255, ${this.opacity})`
        this.speed = this.z * 0.2
      }
    }

    draw() {
      ctx.beginPath()
      ctx.fillStyle = this.color
      ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, this.rotation * Math.PI / 180, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  class Snowflake {
    constructor() {
      this.x = Math.random() * CANVAS_WIDTH
      this.y = Math.random() * CANVAS_HEIGHT
      this.z = Math.random() * 4
      this.radiusX = Math.random() + 1 * this.z 
      this.radiusY = Math.random() + 1 * this.z
      this.rotation = Math.random()
      this.opacity = Math.random() * this.z
      this.color = `rgb(255, 255, 255, ${this.opacity})`
      this.speed = this.z * 0.4
    }

    update() {
      this.x = this.x - 0.1
      this.y = this.y + this.speed
      this.rotation++

      if (this.y >= CANVAS_HEIGHT * (this.z / 5)) {
        this.opacity = this.opacity - 0.01
        this.color = `rgb(255, 255, 255, ${this.opacity})`
      }

      if (this.y >= CANVAS_HEIGHT || this.opacity <= 0) {
        this.x = Math.random() * CANVAS_WIDTH
        this.y = 0
        this.z = Math.random() * 4
        this.radiusX = Math.random() + 1 * this.z 
        this.radiusY = Math.random() + 1 * this.z
        this.opacity = Math.random() * this.z
        this.color = `rgb(255, 255, 255, ${this.opacity})`
        this.speed = this.z * 0.4
      }
    }

    draw() {
      ctx.beginPath()
      ctx.fillStyle = this.color
      ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, this.rotation * Math.PI / 180, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  function init() {
    for (let i = 0; i < numberOfSmallSnowflakes; i++) {
      smallSnowflakesArray.push(new SmallSnowflake)
    }

    for (let i = 0; i < numberOfSnowflakes; i++) {
      snowflakesArray.push(new Snowflake)
    }
  }

  function animate() {
    ctx.drawImage(swansImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    for (let i = 0; i < smallSnowflakesArray.length; i++) {
      smallSnowflakesArray[i].update()
      smallSnowflakesArray[i].draw()
    }

    for (let i = 0; i < snowflakesArray.length; i++) {
      snowflakesArray[i].update()
      snowflakesArray[i].draw()
    }

    requestAnimationFrame(animate)
  }

  init()
  animate()
})
