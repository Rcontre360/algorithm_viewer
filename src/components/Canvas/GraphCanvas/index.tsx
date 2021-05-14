import React, {useState,useEffect,MouseEvent} from 'react';
import {fabric} from 'fabric'
import produce, { setAutoFreeze } from 'immer'
import { Stage, Layer, Circle, Text, Line, Arrow } from 'react-konva';

import { getRelativeCoordenades } from '../../../utils'
import {
	onAddNode,
	onAddEdge,
	onSetAlgorithm,
	onSetDataStructure
} from '../../../redux/actions'
import {useSelector,useDispatch} from '../../../redux/hooks'
import {AlgorithmCaseReturn} from '../../../core/index'

setAutoFreeze(false)

interface NodeConfig{
	id: string;
	x:number;
	y: number;
	radius:number;
	fill?: string;
	shadowBlur?: number;
}

interface EdgeConfig{
	points:[number,number,number,number],
	srcNode:number,
	destNode?:number,
	stroke:string,
}

interface NodesEdges{
	nodes: NodeConfig[];
	edges: EdgeConfig[];
}

const Canvas = (props:React.HTMLAttributes<any>) => {
	const { 
		options: { directed, addNode, addEdge },
		algorithm:{name,dataStructure},
		output,
		running,
		speed,
	} = useSelector(({graph,common})=>({...graph,...common}))

	const [{ nodes, edges }, setNodesEdges] = useState<NodesEdges>({ nodes: [], edges: [] });
	const dispatch = useDispatch()
	const nodeSize = 20;

	function changeNodesEdges(handleData:(draft:NodesEdges)=>void){
		setNodesEdges(produce(nodesEdges=>{
			handleData(nodesEdges)
		}))
	}

	function changeNodes(handleData:(draft:NodeConfig[])=>void){
		changeNodesEdges(({nodes})=>handleData(nodes))
	}

	function changeEdges(handleData:(draft:EdgeConfig[])=>void){
		changeNodesEdges(({edges})=>handleData(edges))
	}

	function handleAddNode(event: MouseEvent) {
		const {x,y} = getRelativeCoordenades(event) 
		const newNode = {
			x:x,
			y:y,
			radius:nodeSize,
			id:`node-${nodes.length}`,
			fill:'green'
		}
		changeNodes(nodes => { nodes.push(newNode) })
		onAddNode(nodes.length)(dispatch)
	}

	function handleAddEdge(node:NodeConfig){
		const last = getLastEdge(edges)
		const nodeId = parseInt(node.id.split('-')[1]);
		const points = last.points
		const {x,y} = node

		if (x!==points[0] && y!==points[1]){
			changeEdges(edges=>{
				const line = getLastEdge(edges)
				line.points[2] = x
				line.points[3] = y
				line.destNode = nodeId
			})
			onAddEdge({src:last.srcNode,dest:nodeId})(dispatch)
		}
	}

	function updateCurrentLine(event:React.MouseEvent){
		changeEdges(edges=>{
			const { x, y } = getRelativeCoordenades(event)
			const points = getLastEdge(edges).points
			points[2] = x
			points[3] = y
		})
	}

	function getLastEdge(edges: EdgeConfig[]) {
		return edges[edges.length-1] || {destNode:true}
	}

	function findEdge(src:number,dest:number){
		const find = (src:number, dest:number) => 
			(edge:EdgeConfig) => edge.srcNode === src && edge.destNode === dest;

		if (directed)
			return edges[edges.findIndex(find(src,dest))];
		else 
			return edges[edges.findIndex(edge=>find(src,dest)(edge) || find(dest,src)(edge)
			)]
	}

	useEffect(()=>{
		setNodesEdges({nodes:[],edges:[]})
	},[directed])
 
	useEffect(()=>{
		if (running){
			console.log(output)
			output.forEach((val:any,i:number)=>{
				setTimeout(()=>{

					changeNodesEdges(({nodes,edges})=>{

						if (val.from === -1){
							return nodes[val.to].fill = 'red'
						}

						if (val.to===-1){
							return nodes[val.from].fill = 'grey'
						}

						const edge = findEdge(val.from, val.to);
						if (val.forward){
							if (edge)
								edge.stroke = 'orange'
							nodes[val.from].fill = 'yellow'
							nodes[val.to].fill = 'red'
						} else {
							if (edge)
								edge.stroke = 'grey'
							nodes[val.from].fill = 'grey'
							nodes[val.to].fill = 'red'
						}

					})

				},i*500);
			})
		}
	},[running])

	useEffect(()=>{
		onSetAlgorithm(name)(dispatch)
	},[name]);

	useEffect(() => {
		onSetDataStructure(dataStructure)(dispatch)
	}, [dataStructure]);

  return (
  <div 
  	data-testid='canvas_container' 
  	style={{width:'100%',height:'100%'}}
  	onClick={addNode?handleAddNode:()=>1}
  	role='main-app'
		onMouseMove={event => {
			if (getLastEdge(edges).destNode) return
			updateCurrentLine(event)
		}}
  	{...props}
  > 
	{process.env.NODE_ENV !== 'test'
		&&
		<Stage 
			width={window.innerWidth} 
			height={window.innerHeight}
			onMouseUp={({target})=>{
				if (!addEdge) return; 
				const {attrs} = target
				const {id} = attrs

				if (id && id.includes('node'))
					handleAddEdge(attrs)
				else 
					changeEdges(edges=>{edges.pop()})
			}}
		>
			<Layer>
				{
					nodes.map((node: NodeConfig, i: number) => (
						<Circle
							key={i}
							onMouseDown={() => {
								changeEdges(edges=>{
									edges.push({
										stroke: 'black',
										srcNode: i,
										points: [
											node.x,
											node.y,
											node.x,
											node.y
										]
									})
								})
							}}
							{...node}
						/>
					))
				}
				{
					edges.map((edge: EdgeConfig, i: number) => (
						directed ?
							<Arrow
								key={i}
								{...edge}
							/>
							:
							<Line
								key={i}
								{...edge}
							/>
					))
				}
			</Layer>
		</Stage>
	}
	</div>
  )
}

export default Canvas;