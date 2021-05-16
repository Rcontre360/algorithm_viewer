import GraphCase from '../GraphCase'
import DFS from '../../algorithms/DFS'
import BFS from '../../algorithms/BFS'

const DSMapper = {
	'graph': GraphCase
}

const AlgorithmMapper = {
	'dfs': DFS,
	'bfs': BFS,
}

export class Manager {
	static dataStructure: any
	static algorithm: any

	static setDataStructure = (DS: 'graph') => {
		if (typeof DS === 'string')
			Manager.dataStructure = new DSMapper[DS]();
	}

	static setAlgorithm = (algorithm: 'dfs' | 'bfs') => {
		Manager.algorithm = AlgorithmMapper[algorithm]
	}

	static startAlgorithm = () => {
		return Manager.dataStructure.startAlgorithm(Manager.algorithm.start);
	}
}

export default Manager