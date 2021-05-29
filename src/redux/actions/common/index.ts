import * as actions from '../../action_types';
import { AppDispatch } from '../../store'
import Manager from '../../../core/useCases/Manager'

export const onStartAlgorithm = () => {
	return (dispatch: AppDispatch) => {
		return dispatch({
			type: actions.START_ALGORITHM,
			payload: Manager.startAlgorithm()
		})
	}
}

export const onStopAlgorithm = () => {
	return (dispatch: AppDispatch) => {
		return dispatch({
			type: actions.STOP_ALGORITHM,
			payload: false
		})
	}
}

export const onSetAlgorithm = (name: AlgorithmSignature) => {
	Manager.setAlgorithm(name)
	return (dispatch: AppDispatch) => {
		return dispatch({
			type: actions.SET_ALGORITHM,
			payload: name
		})
	}
}

export const onSetDataStructure = (name: 'graph') => {
	Manager.setDataStructure(name)
	return (dispatch: AppDispatch) => {
		return dispatch({
			type: actions.SET_DATA_STRUCTURE,
			payload: name
		})
	}
}

export const onSetSpeed = (value: number) => {
	return (dispatch: AppDispatch) => {
		return dispatch({
			type: actions.SET_SPEED,
			payload: value
		})
	}
}