import {
	fabric
} from "fabric"
import {
	Canvas
} from "./index"

interface ILineDrawn {
	nodeSrc: number;
	nodeDest: number;
	line: fabric.Line;
}

class LineDrawer {
	private line: fabric.Line = new fabric.Line([0, 0, 0, 0])
	private canvas: Canvas | null = null;
	private draggingLineOnNode: boolean = false;
	private isDrawing: boolean = false;
	readonly lines: fabric.Line[] = [];

	constructor(canvas: Canvas) {
		this.setCanvas(canvas)
	}

	setCanvas = (canvas: Canvas) => {
		this.canvas = canvas
	}

	setDrawingEvents = () => {
		this.canvas!.on("mouse:down", this.addEdgesHandler)
		this.canvas!.on("mouse:move", this.drawLineHandler)
		this.canvas!.on("mouse:up", this.stopDrawing)
	}

	removeDrawingEvents = () => {
		this.canvas!.off("mouse:down", this.addEdgesHandler)
		this.canvas!.off("mouse:move", this.drawLineHandler)
		this.canvas!.off("mouse:up", this.stopDrawing)
	}

	private addEdgesHandler = (event: fabric.IEvent) => {
		if (!this.canvas!.isMouseIntoNode(event))
			return

		const pointer = event.target as fabric.Object
		const lineCoordenades = [
			pointer.left || 0,
			pointer.top || 0,
			pointer.left || 0,
			pointer.top || 0
		]
		this.line = new fabric.Line(lineCoordenades, {
			stroke: "black",
			strokeWidth: 3
		})

		this.isDrawing = true;
		this.canvas!.add(this.line);
		this.canvas!.sendToBack(this.line)
	}

	private getNodeUnderMouse = (event: fabric.IEvent): fabric.Object => {
		return new fabric.Object({})
	}

	private drawLineHandler = (event: fabric.IEvent) => {
		if (!this.isDrawable())
			return;
		const pointer = event.pointer as fabric.Point;

		this.line.set({
			x2: pointer.x,
			y2: pointer.y
		}).setCoords();
		this.canvas!.renderAll()
	}

	private isDrawable = (): boolean => Boolean(this.isDrawing && this.line && this.canvas && this.line)

	private stopDrawing = (event: fabric.IEvent) => {
		if (!this.canvas!.isMouseIntoNode(event)) {
			this.canvas!.remove(this.line)
			this.line.set({
				stroke: "transparent",
			})
			this.canvas!.renderAll()
			return
		}

		const nodeOrigin: fabric.Circle = event.target as fabric.Circle
		const nodeDestiny: fabric.Circle = this.canvas!.getNodeUnderMouse(event) as fabric.Circle

		this.line.set({
			x2: nodeDestiny.left,
			y2: nodeDestiny.top,
			lockMovementX: true,
			lockMovementY: true,
		}).setCoords();

		this.lines.push(this.line)
		this.canvas!.graph!.addEdge(nodeOrigin, nodeDestiny)
		this.canvas!.renderAll()
		this.line = new fabric.Line([0, 0, 0, 0])
		this.isDrawing = false
	}
}

export default LineDrawer