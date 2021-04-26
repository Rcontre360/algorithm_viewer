
const isMouseIntoObjectMock = jest.fn(),
	getObjectsIntersectMock = jest.fn();

const BaseCanvasMock = jest.fn().mockImplementation(()=>{
	return {
		isMouseIntoObjectMock,
		getObjectsIntersectMock
	}
})

export {
	isMouseIntoObjectMock,
	getObjectsIntersectMock
}
export default BaseCanvasMock