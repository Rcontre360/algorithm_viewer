import {FIELDS as drawerFields} from '../../shapes/Line'
jest.mock('../../shapes/Line')

export const FIELDS = {
	getObjectsIntersect:jest.fn(),
	isMouseIntoObject:jest.fn(),
	clear:jest.fn(),
	renderAll:jest.fn(),
	getCircleLineIntersection: jest.fn(),
	drawer: drawerFields,
	on:jest.fn(),
	add:jest.fn(),
	off: jest.fn(),
	sendToBack:jest.fn()
}

const BaseCanvasMock = jest.fn().mockImplementation(()=>{
	return FIELDS
})

export default BaseCanvasMock