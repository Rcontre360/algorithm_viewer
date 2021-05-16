import { Graph } from '../../../core/data_structures/Graph'
import BFS from './index'

describe('BFS should return right values', () => {
	let graph: Graph < string > ;
	const rightIndirectedConnection = [[1, 3], [0, 3], [], [0, 1]]
	const nodeData = ['node', 'node2', 'node3', 'node4']
	const rightIndirectedReturn = [
		{ active: true, node: 0 },
		{ active: false, node: 1 },
		{ active: false, node: 3 },
		{ active: true, node: 3 },
		{ active: true, node: 1 }
	]

	beforeEach(() => {
		graph = new Graph(rightIndirectedConnection, nodeData)
	})

	test('Return value', () => {
		console.log(BFS.start(graph, { startIndex: 0, previousIndex: -1 }))
		expect(BFS.start(graph, {
			startIndex: 0,
		})).toEqual(rightIndirectedReturn)
	})

})