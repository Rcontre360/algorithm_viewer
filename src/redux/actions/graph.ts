import {
	ALLOW_ADD_EDGE,
	ALLOW_ADD_NODE,
	ADD_NODE,
	ADD_EDGE,
	SET_DIRECTED,
} from '../action_types'
import { AppDispatch } from '../store'
import { GraphCase } from '../../core'

export const allowAddEdge = () => {
	return (dispatch: AppDispatch) => {
		return dispatch({
			type: ALLOW_ADD_EDGE,
			payload: true,
		})
	};
};

export const allowAddNode = () => {
	return (dispatch: AppDispatch) => {
		return dispatch({
			type: ALLOW_ADD_NODE,
			payload: true
		})
	}
}

export const addNode = (nodeData: GraphType) => {
	return (dispatch: AppDispatch) => {
		return dispatch({
			type: ADD_NODE,
			payload: nodeData,
		})
	}
}

export const addEdge = (connection: { src: number | GraphType, dest: number | GraphType }) => {
	return (dispatch: AppDispatch) => {
		return dispatch({
			type: ADD_EDGE,
			payload: connection
		})
	}
}

export const onSetDirected = (isDirected: boolean) => {
	return (dispatch: AppDispatch) => {
		return dispatch({
			type: SET_DIRECTED,
			payload: isDirected
		})
	}
}