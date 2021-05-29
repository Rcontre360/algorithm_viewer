import { fabric } from 'fabric'

export const nodeStyles = {
	unactive: {
		fill: "blue",
		radius: 20,
		lockMovementX: true,
		lockMovementY: true,
		originX: "center",
		originY: "center",
		borderColor: 'lightblue'
	},
	active: {
		fill: "orange",
		radius: 20,
		lockMovementX: true,
		lockMovementY: true,
		originX: "center",
		originY: "center",
		borderColor: 'red'
	},
	visited: {
		fill: "lightgrey",
		radius: 20,
		lockMovementX: true,
		lockMovementY: true,
		originX: "center",
		originY: "center",
		borderColor: 'grey'
	}
}

export const edgeStyles = {
	unactive: {
		stroke: "black",
		strokeWidth: 3
	},
	active: {
		stroke: "orange",
		strokeWidth: 4
	},
	visited: {
		stroke: 'black',
		strokeWidth: 3
	}
}