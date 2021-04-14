type GraphOptionsKeys = keyof GraphOptions < GraphType >

	interface GraphOptions < T extends GraphType > {
		onConnect(...nodeUserArguments: T[]): void,
		onAddNode(...nodeUserArguments: T[]): void
	}

class Graph < T extends GraphType > implements GraphInterface < T > {
	private nodes: number[][] = []
	private nodeData: T[] = []
	private numberOfElements: number = 0
	private options: GraphOptions < T > = {
		onConnect: () => 1,
		onAddNode: () => 1
	}

	constructor(nodes ? : number[][], nodeData ? : T[], options ? : GraphOptions < T > ) {
		if (nodes && nodeData) {
			this.numberOfElements = nodes.length
			this.nodes = [...nodes]
			this.nodeData = [...nodeData]

			if (options)
				this.options = { ...this.options,
					...options
				}
			this.applyOnConnect()
		}
	}

	setGraphOptions(newOptions: GraphOptions < T > | Function) {
		if (newOptions instanceof Function)
			this.options = newOptions(this.options)
		else
			this.options = newOptions
	}

	addNode(nodeAdded: T): void {
		this.applyOptions("onAddNode", nodeAdded)
		this.numberOfElements++;
		this.nodeData.push(nodeAdded)
		this.nodes.push([])
	}

	connectNodes(nodeSource: number | T, nodeDest: number | T): void {
		nodeSource = this.getNodeNumber(nodeSource)
		nodeDest = this.getNodeNumber(nodeDest)

		const sourceData = this.nodeData[nodeSource]
		const destData = this.nodeData[nodeDest]
		this.applyOptions("onConnect", sourceData, destData)

		this.nodes[nodeSource].push(nodeDest)
		this.nodes[nodeDest].push(nodeSource)
	}

	deleteNode(nodeDeleted: number): void {
		if (this.numberOfElements <= nodeDeleted)
			return
		const filterFunction = (nodeConnections: number[] | T | number, index: number) => index !== nodeDeleted

		this.nodes.filter(filterFunction)
		this.nodes.forEach((nodeConnections, index) => {
			if (nodeConnections)
				this.nodes[index] = nodeConnections.filter(filterFunction)
		})
		this.nodeData = this.nodeData.filter(filterFunction)

		this.numberOfElements--
	}

	getNodeData(nodeIndex: number): T {
		return this.nodeData[nodeIndex]
	}

	getNodeConnections(nodeIndex: number): number[] {
		return this.nodes[nodeIndex]
	}

	getNumberOfElements(): number {
		return this.numberOfElements
	}

	getAllNodeData(): T[] {
		return [...this.nodeData]
	}

	getAllNodeConnections(): number[][] {
		let nodeConnections: number[][] = []
		this.nodes.forEach(node => {
			nodeConnections.push([...node])
		})
		return nodeConnections
	}

	private getNodeNumber(object: T | number): number {
		if (object instanceof Number)
			return object as number
		return this.nodeData.findIndex(obj => obj === object)
	}

	private applyOnConnect() {
		this.nodes.forEach((connections, index) => {

			connections.forEach(nodeIndex => {
				const nodeSrc = this.nodeData[index]
				const nodeDest = this.nodeData[nodeIndex]

				this.applyOptions("onConnect", nodeSrc, nodeDest)
				this.applyOptions("onConnect", nodeDest, nodeSrc)
			})

		})
	}

	private applyOptions(type: GraphOptionsKeys, ...args: T[]) {
		if (this.options[type] instanceof Function)
			this.options[type](...args)
	}
}

export {
	Graph
}