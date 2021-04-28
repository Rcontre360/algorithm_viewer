import { fabric } from "fabric"
import Canvas from "@adapters/Canvas/BaseCanvas"
import Arrow from '@adapters/shapes/Arrow'
import store from '@redux/store'
import { addEdge } from '@redux/actions'

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
		this.canvas!.on("mouse:down", this._addEdgesHandler)
		this.canvas!.on("mouse:move", this._drawLineHandler)
		this.canvas!.on("mouse:up", this._stopDrawing)
	}

	removeDrawingEvents = () => {
		this.canvas!.off("mouse:down", this._addEdgesHandler)
		this.canvas!.off("mouse:move", this._drawLineHandler)
		this.canvas!.off("mouse:up", this._stopDrawing)
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

	_addEdgesHandler = (event: fabric.IEvent) => {
		if (!this.canvas!.isMouseIntoObject(event, 'Circle'))
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

	_getNodeUnderMouse = (event: fabric.IEvent): fabric.Object => {
		return new fabric.Object({})
	}

	_drawLineHandler = (event: fabric.IEvent) => {
		if (!this._isDrawable())
			return;
		const pointer = event.pointer as fabric.Point;

		this._line.set({
			x2: pointer.x,
			y2: pointer.y
		}).setCoords();

		this.canvas!.renderAll()
	}

	_isDrawable = (): boolean => Boolean(this.isDrawing && this._line && this.canvas && this._line)

	_stopDrawing = (event: fabric.IEvent) => {
		if (!this.canvas!.isMouseIntoObject(event, 'Circle')) {
			this.canvas!.remove(this._line)
			this._line.set({
				stroke: "transparent",
			})
			this.canvas!.renderAll()
			return
		}

		const nodeOrigin: fabric.Circle = event.target as fabric.Circle
		const nodeDestiny: fabric.Circle = this.canvas!.isMouseIntoObject(event, 'Circle') as fabric.Circle
		let x = nodeDestiny.left as number
		let y = nodeDestiny.top as number
		const radius = nodeDestiny.radius as number

		if (this._useArrow) {
			const arrowCoords = this._getCircleLineIntersection(this._line, nodeDestiny)
			x = arrowCoords.x
			y = arrowCoords.y
		}

		this._line.set({
			x2: (x as number),
			y2: (y as number),
			lockMovementX: true,
			lockMovementY: true,
		}).setCoords();

		this.lines.push(this._line)
		addEdge({ src: nodeOrigin, dest: nodeDestiny })(store.dispatch)
		this.canvas!.renderAll()
		this.line = {
			coordenades: [0, 0, 0, 0]
		}
		this.isDrawing = false
	}

	_getCircleLineIntersection = (line: fabric.Line | Arrow, circle: fabric.Circle) => {
		const x1 = line.x1 as number,
			y1 = line.y1 as number,
			x2 = circle.left as number,
			y2 = circle.top as number;
		let radius = circle.radius as number;

		const angle = (y1 - y2) / (x1 - x2)
		const powAngle = Math.pow(angle, 2)

		if (x2 < x1) {
			radius *= -1
			console.log('minus')
		}

		console.log(Math.atan(angle) * 180 / Math.PI);
		const intersectionX = x2 - (radius / Math.sqrt(1 + powAngle));

		const intersectionY = angle * (intersectionX - x2) + y2

		return { x: intersectionX, y: intersectionY }
	}
}

export default LineDrawer