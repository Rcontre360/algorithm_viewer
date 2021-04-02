import {
	fabric
} from "fabric"

class LineDrawer {
	private line: fabric.Line = new fabric.Line([0, 0, 0, 0])
	private canvas: fabric.Canvas = new fabric.Canvas("")
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
		if (!this.isMouseIntoNode(event))
			return
		console.log("down", event)

		const pointer = event.pointer as fabric.Point
		const lineCoordenades = [
			pointer.x, pointer.y, pointer.x, pointer.y
		]
		this.line = new fabric.Line(lineCoordenades, {
			stroke: "black",
			strokeWidth: 3
		})
		this.isDrawing = true;
		this.canvas.add(this.line);
	}

	private isMouseIntoNode = (event: fabric.IEvent): boolean => {
		if (!((event.target as any) instanceof fabric.Circle))
			return false
		const {
			x: mouseX,
			y: mouseY
		} = event.pointer as fabric.Point
		const circle = event.target as fabric.Circle

		const circleX = circle.left || 0
		const circleY = circle.top || 0
		const radius = circle.radius || 0

		console.log(this.numberWithingRange(mouseX, circleX, radius) &&
			this.numberWithingRange(mouseY, circleY, radius))

		return (
			this.numberWithingRange(mouseX, circleX, radius) &&
			this.numberWithingRange(mouseY, circleY, radius)
		)
	}

	private numberWithingRange = (number: number, point: number, errorMargin: number): boolean => {
		return number >= point - errorMargin && number <= point + errorMargin
	}

	private drawLineHandler = (event: fabric.IEvent) => {
		if (!this.isDrawable())
			return;
		const pointer = event.pointer as fabric.Point;

		this.line.set({
			x2: pointer.x,
			y2: pointer.y
		}).setCoords();
		this.canvas.renderAll()
	}

	private isDrawable = (): boolean => Boolean(this.isDrawing && this.line && this.canvas && this.line)

	private stopDrawing = (event: fabric.IEvent) => {
		if (!this.isMouseIntoNode(event)) {
			this.canvas.remove(this.line)
			this.line.set({
				stroke: "transparent"
			})
			this.canvas.renderAll()
		}
		this.line = new fabric.Line([0, 0, 0, 0])
		this.isDrawing = false
	}
}

export default LineDrawer