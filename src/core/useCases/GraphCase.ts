import {
	Graph
} from '../data_structures/Graph'

export class GraphCase < T extends GraphType > {

	private onAddNode: Function | undefined;
	private onAddEdge: Function | undefined;
	private _canAddNode: boolean = false;
	private _canAddEdge: boolean = false;
	graph: GraphInterface < T > = new Graph();
	algorithm: GraphAlgorithm < unknown,
	unknown > | undefined;

	constructor(algorithm ? : GraphAlgorithm < unknown, unknown > , onActions ? : {
		onAddNode ? : Function,
		onAddEdge ? : Function
	}) {
		if (algorithm)
			this.algorithm = algorithm
		if (onActions) {
			this.onAddEdge = onActions.onAddEdge
			this.onAddNode = onActions.onAddNode
		}
	}

	get canAddNode() {
		return this._canAddNode
	}

	get canAddEdge() {
		return this._canAddEdge
	}

	set canAddEdge(value: boolean) {
		if (value === true)
			this._canAddNode = false
		this._canAddEdge = value
	}

	set canAddNode(value: boolean) {
		if (value === true)
			this._canAddEdge = false
		this._canAddNode = value
	}

	addNode(object: T) {
		if (this._canAddNode) {
			if (this.onAddNode)
				this.onAddNode()
			this.graph.addNode(object)
		}
	}

	addEdge(src: number | T, dest: number | T) {
		if (this._canAddEdge) {
			if (this.onAddEdge)
				this.onAddEdge()
			this.graph.connectNodes(src, dest)
		}
	}

	startAlgorithm(options: unknown) {
		return this.algorithm!(this.graph, options)
	}

};