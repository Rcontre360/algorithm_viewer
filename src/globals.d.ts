type GraphType = unknown
type GraphOptionsKeys = keyof GraphOptions<GraphType>

interface GraphInterface<T extends GraphType> {
	addNode(node:T):void,
	connectNodes(src:number,dest:number):void,
	deleteNode(node:number):void,

	getNodeData(node:number):T,
	getNodeConnections(node:number):number[],
	getNumberOfElements():number
}

interface GraphOptions<T extends GraphType>{
  onConnect(...nodeUserArguments:T[]):void,
  onAddNode(...nodeUserArguments: T[]): void
}
