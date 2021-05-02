import commonReducer from './index'
import * as actions from '../../action_types'
import store, { InitialState } from '../../store'

const appState = store.getState() as InitialState

describe('Common reducer should return proper state', () => {

	test('Set current algorithm', () => {

	})

	test('Set current data structure', () => {

	})

	test('Start algorithm', () => {
		const response = commonReducer(appState, { type: actions.START_ALGORITHM })
		expect(response.common.running).toBe(true)
		expect(response.algorithm.output).toBeDefined()
	})

	test('Stop algorithm', () => {
		const response = commonReducer(appState, { type: actions.STOP_ALGORITHM })
		expect(response.common.running).toBe(false)
		expect(response.algorithm.output).not.toBeDefined()
	})

	test('Set speed', () => {

	})

	test('Default actions return same state', () => {
		const response = commonReducer(appState, { type: 'default value' })
		expect(response).toEqual(appState)
	})

})