import { mocked } from 'ts-jest/utils';
import Graph,{FIELDS} from '../../../core/data_structures/Graph'
import { GraphCase } from './index'

jest.mock('../../../core/data_structures/Graph')

const algorithmReturn = [{ forward: true, from: -1, to: 0 }]
const algorithm = jest.fn(() => algorithmReturn)

const clearMethods = ()=>{
	(Graph as any).mockClear();
	Object.values(FIELDS).forEach((mock:jest.Mocked<any>)=>mock.mockClear())
}

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
		expect(FIELDS.addNode).toHaveBeenCalledTimes(4);
	})

	test('Dont add node if not allowed', () => {
		graphCase.canAddNode = false
		graphCase.addNode(1)
		expect(FIELDS.addNode).toHaveBeenCalledTimes(0)
	})

	test('Dont add node if is adding edges',()=>{
		graphCase.canAddEdge = true
		graphCase.addNode(1)
		expect(FIELDS.addNode).toHaveBeenCalledTimes(0)
	})

	test('Add edge',()=>{
		graphCase.canAddEdge = true
		graphCase.addEdge(1,2)
		expect(FIELDS.connectNodes).toHaveBeenCalledTimes(1)
	})

	test('Dont add edge when not allowed',()=>{
		graphCase.canAddEdge = false
		graphCase.addEdge(1,2)
		expect(FIELDS.connectNodes).toHaveBeenCalledTimes(0)
	})

	test('Dont add edge when is adding nodes',()=>{
		graphCase.canAddNode = true
		graphCase.addEdge(1,2)
		expect(FIELDS.connectNodes).toHaveBeenCalledTimes(0)
	})

	test('Get node data',()=>{
		graphCase.canAddNode = true
		graphCase.addNode(123)
		graphCase.getNodeData(123)
		expect(FIELDS.getNodeData).toHaveBeenCalledWith(123)
		expect(FIELDS.getNodeData).toHaveBeenCalledTimes(1)
	})

	test('Get graph data', () => {
		[1, 2, 3, 4].forEach(val => graphCase.addNode(val))
		const data = graphCase.getGraphData()
		expect(data.connections).toBeDefined()
		expect(data.nodes).toBeDefined()
		expect(FIELDS.getAllNodeData).toHaveBeenCalledTimes(1)
		expect(FIELDS.getAllNodeConnections).toHaveBeenCalledTimes(1)
	})

})

describe('GraphCase should apply algorithm methods',()=>{

	test('Algorithm called',()=>{
		graphCase.startAlgorithm(algorithm)
		expect(algorithm).toHaveBeenCalledTimes(1)
	})

	test('Edges should be called with algorithm',()=>{
		graphCase.startAlgorithm(algorithm)
		expect(FIELDS.getEdges).toHaveReturnedTimes(1)
	})

})