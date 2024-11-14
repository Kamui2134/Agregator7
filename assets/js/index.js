'use strict'

let canvas = document.getElementById('miCanvas')
let context = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = document.body.offsetHeight

let mouseCoords = {
	x: undefined,
	y: undefined,
}

// window.addEventListener("mousemove", (e) => {

//   if (mouseCoords.x < e.x) {
//     puntos.forEach(punto => {
//       punto.x -= - 0.6
//     });
//   }

//   if (mouseCoords.x > e.x) {
//     puntos.forEach(punto => {
//       punto.x += - 0.6
//     });
//   }

//   if (mouseCoords.y < e.y) {
//     puntos.forEach(punto => {
//       punto.y -= - 0.6
//     });
//   }

//   if (mouseCoords.y > e.y) {
//     puntos.forEach(punto => {
//       punto.y += - 0.6
//     });
//   }

//   mouseCoords.x = e.x;
//   mouseCoords.y = e.y;
// })

function Punto() {
	this.x = Math.random() * canvas.width
	this.y = Math.random() * canvas.height
	this.size = Math.random() * 3
	this.floatX = Math.random() * 0.3 - 0.1
	this.floatY = Math.random() * 0.3 - 0.1
	this.color = randomColor()

	this.draw = function () {
		context.beginPath()
		context.fillStyle = this.color
		context.arc(this.x, this.y, this.size, 0, 360)
		context.fill()
	}

	this.update = function () {
		if (this.x > canvas.width) this.x = -10
		if (this.x < -20) this.x = canvas.width
		if (this.y > canvas.height) this.y = -10
		if (this.y < -20) this.y = canvas.height

		this.x += this.floatX
		this.y += this.floatY
		this.draw()
	}
}

let puntos = []
for (let i = 0; i < 300; i++) puntos[i] = new Punto()

function move() {
	context.clearRect(0, 0, canvas.width, canvas.height)

	puntos.forEach(punto => {
		punto.update()
	})

	requestAnimationFrame(move)
}

move()

function randomColor() {
	let random = Math.random() * 3
	if (random > 2) return 'rgb(206, 206, 206)'
	if (random < 2 && random > 1) return 'gray'
	if (random < 1) return '#7db424'
}
