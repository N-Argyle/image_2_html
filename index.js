const sharp = require('sharp');

const main = async (width, height, blurAmount, buffer) => {
  const { data, info } = await sharp(buffer)
    .removeAlpha()
    .raw()
    .blur(10)
    .resize(width)
    .toBuffer({ resolveWithObject: true });

  const rgbFlat = [...data].map((d) => parseInt(d));
  const numberPixels = info.width * info.height;
  const rgbGrouped = [];

  // Initialize an array with correct number of pixel subarrays
  for (let i = 0; i < numberPixels; i++) {
    rgbGrouped.push([]);
  }

  // Push rgb pixel data to correct subarray
  for (let i = 0; i < rgbFlat.length; i++) {
    rgbGrouped[Math.floor(i / 3)].push(rgbFlat[i]);
  }

  const gradientPoints = [
    [...rgbGrouped[0]],
    [...rgbGrouped[Math.floor((numberPixels / 16) * 2)]],
    [...rgbGrouped[Math.floor((numberPixels / 16) * 3)]],
    [...rgbGrouped[Math.floor((numberPixels / 16) * 4)]],
    [...rgbGrouped[Math.floor((numberPixels / 16) * 5)]],
    [...rgbGrouped[Math.floor((numberPixels / 16) * 6)]],
    [...rgbGrouped[Math.floor((numberPixels / 16) * 7)]],
    [...rgbGrouped[Math.floor((numberPixels / 16) * 8)]],
    [...rgbGrouped[Math.floor((numberPixels / 16) * 9)]],
    [...rgbGrouped[Math.floor((numberPixels / 16) * 10)]],
    [...rgbGrouped[Math.floor((numberPixels / 16) * 11)]],
    [...rgbGrouped[Math.floor((numberPixels / 16) * 12)]],
    [...rgbGrouped[Math.floor((numberPixels / 16) * 13)]],
    [...rgbGrouped[Math.floor((numberPixels / 16) * 14)]],
    [...rgbGrouped[Math.floor((numberPixels / 16) * 15)]],
    [...rgbGrouped[Math.floor(numberPixels - 1)]],
  ];

  const id = 'canv_' + Math.random().toString(36).substring(7);

  let nodes = '';

  gradientPoints.forEach((g, i) => {
    const suID = 'canv_pixel_' + Math.random().toString(36).substring(7);
    let xOffset;
    let yOffset;
    switch (i) {
      case 1:
        xOffset = 0;
        yOffset = 0;
        break;
      case 1:
        xOffset = 0.25;
        yOffset = 0;
        break;
      case 2:
        xOffset = 0.5;
        yOffset = 0;
        break;
      case 3:
        xOffset = 0.75;
        yOffset = 0;
        break;
      case 4:
        xOffset = 0;
        yOffset = 0.25;
        break;
      case 5:
        xOffset = 0.25;
        yOffset = 0.25;
        break;
      case 6:
        xOffset = 0.5;
        yOffset = 0.25;
        break;
      case 7:
        xOffset = 0.75;
        yOffset = 0.25;
        break;
      case 8:
        xOffset = 0;
        yOffset = 0.5;
        break;
      case 9:
        xOffset = 0.25;
        yOffset = 0.5;
        break;
      case 10:
        xOffset = 0.5;
        yOffset = 0.5;
        break;
      case 11:
        xOffset = 0.75;
        yOffset = 0.5;
        break;
      case 12:
        xOffset = 0;
        yOffset = 0.75;
        break;
      case 13:
        xOffset = 0.25;
        yOffset = 0.75;
        break;
      case 14:
        xOffset = 0.5;
        yOffset = 0.75;
        break;
      case 15:
        xOffset = 0.75;
        yOffset = 0.75;
        break;
      default:
        xOffset = 0;
        yOffset = 0;
        break;
    }
    nodes += `
      const ${suID} = c.getContext("2d");
      ${suID}.beginPath();
      ${suID}.rect(${xOffset} * c.width, ${yOffset} * c.height, .25 * c.width, .25 * c.height);
      ${suID}.fillStyle = 'rgb(${gradientPoints[i].toString()})';
      ${suID}.fill();
    `;
  });

  const canvas = `
    <div style="height: 350px; width: 500px; background: rgb(${gradientPoints[7].toString()}); overflow: hidden;">
      <div style=" width: 100%; height: 100%;filter: blur(${blurAmount}px);">
        <canvas id="${id}" style="height: ${height}px; width: ${width}px;"></canvas>
        <script>
          const c = document.getElementById("${id}");
          ${nodes}
        </script>
      </div>
    </div>
  `;

  return canvas;
};

module.exports = main();