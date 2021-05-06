import GraphCase from '../GraphCase'
import DFS from '../../algorithms/DFS'

const DSMapper = {
	'graph': GraphCase
}

const AlgorithmMapper = {
	'dfs': DFS
}

export class Manager {
	static dataStructure: any
	static algorithm: any

	static setDataStructure = (DS: 'graph') => {
		if (typeof DS === 'string')
			Manager.dataStructure = new DSMapper[DS]();
	}

	static setAlgorithm = (algorithm: 'dfs') => {
		if (typeof algorithm === 'string')
			Manager.algorithm = AlgorithmMapper[algorithm]
	}

	static startAlgorithm = () => {
		return Manager.dataStructure.startAlgorithm(Manager.algorithm.start);
	}
}

export default Manager