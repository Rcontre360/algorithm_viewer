import { fabric } from 'fabric'
import grey from "@material-ui/core/colors/grey";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";

export const nodeStyles = {
	unactive: {
		fill: grey['700'],
		borderColor: green['100'],
	},
	active: {
		fill: red['300'],
		borderColor: red['100']
	},
	visited: {
		fill: purple['300'],
		borderColor: purple['100']
	}
}

export const edgeStyles = {
	unactive: {
		stroke: grey['700'],
	},
	active: {
		stroke: red['300'],
	},
	visited: {
		stroke: purple['300'],
	}
}