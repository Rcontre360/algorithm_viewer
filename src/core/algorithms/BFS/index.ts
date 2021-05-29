interface BFSOptions {
	startIndex ? : number;
}

export interface BFSReturn extends GraphReturn {
	role: 'current' | 'pushed' | 'poped';
}

export class BFS implements AlgorithmHandler {
	visited: boolean[] = [];
	returnValue: BFSReturn[] = [];
	queue: ({ from: number, to: number })[] = [];

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

		this.queue.push({ to: startIndex, from: -1 });

		while (this.queue.length > 0) {
			const currentNode = this.queue.shift();

			this.visited[currentNode!.to] = true
			this.returnValue.push({
				role: 'current',
				from: currentNode!.from,
				to: currentNode!.to,
			})
			prevIndex = currentNode!.to

			const nodes = graph.getNodeConnections(currentNode!.to);

			for (let i of nodes) {
				if (this.visited[i]) continue
				this.visited[i] = true
				this.returnValue.push({
					role: 'pushed',
					from: currentNode!.to,
					to: i,
				})
				this.queue.push({ to: i, from: currentNode!.to });
			}

			this.returnValue.push({
				role: 'poped',
				from: currentNode!.from,
				to: currentNode!.to,
			})
		}
	}
}

export default BFS