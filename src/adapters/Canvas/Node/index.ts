import { fabric } from 'fabric'

interface INodeOptions extends fabric.IGroupOptions {
	nodeIndex: number;
}

class NodeClass extends fabric.Group {
	index: number = 0;

	constructor(circle: fabric.Circle, text: fabric.Text, options ? : INodeOptions) {
		super([circle, text], options)

		if (options)
			this.index = options.nodeIndex
	}

}

const Node = (nodeIndex: number, options ? : INodeOptions) => {
	const circle = new fabric.Circle();
	const text = new fabric.Text(String(nodeIndex));
	return new NodeClass(circle, text, { ...options, nodeIndex })
}

export default Node