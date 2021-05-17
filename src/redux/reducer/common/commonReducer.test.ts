import commonReducer, { commonState } from './index'
import * as actions from '../../action_types'

describe('Common reducer should return proper state', () => {

	test('Set current algorithm', () => {

	})

	test('Set current data structure', () => {

	})

	test('Start algorithm', () => {
		const payload = 'some_value'
		const response = commonReducer(commonState, { type: actions.START_ALGORITHM, payload })
		expect(response.running).toBe(true)
	})

	test('Stop algorithm', () => {
		const response = commonReducer(commonState, { type: actions.STOP_ALGORITHM })
		expect(response.running).toBe(false)
	})

	test('Set speed', () => {
		const newSpeed = 1234;
		const response = commonReducer(commonState, { type: actions.SET_SPEED, payload: newSpeed })
		expect(response.speed).toBe(newSpeed)
	})

	test('Default actions return same state', () => {
		const response = commonReducer(commonState, { type: 'default value' })
		expect(response).toEqual(commonState)
	})

})