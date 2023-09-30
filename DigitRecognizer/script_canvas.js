// JavaScript to handle the drawing functionality

const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clear-button');
const canvasImage = document.getElementById('imgdraw');

let drawing = false;

// Set up event listeners
canvas.addEventListener('mousedown', () => {
    drawing = true;
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath();
    updateCanvasImage();
});

canvas.addEventListener('mousemove', draw);

clearButton.addEventListener('click', clearCanvas);

// Drawing function
function draw(e) {
    if (!drawing) return;

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';

    ctx.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
}

// Clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('imgboxdraw').style.display = 'none';
    canvasImage.src = "";
    document.getElementsByTagName('body')[0].classList = 'p-3 mb-2';
}

function updateCanvasImage() {
    const imageDataURL = canvas.toDataURL();
    document.getElementById('imgboxdraw').style.display = 'block';
    document.getElementsByTagName('body')[0].classList = 'p-3 mb-2 bg-success-subtle';
    canvasImage.src = imageDataURL;
}