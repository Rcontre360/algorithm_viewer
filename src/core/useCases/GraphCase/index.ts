import Graph from '../../../core/data_structures/Graph'

export interface AlgorithmCaseReturn < T > extends GraphReturn {
	fromData: T;
	toData: T;
	edgeIndex: number;
}

export class GraphCase < T extends GraphType > {

	static signature = 'graph'
	private onAddNode: Function | undefined;
	private onAddEdge: Function | undefined;
	private _canAddNode: boolean = false;
	private _canAddEdge: boolean = false;
	graph: GraphInterface < T > = undefined as any
	algorithm: GraphAlgorithm < unknown,
	unknown > | undefined;

	constructor(algorithm ? : GraphAlgorithm < unknown, GraphReturn[] > , onActions ? : {
		onAddNode ? : Function,
		onAddEdge ? : Function
	}) {
		this.graph = new Graph();
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

	addNode = (object: T) => {
		if (this._canAddNode) {
			if (this.onAddNode)
				this.onAddNode()
			this.graph.addNode(object)
		}
	}

	addEdge = (src: number | T, dest: number | T) => {
		if (this._canAddEdge) {
			if (this.onAddEdge)
				this.onAddEdge()
			this.graph.connectNodes(src, dest)
		}
	}

	getNodeData = (index: number): T => {
		return this.graph.getNodeData(index)
	}

	setDirected(isDirected: boolean) {
		this.graph.emptyGraph()
		this.graph.setDirected(isDirected)
	}

	setAlgorithm = (algorithm: GraphAlgorithm < unknown, GraphReturn[] > ) => {
		this.algorithm = algorithm
	}

	startAlgorithm = (algorithm: GraphAlgorithm < unknown, GraphReturn[] > , options ? : object) => {
		const algorithmData = algorithm!(this.graph, options) as GraphReturn[]
		const edges = this.graph.getEdges()

		return algorithmData.map(obj => this.parseReturnValue(obj, edges))
	}

	getGraphData = () => {
		return {
			connections: this.graph.getAllNodeConnections(),
			nodes: this.graph.getAllNodeData()
		}
	}

	private parseReturnValue = (obj: GraphReturn, edges: IGraphEdge[]) => {
		const newObject = { ...obj } as AlgorithmCaseReturn < T > ;

		if (obj.from >= 0)
			newObject.fromData = this.graph.getNodeData(obj.from)

		if (obj.to >= 0)
			newObject.toData = this.graph.getNodeData(obj.to)

		if (obj.from >= 0 && obj.to >= 0)
			newObject.edgeIndex = edges.findIndex(edge => this.isRightEdge({ ...edge }, obj))

		return newObject
	}

	private isRightEdge = (edge: IGraphEdge, node: GraphReturn) => {
		return (edge.nodeSrc === node.from && edge.nodeDest === node.to) || (edge.nodeSrc === node.to && edge.nodeDest === node.from)
	}

};

export default GraphCase