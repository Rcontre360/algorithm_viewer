
export const FIELDS = {
	getObjectsIntersect:jest.fn(),
	isMouseIntoObject:jest.fn(),
	clear:jest.fn(),
	renderAll:jest.fn(),
	on:jest.fn(),
	add:jest.fn(),
	off:jest.fn(),
}

const BaseCanvasMock = jest.fn().mockImplementation(()=>{
	return FIELDS
})

export default BaseCanvasMock