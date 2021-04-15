import { fabric } from "fabric"

interface ILineDrawn {
	nodeSrc: number;
	nodeDest: number;
	line: fabric.Line;
}

//thanks to farnabaz (https://gist.github.com/farnabaz) for the render method.
class Arrow extends fabric.Line {

	constructor(e: number[], t: fabric.ILineOptions) {
		super(e, t)
	}

	static fromObject = (e: any) => {
		var n = [e.x1, e.y1, e.x2, e.y2];
		return new Arrow(n, e)
	}

	_render = (event: CanvasRenderingContext2D) => {
		event.beginPath();
		const r = this.calcLinePoints();
		const headlen = 25;
		const angle = Math.atan2(r.y2 - r.y1, r.x2 - r.x1);
		event.moveTo(r.x1, r.y1);
		event.lineTo(r.x2, r.y2);
		event.lineTo(r.x2 - headlen * Math.cos(angle - Math.PI / 6), r.y2 - headlen * Math.sin(angle - Math.PI / 6));
		event.moveTo(r.x2, r.y2);
		event.lineTo(r.x2 - headlen * Math.cos(angle + Math.PI / 6), r.y2 - headlen * Math.sin(angle + Math.PI / 6));

		event.lineWidth = this.strokeWidth as number;
		var s = event.strokeStyle;
		event.strokeStyle = this.stroke || event.fillStyle, this.stroke && this._renderStroke(event), event.strokeStyle = s
	}

}

export default Arrow