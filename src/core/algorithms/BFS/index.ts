interface BFSOptions {
	startIndex ? : number;
}

export class BFS implements AlgorithmHandler {
	visited: boolean[] = [];
	returnValue: GraphReturn[] = [];
	queue: number[] = [];

	constructor() {}

	start = (
		graph: GraphInterface < unknown > ,
		options ? : BFSOptions
	) => {

		const startIndex = (options && options.startIndex) || 0

		this.returnValue = []
		this.visited = new Array(graph.getNumberOfElements())
		this.visited.fill(false)
		this.BFS(graph, { startIndex })
		return this.returnValue;
	}

	BFS = (
		graph: GraphInterface < unknown > ,
		options: { startIndex: number }
	) => {
		const {
			startIndex,
		} = options
		let prevIndex = -1;

		this.queue.push(startIndex);

		while (this.queue.length > 0) {
			const currentNode = this.queue.pop() as number;

			this.visited[currentNode] = true
			this.returnValue.push({
				active: true,
				from: -1,
				to: currentNode,
			})
			prevIndex = currentNode

			this.visited[currentNode] = true
			const nodes = graph.getNodeConnections(currentNode);

			for (let i of nodes) {
				if (this.visited[i]) continue
				this.visited[i] = true
				this.returnValue.push({
					active: false,
					from: currentNode,
					to: i,
				})
				this.queue.push(i);
			}
		}
	}
}

export default BFS