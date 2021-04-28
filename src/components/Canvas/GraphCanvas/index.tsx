import React, {useEffect} from 'react';
import {fabric} from 'fabric'
import {useSelector} from '@redux/hooks'
import BaseCanvas from '@adapters/Canvas/BaseCanvas'
import LineDrawer from '@adapters/shapes/Line'
import {nodeStyles} from '@components/shape_styles'

const Canvas = (props:{}) => {
	const { directed, addNode, addEdge} = useSelector(({algorithm})=>({...algorithm.options}))
	let canvas:BaseCanvas
	let drawer:LineDrawer

	const addNodeHandler = (event: fabric.IEvent) => {
		const pointer = event.pointer as fabric.Point
		const circle = new fabric.Circle(nodeStyles.unactive);
		circle.set({
			top: pointer.y,
			left: pointer.x
		});
		//addNode(circle)(store.dispatch)
		canvas.add(circle)
	}

	useEffect(()=>{
		canvas = new BaseCanvas('main_canvas','canvas_container')
		drawer = new LineDrawer(canvas)
	},[])

	useEffect(()=>{
		if (addNode){
			canvas.on("mouse:down", addNodeHandler)
			drawer.removeDrawingEvents()
		} else
			canvas.off('mouse:down',addNodeHandler)

		return () => {
			canvas.off('mouse:down', addNodeHandler)
		}
	},[addNode])

	useEffect(()=>{
		if (addEdge){
			canvas.off("mouse:down", addNodeHandler)
			drawer.setDrawingEvents()
		}
	},[addEdge])

	useEffect(()=>{
		canvas.clear();
		canvas.renderAll();
		drawer.useArrow(directed)
	},[directed])

  return (
  <div id='canvas_container'> 
		<canvas id="main_canvas" role='main-app'></canvas>
	</div>
  )
}

export default Canvas;