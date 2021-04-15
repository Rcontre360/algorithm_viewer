import { fabric } from "fabric"
import lineDrawer from "./lineDrawer"
import { GraphCase, DFS } from "../../core"

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

	protected isMouseIntoObject = (event: fabric.IEvent, instance: "Circle" | "Object" | "Line" | "Rect"): fabric.Object | undefined => {

		const pointer = event.pointer as fabric.Point
		let mockOject: fabric.Object;

		if (instance === 'Line')
			mockOject = new fabric[instance]([pointer.x, pointer.y, pointer.x, pointer.y])
		else
			mockOject = new fabric[instance]({
				top: pointer.y,
				left: pointer.x,
			})

		const objectUnderMouse = this.getObjectsIntersect(mockOject,
			(obj: fabric.Object) => obj instanceof fabric[instance]
		)

		return objectUnderMouse[0]
	}

	private getObjectsIntersect = (object: fabric.Object, condition ? : Function): fabric.Object[] => {

		const objIntersect: fabric.Object[] = []

		this.forEachObject(obj => {
			if (object.intersectsWithObject(obj)) {
				if (condition) {
					if (condition(obj))
						objIntersect.push(obj)
				} else {
					objIntersect.push(obj)
				}
			}
		})

		return objIntersect
	}

}

interface IGraphCanvasArgs {
	canvasId: string;
	containerId: string;
	nodeStyles: INodeStyles;
	edgeStyles: IEdgeStyles
}

interface INodeStyles {
	unactive: fabric.ICircleOptions;
	active: fabric.ICircleOptions;
	visited: fabric.ICircleOptions;
}

interface IEdgeStyles {
	unactive: fabric.ILineOptions;
	active: fabric.ICircleOptions;
	visited: fabric.ICircleOptions;
}

const defaultNodeStyles: INodeStyles = {
	unactive: {
		fill: "red",
		radius: 20,
		lockMovementX: true,
		lockMovementY: true,
		originX: "center",
		originY: "center",
	},
	active: {
		fill: "red",
		radius: 20,
		lockMovementX: true,
		lockMovementY: true,
		originX: "center",
		originY: "center",
	},
	visited: {
		fill: "red",
		radius: 20,
		lockMovementX: true,
		lockMovementY: true,
		originX: "center",
		originY: "center",
	}
}

const defaultEdgeStyles: IEdgeStyles = {
	unactive: {
		stroke: "black",
		strokeWidth: 3
	},
	active: {
		stroke: "black",
		strokeWidth: 3
	},
	visited: {
		stroke: "black",
		strokeWidth: 3
	}
}

class GraphCanvas extends BaseCanvas {

	private drawingLine: boolean = false
	private drawer: lineDrawer = new lineDrawer(this)
	private nodeStyles: INodeStyles = defaultNodeStyles
	private edgeStyles: IEdgeStyles = defaultEdgeStyles
	graph: GraphCase < fabric.Circle > | undefined;

	constructor(canvasOptions: IGraphCanvasArgs) {
		super(canvasOptions.canvasId, canvasOptions.containerId)
		this.graph = new GraphCase(DFS)
		this.drawer = new lineDrawer(this)
		if (canvasOptions.nodeStyles)
			this.nodeStyles = canvasOptions.nodeStyles
		if (canvasOptions.edgeStyles)
			this.edgeStyles = canvasOptions.edgeStyles
	}

	startAlgorithm = (options ? : unknown) => {
		const algorithmData = this.graph!.startAlgorithm(options)
		const lines = this.drawer.lines
		algorithmData.forEach((action, i) => {
			setTimeout(() => {

				if (action.forward) {
					(action.toData as fabric.Circle).set(this.nodeStyles.active)
					if (action.from !== -1)
						lines[action.edgeIndex].set(this.edgeStyles.active)
				} else {
					const style = this.nodeStyles.visited
					if (action.from !== -1) {
						(action.fromData as fabric.Circle).set(style)
					} else {
						(action.toData as fabric.Circle).set(style)
					}
					if (action.to !== -1)
						lines[action.edgeIndex].set(this.edgeStyles.visited)
				}

				this.renderAll()
			}, 800 * i)
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
		return Boolean(this.isMouseIntoObject(event, 'Circle'))
	}

	getNodeUnderMouse = (event: fabric.IEvent): fabric.Circle | undefined => {
		const test = this.isMouseIntoObject(event, 'Circle') as fabric.Circle | undefined
		return test;
	}

	private addNodeHandler = (event: fabric.IEvent) => {
		if (!this.graph!.canAddNode)
			return;

		const pointer = event.pointer as fabric.Point
		const circle = new fabric.Circle(this.nodeStyles.unactive)
		circle.set({
			top: pointer.y,
			left: pointer.x
		})
		this.graph!.addNode(circle)
		this.add(circle)
	}
}


export {
	GraphCanvas as Canvas,
}

export type {
	INodeStyles,
	IEdgeStyles,
}