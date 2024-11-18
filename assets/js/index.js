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
	clearTimeout(resizeTimeout)
	resizeTimeout = setTimeout(() => {
		updateCanvasSize()
	}, 1)
})

// Наблюдаем за изменениями размера body
const observer = new ResizeObserver(() => {
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
	this.size = Math.random() * 1 + 2.5
	this.floatX = Math.random() * 0.3 - 0.1
	this.floatY = Math.random() * 0.3 - 0.1
	this.src = randomSrc()
	this.img = new Image()
	this.img.src = this.src
	this.angle = Math.random() * Math.PI * 2 // Угол в радианах
	this.rotationSpeed = (Math.random() - 0.5) * 0.05

	this.imgLoaded = false // Флаг для проверки загрузки изображения
	this.img.onload = () => {
		this.imgLoaded = true // Установить флаг после загрузки
	}

	this.draw = function () {
		if (this.imgLoaded) {
			// Рисуем изображение с центровкой
			context.drawImage(
				this.img,
				-this.size * 5, // Сместить, чтобы центр был в (0, 0)
				-this.size * 5,
				this.size * 10,
				this.size * 10
			)
		} else {
			// Опционально: нарисовать что-то другое, пока изображение не загрузится
			context.beginPath()
			context.fillStyle = 'gray'
			context.arc(0, 0, this.size * 5, 0, Math.PI * 2)
			context.fill()
		}
	}

	this.update = function () {
		// Обновление позиции
		if (this.x > canvas.width) this.x = -10
		if (this.x < -20) this.x = canvas.width
		if (this.y > canvas.height) this.y = -10
		if (this.y < -20) this.y = canvas.height

		this.x += this.floatX
		this.y += this.floatY
		this.angle += this.rotationSpeed

		// Сохраняем текущий контекст
		context.save()

		// Перемещаем центр координат в центр объекта
		context.translate(this.x, this.y)

		// Поворачиваем вокруг новой точки (центра)
		context.rotate(this.angle)

		// Рисуем объект
		this.draw()

		// Восстанавливаем контекст
		context.restore()
	}
}

let puntos = []
for (let i = 0; i < 100; i++) {
	puntos[i] = new Punto()
}

function move() {
	context.clearRect(0, 0, canvas.width, canvas.height)

	puntos.forEach(punto => {
		punto.update()
	})

	requestAnimationFrame(move)
}

move()

function randomSrc() {
	let random = Math.random() * 5
	if (random < 1) return './assets/images/icons/ball1.svg'
	if (random > 1 && random < 2) return './assets/images/icons/ball2.svg'
	if (random > 2 && random < 3) return './assets/images/icons/ball3.svg'
	if (random > 3 && random < 4) return './assets/images/icons/ball4.svg'
	if (random > 4 && random < 5) return './assets/images/icons/ball5.svg'
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

// NAV MENU

const navBar = document.querySelector('.header__nav')
const button = document.querySelector('.header__button')
const navLinks = document.querySelectorAll('.header__nav-link')

button.addEventListener('click', function () {
	navBar.classList.toggle('active')
	this.classList.toggle('active')
})
navLinks.forEach((navLink) => {
	navLink.addEventListener('click', function () {
		navBar.classList.toggle('active')
		button.classList.toggle('active')
	})
})
