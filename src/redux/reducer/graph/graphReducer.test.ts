import * as actions from '../../action_types'
import graphReducer, { graphState } from './index'

describe('Graph reducer should return proper state', () => {

	test('Add edge', () => {
		const graphData = ['some_value', 'some_value2']
		const response = graphReducer(graphState, { type: actions.ADD_EDGE, payload: [...graphData] })
		expect(response.options.data).toStrictEqual(graphData)
	})

	test('Add node', () => {
		const graphData = ['some_value', 'some_value2']
		const response = graphReducer(graphState, { type: actions.ADD_NODE, payload: [...graphData] })
		expect(response.options.data).toStrictEqual(graphData)
	})

	test('Allow add edge', () => {
		const graphData = {
			addNode: true,
			addEdge: true,
		}
		const response = graphReducer(graphState, { type: actions.ALLOW_ADD_EDGE, payload: graphData })
		expect(response.options.addNode).toStrictEqual(graphData.addNode)
		expect(response.options.addEdge).toStrictEqual(graphData.addEdge)
	})

	test('Allow add node', () => {
		const graphData = {
			addNode: true,
			addEdge: true,
		}
		const response = graphReducer(graphState, { type: actions.ALLOW_ADD_NODE, payload: graphData })
		expect(response.options.addNode).toStrictEqual(graphData.addNode)
		expect(response.options.addEdge).toStrictEqual(graphData.addEdge)
	})

	test('Start algorithm', () => {
		const payload = ['some_outuput'];
		const response = graphReducer(graphState, { type: actions.START_ALGORITHM, payload })
		expect(response.output).toStrictEqual(payload)
	})

	test('Stop algorithm', () => {
		const response = graphReducer(graphState, { type: actions.STOP_ALGORITHM, payload: {} })
		expect(response.output).toBe(undefined)
	})

	test('Default return base state', () => {
		const response = graphReducer(graphState, { type: 'any random action', payload: {} })
		expect(response).toStrictEqual(graphState)
	})

})