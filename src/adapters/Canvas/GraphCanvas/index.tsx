import { fabric } from "fabric"

import { GraphCase, AlgorithmCaseReturn } from "@core/index"
import lineDrawer from "@adapters/shapes/Line"
import Node from '@adapters/shapes/Node'
import { INodeStyles, IEdgeStyles, IGraphCanvasArgs } from '@adapters/interfaces'

import store, { InitialState } from '@redux/store'
import { addNode } from '@redux/actions'
import BaseCanvas from '@adapters/Canvas/BaseCanvas'

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

export class GraphCanvas extends BaseCanvas {

	private drawer: lineDrawer = new lineDrawer(this)
	private nodeStyles: INodeStyles = defaultNodeStyles
	private edgeStyles: IEdgeStyles = defaultEdgeStyles
	private _allowAddNode: boolean = false

	constructor(canvasOptions: IGraphCanvasArgs) {
		super(canvasOptions.canvasId, canvasOptions.containerId)
		store.subscribe(() => {
			const state: InitialState = store.getState()
			console.log(state, state.algorithm.options.addNode)
			if (state.algorithm.options.addNode && !this._allowAddNode) {
				this.allowAddNode()
				this._allowAddNode = true
				console.log('node')
			} else if (state.algorithm.options.addEdge && this._allowAddNode) {
				this.allowAddEdge()

				this._allowAddNode = false
				console.log('edge')
			} else if (state.common.running) {
				this.startAlgorithm(state.algorithm.output)
			}
		})

		this.setDirected(true)

		if (canvasOptions.nodeStyles)
			this.nodeStyles = canvasOptions.nodeStyles
		if (canvasOptions.edgeStyles)
			this.edgeStyles = canvasOptions.edgeStyles
	}

	startAlgorithm = (algorithmData: any[]) => {
		const lines = this.drawer.lines

		algorithmData.forEach((action: object, i) => {
			setTimeout(this.colorNodes, 800 * i, action)
		})
	}

	allowAddNode = () => {
		this.on("mouse:down", this.addNodeHandler)
		this.drawer.removeDrawingEvents()
	}

	allowAddEdge = () => {
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

	setDirected = (isDirected: boolean) => {
		this.clear();
		this.renderAll();
		this.drawer.useArrow(isDirected)
	}

	private colorNodes = (action: AlgorithmCaseReturn < fabric.Circle > ) => {
		if (action.forward)
			this.colorNodesForward(action)
		else
			this.coloNodesBackward(action)
		this.renderAll()
	}

	private colorNodesForward = (action: AlgorithmCaseReturn < fabric.Circle > ) => {
		const lines = this.drawer.lines;
		(action.toData as fabric.Circle).set(this.nodeStyles.active)
		if (action.from !== -1)
			lines[action.edgeIndex].set(this.edgeStyles.active)
	}

	private coloNodesBackward = (action: AlgorithmCaseReturn < fabric.Circle > ) => {
		const style = this.nodeStyles.visited
		const lines = this.drawer.lines
		if (action.from !== -1) {
			(action.fromData as fabric.Circle).set(style)
		} else {
			(action.toData as fabric.Circle).set(style)
		}
		if (action.to !== -1)
			lines[action.edgeIndex].set(this.edgeStyles.visited)
	}

	private addNodeHandler = (event: fabric.IEvent) => {
		console.log('node added')
		const pointer = event.pointer as fabric.Point
		const circle = new fabric.Circle(this.nodeStyles.unactive)
		circle.set({
			top: pointer.y,
			left: pointer.x
		})
		addNode(circle)(store.dispatch)
		this.add(circle)
	}
}


export default GraphCanvas