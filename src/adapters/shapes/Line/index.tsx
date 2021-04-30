import { fabric } from "fabric"
import Canvas from "../../../adapters/Canvas"
import Arrow from '../../../adapters/shapes/Arrow'
import store from '../../../redux/store'

interface ILineDrawn {
	nodeSrc: number;
	nodeDest: number;
	line: fabric.Line | Arrow;
}

interface lineArguments {
	coordenades: number[];
	lineOptions ? : fabric.ILineOptions;
}

interface FabricEventHandler {
	(event:fabric.IEvent):void
}

class LineDrawer {
	_line: fabric.Line | Arrow = new fabric.Line([0, 0, 0, 0])
	_canvas: Canvas | null = null;
	_draggingLineOnNode: boolean = false;
	_isDrawing: boolean = false;
	_useArrow: boolean = false;
	_mouseDownHandler: FabricEventHandler | undefined;
	_mouseMoveHandler: FabricEventHandler | undefined;
	_mouseUpHandler: FabricEventHandler | undefined;
	lines: (fabric.Line | Arrow)[] = [];

	constructor(canvas: Canvas) {
		this.setCanvas(canvas);
		this._mouseDownHandler = this._onMouseDown;
		this._mouseMoveHandler = this._onMouseMove;
		this._mouseUpHandler = this._onMouseUp;
	}

	setCanvas = (canvas: Canvas) => {
		this._canvas = canvas
	}

	setDrawingEvents = () => {
		this._canvas!.on("mouse:down", this._mouseDownHandler as FabricEventHandler)
		this._canvas!.on("mouse:move", this._mouseMoveHandler as FabricEventHandler)
		this._canvas!.on("mouse:up", this._mouseUpHandler as FabricEventHandler)
	}

	removeDrawingEvents = () => {
		this._canvas!.off("mouse:down", this._mouseDownHandler)
		this._canvas!.off("mouse:move", this._mouseMoveHandler)
		this._canvas!.off("mouse:up", this._mouseUpHandler)
	}

	useArrow = (useArrow: boolean) => {
		this._useArrow = useArrow
		this.lines = []
	}

	on = (
		eventName:'mouse:down' | 'mouse:move' | 'mouse:up',
		callback:(event:fabric.IEvent,onMouse:FabricEventHandler)=>void
		)=>{
		switch(eventName){
			case 'mouse:down':
				this._mouseDownHandler = (e)=>callback(e,this._onMouseDown)
				break
			case 'mouse:move':
				this._mouseMoveHandler = (e) => callback(e,this._onMouseMove)
				break
			case 'mouse:up':
				this._mouseUpHandler = (e)=>callback(e,this._onMouseUp)
				break
		}
	}

	setLine(options: lineArguments) {
		const { coordenades, lineOptions } = options
		if (this._useArrow)
			this._line = new Arrow(coordenades, lineOptions || {})
		else
			this._line = new fabric.Line(coordenades, lineOptions || {})
	}

	getLine(){
		return this._line
	}

	_onMouseDown = (event: fabric.IEvent) => {
		const pointer = event.target as fabric.Object
		const lineCoordenades = [
			pointer.left || 0,
			pointer.top || 0,
			pointer.left || 0,
			pointer.top || 0
		]

		this.setLine({
			coordenades: lineCoordenades,
			lineOptions: {
				stroke: "black",
				strokeWidth: 3
			}
		})

		this._isDrawing = true;
		this._canvas!.add(this._line);
		this._canvas!.sendToBack(this._line)
	}

	_onMouseMove = (event: fabric.IEvent) => {
		if (!this._isDrawable()){
			return;
		}
		const pointer = event.pointer as fabric.Point;

		this._line.set({
			x2: pointer.x,
			y2: pointer.y
		}).setCoords();
		
		this._canvas!.renderAll()
	}

	_isDrawable = () => this._isDrawing && this._line && this._canvas && this._line

	_onMouseUp = (event: fabric.IEvent) => {
		this.lines.push(this._line)
		this._canvas!.renderAll()
		this.setLine({
			coordenades: [0, 0, 0, 0]
		})
		this._isDrawing = false
	}
}

export default LineDrawer