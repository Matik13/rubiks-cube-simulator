const cube = document.getElementById('cube')
let currentX = -30
let currentY = -45
rotateCube(currentX, currentY)

function getDefaultCubeState() {
	return {
		front: [
			['green', 'green', 'green'],
			['green', 'green', 'green'],
			['green', 'green', 'green'],
		],

		// if you want to use images instead of colors:
		// front: [
		//     ['url("front.jpg")', 'url("front.jpg")', 'url("front.jpg")'],
		//     ['url("front.jpg")', 'url("front.jpg")', 'url("front.jpg")'],
		//     ['url("front.jpg")', 'url("front.jpg")', 'url("front.jpg")']
		// ],
		back: [
			['blue', 'blue', 'blue'],
			['blue', 'blue', 'blue'],
			['blue', 'blue', 'blue'],
		],
		left: [
			['orange', 'orange', 'orange'],
			['orange', 'orange', 'orange'],
			['orange', 'orange', 'orange'],
		],
		right: [
			['red', 'red', 'red'],
			['red', 'red', 'red'],
			['red', 'red', 'red'],
		],
		top: [
			['white', 'white', 'white'],
			['white', 'white', 'white'],
			['white', 'white', 'white'],
		],
		bottom: [
			['yellow', 'yellow', 'yellow'],
			['yellow', 'yellow', 'yellow'],
			['yellow', 'yellow', 'yellow'],
		],
	}
}

cubeState = getDefaultCubeState()

function solve() {
	cubeState = getDefaultCubeState()
	updateCubeVisuals()

	document.querySelector('.front').style.transform = 'rotateY(0deg) translateZ(105px)'
	document.querySelector('.back').style.transform = 'rotateY(180deg) translateZ(105px)'
	document.querySelector('.left').style.transform = 'rotateY(-90deg) translateZ(105px)'
	document.querySelector('.right').style.transform = 'rotateY(90deg) translateZ(105px)'
	document.querySelector('.top').style.transform = 'rotateX(90deg) translateZ(105px)'
	document.querySelector('.bottom').style.transform = 'rotateX(-90deg) translateZ(105px)'

	cube.style.transition = 'transform 1s ease-in-out'
}

function scramble() {
	const moves = ['F', 'R', 'U', 'L', 'B', 'D', 'M', 'E', 'S']
	const primes = ['', 'Prime']
	for (let i = 0; i < 20; i++) {
		const move = moves[Math.floor(Math.random() * moves.length)]
		const prime = primes[Math.floor(Math.random() * primes.length)]
		window[move + prime]()
	}
}

function info() {
	window.open('https://ruwix.com/the-rubiks-cube/notation/', '_blank')
}

function updateCubeVisuals() {
	Object.keys(cubeState).forEach(face => {
		const faceDiv = document.querySelector(`.${face}`)
		const tiles = faceDiv.querySelectorAll('div')
		cubeState[face].flat().forEach((value, index) => {
			const row = Math.floor(index / 3)
			const col = index % 3
			if (value.startsWith('url(')) {
				tiles[index].style.backgroundImage = value
				tiles[index].style.backgroundPosition = `${-col * 70}px ${-row * 70}px`
				tiles[index].style.backgroundColor = ''
			} else {
				tiles[index].style.backgroundColor = value
				tiles[index].style.backgroundImage = ''
			}
		})
	})
}

function rotateFaceClockwise(face) {
	const temp = [
		[cubeState[face][0][0], cubeState[face][0][1], cubeState[face][0][2]],
		[cubeState[face][1][0], cubeState[face][1][1], cubeState[face][1][2]],
		[cubeState[face][2][0], cubeState[face][2][1], cubeState[face][2][2]],
	]
	cubeState[face][0][0] = temp[2][0]
	cubeState[face][0][1] = temp[1][0]
	cubeState[face][0][2] = temp[0][0]
	cubeState[face][1][0] = temp[2][1]
	cubeState[face][1][2] = temp[0][1]
	cubeState[face][2][0] = temp[2][2]
	cubeState[face][2][1] = temp[1][2]
	cubeState[face][2][2] = temp[0][2]
}

function F() {
	rotateFaceClockwise('front')
	const temp = cubeState.top[2].slice()
	cubeState.top[2] = cubeState.left.map(row => row[2]).reverse()
	cubeState.left.forEach((row, i) => (row[2] = cubeState.bottom[0][i]))
	cubeState.bottom[0] = cubeState.right.map(row => row[0]).reverse()
	cubeState.right.forEach((row, i) => (row[0] = temp[i]))
	updateCubeVisuals()
}

function FPrime() {
	F()
	F()
	F()
}

function R() {
	rotateFaceClockwise('right')
	const temp = cubeState.top.map(row => row[2])
	cubeState.top.forEach((row, i) => (row[2] = cubeState.front[i][2]))
	cubeState.front.forEach((row, i) => (row[2] = cubeState.bottom[i][2]))
	cubeState.bottom.forEach((row, i) => (row[2] = cubeState.back[2 - i][0]))
	cubeState.back.forEach((row, i) => (row[0] = temp[2 - i]))
	updateCubeVisuals()
}

function RPrime() {
	R()
	R()
	R()
}

function U() {
	rotateFaceClockwise('top')
	const temp = cubeState.front[0].slice()
	cubeState.front[0] = cubeState.right[0]
	cubeState.right[0] = cubeState.back[0]
	cubeState.back[0] = cubeState.left[0]
	cubeState.left[0] = temp
	updateCubeVisuals()
}

function UPrime() {
	U()
	U()
	U()
}

function L() {
	rotateFaceClockwise('left')
	const temp = cubeState.top.map(row => row[0])
	cubeState.top.forEach((row, i) => (row[0] = cubeState.back[2 - i][2]))
	cubeState.back.forEach((row, i) => (row[2] = cubeState.bottom[2 - i][0]))
	cubeState.bottom.forEach((row, i) => (row[0] = cubeState.front[i][0]))
	cubeState.front.forEach((row, i) => (row[0] = temp[i]))
	updateCubeVisuals()
}

function LPrime() {
	L()
	L()
	L()
}

function B() {
	rotateFaceClockwise('back')
	const temp = cubeState.top[0].slice()
	cubeState.top[0] = cubeState.right.map(row => row[2])
	cubeState.right.forEach((row, i) => (row[2] = cubeState.bottom[2][2 - i]))
	cubeState.bottom[2] = cubeState.left.map(row => row[0]).reverse()
	cubeState.left.forEach((row, i) => (row[0] = temp[i]))
	updateCubeVisuals()
}

function BPrime() {
	B()
	B()
	B()
}

function D() {
	rotateFaceClockwise('bottom')
	const temp = cubeState.front[2].slice()
	cubeState.front[2] = cubeState.left[2]
	cubeState.left[2] = cubeState.back[2]
	cubeState.back[2] = cubeState.right[2]
	cubeState.right[2] = temp
	updateCubeVisuals()
}

function DPrime() {
	D()
	D()
	D()
}

function M() {
	const temp = cubeState.top.map(row => row[1])
	cubeState.top.forEach((row, i) => (row[1] = cubeState.back[2 - i][1]))
	cubeState.back.forEach((row, i) => (row[1] = cubeState.bottom[2 - i][1]))
	cubeState.bottom.forEach((row, i) => (row[1] = cubeState.front[i][1]))
	cubeState.front.forEach((row, i) => (row[1] = temp[i]))
	updateCubeVisuals()
}

function MPrime() {
	M()
	M()
	M()
}

function E() {
	const temp = cubeState.front[1].slice()
	cubeState.front[1] = cubeState.left[1]
	cubeState.left[1] = cubeState.back[1]
	cubeState.back[1] = cubeState.right[1]
	cubeState.right[1] = temp
	updateCubeVisuals()
}

function EPrime() {
	E()
	E()
	E()
}

function S() {
	const temp = cubeState.top[1].slice()
	cubeState.top[1] = cubeState.left.map(row => row[1]).reverse()
	cubeState.left.forEach((row, i) => (row[1] = cubeState.bottom[1][i]))
	cubeState.bottom[1] = cubeState.right.map(row => row[1]).reverse()
	cubeState.right.forEach((row, i) => (row[1] = temp[i]))
	updateCubeVisuals()
}

function SPrime() {
	S()
	S()
	S()
}

function rotateCube(x, y) {
	cube.style.transition = 'transform 1s ease-in-out'
	cube.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`
}

document.addEventListener('keydown', event => {
	switch (event.key) {
		case 'ArrowUp':
			rotateUp()
			break
		case 'ArrowDown':
			rotateDown()
			break
		case 'ArrowLeft':
			rotateLeft()
			break
		case 'ArrowRight':
			rotateRight()
			break
		case 'f':
			F()
			break
		case 'F':
			FPrime()
			break
		case 'r':
			R()
			break
		case 'R':
			RPrime()
			break
		case 'u':
			U()
			break
		case 'U':
			UPrime()
			break
		case 'l':
			L()
			break
		case 'L':
			LPrime()
			break
		case 'b':
			B()
			break
		case 'B':
			BPrime()
			break
		case 'd':
			D()
			break
		case 'D':
			DPrime()
			break
		case 'm':
			M()
			break
		case 'M':
			MPrime()
			break
		case 'e':
			E()
			break
		case 'E':
			EPrime()
			break
		case 's':
			S()
			break
		case 'S':
			SPrime()
			break
	}
})

function rotateUp() {
	currentX -= 90
	rotateCube(currentX, currentY)
}

function rotateDown() {
	currentX += 90
	rotateCube(currentX, currentY)
}

function rotateLeft() {
	currentY -= 90
	rotateCube(currentX, currentY)
}

function rotateRight() {
	currentY += 90
	rotateCube(currentX, currentY)
}
function angle(x, y) {
	currentX = x
	currentY = y
	rotateCube(currentX, currentY)
}

updateCubeVisuals()
