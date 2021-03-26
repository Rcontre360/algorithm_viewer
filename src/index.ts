const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement

const ctx =  myCanvas.getContext('2d');
const varObject = "my new var"
 

ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 100, 100);
