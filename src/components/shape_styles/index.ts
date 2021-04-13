import {
	fabric
} from 'fabric'

interface NodeStylesInterface {
	unactive: fabric.ICircleOptions,

}

interface EdgeStylesInterface {
	unactive: fabric.ILineOptions
}

export const NodeStyles: NodeStylesInterface = {
	unactive: {
		fill: "red",
		radius: 20,
		lockMovementX: true,
		lockMovementY: true,
		originX: "center",
		originY: "center"
	}
}

export const EdgeStyles: EdgeStylesInterface = {
	unactive: {
		stroke: "black",
		strokeWidth: 3
	}
}