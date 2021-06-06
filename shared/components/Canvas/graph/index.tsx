import React from 'react';
import {fabric} from 'fabric'
import produce, { setAutoFreeze } from 'immer'
import { Stage, Layer, Circle, Text, Line, Arrow } from 'react-konva';
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

import { getRelativeCoordenades,getCircleBorderPoint } from '@shared/utils'
import {
	onAddNode,
	onAddEdge,
	onSetAlgorithm,
	onSetDataStructure
} from '@shared/redux/actions'
import {useSelector,useDispatch} from '@shared/redux/hooks'
import {onStopAlgorithm} from '@shared/redux/actions'
import painters from '@shared/painters'

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

const Canvas = (props:React.HTMLAttributes<any> & {width:number,height:number}) => {
	
	const {width,height} = props
	const { 
		options: { directed, addNode, addEdge, data },
		algorithm:{name,dataStructure},
		output,
		running,
		speed,
	} = useSelector(({graph,common})=>({...graph,...common}))

	const [{ nodes, edges }, setNodesEdges] = React.useState<NodesEdges>({ nodes: [], edges: [] });
	const [isAddingEdge,setIsAddingEdge] = React.useState<boolean>(false)
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

	function handleAddNode(event: React.MouseEvent) {
		const {x,y} = getRelativeCoordenades(event) 
		const newNode = {
			x:x,
			y:y,
			radius:nodeSize,
			id:`node-${nodes.length}`,
			fill:green['300']
		}
		changeNodes(nodes => { nodes.push(newNode) })
		onAddNode(nodes.length)(dispatch)
	}

	function handleAddEdge(node:NodeConfig){
		const last = getLastEdge(edges)
		const nodeId = parseInt(node.id.split('-')[1]);
		onAddEdge({src:last.srcNode,dest:nodeId})(dispatch)
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

	const parseEdgesData = ({nodes,edges}:NodesEdges)=>{
		data.edges.forEach((edge:{nodeSrc:number,nodeDest:number})=>{
			const nodeSrc = nodes[edge.nodeSrc]
			const nodeDest = nodes[edge.nodeDest]
			const {x,y} = getCircleBorderPoint({
				radius:nodeDest.radius,
				center:nodeDest,
				point:nodeSrc,
			});
			const destinyPoints = directed?[x,y]:[nodeDest.x,nodeDest.y]

			edges.push({
				points: [nodeSrc.x, nodeSrc.y, destinyPoints[0],destinyPoints[1]],
				srcNode:edge.nodeSrc,
				destNode:edge.nodeDest,
				stroke:purple['300'],
			})
		})
	}

	React.useEffect(()=>{
		if (!data)
			return
		changeNodesEdges((nodesEdges)=>{
			const nodes = nodesEdges.nodes
			nodesEdges.edges = [];
			parseEdgesData(nodesEdges)
		})
	},[data && data.connections])

	React.useEffect(() => {
		setNodesEdges({ nodes: [], edges: [] })
	}, [directed])

	React.useEffect(() => {
		if (running) {
			painters[name]({
				output,
				changeNodesEdges,
				speed
			})
		}
	}, [running])

	React.useEffect(() => {
		onSetAlgorithm(name)(dispatch)
	}, [name]);

	React.useEffect(() => {
		onSetDataStructure(dataStructure)(dispatch)
	}, [dataStructure]);

	React.useEffect(() => {
		const removeEdge: any = (event: MouseEvent) => {
			if (!isAddingEdge) return;
			changeEdges(edges => { edges.pop() })
			setIsAddingEdge(false)
		}
		window.addEventListener('mouseup', removeEdge)
		return () => {
			window.removeEventListener('mouseup', removeEdge)
		}
	}, [isAddingEdge])

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
			width={width}
			height={height}
			onMouseUp={({target})=>{
				if (!isAddingEdge) return; 
				const {attrs} = target
				const {id,x,y} = attrs
				const points = getLastEdge(edges).points

				if (id && id.includes('node') && x !== points[0] && y !== points[1])
					handleAddEdge(attrs)
				else 
					changeEdges(edges=>{edges.pop()})
				setIsAddingEdge(false)
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
								if (!addEdge) return;
								setIsAddingEdge(true);
								changeEdges(edges=>{
									edges.push({
										stroke: purple['300'],
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