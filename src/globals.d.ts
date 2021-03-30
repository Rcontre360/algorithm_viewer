type GraphType = unknown

interface GraphInterface<T extends GraphType> {
	addNode(node:T):void,
	connectNodes(src:number,dest:number):void,
	deleteNode(node:number):void,

	getNodeData(node:number):T,
	getNodeConnections(node:number):number[],
	getNumberOfElements():number
}
