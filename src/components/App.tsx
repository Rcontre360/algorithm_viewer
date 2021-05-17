import React,{useState,useEffect} from "react"
import { fabric } from "fabric"
import { applyMiddleware, createStore } from 'redux'
import Ty from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider'
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

import { useDispatch,useSelector } from 'redux/hooks';
import Canvas from 'components/Canvas/GraphCanvas'
import {
	onAllowAddNode,
	onAllowAddEdge,
	onStartAlgorithm,
	onSetDirected,
	onSetSpeed,
	onSetAlgorithm,
} from 'redux/actions'

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
	const anchorRef = React.useRef()
	const [open,setOpen] = React.useState<boolean>(false);
	const {
		options:{addNode,addEdge,directed},
		running,
		speed
	} = useSelector(({graph,common})=>({...graph,...common}))
	const dispatch = useDispatch()
	const classes = useStyles()

	const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

	const handleClose = (event: React.MouseEvent<EventTarget>) => {
		if (anchorRef.current && anchorRef!.current.contains(event.target as HTMLElement)) {
			return;
		}

		setOpen(false);
	};

	const handleSetAlgorithm = (event:React.MouseEvent<EventTarget>,algorithm:AlgorithmSignature)=>{
		handleClose(event)
		onSetAlgorithm(algorithm)(dispatch)
	}

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
		<Ty
			variant="h3"
			component="h1"
		>
			Algorithm Viewer
		</Ty>
		<Box display='flex' mb={6}>
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
			<Box>
	  		<Button
	        ref={anchorRef}
	        aria-haspopup="true"
	        onClick={handleToggle}
	      >
	        Algorithms
	      </Button>
	      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
	        {({ TransitionProps, placement }) => (
	          <Grow
	            {...TransitionProps}
	            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
	          >
	            <Paper style={{zIndex:5000}}>
	              <ClickAwayListener onClickAway={handleClose}>
	                <MenuList autoFocusItem={open} id="menu-list-grow">
	                  <MenuItem onClick={event=>handleSetAlgorithm(event,'dfs')}>Deep First Search</MenuItem>
	                  <MenuItem onClick={event=>handleSetAlgorithm(event,'bfs')}>Breath First Search</MenuItem>
	                </MenuList>
	              </ClickAwayListener>
	            </Paper>
	          </Grow>
	        )}
	      </Popper>
	  	</Box>
		</Box>

		<Canvas/>
	</Box>
	)
}

export default App