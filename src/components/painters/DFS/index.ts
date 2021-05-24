import { NodesEdges } from '../../Canvas/GraphCanvas'
import { DFSReturn } from '../../../core/algorithms/DFS'

interface PainterArguments {
	output: DFSReturn[];
	speed: number;
	changeNodesEdges: (handler: (draft: NodesEdges) => void) => void;
}

const DFSPainter = (val: DFSReturn, index: number) =>

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

const PaintHandler = ({ output, changeNodesEdges, speed }: PainterArguments) => {
	output.forEach((out, index) => {
		setTimeout(() => {
			changeNodesEdges(DFSPainter(out, index))
		}, speed * index)
	})
}

export default PaintHandler