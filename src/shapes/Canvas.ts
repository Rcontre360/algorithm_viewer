import {fabric} from "fabric"

const canvas = new fabric.Canvas("main_canvas")

const canvasContainer = document.getElementById("canvas_container") as HTMLElement
const {clientWidth,clientHeight} = canvasContainer

canvas.setWidth(clientWidth)
canvas.setHeight(clientHeight)

export {
	canvas
}