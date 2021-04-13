import {
	fabric
} from "fabric"
import lineDrawer from "./lineDrawer"
import {
	colorGraphNode
} from '../GraphNode'
import {
	GraphCase,
	DFS
} from "../../core"

class Canvas extends fabric.Canvas {

	private drawingLine: boolean = false
	private drawer: lineDrawer = new lineDrawer(this)
	graph: GraphCase < fabric.Circle > | undefined;

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

		this.graph = new GraphCase(DFS)
		this.drawer = new lineDrawer(this)
	}

	startAlgorithm = (options: unknown) => {
		const algorithmData: unknown = this.graph!.startAlgorithm(options)
		console.log('algorithmData', algorithmData)
	}

	allowAddNode = () => {
		this.graph!.canAddNode = true
		this.on("mouse:down", this.addNodeHandler)
		this.drawer.removeDrawingEvents()
	}

	allowAddEdge = () => {
		this.graph!.canAddEdge = true
		this.off("mouse:down", this.addNodeHandler)
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
		if (!this.graph!.canAddNode)
			return;
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
		this.graph!.addNode(circle)
		this.add(circle)
	}

}

export {
	Canvas
}