import produce from 'immer'
import * as actions from '../../action_types'
import { InitialState, RootState } from '../../store'
import { IReduxAction } from '../../interfaces'
import { GraphCase, algorithms } from '../../../core'

const commonReducer: RootState = (state: InitialState, action: IReduxAction) => {

	switch (action.type) {
		case actions.SET_ALGORITHM:

			return state;
		case actions.SET_DATA_STRUCTURE:

			return state;
		case actions.START_ALGORITHM:
			return produce(state, state => {
				state.common.running = true
				state.algorithm.output = action.payload
			})
		case actions.STOP_ALGORITHM:
			return produce(state, state => {
				state.common.running = false
				state.algorithm.output = undefined
			})
		case actions.SET_SPEED:

			return state;
		default:
			return state;
	}
}

export default commonReducer