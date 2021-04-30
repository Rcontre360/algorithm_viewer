
export const FIELDS = {
	setCanvas:jest.fn(),
	setDrawingEvents:jest.fn(),
	removeDrawingEvents:jest.fn(),
	useArrow:jest.fn(),
	on:jest.fn(),
	setLine:jest.fn(),
	getLine:jest.fn(),

	_mouseDownHandler:jest.fn(),
	_mouseMoveHandler: jest.fn(),
	_mouseUpHandler: jest.fn(),
	_onMouseDown:jest.fn(),
	_onMouseMove: jest.fn(),
	_isDrawable:jest.fn(),
	_onMouseUp: jest.fn(),
}

const LineMock = jest.fn().mockImplementation(()=>{
	return FIELDS
})

export default LineMock