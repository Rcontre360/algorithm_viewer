import {
	ADD_EDGE,
	ADD_NODE,
	ALLOW_ADD_EDGE,
	ALLOW_ADD_NODE,
	SET_ALGORITHM,
	SET_DATA_STRUCTURE,
	START_ALGORITHM,
	STOP_ALGORITHM,
	SET_SPEED,
	SET_DIRECTED
} from '../action_types'
import { InitialState, RootState } from '../store'
import { IReduxAction } from '../interfaces'
import { GraphCase, algorithms } from '../../core'

const graph = new GraphCase()

const mainReducer: RootState = (state: InitialState, action: IReduxAction) => {

	graph.setAlgorithm(algorithms[state.algorithm.name])

	switch (action.type) {
		case ADD_EDGE:
			graph.addEdge(action.payload.src, action.payload.dest)
			return state;
		case ADD_NODE:
			graph.addNode(action.payload)
			return state;
		case ALLOW_ADD_EDGE:
			graph.canAddEdge = true
			return {
				...state,
				algorithm: {
					...state.algorithm,
					options: {
						...state.algorithm.options,
						addNode: graph.canAddNode,
						addEdge: graph.canAddEdge
					}
				}
			};
		case ALLOW_ADD_NODE:
			graph.canAddNode = true
			return {
				...state,
				algorithm: {
					...state.algorithm,
					options: {
						...state.algorithm.options,
						addNode: graph.canAddNode,
						addEdge: graph.canAddEdge
					}
				}
			};
		case SET_ALGORITHM:

			return state;
		case SET_DATA_STRUCTURE:

			return state;
		case START_ALGORITHM:
			return {
				...state,
				common: {
					...state.common,
					running: true
				},
				algorithm: {
					...state.algorithm,
					output: graph.startAlgorithm()
				}
			};
		case STOP_ALGORITHM:

			return {
				...state,
				common: {
					...state.common,
					running: false
				},
			};
		case SET_SPEED:

			return state;
		default:
			return state;
	}
}

export default mainReducer