import {fabric} from 'fabric'

export class BaseCanvas extends fabric.Canvas {

	constructor(canvasId: string, canvasContainerId: string) {
		super(canvasId)
		const canvasContainer = document.getElementById(canvasContainerId) as HTMLElement;

		if (!canvasContainer){
			throw new Error('Base canvas should be called with canvas container id')
		}

		const {
			clientWidth,
			clientHeight
		} = canvasContainer

		this.setDimensions({
			width: clientWidth,
			height: clientHeight
		})

	}

	isMouseIntoObject = (event: fabric.IEvent, instance: "Circle" | "Object" | "Line" | "Rect"): fabric.Object | undefined => {

		const pointer = event.pointer as fabric.Point
		let mockOject: fabric.Object;

		if (instance === 'Line')
			mockOject = new fabric[instance]([pointer.x, pointer.y, pointer.x, pointer.y])
		else
			mockOject = new fabric[instance]({
				top: pointer.y,
				left: pointer.x,
			})

		const objectUnderMouse = this.getObjectsIntersect(mockOject,
			(obj: fabric.Object) => obj instanceof fabric[instance]
		)

		return objectUnderMouse[0]
	}

	getObjectsIntersect = (object: fabric.Object, condition ? : Function): fabric.Object[] => {

		const objIntersect: fabric.Object[] = []

		this.forEachObject(obj => {
			if (object.intersectsWithObject(obj)) {
				if (condition) {
					if (condition(obj))
						objIntersect.push(obj)
				} else {
					objIntersect.push(obj)
				}
			}
		})

		return objIntersect
	}

}

export default BaseCanvas