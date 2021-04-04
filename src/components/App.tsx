import React,{useState,useEffect} from "react"
import { applyMiddleware, createStore } from 'redux'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import {fabric} from "fabric"
import { useSelector } from 'react-redux';
import {fabric} from "fabric"
import {Canvas} from "../canvas_shapes"
import {DFS} from "../algorithms"
import {colorGraphNode} from "../canvas_shapes"

const useStyles = makeStyles((theme)=>({
	canvasContainer:{
		width:"100%",
		height:"70vh",
	},
	buttonOn:{
		background:theme.palette.success.main
	},
	buttonOff:{
		background:theme.palette.primary.dark
	}
}))

const App = ()=>{
	const [canvas,setCanvas] = useState<Canvas | null>(null)
	const [addNode,setAddNode] = useState<boolean>(false)
	const [addEdges,setAddEdges] = useState<boolean>(false)
	const classes = useStyles()

	useEffect(()=>{
		setCanvas(new Canvas("main_canvas","canvas_container"))
	},[])

	useEffect(()=>{
		if (canvas) {
			if (addNode)
				canvas.allowAddNode()
			else 
				canvas.forbidAddNode(addEdges)
		}
	},[canvas,addNode,addEdges])

	return (
	<Box
		display="flex"
		flexDirection="column"
		justifyContent="center"
		alignItems="center"
	>
		<Typography
			variant="h3"
			component="h1"
		>
			Algorithm Previewer
		</Typography>
		<Box>
			<Button
				onClick={()=>setAddNode(prev=>!prev)}
				variant="contained"
				className={addNode?classes.buttonOn:classes.buttonOff}
			>
				Add node
			</Button>
			<Button
				onClick={()=>canvas!.startAlgorithm(
					(graph:GraphInterface<fabric.Circle>)=>DFS(graph,{
						handleNodeData:colorGraphNode(canvas as Canvas),
						startIndex:0,
					})
				)}
				variant="contained"
				className={addNode?classes.buttonOn:classes.buttonOff}
			>
				Start
			</Button>
			<Button
				variant="contained"
				className={addEdges?classes.buttonOn:classes.buttonOff}
				onClick={()=>setAddEdges(prev=>!prev)}
			>
				Add edges
			</Button>
		</Box>
		<div 
			id="canvas_container" 
			className={classes.canvasContainer}
		>
			<canvas id="main_canvas"></canvas>
		</div>
	</Box>
	)
}

export default App