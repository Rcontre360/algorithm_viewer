
import {Graph} from "../structures"

let visited:boolean[] = []

const deepFirstSearch = <T>(graph: Graph<T>, startIndex: number, manipulateNodeData:Function): void => {

	if (graph.getNumberOfElements()<=startIndex)
		return
	visited[startIndex] = true

	manipulateNodeData(graph.getNodeData(startIndex),startIndex)

	const nodes:number[] = graph.getNodeConnections(startIndex)
	nodes.forEach((nodeIndex:number)=>{
		if (!visited[nodeIndex])
			deepFirstSearch(graph, nodeIndex, manipulateNodeData)
	})

}

const driverFunction = <T>(graph:Graph<T>,startIndex:number,manipulateNodeData:Function):void => {
	if (graph.getNumberOfElements()<= startIndex)
		return

	visited = new Array(graph.getNumberOfElements())
	visited.fill(false)
	deepFirstSearch(graph,startIndex,manipulateNodeData)
}

export {
	driverFunction as DFS
}
