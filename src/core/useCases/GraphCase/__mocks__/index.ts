const GraphCaseMock = jest.fn().mockImplementation(() => ({
	...jest.requireActual('../index')
}))

export default GraphCaseMock