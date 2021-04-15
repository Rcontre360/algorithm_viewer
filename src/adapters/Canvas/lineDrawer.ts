import { fabric } from "fabric"
import { Canvas } from "./index"
import Arrow from './Arrow'

interface ILineDrawn {
	nodeSrc: number;
	nodeDest: number;
	line: fabric.Line | Arrow;
}

interface lineArguments {
	coordenades: number[];
	lineOptions ? : fabric.ILineOptions;
}

class LineDrawer {
	private _line: fabric.Line | Arrow = new fabric.Line([0, 0, 0, 0])
	private canvas: Canvas | null = null;
	private draggingLineOnNode: boolean = false;
	private isDrawing: boolean = false;
	private _useArrow: boolean = false;
	lines: (fabric.Line | Arrow)[] = [];

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

	useArrow = (useArrow: boolean) => {
		this._useArrow = useArrow
		this.lines = []
	}

	private set line(options: lineArguments) {
		const { coordenades, lineOptions } = options
		if (this._useArrow)
			this._line = new Arrow(coordenades, lineOptions || {})
		else
			this._line = new fabric.Line(coordenades, lineOptions || {})
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

		this.line = {
			coordenades: lineCoordenades,
			lineOptions: {
				stroke: "black",
				strokeWidth: 3
			}
		}

		this.isDrawing = true;
		this.canvas!.add(this._line);
		this.canvas!.sendToBack(this._line)
	}

	private getNodeUnderMouse = (event: fabric.IEvent): fabric.Object => {
		return new fabric.Object({})
	}

	private drawLineHandler = (event: fabric.IEvent) => {
		if (!this.isDrawable())
			return;
		const pointer = event.pointer as fabric.Point;

		this._line.set({
			x2: pointer.x,
			y2: pointer.y
		}).setCoords();

		this.canvas!.renderAll()
	}

	private isDrawable = (): boolean => Boolean(this.isDrawing && this._line && this.canvas && this._line)

	private stopDrawing = (event: fabric.IEvent) => {
		if (!this.canvas!.isMouseIntoNode(event)) {
			this.canvas!.remove(this._line)
			this._line.set({
				stroke: "transparent",
			})
			this.canvas!.renderAll()
			return
		}

		const nodeOrigin: fabric.Circle = event.target as fabric.Circle
		const nodeDestiny: fabric.Circle = this.canvas!.getNodeUnderMouse(event) as fabric.Circle
		const x = nodeDestiny.left as number
		const y = nodeDestiny.top as number
		const radius = nodeDestiny.radius as number

		this._line.set({
			x2: (x as number),
			y2: (y as number),
			lockMovementX: true,
			lockMovementY: true,
		}).setCoords();

		//const angle = (y - (this._line.y1 as number)) / (x - (this._line.x1 as number))

		this.lines.push(this._line)
		this.canvas!.graph!.addEdge(nodeOrigin, nodeDestiny)
		this.canvas!.renderAll()
		this.line = {
			coordenades: [0, 0, 0, 0]
		}
		this.isDrawing = false
	}
}

export default LineDrawer