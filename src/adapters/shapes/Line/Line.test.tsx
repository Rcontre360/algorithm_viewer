import LineDrawer from './index'
import Canvas from '../../Canvas'

jest.mock('../../Canvas')

const clearFields = (obj: { [x: string]: jest.Mock<any, any> }) => {
	Object.values(obj).forEach(fn => {
		try {
			fn.mockClear()
		} catch(err){
		}
	})
}

let drawer:LineDrawer
let canvas:Canvas;
beforeEach(()=>{
	(Canvas as any).mockClear()
	canvas = new Canvas('', '')
	clearFields(canvas as any)
	drawer = new LineDrawer(canvas)
})

describe('LineDrawer should initialize',()=>{

	test('Set canvas',()=>{
		expect(drawer._canvas).toBe(canvas)
	})

	test('Set mouse down event',()=>{
		expect(drawer._mouseDownHandler).toBeDefined()
	})

	test('Set mouse move event',()=>{
		expect(drawer._mouseMoveHandler).toBeDefined()
	})

	test('Set mouse up event',()=>{
		expect(drawer._mouseUpHandler).toBeDefined()
	})

})

describe('Line drawer should allow to draw lines with drawing events down, move and up',()=>{

	const mockEvent = { target: { left: 0, top: 0 }, pointer: {x: 0, y: 0 } } as fabric.IEvent

	test('Set all drawing events',()=>{
		drawer.setDrawingEvents()
		expect(canvas.on).toHaveBeenCalledWith('mouse:down',drawer._mouseDownHandler)
		expect(canvas.on).toHaveBeenCalledWith('mouse:move', drawer._mouseMoveHandler)
		expect(canvas.on).toHaveBeenCalledWith('mouse:up', drawer._mouseUpHandler)
	})

	test('Remove all drawing events',()=>{
		drawer.removeDrawingEvents()
		expect(canvas.off).toHaveBeenCalledWith('mouse:down', drawer._mouseDownHandler)
		expect(canvas.off).toHaveBeenCalledWith('mouse:move', drawer._mouseMoveHandler)
		expect(canvas.off).toHaveBeenCalledWith('mouse:up', drawer._mouseUpHandler)
	})

	test('Start line drawing on mouse down',()=>{
		drawer._onMouseDown(mockEvent)
		expect(canvas.add).toHaveBeenCalledTimes(1)
		expect(canvas.sendToBack).toHaveBeenCalledTimes(1)
		expect(drawer._line).toBeDefined()
	})

	test('Draw line when mouse moving after mouse down',()=>{
		drawer._onMouseDown(mockEvent)
		drawer._onMouseMove(mockEvent)
		expect(canvas.renderAll).toHaveBeenCalledTimes(1)
	})

	test('Dont draw line when mouse:down event has not been fired',()=>{
		drawer._onMouseMove(mockEvent)
		expect(canvas.renderAll).toHaveBeenCalledTimes(0)
	})

	test('Set event function mouse:down',()=>{
		const mockCallback = jest.fn(event=>{})
		drawer.on('mouse:down',mockCallback)
		expect(drawer._mouseDownHandler).toBeDefined()
		drawer._mouseDownHandler!(mockEvent)
		expect(mockCallback).toHaveBeenCalledWith(mockEvent,drawer._onMouseDown)
	})

	test('Set event function mouse:move', () => {
		const mockCallback = jest.fn(event => { })
		drawer.on('mouse:move', mockCallback)
		expect(drawer._mouseMoveHandler).toBeDefined()
		drawer._mouseMoveHandler!(mockEvent)
		expect(mockCallback).toHaveBeenCalledWith(mockEvent, drawer._onMouseMove)
	})

	test('Set event function mouse:up', () => {
		const mockCallback = jest.fn(event => { })
		drawer.on('mouse:up', mockCallback)
		expect(drawer._mouseUpHandler).toBeDefined()
		drawer._mouseUpHandler!(mockEvent)
		expect(mockCallback).toHaveBeenCalledWith(mockEvent, drawer._onMouseUp)
	})

})
