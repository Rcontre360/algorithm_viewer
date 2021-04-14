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

class BaseCanvas extends fabric.Canvas {

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

		//this.drawer = new lineDrawer(this)
	}

	protected isMouseIntoObject = (event: fabric.IEvent, instance: "Circle" | "Object" | "Line" | "Rect"): fabric.Object | null => {

		let objectUnderMouse = null
		const pointer = event.pointer as fabric.Point
		let mockCircle: fabric.Object;

		if (instance === 'Line')
			mockCircle = new fabric[instance]([pointer.x, pointer.y, pointer.x, pointer.y])
		else
			mockCircle = new fabric[instance]({
				top: pointer.y,
				left: pointer.x,
			})

		this.getObjectsIntersect(mockCircle).forEach(obj => {
			if (obj instanceof fabric[instance])
				objectUnderMouse = obj
		})

		return objectUnderMouse
	}

	private getObjectsIntersect = (object: fabric.Object, condition ? : Function): fabric.Object[] => {
		const objIntersect: fabric.Object[] = []

		this.forEachObject(obj => {
			if (object.intersectsWithObject(obj)) {
				objIntersect.push(obj)
			}
		})

		return objIntersect
	}
}

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
		const algorithmData = this.graph!.startAlgorithm(options) as GraphReturn[]
		algorithmData.forEach((obj: any, index) => {
			if (obj.from >= 0)
				setTimeout(() => {
					const circle = this.graph!.getNodeData(obj.from);
					circle.setOptions({
						strokeWidth: 5,
						fill: 'blue',
						stroke: 'orange'
					})
					this.renderAll()
				}, 1000 * index)
		})
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