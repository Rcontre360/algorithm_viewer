import {Graph} from '../../../core/data_structures/Graph'
import DFS from './index'

describe('DFS should return right values', () => {
	let graph: Graph < string > ;
	let dfs: DFS;
	const rightIndirectedConnection = [[1, 3], [0, 3], [], [0, 1]]
	const nodeData = ['node', 'node2', 'node3', 'node4']
	const rightIndirectedReturn = {
		forward: expect.any(Boolean),
		from: expect.any(Number),
		to: expect.any(Number),
		state: expect.arrayContaining([expect.any(String)]),
	}

	beforeEach(() => {
		graph = new Graph(rightIndirectedConnection, nodeData);
		dfs = new DFS();
	})

	test('Return value', () => {
		dfs.start(graph,{startIndex:0,previousIndex:-1}).forEach(value=>{
			expect(value).toMatchObject(rightIndirectedReturn)
		})
	})

})