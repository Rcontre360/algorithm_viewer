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
import {onStopAlgorithm} from '../../../redux/actions'
import painters from '../../painters'

setAutoFreeze(false)

export interface NodeConfig{
	id: string;
	x:number;
	y: number;
	radius:number;
	fill?: string;
	shadowBlur?: number;
}

export interface EdgeConfig{
	points:[number,number,number,number],
	srcNode:number,
	destNode?:number,
	stroke:string,
}

export interface NodesEdges{
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

		if (x !== points[0] && y !== points[1]) {
			console.log('edge added', node)
			changeEdges(edges=>{
				const line = getLastEdge(edges)
				line.points[2] = x
				line.points[3] = y
				line.destNode = nodeId
			})
			onAddEdge({src:last.srcNode,dest:nodeId})(dispatch)
		} else {
			changeEdges(edges => { edges.pop() })
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

	useEffect(()=>{
		setNodesEdges({nodes:[],edges:[]})
	},[directed])
 
	useEffect(()=>{
		if (running){
			painters[name]({
				output,
				changeNodesEdges,
				speed
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
			</Layer>
		</Stage>
	}
	</div>
  )
}

export default Canvas;