import { NodesEdges } from '../../Canvas/GraphCanvas'

interface PainterArguments {
	output: unknown[];
	changeNodesEdges: () => void;
	speed: number;
}

const NEWPainter = ({ output, changeNodesEdges, speed }: PainterArguments) => {

}

const DFSPainter = (val: any, index: number) =>

	({ nodes, edges }: NodesEdges) => {

		if (val.from === -1) {
			return nodes[val.to].fill = 'red'
		}

		if (val.to === -1) {
			return nodes[val.from].fill = 'grey'
		}

		if (val.forward) {
			if (val.edgeIndex !== undefined)
				edges[val.edgeIndex].stroke = 'orange'
			nodes[val.from].fill = 'yellow'
			nodes[val.to].fill = 'red'
		} else {
			if (val.edgeIndex !== undefined)
				edges[val.edgeIndex].stroke = 'grey'
			nodes[val.from].fill = 'grey'
			nodes[val.to].fill = 'red'
		}

	}

export default DFSPainter