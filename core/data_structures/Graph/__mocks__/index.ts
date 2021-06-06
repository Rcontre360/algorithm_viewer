export const FIELDS = {
	addNode: jest.fn(),
	connectNodes: jest.fn(),
	getNodeData: jest.fn(),
	emptyGraph: jest.fn(),
	setDirected: jest.fn(),
	getEdges: jest.fn(()=>[]),
	getAllNodeData: jest.fn(() => []),
	getAllNodeConnections: jest.fn(() => [])
}

export default jest.fn().mockImplementation(() => (FIELDS))