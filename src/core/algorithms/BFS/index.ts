interface BFSOptions {
	startIndex: number;
}

export class BFS {
	static visited: boolean[] = [];
	static returnValue: GraphReturn[] = [];
	static queue: number[] = [];

	static start = (
		graph: GraphInterface < unknown > ,
		options: BFSOptions = {
			startIndex: 0,
		}
	) => {

		BFS.returnValue = []
		BFS.visited = new Array(graph.getNumberOfElements())
		BFS.visited.fill(false)
		BFS.BFS(graph, options)
		console.log(BFS.returnValue)
		return BFS.returnValue;
	}

	static BFS = (
		graph: GraphInterface < unknown > ,
		options: BFSOptions
	) => {
		const {
			startIndex,
		} = options
		let prevIndex = -1;

		BFS.queue.push(startIndex);

		while (BFS.queue.length > 0) {
			const currentNode = BFS.queue.pop() as number;

			BFS.visited[currentNode] = true
			BFS.returnValue.push({
				active: true,
				from: -1,
				to: currentNode,
			})
			prevIndex = currentNode

			BFS.visited[currentNode] = true
			const nodes = graph.getNodeConnections(currentNode);

			for (let i of nodes) {
				if (BFS.visited[i]) continue
				BFS.visited[i] = true
				BFS.returnValue.push({
					active: false,
					from: currentNode,
					to: i,
				})
				BFS.queue.push(i);
			}
		}
	}
}

export default BFS