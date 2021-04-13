interface DFSOptions {
	startIndex: number,
		previousIndex: number | undefined
}

let visited: boolean[] = []
let DFSreturn: GraphReturn[] = []

const deepFirstSearch = < T extends object > (graph: GraphInterface < T > , options: DFSOptions): void => {

	const {
		startIndex,
		previousIndex,
	} = options

	if (graph.getNumberOfElements() <= startIndex)
		return

	visited[startIndex] = true
	DFSreturn.push({
		forward: true,
		from: previousIndex,
		to: startIndex
	})

	const nodes: number[] = graph.getNodeConnections(startIndex)

	for (let i = 0; i < nodes.length; i++)
		if (!visited[nodes[i]])
			deepFirstSearch(graph, { ...options,
				startIndex: nodes[i],
				previousIndex: startIndex
			})

	DFSreturn.push({
		forward: false,
		from: startIndex,
		to: previousIndex
	})
}

const driverFunction = < T extends object > (
	graph: GraphInterface < T > ,
	options: DFSOptions = {
		startIndex: 0,
		previousIndex: -1
	}): GraphReturn[] => {

	DFSreturn = []
	visited = new Array(graph.getNumberOfElements())
	visited.fill(false)
	deepFirstSearch(graph, options)

	return DFSreturn
}

export {
	driverFunction as DFS
}