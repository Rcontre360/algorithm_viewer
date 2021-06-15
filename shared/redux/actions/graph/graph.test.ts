import * as actions from '@shared/redux/action_types'
import Manager from '@core/useCases/Manager';
import { recursiveClear } from '@shared/utils/tests'
import {
	onAddEdge,
	onAddNode,
	onSetDirected,
	onAllowAddEdge,
	onAllowAddNode,
} from './index'

jest.mock('@core/useCases/Manager');

describe('Redux common actions should dispatch correct actions', () => {

	const dispatch = jest.fn();
	beforeEach(() => {
		dispatch.mockClear()
		recursiveClear(Manager as {})
	})

	test('On add edge', () => {
		const managerDataStructureData = Manager.dataStructure.getGraphData();
		onAddEdge({ src: 1, dest: 2 })(dispatch)
		expect(dispatch).toHaveBeenCalledWith({ type: actions.ADD_EDGE, payload: managerDataStructureData })
		expect(Manager.dataStructure.getGraphData).toHaveReturnedWith(managerDataStructureData)
	})

	test('On allow add edge', () => {
		onAllowAddEdge()(dispatch)
		expect(dispatch).toHaveBeenCalledWith({ type: actions.ALLOW_ADD_EDGE, payload: { addEdge: true, addNode: true } })
	})

	test('On add node', () => {
		const managerDataStructureData = Manager.dataStructure.getGraphData();
		const nodeData = 'node';
		Manager.dataStructure.getGraphData.mockClear()
		onAddNode(nodeData)(dispatch);

		expect(dispatch).toHaveBeenCalledWith({ type: actions.ADD_NODE, payload: managerDataStructureData })
		expect(Manager.dataStructure.getGraphData).toHaveReturnedWith(managerDataStructureData)
		expect(Manager.dataStructure.addNode).toHaveBeenCalledWith(nodeData)
	})

	test('On allow add node', () => {
		onAllowAddNode()(dispatch)
		expect(dispatch).toHaveBeenCalledWith({ type: actions.ALLOW_ADD_NODE, payload: { addEdge: true, addNode: true } })
	})

	test('On set directed', () => {
		const value = true;
		onSetDirected(value)(dispatch)
		expect(dispatch).toHaveBeenCalledWith({ type: actions.SET_DIRECTED, payload: value })
		expect(Manager.dataStructure.setDirected).toHaveBeenCalledWith(value);
	})

})