import BaseCanvas from './index'

const containerId = 'container',
	width=222, height = 222,
	canvasId = 'canvas';

describe('BaseCanvas should initialize properly',()=>{

	document.body.innerHTML =
		`<div id='${containerId}>
			<canvas id=${canvasId}></canvas>
		 </div>
		`

	let canvas:BaseCanvas
	beforeEach(()=>{
		canvas = new BaseCanvas(canvasId,containerId)
	})

	test('Call with wrong container id throws error',()=>{
		expect(()=>new BaseCanvas(canvasId,'')).toThrow()
	})

	test('Canvas fit within container',()=>{
		console.log(canvas.height,canvas.width)
	})

})