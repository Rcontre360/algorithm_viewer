import {fabric} from "fabric"

const canvas:any = new fabric.Canvas('main_canvas');
const container:HTMLElement = document.getElementById("canvas_container")

canvas.setHeight(container.clientHeight);
canvas.setWidth(container.clientWidth);

export default canvas
