import React from "react"
import clsx from 'clsx'
import Typo from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'

import { useDispatch,useSelector } from 'redux/hooks';
import Canvas from 'components/Canvas/GraphCanvas'
import InfoBar from 'components/InfoBar'
import ConfigPanel from 'components/ConfigPanel'

import {
	onAllowAddNode,
	onAllowAddEdge,
	onSetDirected,
	onStartAlgorithm
} from 'redux/actions'

const useStyles = makeStyles((theme)=>({
	container:{
		display:'flex',
		flexDirection:'column',
		alignItems:'center',
		marginTop:'8vh',
		height:"90vh",
		width:'100%',
		padding:'2em 0',
		margin:0,
		position:'relative'
	},
	subContainer:{
		padding:'1em', 
		margin:'1em 0em',
		display:'flex',
		justifyContent:'space-around',
		alignItems:'center',
		width:'100%',
	},
	subContainerOpen:{
		[theme.breakpoints.down('sm')]:{
			flexDirection:'column',
			'& >*':{
				margin:'1em'
			}
		}
	},
	subContainerClose:{
		'@media screen and (max-width:700px)': {
			flexDirection: 'column',
			'& >*': {
				margin: '1em'
			}
		}
	},
	canvasContainer:{
		boxShadow:`0px 0px 5px ${theme.palette.secondary.light}`,
		width:'95%',
		height:'75vh',
	},
	buttonOn:{
		background:theme.palette.success.main
	},
	buttonOff:{
		background:theme.palette.primary.dark
	},
}))

const GraphPlayground = ()=>{

	const [open,setOpen] = React.useState<boolean>(true);
	const {addNode,addEdge,directed} = useSelector(({graph,common})=>({...graph.options}))
	const canvasContainer = React.useRef<HTMLDivElement>()
	const dispatch = useDispatch()
	const classes = useStyles()

	const {clientHeight,clientWidth} = canvasContainer.current || {clientHeight:0,clientWidth:0}

	return (
	<Box>
		<ConfigPanel 
			open={open} 
			setOpen={setOpen}
		>
			<Box className={classes.container}>
				<Box width='100%' display='flex' justifyContent='center'>
					<InfoBar/>
				</Box>
				<Box className={clsx(classes.subContainer,{
					[classes.subContainerOpen]:open,
					[classes.subContainerClose]:!open,
				})}>
					<Button
						variant={addEdge?'contained':'outlined'}
						color='secondary'
						onClick={e=>onAllowAddEdge()(dispatch)}
					>
						Allow add edges
					</Button>
					<Button
						variant={addNode?'contained':'outlined'}
						color='secondary'
						onClick={e=>onAllowAddNode()(dispatch)}
					>
						Allow add nodes
					</Button>
					<Button
						variant={directed?'contained':'outlined'}
						color='secondary'
						onClick={e=>onSetDirected(!directed)(dispatch)}
					>
						Set directed
					</Button>
					{
						!open &&
						<Button
							variant={'outlined'}
							color='secondary'
							onClick={e=>onStartAlgorithm(0)(dispatch)}
						>
							Start Algorithm
						</Button>
					}
				</Box>
				<Box ref={canvasContainer} className={classes.canvasContainer}>
					<Canvas width={clientWidth} height={clientHeight}/>
				</Box>
			</Box>
		</ConfigPanel>
	</Box>
	)
}

export default GraphPlayground