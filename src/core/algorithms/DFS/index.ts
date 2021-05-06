interface DFSOptions {
	startIndex: number;
	previousIndex: number;
}

export class DFS {
	static visited: boolean[] = [];
	static returnValue: GraphReturn[] = [];

	static start = (
		graph: GraphInterface < unknown > ,
		options: DFSOptions = {
			startIndex: 0,
			previousIndex: -1
		}
	) => {

		DFS.returnValue = []
		DFS.visited = new Array(graph.getNumberOfElements())
		DFS.visited.fill(false)
		DFS.DFS(graph, options)
		console.log(DFS.returnValue)
		return DFS.returnValue;
	}

	static DFS = (
		graph: GraphInterface < unknown > ,
		options: DFSOptions
	) => {
		const {
			startIndex,
			previousIndex,
		} = options

		if (graph.getNumberOfElements() <= startIndex)
			return

		DFS.visited[startIndex] = true
		DFS.returnValue.push({
			forward: true,
			from: previousIndex,
			to: startIndex
		})

		const nodes: number[] = graph.getNodeConnections(startIndex)

		for (let i = 0; i < nodes.length; i++)
			if (!DFS.visited[nodes[i]])
				DFS.DFS(graph, {
					...options,
					startIndex: nodes[i],
					previousIndex: startIndex
				})

		DFS.returnValue.push({
			forward: false,
			from: startIndex,
			to: previousIndex
		})
	}
}

export default DFS