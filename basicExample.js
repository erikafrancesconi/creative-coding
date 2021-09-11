const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [2048, 2048],
  // units: "cm", // default sono pixels
  // dimensions: "A4", // Formato stampa
  // pixelsPerInch: 300,
  // orientation: "landscape",
};

const sketch = () => {
  return ({ context, width, height }) => {
    // width e height sono la dimensione del canvas
    // si possono usare per dimensioni relative
    // console.log(width);
    // console.log(height);

    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.beginPath();
    context.arc(width / 2, height / 2, width * 0.1, 0, Math.PI * 2, false);
    context.fillStyle = "red";
    context.fill();

    context.lineWidth = 20;
    context.strokeStyle = "blue";
    context.stroke();
  };
};

canvasSketch(sketch, settings);
