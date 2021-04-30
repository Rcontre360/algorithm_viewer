import { mocked } from 'ts-jest/utils';
import Graph from '../../../core/data_structures/Graph'
import { GraphCase } from './index'

const graph = {
	addNode:jest.fn(),
	connectNodes:jest.fn(),
	getNodeData:jest.fn(),
	emptyGraph:jest.fn(),
	setDirected:jest.fn(),
	getEdges:jest.fn(),
}

const algorithmReturn = [{ forward: true, from: -1, to: 0 }]
const algorithm = jest.fn(() => algorithmReturn)

const clearMethods = ()=>{
	(Graph as any).mockClear();
	Object.values(graph).forEach(mock=>mock.mockClear())
}

jest.mock('../../../core/data_structures/Graph',()=>{
	return jest.fn().mockImplementation(()=>(graph))
});

let graphCase: GraphCase<number>;

beforeEach(() => {
	clearMethods()
	graphCase = new GraphCase(algorithm);
})

describe('GraphCase should initialize properly', () => {

	test('Create Graph object from constructor', () => {
		expect(Graph).toHaveBeenCalledTimes(1);
	})

	test('Initialize algorithm property',()=>{
		expect(graphCase.algorithm).toBe(algorithm)
	})

})

describe('GraphCase should apply nodes and edges methods', () => {

	test('Add node', () => {
		graphCase.canAddNode = true;
		[1, 2, 3, 4].forEach(val => graphCase.addNode(val))
		expect(graph.addNode).toHaveBeenCalledTimes(4);
	})

	test('Dont add node if not allowed', () => {
		graphCase.canAddNode = false
		graphCase.addNode(1)
		expect(graph.addNode).toHaveBeenCalledTimes(0)
	})

	test('Dont add node if is adding edges',()=>{
		graphCase.canAddEdge = true
		graphCase.addNode(1)
		expect(graph.addNode).toHaveBeenCalledTimes(0)
	})

	test('Add edge',()=>{
		graphCase.canAddEdge = true
		graphCase.addEdge(1,2)
		expect(graph.connectNodes).toHaveBeenCalledTimes(1)
	})

	test('Dont add edge when not allowed',()=>{
		graphCase.canAddEdge = false
		graphCase.addEdge(1,2)
		expect(graph.connectNodes).toHaveBeenCalledTimes(0)
	})

	test('Dont add edge when is adding nodes',()=>{
		graphCase.canAddNode = true
		graphCase.addEdge(1,2)
		expect(graph.connectNodes).toHaveBeenCalledTimes(0)
	})

	test('Get node data',()=>{
		graphCase.canAddNode = true
		graphCase.addNode(123)
		graphCase.getNodeData(123)
		expect(graph.getNodeData).toHaveBeenCalledWith(123)
		expect(graph.getNodeData).toHaveBeenCalledTimes(1)
	})

})

describe('GraphCase should apply algorithm methods',()=>{

	test('Algorithm called',()=>{
		graphCase.startAlgorithm()
		expect(algorithm).toHaveBeenCalledTimes(1)
	})

	test('Edges should be called with algorithm',()=>{
		graphCase.startAlgorithm()
		expect(graph.getEdges).toHaveReturnedTimes(1)
	})

})