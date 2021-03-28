import {fabric} from "fabric"
const {Circle} = fabric

interface GraphInterface<T extends Object>{
	addNode(node:T):void,
	connectNodes(src:number,dest:number):void,
	deleteNode(node:number):void,
	getNodeData(node:number):T,
	getNodeConnections(node:number):number[],
	getNumberOfElements():number
}

class Graph<T extends Object> implements GraphInterface<T> {
	private nodes:number[][]
	private nodeData:T[]
	private numberOfElements:number

	constructor(nodes?:number[][],nodeData?:T[]){
		if (nodes && nodeData){
			this.numberOfElements = nodes.length
			this.nodes = [...nodes]
			this.nodeData = [...nodeData]
		}
	}

	addNode(nodeAdded:T):void{
		this.numberOfElements++;
		this.nodeData.push(nodeAdded)
		this.nodes.push([])
	}

	connectNodes(nodeSource:number,nodeDest:number):void{
		this.nodes[nodeSource].push(nodeDest)
		this.nodes[nodeDest].push(nodeSource)
	}

	deleteNode(nodeDeleted:number):void{
		if (this.numberOfElements<=nodeDeleted)
			return
		this.nodes[nodeDeleted] = null
		this.nodes.forEach((nodeConnections,index)=>{
			if (nodeConnections)
				this.nodes[index] = nodeConnections.filter(nodeIndex => nodeIndex !== nodeDeleted)
		})
		this.nodeData[nodeDeleted] = null
	}

	getNodeData(nodeIndex:number):T{
		if (this.numberOfElements<=nodeIndex)
			return null
		return this.nodeData[nodeIndex]
	}

	getNodeConnections(nodeIndex:number):number[]{
		return this.nodes[nodeIndex]
	}

	getNumberOfElements():number{
		return this.numberOfElements 
	}
}

export {
	Graph
}


/*
(function() {
  var canvas = this.__canvas = new fabric.Canvas('c', { selection: false });
  fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

  function makeCircle(left, top, line1, line2, line3, line4) {
    var c = new fabric.Circle({
      left: left,
      top: top,
      strokeWidth: 5,
      radius: 12,
      fill: '#fff',
      stroke: '#666'
    });
    c.hasControls = c.hasBorders = false;

    c.line1 = line1;
    c.line2 = line2;
    c.line3 = line3;
    c.line4 = line4;

    return c;
  }

  function makeLine(coords) {
    return new fabric.Line(coords, {
      fill: 'red',
      stroke: 'red',
      strokeWidth: 5,
      selectable: false,
      evented: false,
    });
  }

  var line = makeLine([ 250, 125, 250, 175 ]),
      line2 = makeLine([ 250, 175, 250, 250 ]),
      line3 = makeLine([ 250, 250, 300, 350]),
      line4 = makeLine([ 250, 250, 200, 350]),
      line5 = makeLine([ 250, 175, 175, 225 ]),
      line6 = makeLine([ 250, 175, 325, 225 ]);

  canvas.add(line, line2, line3, line4, line5, line6);

  canvas.add(
    makeCircle(line.get('x1'), line.get('y1'), null, line),
    makeCircle(line.get('x2'), line.get('y2'), line, line2, line5, line6),
    makeCircle(line2.get('x2'), line2.get('y2'), line2, line3, line4),
    makeCircle(line3.get('x2'), line3.get('y2'), line3),
    makeCircle(line4.get('x2'), line4.get('y2'), line4),
    makeCircle(line5.get('x2'), line5.get('y2'), line5),
    makeCircle(line6.get('x2'), line6.get('y2'), line6)
  );

  canvas.on('object:moving', function(e) {
    var p = e.target;
    p.line1 && p.line1.set({ 'x2': p.left, 'y2': p.top });
    p.line2 && p.line2.set({ 'x1': p.left, 'y1': p.top });
    p.line3 && p.line3.set({ 'x1': p.left, 'y1': p.top });
    p.line4 && p.line4.set({ 'x1': p.left, 'y1': p.top });
    canvas.renderAll();
  });
})();

*/