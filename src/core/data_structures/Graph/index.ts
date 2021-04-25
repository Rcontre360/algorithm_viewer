type GraphOptionsKeys = keyof IGraphOptions < GraphType > ;

interface IGraphOptions < T extends GraphType > {
	onConnect(...nodeUserArguments: T[]): void,
	onAddNode(...nodeUserArguments: T[]): void
}

export class Graph < T extends GraphType > implements GraphInterface < T > {
	private nodes: number[][] = []
	private nodeData: T[] = []
	private size: number = 0
	private edges: IGraphEdge[] = [];
	private edgeQuantity: number = 0;
	private directed: boolean = false;
	private options: IGraphOptions < T > = {
		onConnect: () => 1,
		onAddNode: () => 1
	};

	constructor(nodes ? : number[][], nodeData ? : T[], options ? : IGraphOptions < T > ) {
		if (nodes && nodeData) {
			this.nodes = [...nodes]
			this.nodeData = [...nodeData]
			this.size = nodeData.length
			if (options)
				this.options = { ...this.options,
					...options
				}
			this.applyOnConnect()
		}
	}

	setGraphOptions = (newOptions: IGraphOptions < T > | Function) => {
		if (newOptions instanceof Function)
			this.options = newOptions(this.options)
		else
			this.options = newOptions
	}

	setDirected = (isDirected: boolean) => {
		this.directed = isDirected
	}

	addNode = (nodeAdded: T): void => {
		this.applyOptions("onAddNode", nodeAdded)
		this.size++;
		this.nodeData.push(nodeAdded)
		this.nodes.push([])
	}

	connectNodes = (nodeSource: number | T, nodeDest: number | T): void => {
		nodeSource = this.getNodeNumber(nodeSource)
		nodeDest = this.getNodeNumber(nodeDest)

		const sourceData = this.nodeData[nodeSource]
		const destData = this.nodeData[nodeDest]
		this.applyOptions("onConnect", sourceData, destData)

		this.edges.push({
			nodeSrc: nodeSource,
			nodeDest: nodeDest,
		})
		this.edgeQuantity++;
		this.nodes[nodeSource].push(nodeDest)
		if (!this.directed)
			this.nodes[nodeDest].push(nodeSource)
	}

	deleteNode = (nodeDeleted: number): void => {
		if (this.size <= nodeDeleted)
			return
		const filterFunction = (nodeConnections: number[] | T | number, index: number) => index !== nodeDeleted

		this.nodes = this.nodes.filter(filterFunction)
		this.nodes.forEach((nodeConnections, index) => {
			if (nodeConnections)
				this.nodes[index] = nodeConnections.filter(filterFunction)
		})
		this.nodeData = this.nodeData.filter(filterFunction)
		this.size--
	}

	getNodeData = (nodeIndex: number): T => {
		if (nodeIndex < 0 || nodeIndex >= this.size)
			throw new Error('You cannot access nodes out of scope')
		return this.nodeData[nodeIndex]
	}

	getNodeConnections = (nodeIndex: number): number[] => {
		return this.nodes[nodeIndex]
	}

	getNumberOfElements = (): number => {
		return this.size
	}

	getAllNodeData = (): T[] => {
		return [...this.nodeData]
	}

	getAllNodeConnections = (): number[][] => {
		let nodeConnections: number[][] = []
		this.nodes.forEach(node => {
			nodeConnections.push([...node])
		})
		return nodeConnections
	}

	getEdges = (): IGraphEdge[] => {
		return [...this.edges]
	}

	emptyGraph = () => {
		this.nodes = [];
		this.nodeData = [];
		this.size = 0;
		this.edges = [];
		this.edgeQuantity = 0;
		this.directed = true;
	}

	private getNodeNumber = (object: T | number): number => {
		if (typeof object === 'number')
			return object as number
		return this.nodeData.findIndex(obj => obj === object)
	}

	private applyOnConnect = () => {
		this.nodes.forEach((connections, index) => {

			connections.forEach(nodeIndex => {
				const nodeSrc = this.nodeData[index]
				const nodeDest = this.nodeData[nodeIndex]

				this.applyOptions("onConnect", nodeSrc, nodeDest)
				this.applyOptions("onConnect", nodeDest, nodeSrc)
			})

		})
	}

	private applyOptions = (type: GraphOptionsKeys, ...args: T[]) => {
		if (this.options[type] instanceof Function)
			this.options[type](...args)
	}
}

export default Graph