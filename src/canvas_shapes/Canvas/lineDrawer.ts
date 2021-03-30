import {fabric} from "fabric"

class LineDrawer {
	private static line: fabric.Line | null = null
	private static canvas: fabric.Canvas = new fabric.Canvas("")
	private static isDrawing: boolean = false

	static setCanvas(canvas:fabric.Canvas){
		this.canvas = canvas
	}

	static setDrawingEvents(){
		this.canvas.on("mouse:down", this.addEdgesHandler)
		this.canvas.on("mouse:move", this.drawLineHandler)
		this.canvas.on("mouse:up", event => {
			this.isDrawing = false
		})
	}

	private static addEdgesHandler(event: fabric.IEvent) {
		const pointer = event.pointer as fabric.Point
		const lineCoordenades = [
			pointer.x, pointer.y, pointer.x, pointer.y
		]
		this.line = new fabric.Line(lineCoordenades, {
			fill: "black",
			stroke: "red",
			strokeWidth: 10
		})
		this.isDrawing = true
		this.canvas.add(this.line)
	}

	private static drawLineHandler(event: fabric.IEvent) {
		if (!this.isDrawing || !this.line)
			return
		const pointer = event.pointer as fabric.Point
		this.line.set({
			x2: pointer.x,
			y2: pointer.y
		}).setCoords();
	}
}

export default LineDrawer