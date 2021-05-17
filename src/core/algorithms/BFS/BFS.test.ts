import { Graph } from '../../../core/data_structures/Graph'
import BFS from './index'

describe('BFS should return right values', () => {
	let graph: Graph < string > ;
	let bfs: BFS;
	const rightIndirectedConnection = [[1, 3], [0, 3], [], [0, 1]]
	const nodeData = ['node', 'node2', 'node3', 'node4']
	const rightIndirectedReturn = [
		{ active: true, from: -1, to: 0 },
		{ active: false, from: 0, to: 1 },
		{ active: false, from: 0, to: 3 },
		{ active: true, from: -1, to: 3 },
		{ active: true, from: -1, to: 1 }
	]

	beforeEach(() => {
		graph = new Graph(rightIndirectedConnection, nodeData)
		bfs = new BFS();
	})

	test('Return value', () => {
		expect(bfs.start(graph, {
			startIndex: 0,
		})).toEqual(rightIndirectedReturn)
	})

})