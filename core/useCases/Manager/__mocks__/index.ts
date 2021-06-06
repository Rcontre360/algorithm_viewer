const ManagerMock = {
	setDataStructure: jest.fn(),
	setAlgorithm: jest.fn(),
	startAlgorithm: jest.fn(() => 'startAlgorithmReturn'),
	dataStructure: {
		addEdge: jest.fn(),
		addNode: jest.fn(),
		setDirected: jest.fn(),
		getGraphData: jest.fn(() => 'graph_data'),
		canAddEdge: true,
		canAddNode: true,
	}
}

export default ManagerMock