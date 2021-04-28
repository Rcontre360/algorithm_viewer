import React,{useState,useEffect} from "react"
import { fabric } from "fabric"
import { useDispatch } from 'react-redux';
import { applyMiddleware, createStore } from 'redux'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import {nodeStyles,edgeStyles} from './shape_styles'
import {Canvas as ShapeCanvas} from "../adapters"
import {allowAddNode,allowAddEdge,startAlgorithm,onSetDirected} from '../redux/actions'
import Canvas from './Canvas/GraphCanvas'

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
	const [canvas,setCanvas] = useState<ShapeCanvas | undefined>(undefined)
	const [isDirected,setIsDirected] = useState<boolean>(false)
	const [addNode,setAddNode] = useState<boolean>(false)
	const [addEdges,setAddEdges] = useState<boolean>(false)
	const classes = useStyles()
	const dispatch = useDispatch()

	useEffect(()=>{
		setCanvas(new ShapeCanvas({
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
				onClick={() => allowAddNode()(dispatch)}
				variant="contained"
				className={addNode?classes.buttonOn:classes.buttonOff}
			>
				Add node
			</Button>
			<Button
				onClick={()=>startAlgorithm()(dispatch)}
				variant="contained"
				className={addNode?classes.buttonOn:classes.buttonOff}
			>
				Start
			</Button>
			<Button
				variant="contained"
				className={addEdges?classes.buttonOn:classes.buttonOff}
				onClick={()=>allowAddEdge()(dispatch)}
			>
				Add edges
			</Button>
			<Button
				variant="contained"
				className={isDirected?classes.buttonOn:classes.buttonOff}
				onClick={()=>onSetDirected(!isDirected)(dispatch)}
			>
				Set directed
			</Button>
		</Box>
		<div 
			id="canvas_container" 
			className={classes.canvasContainer}
		>
			<Canvas/>
		</div>
	</Box>
	)
}

export default App