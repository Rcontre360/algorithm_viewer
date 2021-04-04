import {
	fabric
} from "fabric"

class LineDrawer {
	private line: fabric.Line = new fabric.Line([0, 0, 0, 0])
	private canvas: fabric.Canvas = new fabric.Canvas("")
	private draggingLineOnNode: boolean = false
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
		const originNode = event.target
		let isIntoNode = false
		if (!originNode) return isIntoNode
		if (!this.isDrawing) return !isIntoNode

		this.canvas.forEachObject(object => {
			console.log("object", object)
			if (originNode === object || !(object instanceof fabric.Circle))
				return
			if (object instanceof fabric.Circle) {
				if (this.line.intersectsWithObject(object))
					isIntoNode = true
			}
		})

		return isIntoNode
		//INTERSECTION
		// 	function onChange(options) {
		// 	options.target.setCoords();
		// 	canvas.forEachObject(function(obj) {
		// 		if (obj === options.target) return;
		// 		obj.set('opacity', options.target.intersectsWithObject(obj) ? 0.5 : 1);
		// 	});
		// }
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