import * as actions from '../../action_types'
import Manager from '../../../core/useCases/Manager';
import { recursiveClear } from '../../../utils/tests'
import {
	onStartAlgorithm,
	onStopAlgorithm,
	onSetAlgorithm,
	onSetSpeed,
	onSetDataStructure,
} from './index'

jest.mock('../../../core/useCases/Manager');

describe('Redux common actions should dispatch correct actions', () => {

	const dispatch = jest.fn();
	beforeEach(() => {
		dispatch.mockClear();
		recursiveClear(Manager as {});
	})

	test('On start algorithm', () => {
		onStartAlgorithm(100)(dispatch)
		expect(dispatch).toHaveBeenCalledWith({ type: actions.START_ALGORITHM, payload: Manager.startAlgorithm() })
	})

	test('On stop algorithm', () => {
		onStopAlgorithm()(dispatch)
		expect(dispatch).toHaveBeenCalledWith({ type: actions.STOP_ALGORITHM, payload: false })
	})

	test('On set algorithm', () => {
		const algorithm = 'dfs'
		onSetAlgorithm(algorithm)(dispatch);
		expect(dispatch).toHaveBeenCalledWith({ type: actions.SET_ALGORITHM, payload: algorithm })
		expect(Manager.setAlgorithm).toHaveBeenCalledWith(algorithm)
	})

	test('On set speed', () => {
		const value = 40;
		onSetSpeed(value)(dispatch)
		expect(dispatch).toHaveBeenCalledWith({ type: actions.SET_SPEED, payload: value })
	})

	test('On set data structure', () => {
		const dataStructure = 'graph'
		onSetDataStructure(dataStructure)(dispatch);
		expect(dispatch).toHaveBeenCalledWith({ type: actions.SET_DATA_STRUCTURE, payload: dataStructure })
		expect(Manager.setDataStructure).toHaveBeenCalledWith(dataStructure)
	})

})