import { NodesEdges } from '../../Canvas/GraphCanvas'
import { DFSReturn } from '../../../core/algorithms/DFS'
import {edgeStyles,nodeStyles} from '../../shape_styles'

interface PainterArguments {
	output: DFSReturn[];
	speed: number;
	changeNodesEdges: (handler: (draft: NodesEdges) => void) => void;
}

const DFSPainter = (val: DFSReturn, index: number) =>

	({ nodes, edges }: NodesEdges) => {

		if (val.from === -1) {
			return nodes[val.to] = { ...nodes[val.to],...nodeStyles.active }
		}

		if (val.to === -1) {
			return nodes[val.from] = { ...nodes[val.from],...nodeStyles.unactive }
		}

		if (val.forward) {
			if (val.edgeIndex !== undefined) {
				console.log('edge', val.edgeIndex, 'active')
				edges[val.edgeIndex] = { ...edges[val.edgeIndex], ...edgeStyles.active }
			}

			nodes[val.from] = { ...nodes[val.from], ...nodeStyles.visited }
			nodes[val.to] = { ...nodes[val.to], ...nodeStyles.active }
		} else {
			if (val.edgeIndex !== undefined) {
				console.log('edge', val.edgeIndex, 'unactive')
				edges[val.edgeIndex] = { ...edges[val.edgeIndex], ...edgeStyles.unactive }
			}
			nodes[val.from] = { ...nodes[val.from], ...nodeStyles.unactive }
			nodes[val.to] = { ...nodes[val.to], ...nodeStyles.active }
		}

	}

const PaintHandler = ({ output, changeNodesEdges, speed }: PainterArguments) => {
	output.forEach((out, index) => {
		setTimeout(changeNodesEdges, speed * index, DFSPainter(out, index))
	})
}

export default PaintHandler