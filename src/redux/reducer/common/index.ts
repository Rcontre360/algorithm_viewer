import produce from 'immer'
import * as actions from '../../action_types'
import { initialState, RootState } from '../../store'
import { IReduxAction } from '../../interfaces'
import { GraphCase } from '../../../core'

export const commonState = {
	speed: 500,
	running: false,
	algorithm: {
		name: 'dfs',
		dataStructure: 'graph',
	}
}

const commonReducer: RootState = (state = commonState, action: IReduxAction) => {

	switch (action.type) {
		case actions.SET_ALGORITHM:

			return state;
		case actions.SET_DATA_STRUCTURE:

			return state;
		case actions.START_ALGORITHM:
			return produce(state, state => {
				state.running = true
			})
		case actions.STOP_ALGORITHM:
			return produce(state, state => {
				state.running = false
			})
		case actions.SET_SPEED:
			return produce(state, state => {
				state.speed = action.payload
			});
		default:
			return state;
	}
}

export default commonReducer