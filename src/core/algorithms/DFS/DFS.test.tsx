import {Graph} from '../../../core/data_structures/Graph'
import DFS from './index'

describe('DFS should return right values', () => {
	let graph: Graph < string > ;
	const rightIndirectedConnection = [[1, 3], [0, 3], [], [0, 1]]
	const nodeData = ['node', 'node2', 'node3', 'node4']
	const rightIndirectedReturn = [
		{ forward: true, from: -1, to: 0 },
		{ forward: true, from: 0, to: 1 },
		{ forward: true, from: 1, to: 3 },
		{ forward: false, from: 3, to: 1 },
		{ forward: false, from: 1, to: 0 },
		{ forward: false, from: 0, to: -1 }
	]

	beforeEach(() => {
		graph = new Graph(rightIndirectedConnection, nodeData)
	})

	test('Return value', () => {
		expect(DFS.start(graph, {
			startIndex: 0,
			previousIndex: -1
		})).toEqual(rightIndirectedReturn)
	})

})