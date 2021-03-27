import {fabric} from "fabric"
import {Canvas} from "./shapes"

const pointArr:fabric.Point[] = [new fabric.Point(10,10),new fabric.Point(100,100)] 

var rect = new fabric.Line([50, 100, 200, 200,250,250,300,300], {
	left: 170,
	top: 150,
	stroke: 'red'
})

Canvas.add(rect)
 
