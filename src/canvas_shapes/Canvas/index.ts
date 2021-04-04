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
	private drawer: lineDrawer = new lineDrawer(this)

	constructor(canvasId: string, canvasContainerId: string) {
		super(canvasId)
		const canvasContainer = document.getElementById("canvas_container") as HTMLElement;

		if (!canvasContainer)
			return

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
		this.drawer.removeDrawingEvents()
	}

	forbidAddNode = (allowAddEdges ? : boolean) => {
		this.off("mouse:down", this.addNodeHandler)
		if (allowAddEdges && this.drawer)
			this.drawer.setDrawingEvents()
	}

	isMouseIntoNode = (event: fabric.IEvent): boolean => {
		let isIntoNode = false
		this.handleObjectsUnderMouse(event, (object: fabric.Object) => {
			isIntoNode = object instanceof fabric.Circle
		})
		return isIntoNode
	}

	getNodeUnderMouse = (event: fabric.IEvent): fabric.Circle | null => {
		let nodeUnderMouse = null
		this.handleObjectsUnderMouse(event, (object: fabric.Object) => {
			nodeUnderMouse = object
		})
		return nodeUnderMouse
	}

	private handleObjectsUnderMouse = (event: fabric.IEvent, handler: Function): void => {
		const pointer = event.pointer as fabric.Point
		const mockCircle = new fabric.Circle({
			top: pointer.y,
			left: pointer.x,
			radius: 1,
		})

		this.forEachObject(object => {
			if (object instanceof fabric.Circle) {
				if (mockCircle.intersectsWithObject(object))
					handler(object)
			}
		})
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
			originX: "center",
			originY: "center"
		})
		this.add(circle)
	}

}

export {
	Canvas
}