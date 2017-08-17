const canvas = document.querySelector('#draw');
const ctx  = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.innerHeight = window.innerHeight;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 40;

let isDrawing = false;
let mouseOutWhileDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

var draw = function(e){
	if(!isDrawing){
		return;
	}
	ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
	ctx.beginPath();
	ctx.moveTo(lastX, lastY);
	ctx.lineTo(e.offsetX, e.offsetY);
	ctx.lineWidth = 
	ctx.stroke();
	[lastX,lastY] = [e.offsetX,e.offsetY];
	hue = hue > 360 ? 0 : hue + 1;
	if(ctx.lineWidth > 40 || ctx.lineWidth <= 1){
		direction = !direction;
	}
	ctx.lineWidth = direction ? ctx.lineWidth + 1 : ctx.lineWidth -1; 
}

document.addEventListener('mousemove', draw);
document.addEventListener('mousedown', (e) => {
	isDrawing = true;
	[lastX,lastY]  = [e.offsetX,e.offsetY];
});
document.addEventListener('mouseout', () => {
	mouseOutWhileDrawing = isDrawing;
	isDrawing = false;
});

document.addEventListener('mouseover', () => {
	isDrawing = mouseOutWhileDrawing;
});

document.addEventListener('mouseup', () => {
	isDrawing = false;
	mouseOutWhileDrawing = false;
});
