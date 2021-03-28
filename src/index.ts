import {fabric} from "fabric"
import {Graph} from "./structures"
import {DFS} from "./algorithms"
import {connectCircleNodes,canvas} from "./shapes"

const makeCircle = (left,top)=>{
	const c = new fabric.Circle({
		left: left,
		top: top,
		strokeWidth: 5,
		radius: 12,
		fill: '#fff',
		stroke: '#666'
	});
	c.hasControls = c.hasBorders = false;
	return c
}

const graphData = [
	makeCircle(200,200),
	makeCircle(300,100),
	makeCircle(400,200),
	makeCircle(200, 300),
	makeCircle(300, 300),
	makeCircle(400, 300),
]

const graphNodes = [
	[1,3,4,5],
	[0,2],
	[1],
	[0],
	[0],
	[0],
]

const myGraph = new Graph(graphNodes,graphData,{
	onConnect:connectCircleNodes(canvas)
})

const colorGraphNode = (nodeData,index)=>{
	setTimeout(()=>{
		nodeData.setOptions({
			strokeWidth: 5,
			fill: 'red',
			stroke: 'blue'
		})
		canvas.renderAll()
	},800*(index+1))
}

DFS(myGraph,{
	handleNodeData:colorGraphNode,
	startIndex:2
})

graphData.forEach((data,index)=>{
	data.label = index
	canvas.add(data)
})