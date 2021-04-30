import {fabric} from 'fabric'

import LineDrawer from '../shapes/Line'
import Canvas from './index'

jest.mock('../shapes/Line')

const getCircle = (obj:{x:number,y:number})=>{
	return new fabric.Circle({
		radius: 20,
		lockMovementX: true,
		lockMovementY: true,
		originX: "center",
		originY: "center",
		left:obj.x,
		top:obj.y
	})
}

const containerId = 'container',
			canvasId = 'canvas', 
			maxWidth = 500, 
			maxHeight = 500;

document.body.innerHTML =
	`<div id=${containerId}>
			<canvas id=${canvasId}></canvas>
	 </div>
		`
const containerHtml = document.getElementById(containerId) as HTMLElement
const canvasHtml = document.getElementById(canvasId) as HTMLElement

jest.spyOn(containerHtml, 'clientHeight', 'get')
	.mockImplementation(()=>maxHeight);
jest.spyOn(containerHtml, 'clientWidth', 'get')
	.mockImplementation(() => maxWidth);

let canvas: Canvas
beforeEach(() => {
	(LineDrawer as any).mockClear()
	canvas = new Canvas(canvasId, containerId);
})

describe('Canvas should initialize properly',()=>{

	test('Call with wrong container id throws error',()=>{
		expect(()=>new Canvas(canvasId,'')).toThrow()
	})

	test('Initialize line Drawer',()=>{
		expect(LineDrawer).toHaveBeenCalledTimes(1)
	})

})

describe('Canvas should execute its methods',()=>{

	const coordenades = [{ x: 100, y: 100 }, { x:200, y:200 }, { x:300, y:300 }]
	const circles = [
		getCircle(coordenades[0]),
		getCircle(coordenades[1]),
		getCircle(coordenades[2])
	]
	const circleLineIntersectionData = {
		line: new fabric.Line([5, 10]),
		circle: new fabric.Circle({left: 100, top: 100, radius: 20}),
		result: {
			x: 85.4809463, 
			y: 86.2451070
		}
	}

	beforeEach(()=>{
		canvas.clear()
		canvas.add(circles[0])
		canvas.add(circles[1])
		canvas.add(circles[2])
	})

	test('Get objects intersection',()=>{
		const event = {pointer:coordenades[0]} as fabric.IEvent
		const circle = canvas.isMouseIntoObject(event,'Circle')
		expect(circle).toBe(circles[0])
	})

	test('Know if mouse is into object',()=>{
		const circleIntersect = getCircle(coordenades[0])
		canvas.add(circleIntersect)
		const circleRes = canvas.getObjectsIntersect(circleIntersect)
		expect(circleRes).toEqual([circles[0],circleIntersect])
	})

	test('Get circle-line intersection point', () => {
		const {line,circle,result} = circleLineIntersectionData
		expect(canvas.getCircleLineIntersection(line,circle).x).toBeCloseTo(result.x,6)
		expect(canvas.getCircleLineIntersection(line,circle).y).toBeCloseTo(result.y,6)
	})

})