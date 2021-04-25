import {Graph}  from '../../../core/data_structures/Graph'

let graph: Graph < string > ;
const nodeData = ['node', 'node2', 'node3', 'node4']
const standarConnection = [[0, 1], [0, 3], [1, 3]],
	standarEdges = [
		{ nodeSrc: 0, nodeDest: 1 },
		{ nodeSrc: 0, nodeDest: 3 },
		{ nodeSrc: 1, nodeDest: 3 }
	],
	directedConnection = [[0, 1], [0, 3], [1, 3], [3, 0]],
	rightIndirectedConnection = [[1, 3], [0, 3], [], [0, 1]],
	rightDirectedConnection = [[1, 3], [3], [], [0]],
	rightDeletedConnection = [[3], [], [1]]

const connectNodes = (arr: number[][], withObject: boolean) => {
	arr.forEach(connect => {
		if (withObject)
			graph.connectNodes(nodeData[connect[0]], nodeData[connect[1]])
		else
			graph.connectNodes(connect[0], connect[1])
	})
}

beforeEach(() => {
	graph = new Graph();
	graph.addNode(nodeData[0])
	graph.addNode(nodeData[1])
	graph.addNode(nodeData[2])
	graph.addNode(nodeData[3])
})

describe('Graph should perform basic operations over nodes and edges', () => {

	describe('It should apply initialization values correctly', () => {

		test('Should build graph from connections', () => {
			graph = new Graph(rightIndirectedConnection, nodeData)
			const nodeConnections = graph.getAllNodeConnections()
			expect(nodeConnections).toEqual(rightIndirectedConnection);
		})

	})

	describe('It should add nodes and return them', () => {

		test('Node connections creation', () => {
			const rightNodeConnection = [[], [], [], []]
			const nodeConnections = graph.getAllNodeConnections()
			expect(nodeConnections).toEqual(rightNodeConnection);
		})

		test('Node data creation', () => {
			const rightNodeDataArr = nodeData
			const nodeDataArr = graph.getAllNodeData()
			expect(nodeDataArr).toEqual(rightNodeDataArr)
		})

		test('Graph size', () => {
			expect(graph.getNumberOfElements()).toEqual(4)
		})

		test('Return node data with its index', () => {
			expect(graph.getNodeData(0)).toBe(nodeData[0])
			expect(graph.getNodeData(3)).toBe(nodeData[3])
		})

		test('Return node connections with its index', () => {
			connectNodes(standarConnection, true)
			const nodeConnections = graph.getNodeConnections(0)
			expect(nodeConnections).toEqual([1, 3]);
		})

	})

	describe('It should apply edge methods', () => {

		test('Connect nodes with index', () => {
			connectNodes(standarConnection, false)
			const nodeConnections = graph.getAllNodeConnections()
			expect(nodeConnections).toEqual(rightIndirectedConnection);
		})

		test('Connect nodes with objects', () => {
			connectNodes(standarConnection, true)
			const nodeConnections = graph.getAllNodeConnections()
			expect(nodeConnections).toEqual(rightIndirectedConnection);
		})

		test('Connect nodes in directed graph', () => {
			graph.setDirected(true)
			connectNodes(directedConnection, false)
			const nodeConnections = graph.getAllNodeConnections()
			expect(nodeConnections).toEqual(rightDirectedConnection);
		})

		test('Delete nodes and its connections', () => {
			connectNodes(standarConnection, true)
			graph.deleteNode(0)
			const nodeConnections = graph.getAllNodeConnections()
			expect(nodeConnections).toEqual(rightDeletedConnection);
		})

		test('Return its edges data', () => {
			connectNodes(standarConnection, true)
			const edges = graph.getEdges()
			expect(edges).toEqual(standarEdges)
		})

	})

	test('It should become empty', () => {
		connectNodes(standarConnection, true)
		graph.emptyGraph()
		expect(graph.getAllNodeData()).toHaveLength(0)
		expect(graph.getAllNodeConnections()).toHaveLength(0)
		expect(graph.getNumberOfElements()).toBe(0)
		expect(graph.getEdges()).toHaveLength(0)
	})

})