import React,{useState,useEffect} from "react"
import { applyMiddleware, createStore } from 'redux'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import { useSelector } from 'react-redux';
import {fabric} from "fabric"
import {Canvas} from "../canvas_shapes"

const useStyles = makeStyles((theme)=>({
	canvasContainer:{
		width:"100%",
		height:"70vh",
	},
	buttonOn:{
		background:theme.palette.primary.light
	},
	buttonOff:{
		background:theme.palette.primary.dark
	}
}))

const App = ()=>{
	const [addNode,setAddNode] = useState<boolean>(false)
	const [canvas,setCanvas] = useState<Canvas | null>(null)
	const classes = useStyles()

	useEffect(()=>{
		setCanvas(new Canvas("main_canvas","canvas_container"))
	},[])

	useEffect(()=>{
		if (canvas) {
			if (addNode)
				canvas.allowAddNode()
			else
				canvas.forbidAddNode()
		}
	},[canvas,addNode])

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
			<Button>Option 2</Button>
			<Button>Option 3</Button>
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