import React,{useEffect} from "react"
import {fabric} from "fabric"
import {Canvas} from "../shapes"

const App = ()=>{

	useEffect(()=>{
		const circle = new fabric.Circle({
			fill:"red",
			radius:20,
			top:100,
			left:100
		})
		const testCanvas = new Canvas("main_canvas","canvas_container")
		testCanvas.add(circle)
	},[])

	return (
	<div>
		<h1>from typescript react</h1>
		<div id="canvas_container">
			<canvas id="main_canvas"></canvas>
		</div>
	</div>
	)
}

export default App