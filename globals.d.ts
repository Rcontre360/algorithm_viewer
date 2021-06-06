type AlgorithmSignature = 'bfs' | 'dfs';
type GraphType = unknown;
type StartAlgorithm = (graph: GraphInterface < unknown > , options ? : AlgorithmOptions) => GraphReturn[];

interface AlgorithmOptions {}

interface AlgorithmHandler {
	start: StartAlgorithm
}

interface GraphInterface < T extends GraphType > {
	addNode(node: T): void,
	connectNodes(src: number | T, dest: number | T): void,
	deleteNode(node: number): void,

	setDirected(isDirected: boolean),
	getNodeData(node: number): T,
	getNodeConnections(node: number): number[],
	getNumberOfElements(): number,
	getAllNodeConnections(): number[][],
	getAllNodeData(): T[],
	getEdges(): IGraphEdge[],
	emptyGraph(): void,
}

interface IGraphEdge {
	nodeSrc: number;
	nodeDest: number;
}

interface GraphReturn {
	from: number;
	to: number;
	edgeIndex ? : number;
	fromData ? : unknown;
	toData ? : unknown;
}