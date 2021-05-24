interface DFSOptions {
	startIndex ? : number;
	previousIndex ? : number;
}

export interface DFSReturn extends GraphReturn {
	forward: boolean;
}

export class DFS implements AlgorithmHandler {
	visited: boolean[] = [];
	returnValue: DFSReturn[] = [];

	start = (
		graph: GraphInterface < unknown > ,
		options ? : DFSOptions
	) => {

		const startIndex = (options && options.startIndex) || 0;
		const previousIndex = (options && options.previousIndex) || -1;

		this.returnValue = []
		this.visited = new Array(graph.getNumberOfElements())
		this.visited.fill(false)
		this.DFS(graph, { startIndex, previousIndex })

		return this.returnValue;
	}

	DFS = (
		graph: GraphInterface < unknown > ,
		options: { startIndex: number, previousIndex: number }
	) => {
		const {
			startIndex,
			previousIndex,
		} = options

		if (graph.getNumberOfElements() <= startIndex)
			return

		this.visited[startIndex] = true
		this.returnValue.push({
			forward: true,
			from: previousIndex,
			to: startIndex
		})

		const nodes: number[] = graph.getNodeConnections(startIndex)

		for (let i = 0; i < nodes.length; i++)
			if (!this.visited[nodes[i]])
				this.DFS(graph, {
					...options,
					startIndex: nodes[i],
					previousIndex: startIndex
				})

		this.returnValue.push({
			forward: false,
			from: startIndex,
			to: previousIndex
		})
	}
}

export default DFS