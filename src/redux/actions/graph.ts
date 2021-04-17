import {
	ALLOW_ADD_EDGE,
	ALLOW_ADD_NODE,
	ADD_NODE,
	ADD_EDGE,
} from '../action_types'
import { AppDispatch } from '../store'

export const allowAddEdge = () => {
	return (dispatch: AppDispatch) => {
		dispatch({
			type: ALLOW_ADD_EDGE,
			payload: true,
		})
	};
};

export const allowAddNode = () => {
	return (dispatch: AppDispatch) => {
		dispatch({
			type: ALLOW_ADD_NODE,
			payload: true
		})
	}
}

export const addNode = (coordenades: { x: number, y: number }) => {
	return (dispatch: AppDispatch) => {
		dispatch({
			type: ADD_NODE,
			payload: coordenades,
		})
	}
}

export const addEdge = (connection: { src: number, dest: number }) => {
	return (dispatch: AppDispatch) => {
		dispatch({
			type: ADD_EDGE,
			payload: connection
		})
	}
}