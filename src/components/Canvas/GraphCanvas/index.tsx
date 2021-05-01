import React, {useState,useEffect,MouseEvent} from 'react';
import {fabric} from 'fabric'
import produce from 'immer'
import ReactFlow,{
	addEdge as flowAddEdge,
	MiniMap,
	Controls,
	Background,
	Connection,
	Edge
} from 'react-flow-renderer';

import CustomNodes from '../../Nodes'
import {onAddNode,onAddEdge} from '../../../redux/actions'
import {useSelector,useDispatch} from '../../../redux/hooks'
import {AlgorithmCaseReturn} from '../../../core/index'

const Canvas = (props:React.HTMLAttributes<any>) => {
	const { 
		options: { directed, addNode, addEdge },
		output,
		running
	} = useSelector(({algorithm,common})=>({...algorithm,...common}))
	const [nodes, setNodes] = useState<any>([])
	const dispatch = useDispatch()

	function handleAddNode(event: MouseEvent) {
		const radius = 30
		const container = event.target as HTMLElement
		const rect = container.getBoundingClientRect();
		const x = event.clientX - rect.left - radius; 
		const y = event.clientY - rect.top - radius;  

		const newNode = {
			id: `node-${nodes.length}`,
			type:'graphNode',
			data: { label: 'Node' },
			position: { x, y },
			style: {
				width: radius,
				height: radius,
				borderRadius: '100%',
				border:'solid lightgrey 3px'
			}
		}
		setNodes(produce((prev:any)=>{prev.push(newNode)}))
		onAddNode(newNode.id)(dispatch)
	}

	function handleAddEdge(params:Connection | Edge<any>){
		setNodes((els:any)=>flowAddEdge(params, els));
		onAddEdge({src:params.source,dest:params.target})(dispatch)
	}

	useEffect(()=>{
		setNodes([])
		//if directed set arrows
	},[directed])

	useEffect(()=>{

	},[running])

  return (
  <div 
  	id='canvas_container' 
  	style={{width:'100%',height:'100%'}}
  	onClick={addNode?handleAddNode:()=>1}
  	role='main-app'
  	{...props}
  > 
		<ReactFlow 
			role='app-canvas'
			elements={nodes}
			onConnect={handleAddEdge}
			onElementClick={(event,element)=>console.log(element)}
			nodeTypes={CustomNodes}
		>
		</ReactFlow>
	</div>
  )
}

export default Canvas;