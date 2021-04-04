interface DFSOptions < T > {
	startIndex: number,
	handleNodeData ? (nodeData: T, index ? : number) : void
}

let visited: boolean[] = []

const deepFirstSearch = < T extends object > (graph: GraphInterface < T > , options: DFSOptions < T > ): void => {

	const {
		startIndex,
		handleNodeData,
	} = options

	if (graph.getNumberOfElements() <= startIndex)
		return
	visited[startIndex] = true

	if (handleNodeData instanceof Function)
		handleNodeData(graph.getNodeData(startIndex), startIndex)

	const nodes: number[] = graph.getNodeConnections(startIndex)
	console.log(`for ${startIndex} we have ${nodes}`)

	for (let i = 0; i < nodes.length; i++)
		if (!visited[nodes[i]])
			deepFirstSearch(graph, { ...options,
				startIndex: nodes[i]
			})
}

const driverFunction = < T extends object > (graph: GraphInterface < T > , options: DFSOptions < T > ): void => {

	options.startIndex = options.startIndex || 0

	visited = new Array(graph.getNumberOfElements())
	visited.fill(false)
	deepFirstSearch(graph, options)
}

export {
	driverFunction as DFS
}