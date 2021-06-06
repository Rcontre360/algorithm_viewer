import { NodesEdges } from '@shared/components/Canvas/graph'
import { BFSReturn } from '@core/algorithms/BFS'
import {nodeStyles,edgeStyles} from '@shared/styles'

interface PainterArguments {
	output: BFSReturn[];
	speed: number;
	changeNodesEdges: (handler: (draft: NodesEdges) => void) => void;
}

const BFSPainter = (out: BFSReturn[] | BFSReturn, index: number) =>

	({ nodes, edges }: NodesEdges) => {
		console.log(out, index)
		if (Array.isArray(out)) {
			const outArray = out as BFSReturn[]
			outArray.forEach(graphNode => {
				nodes[graphNode.from] = {...nodes[graphNode.from],...nodeStyles.visited};
				nodes[graphNode.to] = {...nodes[graphNode.to],...nodeStyles.visited};;
				edges[graphNode.edgeIndex as number] = {...edges[graphNode.edgeIndex as number], ...edgeStyles.active}
			})
		} else {
			if (out.role==='current')
				nodes[out.to] = {...nodes[out.to],...nodeStyles.active}
			else 
				nodes[out.to] = {...nodes[out.to],...nodeStyles.unactive}

			if (out.edgeIndex !== undefined)
				edges[out.edgeIndex] = { ...edges[out.edgeIndex],...edgeStyles.unactive}
		}

	}

const PainterHandler = ({ output, changeNodesEdges, speed }: PainterArguments) => {
	const unactive: (BFSReturn[] | BFSReturn)[] = [];

	output.forEach(out => {
		if (out.role === 'current') {
			unactive.push(out);
			unactive.push([]);
		} else if (out.role === 'poped') {
			unactive.push(out);
		} else {
			const last = unactive.length - 1;
			(unactive[last] as BFSReturn[]).push(out);
		}
	});

	unactive.forEach((out, index) => {
		setTimeout(changeNodesEdges, speed * index, BFSPainter(out, index))
	})

}

export default PainterHandler