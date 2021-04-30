import {fabric} from 'fabric'
import LineDrawer from '../shapes/Line'

export class BaseCanvas extends fabric.Canvas {
	drawer:LineDrawer | undefined 

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
		this.drawer = new LineDrawer(this)
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

	getCircleLineIntersection = (line: fabric.Line, circle: fabric.Circle) => {
		const x1 = line.x1 as number,
			y1 = line.y1 as number,
			x2 = circle.left as number,
			y2 = circle.top as number;
		let radius = circle.radius as number;

		const angle = (y1 - y2) / (x1 - x2)
		const powAngle = Math.pow(angle, 2)

		if (x2 < x1)
			radius *= -1

		const intersectionX = x2 - (radius / Math.sqrt(1 + powAngle));
		const intersectionY = angle * (intersectionX - x2) + y2

		return { x: intersectionX, y: intersectionY }
	}

}

export default BaseCanvas