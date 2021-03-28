import {fabric} from "fabric"
import {Graph} from "./structures"

const graphArr = [
	[1,2],
	[0,2],
	[],
]
const graphData = [{name:"rafa"},{name:"fran"},{name:"yenny"}]
const myGraph:Graph<Object> = new Graph(graphArr,graphData)

myGraph.addNode({name:"new node"})
myGraph.connectNodes(0,3)
myGraph.connectNodes(1,3)
console.log(myGraph.nodeData)
console.log(myGraph.nodes)
myGraph.deleteNode(1)

console.log(myGraph.nodes)
console.log(myGraph.nodeData)
console.log(myGraph.getNodeData(3))

