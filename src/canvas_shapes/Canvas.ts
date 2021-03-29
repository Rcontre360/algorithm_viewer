import {fabric} from "fabric"

class Canvas extends fabric.Canvas{
	constructor(canvasId:string,canvasContainerId:string){
		const canvasContainer = document.getElementById("canvas_container") as HTMLElement;
		const { clientWidth, clientHeight } = canvasContainer

		super(canvasId,{width:clientWidth,height:clientHeight})
	}
}

export {
	Canvas
}