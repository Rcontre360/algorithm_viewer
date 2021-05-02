import produce from 'immer'
import * as actions from '../../action_types'
import { InitialState, RootState } from '../../store'
import { IReduxAction } from '../../interfaces'

const mainReducer: RootState = (state: InitialState, action: IReduxAction) => {

	switch (action.type) {
		case actions.ADD_EDGE:
			return produce(state, state => {
				state.algorithm.options.data = action.payload
			});
		case actions.ADD_NODE:
			return produce(state, state => {
				state.algorithm.options.data = action.payload
			});
		case actions.ALLOW_ADD_EDGE:
			return produce(state, state => {
				state.algorithm.options.addNode = action.payload.addNode
				state.algorithm.options.addEdge = action.payload.addEdge
			})
		case actions.ALLOW_ADD_NODE:
			return produce(state => {
				state.algorithm.options.addNode = action.payload.addNode
				state.algorithm.options.addEdge = action.payload.addEdge
			}, state)
		default:
			return state;
	}
}

export default mainReducer