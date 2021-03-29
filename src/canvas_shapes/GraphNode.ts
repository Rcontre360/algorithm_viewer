import {fabric} from "fabric"

fabric.Circle.prototype.originX = fabric.Circle.prototype.originY = 'center';

export const colorGraphNode = (canvas:fabric.Canvas)=>
	(nodeData:fabric.Object, index:number) => {
		setTimeout(() => {
			nodeData.setOptions({
				strokeWidth: 5,
				fill: 'red',
				stroke: 'blue'
			})
			canvas.renderAll()
		}, 800 * (index + 1))
	}

export const connectCircleNodes:Function = (canvas:fabric.Canvas):Function=>
	(circleSource:fabric.Circle,circleDest:fabric.Circle):void=>{

	type coordenades = {top:number,left:number}
	const eventToCoordenades = (event:fabric.IEvent):coordenades=>{
		const p = event.transform as unknown
		const target = p as { left: number, top: number }
		return {top:target.top,left:target.left}
	}

	const linePosition:number[] = [
		circleSource.left || 100,
		circleSource.top || 100,
		circleDest.left || 100,
		circleDest.top || 100
	]

	const line = new fabric.Line(linePosition, {
		stroke: "red", width: 50, objectCaching: false
	})

	circleSource.on("moving", event => {
		const pos = eventToCoordenades(event)
		line.set({ 'x1': pos.left, 'y1': pos.top });
	})

	circleDest.on("moving",event=>{
		const pos = eventToCoordenades(event)
		line.set({ 'x2': pos.left, 'y2': pos.top });
	})

	canvas.add(line)
}