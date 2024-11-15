'use strict'

let canvas = document.getElementById('miCanvas')
let context = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = document.body.offsetHeight

let mouseCoords = {
	x: undefined,
	y: undefined,
}

// Функция для обновления размеров
function updateCanvasSize() {
	canvas.height = document.body.offsetHeight
	canvas.width = document.body.offsetWidth
}

// Обработчик события изменения окна
let resizeTimeout
window.addEventListener('resize', () => {
	// Задержка, чтобы избежать мигания
	clearTimeout(resizeTimeout)
	resizeTimeout = setTimeout(() => {
		updateCanvasSize()
	}, 1)
})

// Наблюдаем за изменениями размера body
const observer = new ResizeObserver(() => {
	// Задержка перед обновлением
	clearTimeout(resizeTimeout)
	resizeTimeout = setTimeout(() => {
		updateCanvasSize()
	}, 1)
})

observer.observe(document.body)

// Инициализация начальных размеров
updateCanvasSize()

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

// FAQ

const questions = document.querySelectorAll('.faq__question')
const questionsBtns = document.querySelectorAll('.faq__question-btn')

for (let i = 0; i < questions.length; i++) {
	questions[i].style.maxHeight =
		questions[i].querySelector('.faq__question-head').clientHeight + 40 + 'px'
}
window.addEventListener('resize', function () {
	for (let i = 0; i < questions.length; i++) {
		if (questionsBtns[i].style.transform != 'rotate(90deg)') {
			questions[i].style.maxHeight =
				questions[i].querySelector('.faq__question-head').clientHeight +
				40 +
				'px'
		} else {
			questions[i].style.maxHeight = questions[i].scrollHeight + 'px'
		}
	}
})

function questionToggle(index) {
	const headHeight = questions[index].querySelector(
		'.faq__question-head'
	).clientHeight // Получаем высоту faq__question-head

	if (questionsBtns[index].style.transform == 'rotate(90deg)') {
		questionsBtns[index].style.transform = 'rotate(45deg)'
		if (window.innerWidth <= 720) {
			questions[index].style.maxHeight = headHeight + 40 + 'px'
		} else {
			questions[index].style.maxHeight = headHeight + 40 + 'px'
		}
	} else {
		questionsBtns[index].style.transform = 'rotate(90deg)'
		questions[index].style.maxHeight = questions[index].scrollHeight + 'px'
	}
}

for (let i = 0; i < questionsBtns.length; i++) {
	questionsBtns[i].addEventListener('click', () => {
		questionToggle(i)
	})
}

setTimeout(() => {
	canvas.width = window.innerWidth
	canvas.height = document.body.offsetHeight
}, 200)

// COPIYING BUTTON

function copyPath() {
	navigator.clipboard
		.writeText(window.location.href)
		.then(alert('copying completed'))
}
