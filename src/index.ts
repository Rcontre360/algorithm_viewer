import {fabric} from "fabric"
import {Graph} from "./structures"
import {DFS} from "./algorithms"

const graphArr = [
	[1,2],
	[3,4],
	[],
	[],
	[]
]
const graphData = [{name:"rafa"},{name:"fran"},{name:"yenny"},{name:"rafa ramon"},{name:"katty"}]
const myGraph:Graph<Object> = new Graph(graphArr,graphData)

DFS(myGraph,0,(nodeData,index)=>{
	console.log(nodeData,index)
})

