import {
	fabric
} from "fabric"

class LineDrawer {
	private line: fabric.Line | null = null
	private canvas: fabric.Canvas | null = null
	private isDrawing: boolean = false

	constructor(canvas: fabric.Canvas) {
		this.setCanvas(canvas)
	}

	setCanvas = (canvas: fabric.Canvas) => {
		this.canvas = canvas
	}

	setDrawingEvents = () => {
		if (!this.canvas) return
		this.canvas.on("mouse:down", this.addEdgesHandler)
		this.canvas.on("mouse:move", this.drawLineHandler)
		this.canvas.on("mouse:up", this.stopDrawing)
	}

	removeDrawingEvents = () => {
		if (!this.canvas) return
		this.canvas.off("mouse:down", this.addEdgesHandler)
		this.canvas.off("mouse:move", this.drawLineHandler)
		this.canvas.off("mouse:up", this.stopDrawing)
	}

	private addEdgesHandler = (event: fabric.IEvent) => {
		if (!this.canvas)
			return
		const pointer = event.pointer as fabric.Point
		const lineCoordenades = [
			pointer.x, pointer.y, pointer.x, pointer.y
		]
		this.line = new fabric.Line(lineCoordenades, {
			stroke: "black",
			strokeWidth: 3
		})
		this.isDrawing = true
		this.canvas.add(this.line)
	}

	private drawLineHandler = (event: fabric.IEvent) => {
		if (!this.isDrawing || !this.line)
			return
		const pointer = event.pointer as fabric.Point
		this.line.set({
			x2: pointer.x,
			y2: pointer.y
		}).setCoords();
		this.canvas.renderAll()
	}

	private stopDrawing = (event: fabric.IEvent) => {
		this.isDrawing = false
		if (this.line && this.canvas)
			this.canvas.add(this.line)
	}
}

export default LineDrawer