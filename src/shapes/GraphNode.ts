import {fabric} from "fabric"

fabric.Circle.prototype.originX = fabric.Circle.prototype.originY = 'center';

export const connectCircleNodes:Function = (canvas):Function=>
	(circleSource,circleDest):void=>{

	const linePosition:number[] = [
		circleSource.left,circleSource.top,
		circleDest.left,circleDest.top
	]

	const line = new fabric.Line(linePosition, {
		stroke: "red", width: 50, objectCaching: false
	})

	circleSource.on("moving", event => {
		const p = event.transform.target
		line.set({ 'x1': p.left, 'y1': p.top });
	})

	circleDest.on("moving",event=>{
		const p = event.transform.target
		line.set({ 'x2': p.left, 'y2': p.top });
	})

	canvas.add(line)
}