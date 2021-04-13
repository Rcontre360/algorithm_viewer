type GraphType = unknown

interface GraphAlgorithm < Args, Ret > {
	(graph: GraphInterface, args: any): Ret;
}

interface GraphInterface < T extends GraphType > {
	addNode(node: T): void,
	connectNodes(src: number | T, dest: number | T): void,
	deleteNode(node: number): void,

	getNodeData(node: number): T,
	getNodeConnections(node: number): number[],
	getNumberOfElements(): number,
	getAllNodeConnections(): number[][],
	getAllNodeData(): T[]
}

interface GraphReturn {
	forward: boolean;
	from: number | undefined;
	to: number | undefined;
}