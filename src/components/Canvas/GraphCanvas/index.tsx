import React, {useState,useEffect} from 'react';
import {fabric} from 'fabric'
import produce from 'immer'

import {onAddNode} from '../../../redux/actions'
import {useSelector,useDispatch} from '../../../redux/hooks'
import BaseCanvas from '../../../adapters/Canvas'
import LineDrawer from '../../../adapters/shapes/Line'
import {nodeStyles,edgeStyles} from '../../../components/shape_styles'
import {AlgorithmCaseReturn} from '../../../core/index'

const Canvas = (props:{}) => {
	const { 
		options: { directed, addNode, addEdge },
		output,
		running
	} = useSelector(({algorithm,common})=>({...algorithm,...common}))
	const dispatch = useDispatch()
	
	const [canvas,setCanvas] = useState<BaseCanvas>()

	function colorNodes(action: AlgorithmCaseReturn<fabric.Circle>){
		if (action.forward)
			colorNodesForward(action)
		else
			colorNodesBackward(action)
		canvas!.renderAll()
	}

	function colorNodesForward(action: AlgorithmCaseReturn<fabric.Circle>){
		const lines = canvas!.drawer!.lines;
		(action.toData as fabric.Circle).set(nodeStyles.active)
		if (action.from !== -1)
			lines[action.edgeIndex].set(edgeStyles.active)
	}

	function colorNodesBackward(action: AlgorithmCaseReturn<fabric.Circle>){
		const style = nodeStyles.visited
		const lines = canvas!.drawer!.lines
		if (action.from !== -1) {
			(action.fromData as fabric.Circle).set(style)
		} else {
			(action.toData as fabric.Circle).set(style)
		}
		if (action.to !== -1)
			lines[action.edgeIndex].set(edgeStyles.visited)
	}

	function addNodeHandler(event: fabric.IEvent){
		const pointer = event.pointer as fabric.Point
		const circle = new fabric.Circle(nodeStyles.unactive);
		circle.set({
			top: pointer.y,
			left: pointer.x
		});
		canvas!.add(circle)
		onAddNode(circle)(dispatch)
	}

	function onEdgeMouseDown(event: fabric.IEvent,onMouseDown:(event:fabric.IEvent)=>void) {
		if (!canvas!.isMouseIntoObject(event, 'Circle'))
			return
		onMouseDown(event)
	}

	function onEdgeMouseUp(event:fabric.IEvent,onMouseUp:(event:fabric.IEvent)=>void){
		if (!canvas!.isMouseIntoObject(event, 'Circle')) {
			canvas!.remove(canvas!.drawer!.getLine())
			canvas!.drawer!.getLine().set({
				stroke: "transparent",
			})
			canvas!.renderAll()
			return
		}

		const nodeOrigin: fabric.Circle = event.target as fabric.Circle
		const nodeDestiny: fabric.Circle = canvas!.isMouseIntoObject(event, 'Circle') as fabric.Circle
		let x = nodeDestiny.left as number
		let y = nodeDestiny.top as number
		const radius = nodeDestiny.radius as number

		if (directed) {
			const arrowCoords = canvas!.getCircleLineIntersection(canvas!.drawer!.getLine(), nodeDestiny)
			x = arrowCoords.x
			y = arrowCoords.y
		}

		canvas!.drawer!.getLine().set({
			x2: (x as number),
			y2: (y as number),
			lockMovementX: true,
			lockMovementY: true,
		}).setCoords();
		onMouseUp(event)
	}

	useEffect(()=>{
		const canvas = new BaseCanvas('main_canvas', 'canvas_container')
		canvas!.drawer!.on('mouse:down',onEdgeMouseDown)

		setCanvas(canvas)
	},[])

	useEffect(()=>{
		if (!canvas) return

		if (addNode){
			canvas!.on("mouse:down", addNodeHandler)
			canvas!.drawer!.removeDrawingEvents()
		} else
			canvas!.off('mouse:down',addNodeHandler)

		return () => {
			canvas!.off('mouse:down', addNodeHandler)
		}
	},[addNode,canvas])

	useEffect(()=>{
		if (addEdge && canvas){
			canvas!.off("mouse:down", addNodeHandler)
			canvas!.drawer!.setDrawingEvents()
		}
	},[addEdge,canvas])

	useEffect(()=>{
		if (!canvas) return
		canvas!.clear();
		canvas!.renderAll();
		canvas!.drawer!.useArrow(directed)
	},[directed,canvas])

	useEffect(()=>{
		if (running){
			//const lines = drawer.lines;
			(output as [object]).forEach((action: object, i) => {
				setTimeout(colorNodes, 800 * i, action)
			})
		}
	},[running])

  return (
  <div id='canvas_container'> 
		<canvas id="main_canvas" role='main-app'></canvas>
	</div>
  )
}

export default Canvas;