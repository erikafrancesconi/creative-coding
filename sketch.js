const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math"); // Linear interpolation
const random = require("canvas-sketch-util/random");
const pallettes = require("nice-color-palettes");

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  const palette = random.pick(pallettes);
  console.log(palette);

  const createGrid = () => {
    const points = [];
    const count = 40;

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        // Mappatura UV (top left 0/0, bottom/right vicino a 1/1)
        const u = count <= 1 ? 0.5 : x / (count - 1); // Dividendo per count - 1 invece che per count si arriva a 1
        const v = count <= 1 ? 0.5 : y / (count - 1); // Se count è = 1 lo mettiamo in mezzo (0.5/0.5)
        const radius = Math.abs(random.noise2D(u, v)) * 0.1;

        points.push({
          color: random.pick(palette),
          radius,
          rotation: random.noise2D(u, v),
          position: [u, v],
        });
      }
    }
    return points;
  };

  // random.setSeed("erika"); // Impostando un seme ho la garanzia di avere lo stesso risultato ogni volta che ricarico la pagina
  const points = createGrid().filter(() => random.value() > 0.5);
  // console.log(points);

  return ({ context, width, height }) => {
    const margin = 400;

    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    points.forEach((data) => {
      const { position, radius, color, rotation } = data;
      const [u, v] = position;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      // context.beginPath();
      // context.arc(x, y, radius * width, 0, Math.PI * 2);
      // context.strokeStyle = "black";
      // context.lineWidth = 20;
      // context.fillStyle = color;
      // context.fill();

      // Questo va fatto prima di una rotazione o di una modifica al canvas
      // Perchè altrimenti il canvas si ricorda lo stato e riparte da quella modifica lì
      context.save();

      context.fillStyle = color;
      context.font = `${radius * width}px Helvetica`;
      context.translate(x, y); // Dato che la rotazione parte da top left lo spostiamo altrimenti non si vede
      context.rotate(rotation);
      context.fillText("=", 0, 0);

      // Questo lo riporta allo stato iniziale, così che le prossime trasformazioni
      // Possano ripartire da lì
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
