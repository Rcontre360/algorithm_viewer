const GraphCaseMock = jest.fn().mockImplementation(() => ({
	startAlgorithm: jest.fn(() => []),
	...jest.requireActual('../index')
}))

export default GraphCaseMock