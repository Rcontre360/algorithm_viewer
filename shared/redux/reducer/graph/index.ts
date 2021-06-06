import produce from 'immer'
import * as actions from '@shared/redux/action_types'
import { initialState, RootState } from '@shared/redux/store'
import { IReduxAction } from '@shared/redux/interfaces'

export const graphState = {
	output: undefined,
	options: {
		addNode: false,
		addEdge: false,
		directed: false,
		data: undefined
	}
}

const mainReducer: RootState = (state = graphState, action: IReduxAction) => {

	switch (action.type) {
		case actions.ADD_EDGE:
			return produce(state, state => {
				state.options.data = action.payload
			});
		case actions.ADD_NODE:
			return produce(state, state => {
				state.options.data = action.payload
			});
		case actions.ALLOW_ADD_EDGE:
			return produce(state, state => {
				state.options.addNode = action.payload.addNode
				state.options.addEdge = action.payload.addEdge
			})
		case actions.ALLOW_ADD_NODE:
			return produce(state, state => {
				state.options.addNode = action.payload.addNode
				state.options.addEdge = action.payload.addEdge
			})
		case actions.SET_DIRECTED:
			return produce(state, state => {
				state.options.directed = action.payload
			})
		case actions.START_ALGORITHM:
			return produce(state, state => {
				state.output = action.payload
			})
		case actions.STOP_ALGORITHM:
			return produce(state, state => {
				state.output = undefined
			})
		default:
			return state;
	}
}

export default mainReducer