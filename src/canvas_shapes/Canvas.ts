import {fabric} from "fabric"

interface CanvasInterface extends fabric.Canvas{
	allowAddNode():void,
	forbidAddNode():void
}

class Canvas extends fabric.Canvas implements CanvasInterface {

	private addNodeHandler: ((event: fabric.IEvent) => void) = (event:fabric.IEvent) => {console.log("epa")}

	constructor(canvasId:string,canvasContainerId:string){
		super(canvasId)

		const canvasContainer = document.getElementById("canvas_container") as HTMLElement;
		const { clientWidth, clientHeight } = canvasContainer

		this.setDimensions({ width: clientWidth, height: clientHeight })
		this.on("mouse:down", this.addNodeHandler)
	}
	allowAddNode():void{
		this.addNodeHandler = (event:fabric.IEvent):void => {
			let { pointer } = event
			const circle = new fabric.Circle({
				fill: "red",
				radius: 20,
				top: pointer ? pointer.y : 100,
				left: pointer ? pointer.x : 100,
				lockMovementX: true,
				lockMovementY: true,
			})
			this.add(circle)
			console.log("circle added")
		}
		console.log("circle added")
	}
	forbidAddNode():void{
		this.addNodeHandler = (event:fabric.IEvent):void=>{}
		this.on("event:dragover",event=>{
			console.log("dragover",event)
		})
	}
}

export {
	Canvas
}