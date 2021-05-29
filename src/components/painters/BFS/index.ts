import { NodesEdges } from '../../Canvas/GraphCanvas'
import { BFSReturn } from '../../../core/algorithms/BFS'

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
				nodes[graphNode.from].fill = 'red';
				nodes[graphNode.to].fill = 'orange';
				edges[graphNode.edgeIndex as number].stroke = 'yellow';
			})
		} else {
			nodes[out.to].fill = out.role === 'current' ? 'red' : 'grey';
			if (out.edgeIndex !== undefined)
				edges[out.edgeIndex].stroke = 'black'
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