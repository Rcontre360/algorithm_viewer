import React from 'react';
import {Handle,Position} from 'react-flow-renderer';
import {makeStyles} from '@material-ui/core/styles'

export interface GraphNodeProps{
	id: string;
	data: {[x:string]:string};
	selected: boolean;
	sourcePosition: string;
	targetPosition: string;
	style: object;
	className: string;
}

const useStyles = makeStyles(theme=>({
	sourceHandler:{
		background: '#E36666'
	},
	targetHandler:{
		background:'#8A90E2'
	},
	sourceHandlerX:{
		transform:'translateX(-7px)',
	},
	sourceHandlerY: {
		transform: 'translateY(-7px)',
	},
	targetHandlerX:{
		transform:'translateX(0px)',
	},
	targetHandlerY:{
		transform:'translateX(0px)',
	},
}))

const GraphNode = (props:GraphNodeProps)=>{
	const {data,id,sourcePosition,targetPosition} = props
	const classes = useStyles()

	return(
		<div style={props.style} role='graph-node'>
			<Handle 
				type="target" 
				position={Position.Top} 
				id={`${id}-handler-a`}
				role='node-target-handle'
				className={`${classes.targetHandler} ${classes.targetHandlerX}`}
			/>
			<Handle
				type="source"
				position={Position.Top}
				id={`${id}-handler-b`}
				className={`${classes.sourceHandler} ${classes.sourceHandlerX}`}
				role='node-source-handle'
			/>
			<Handle
				type="target"
				position={Position.Right}
				id={`${id}-handler-c`}
				className={`${classes.targetHandler} ${classes.targetHandlerY}`}
				role='node-target-handle'
			/>
			<Handle
				type="source"
				position={Position.Right}
				id={`${id}-handler-d`}
				className={`${classes.sourceHandler} ${classes.sourceHandlerY}`}
				role='node-source-handle'
			/>
			<Handle
				type="target"
				position={Position.Bottom}
				id={`${id}-handler-e`}
				className={`${classes.targetHandler} ${classes.targetHandlerX}`}
				role='node-target-handle'
			/>
			<Handle
				type="source"
				position={Position.Bottom}
				id={`${id}-handler-f`}
				className={`${classes.sourceHandler} ${classes.sourceHandlerX}`}
				role='node-source-handle'
			/>
			<Handle
				type="target"
				position={Position.Left}
				id={`${id}-handler-g`}
				className={`${classes.targetHandler} ${classes.targetHandlerY}`}
				role='node-target-handle'
			/>
			<Handle
				type="source"
				position={Position.Left}
				id={`${id}-handler-h`}
				className={`${classes.sourceHandler} ${classes.sourceHandlerY}`}
				role='node-source-handle'
			/>
		</div>
	)
}

export default GraphNode