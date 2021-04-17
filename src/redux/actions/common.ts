import {
	START_ALGORITHM,
	STOP_ALGORITHM,
	SET_SPEED,
	SET_ALGORITHM,
	SET_DATA_STRUCTURE,
} from '../action_types';
import { AppDispatch } from '../store'

export const startAlgorithm = () => {
	(dispatch: AppDispatch) => {
		dispatch({
			type: START_ALGORITHM,
			payload: true
		})
	}
}

export const stopAlgorithm = () => {
	(dispatch: AppDispatch) => {
		dispatch({
			type: STOP_ALGORITHM,
			payload: false
		})
	}
}