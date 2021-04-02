import {
	fabric
} from "fabric"
import lineDrawer from "./lineDrawer"

interface CanvasInterface extends fabric.Canvas {
	allowAddNode(): void,
		forbidAddNode(): void
}

interface lineDrawerInterface {
	setCanvas(canvas: fabric.Canvas): void,
		setDrawingEvent(): void
}

class Canvas extends fabric.Canvas implements CanvasInterface {
	private drawingLine: boolean = false
	private drawer: lineDrawer | null = null

	constructor(canvasId: string, canvasContainerId: string) {
		super(canvasId)

		const canvasContainer = document.getElementById("canvas_container") as HTMLElement;
		const {
			clientWidth,
			clientHeight
		} = canvasContainer

		this.setDimensions({
			width: clientWidth,
			height: clientHeight
		})
		this.drawer = new lineDrawer(this)
	}

	allowAddNode = () => {
		this.on("mouse:down", this.addNodeHandler)
	}

	forbidAddNode = (allowAddEdges ? : boolean) => {
		this.off("mouse:down", this.addNodeHandler)
		if (allowAddEdges && this.drawer)
			this.drawer.setDrawingEvents()
	}

	private addNodeHandler = (event: fabric.IEvent) => {
		const pointer = event.pointer as fabric.Point
		const circle = new fabric.Circle({
			fill: "red",
			radius: 20,
			top: pointer.y,
			left: pointer.x,
			lockMovementX: true,
			lockMovementY: true,
		})
		this.add(circle)
	}
}

export {
	Canvas
}