import React,{useState,useEffect} from "react"
import { fabric } from "fabric"
import { applyMiddleware, createStore } from 'redux'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider'

import { useDispatch,useSelector } from 'redux/hooks';
import Canvas from 'components/Canvas/GraphCanvas'
import {onAllowAddNode,onAllowAddEdge,onStartAlgorithm,onSetDirected,onSetSpeed} from 'redux/actions'

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
	const {
		options:{addNode,addEdge,directed},
		running,
		speed
	} = useSelector(({graph,common})=>({...graph,...common}))
	const dispatch = useDispatch()
	const classes = useStyles()

	const handleSpeedChange = (event:React.ChangeEvent<{}>,value:number | number[])=>{
		onSetSpeed((value as number)*1000)(dispatch)
	}

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
				onClick={() => onAllowAddNode()(dispatch)}
				variant="contained"
				className={addNode?classes.buttonOn:classes.buttonOff}
			>
				Add node
			</Button>
			<Button
				onClick={()=>onStartAlgorithm()(dispatch)}
				variant="contained"
				className={running?classes.buttonOn:classes.buttonOff}
			>
				Start
			</Button>
			<Button
				variant="contained"
				className={addEdge?classes.buttonOn:classes.buttonOff}
				onClick={()=>onAllowAddEdge()(dispatch)}
			>
				Add edges
			</Button>
			<Button
				variant="contained"
				className={directed?classes.buttonOn:classes.buttonOff}
				onClick={()=>onSetDirected(!directed)(dispatch)}
			>
				Set directed
			</Button>
			<Slider
				defaultValue={0.5}
			  step={0.1}
			  marks
			  min={0.1}
			  max={3}
			  valueLabelDisplay="auto"
			  onChange={handleSpeedChange}
			/>
		</Box>
		<Canvas/>
	</Box>
	)
}

export default App