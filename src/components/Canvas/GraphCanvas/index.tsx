import React, {useState,useEffect,MouseEvent} from 'react';
import {fabric} from 'fabric'
import produce from 'immer'
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
	srcNode?:NodeConfig,
	destNode?:NodeConfig,
	stroke?:string,
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

	function handleAddNode(event: MouseEvent) {
		const {x,y} = getRelativeCoordenades(event) 
		const newNode = {
			x:x,
			y:y,
			radius:nodeSize,
			id:`node-${nodes.length}`,
			fill:'green'
		}
		setNodesEdges(produce((prev: NodesEdges) => { prev.nodes.push(newNode) }))
		onAddNode(newNode.id)(dispatch)
	}

	function handleAddEdge(node:NodeConfig){
		const last = getLastEdge(edges)
		const points = last.points
		const {x,y} = node

		if (x!==points[0] && y!==points[1]){
			setNodesEdges(produce((prev: NodesEdges) => {
				const line = getLastEdge(prev.edges)
				line.points[2] = x
				line.points[3] = y
				line.destNode = node
			}))
			onAddEdge({src:last.srcNode!.id,dest:node.id})(dispatch)
		}
	}

	function updateCurrentLine(event:React.MouseEvent){
		setNodesEdges(produce((prev: NodesEdges) => {
			const { x, y } = getRelativeCoordenades(event)
			const points = getLastEdge(prev.edges).points
			points[2] = x
			points[3] = y
		}))
	}

	function getLastEdge(edges: EdgeConfig[]) {
		return edges[edges.length-1] || {destNode:true}
	}

	useEffect(()=>{
		setNodesEdges({nodes:[],edges:[]})
	},[directed])
 
	useEffect(()=>{
		if (running){
			console.log('speed',speed)
			output.forEach((val:any,i:number)=>{
				setTimeout(()=>{

					if (val.from === -1)
						return setNodesEdges(produce((prev: NodesEdges) => {
							prev.nodes[val.to] = produce(prev.nodes[val.to],(node:NodeConfig)=>{
								node.fill = 'red'
							})
						}))
					if (val.to === -1)
						return setNodesEdges(produce((prev: NodesEdges) => {
							prev.nodes[val.from] = produce(prev.nodes[val.from], (node: NodeConfig) => {
								node.fill = 'grey'
							})
						}))

					if (val.forward)
						setNodesEdges(produce((prev: NodesEdges) => {
							prev.nodes[val.from] = produce(prev.nodes[val.from], (node: NodeConfig) => {
								node.fill = 'yellow'
							})
							prev.nodes[val.to] = produce(prev.nodes[val.to], (node: NodeConfig) => {
								node.fill = 'red'
							})
						}))
					else
						setNodesEdges(produce((prev: NodesEdges) => {
							prev.nodes[val.from] = produce(prev.nodes[val.from], (node: NodeConfig) => {
								node.fill = 'grey'
							})
							prev.nodes[val.to] = produce(prev.nodes[val.to], (node: NodeConfig) => {
								node.fill = 'red'
							})
						}))

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

				if (id && id.includes('node')){
					handleAddEdge(attrs)
				}
				else
					setNodesEdges(produce((prev: NodesEdges) => { prev.edges.pop() }))
			}}
		>
			<Layer>
				{
					nodes.map((node: NodeConfig, i: number) => (
						<Circle
							key={i}
							onMouseDown={() => {
								setNodesEdges(produce((prev: NodesEdges) => {
									prev.edges.push({
										stroke: 'black',
										srcNode: node,
										points: [
											node.x,
											node.y,
											node.x,
											node.y
										]
									})
								}))
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