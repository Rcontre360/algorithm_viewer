interface IGraphCanvasArgs {
	canvasId: string;
	containerId: string;
	nodeStyles: INodeStyles;
	edgeStyles: IEdgeStyles
}

interface INodeStyles {
	unactive: fabric.ICircleOptions;
	active: fabric.ICircleOptions;
	visited: fabric.ICircleOptions;
}

interface IEdgeStyles {
	unactive: fabric.ILineOptions;
	active: fabric.ICircleOptions;
	visited: fabric.ICircleOptions;
}

export type {
	IGraphCanvasArgs,
	INodeStyles,
	IEdgeStyles
}