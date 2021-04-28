
export const FIELDS = {
	setCanvas:jest.fn(),
	setDrawingEvents:jest.fn(),
	removeDrawingEvents:jest.fn(),
	useArrow:jest.fn(),
	_addEdgesHandler:jest.fn(),
	_getNodeUnderMouse:jest.fn(),
	_drawLineHandler:jest.fn(),
	_isDrawable:jest.fn(),
	_stopDrawing:jest.fn(),
	_getCircleLineIntersection:jest.fn()
}

const LineMock = jest.fn().mockImplementation(()=>{
	return FIELDS
})

export default LineMock