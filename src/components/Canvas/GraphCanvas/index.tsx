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
}

const Canvas = (props:React.HTMLAttributes<any>) => {
	const { 
		options: { directed, addNode, addEdge },
		algorithm:{name,dataStructure},
		output,
		running,
	} = useSelector(({graph,common})=>({...graph,...common}))

	const [nodes, setNodes] = useState<NodeConfig[]>([])
	const [edges, setEdges] = useState<EdgeConfig[]>([])
	const dispatch = useDispatch()
	const nodeSize = 20;

	function handleAddNode(event: MouseEvent) {
		const {x,y} = getRelativeCoordenades(event) 
		const newNode = {
			x:x,
			y:y,
			radius:nodeSize,
			id:`node-${nodes.length}`
		}
		setNodes(produce((prev:any)=>{prev.push(newNode)}))
		onAddNode(newNode.id)(dispatch)
	}

	function handleAddEdge(node:NodeConfig){
		const last = getLastEdge(edges)
		const points = last.points
		const {x,y} = node

		if (x!==points[0] && y!==points[1]){
			setEdges(produce((prev: any) => {
				const line = getLastEdge(prev)
				line.points[2] = x
				line.points[3] = y
				line.destNode = node
			}))
			onAddEdge({src:last.srcNode!.id,dest:node.id})(dispatch)
		}
	}

	function updateCurrentLine(event:React.MouseEvent){
		setEdges(produce((prev:any)=>{
			const { x, y } = getRelativeCoordenades(event)
			const points = getLastEdge(prev).points
			points[2] = x
			points[3] = y
		}))
	}

	function getLastEdge(edges: EdgeConfig[]) {
		return edges[edges.length-1] || {destNode:true}
	}

	useEffect(()=>{
		setNodes([])
	},[directed])

	useEffect(()=>{
		if (running){
			console.log(output)
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
					setEdges(produce(prev=>{prev.pop()}))
			}}
		>
			<Layer>
				{
					nodes.map((node: NodeConfig, i: number) => (
						<Circle
							key={i}
							onMouseDown={() => {
								setEdges(produce((prev: any) => {
									prev.push({
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
							fill={'green'}
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