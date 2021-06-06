interface DFSOptions {
	startIndex ? : number;
	previousIndex ? : number;
}

interface StateMapper{
	visited: boolean[];
	function: number;
	nodes: number[];
}

export interface DFSReturn extends GraphReturn {
	forward: boolean;
	state?: string[];
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
		const nodes: number[] = graph.getNodeConnections(startIndex)

		this.returnValue.push({
			forward: true,
			from: previousIndex,
			to: startIndex,
			state: this.stateParser({ nodes, function: startIndex, visited: this.visited })
		})

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
			to: previousIndex,
			state: this.stateParser({ nodes, function: startIndex, visited: this.visited })
		})
	}

	stateParser = (state:StateMapper)=>{
		return [
			`Array visited=[${state.visited.join(', ')}]`,
			`function dfs([${state.function}])`,
			`Array neighbours = [${state.nodes.join(', ')}]`,
		]
	}
}

export default DFS