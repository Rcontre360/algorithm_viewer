import {
	ALLOW_ADD_EDGE,
	ALLOW_ADD_NODE,
	ADD_NODE,
	ADD_EDGE,
	SET_DIRECTED,
} from '../action_types'
import { AppDispatch } from '../store'
import { GraphCase } from '../../core'

const graph = new GraphCase()

export const onAllowAddEdge = () => {
	graph.canAddEdge = true
	return (dispatch: AppDispatch) => {
		return dispatch({
			type: ALLOW_ADD_EDGE,
			payload: {
				addEdge: graph.canAddEdge,
				addNode: graph.canAddNode
			},
		})
	};
};

export const onAllowAddNode = () => {
	graph.canAddNode = true
	return (dispatch: AppDispatch) => {
		return dispatch({
			type: ALLOW_ADD_NODE,
			payload: {
				addEdge: graph.canAddEdge,
				addNode: graph.canAddNode
			}
		})
	}
}

export const onAddNode = (nodeData: GraphType) => {
	graph.addNode(nodeData)
	return (dispatch: AppDispatch) => {
		return dispatch({
			type: ADD_NODE,
			payload: graph.getGraphData(),
		})
	}
}

export const onAddEdge = (connection: { src: number | GraphType, dest: number | GraphType }) => {
	graph.addEdge(src, dest)
	return (dispatch: AppDispatch) => {
		return dispatch({
			type: ADD_EDGE,
			payload: graph.getGraphData()
		})
	}
}

export const onSetDirected = (isDirected: boolean) => {
	graph.setDirected(isDirected)
	return (dispatch: AppDispatch) => {
		return dispatch({
			type: SET_DIRECTED,
			payload: isDirected
		})
	}
}