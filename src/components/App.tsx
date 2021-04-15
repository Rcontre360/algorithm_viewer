import React,{useState,useEffect} from "react"
import { fabric } from "fabric"
import { useSelector } from 'react-redux';
import { applyMiddleware, createStore } from 'redux'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import {nodeStyles,edgeStyles} from './shape_styles'
import {Canvas} from "../adapters"
import {DFS} from "../core/algorithms"
import {colorGraphNode} from "../adapters"

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
	const [canvas,setCanvas] = useState<Canvas | undefined>(undefined)
	const [isDirected,setIsDirected] = useState<boolean>(false)
	const [addNode,setAddNode] = useState<boolean>(false)
	const [addEdges,setAddEdges] = useState<boolean>(false)
	const classes = useStyles()

	useEffect(()=>{
		setCanvas(new Canvas({
			canvasId:"main_canvas",
			containerId:"canvas_container",
			nodeStyles,
			edgeStyles
		}))
	},[]);

	useEffect(()=>{
		if (addNode)
			setAddEdges(false)
		if (addEdges)
			setAddNode(false)
	},[addNode,addEdges])

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
			Algorithm Viewer
		</Typography>
		<Box>
			<Button
				onClick={()=>{
					setAddNode(prev=>!prev)
					canvas!.allowAddNode()
				}}
				variant="contained"
				className={addNode?classes.buttonOn:classes.buttonOff}
			>
				Add node
			</Button>
			<Button
				onClick={()=>canvas!.startAlgorithm()}
				variant="contained"
				className={addNode?classes.buttonOn:classes.buttonOff}
			>
				Start
			</Button>
			<Button
				variant="contained"
				className={addEdges?classes.buttonOn:classes.buttonOff}
				onClick={()=>{
					setAddEdges(prev=>!prev)
					canvas!.allowAddEdge()
				}}
			>
				Add edges
			</Button>
			<Button
				variant="contained"
				className={isDirected?classes.buttonOn:classes.buttonOff}
				onClick={()=>{
					setIsDirected(prev=>!prev)
					canvas!.setDirected(!isDirected)
				}}
			>
				Set directed
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