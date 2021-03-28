import {fabric} from "fabric"
const {Circle} = fabric

interface GraphInterface<T extends unknown> {
	addNode(node:T):void,
	connectNodes(src:number,dest:number):void,
	deleteNode(node:number):void,
	getNodeData(node:number):T,
	getNodeConnections(node:number):number[],
	getNumberOfElements():number
}

interface GraphOptions<T extends unknown>{
  onConnect?(nodeSourceData,nodeDestData):void,
  onAddNode?(nodeData):void
}

class Graph<T extends unknown> implements GraphInterface<T> {
	private nodes:number[][] = []
	private nodeData:T[] = []
	private numberOfElements:number = 0
  private options:GraphOptions<T> = {}

	constructor(nodes?:number[][],nodeData?:T[],options?:GraphOptions<T>){
		if (nodes && nodeData){
			this.numberOfElements = nodes.length
			this.nodes = [...nodes]
			this.nodeData = [...nodeData]

      if (options)
        this.options = options

      if (options.onConnect){
        this.applyOnConnect()
      }
		}
	}

  private applyOnConnect(){
    this.nodes.forEach((connections, index) => {

      connections.forEach(nodeIndex => {
        const nodeSrc = this.nodeData[index]
        const nodeDest = this.nodeData[nodeIndex]

        this.applyOptions("onConnect", nodeSrc, nodeDest)
        this.applyOptions("onConnect", nodeDest, nodeSrc)
      })

    })
  }

  private applyOptions(type:string,...args:unknown[]){
    if (this.options[type] && this.options[type] instanceof Function)
      this.options[type](...args)
  }

  setGraphOptions(newOptions:GraphOptions<T> | Function) {
    if (newOptions instanceof Function)
      this.options = newOptions(this.options)
    else
      this.options = newOptions
  }

	addNode(nodeAdded:T):void{
    this.applyOptions("onAddNode",nodeAdded)
		this.numberOfElements++;
		this.nodeData.push(nodeAdded)
		this.nodes.push([])
	}

	connectNodes(nodeSource:number,nodeDest:number):void{
    const sourceData = this.nodeData[nodeSource]
    const destData = this.nodeData[nodeDest]
    this.applyOptions("onConnect",sourceData,destData)

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

    this.numberOfElements--
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