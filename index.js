const sharp = require('sharp');

module.exports = async (width, height, blurAmount, buffer) => {
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

  const gradient = `
    <div style="height: ${height}px; width: ${width}px; overflow: hidden;">
      <div style="background: rgb(${gradientPoints[7].toString()}); width: 100%; height: 100%;">
        <div style="display: flex; width: 100%; height: 100%; flex-wrap: wrap; filter: blur(${blurAmount}px);">
          <div style="background: rgb(${gradientPoints[0].toString()}); width: 25%; height: 25%"></div>
          <div style="background: rgb(${gradientPoints[1].toString()}); width: 25%; height: 25%"></div>
          <div style="background: rgb(${gradientPoints[2].toString()}); width: 25%; height: 25%"></div>
          <div style="background: rgb(${gradientPoints[3].toString()}); width: 25%; height: 25%"></div>
          <div style="background: rgb(${gradientPoints[4].toString()}); width: 25%; height: 25%"></div>
          <div style="background: rgb(${gradientPoints[5].toString()}); width: 25%; height: 25%"></div>
          <div style="background: rgb(${gradientPoints[6].toString()}); width: 25%; height: 25%"></div>
          <div style="background: rgb(${gradientPoints[7].toString()}); width: 25%; height: 25%"></div>
          <div style="background: rgb(${gradientPoints[8].toString()}); width: 25%; height: 25%"></div>
          <div style="background: rgb(${gradientPoints[9].toString()}); width: 25%; height: 25%"></div>
          <div style="background: rgb(${gradientPoints[10].toString()}); width: 25%; height: 25%"></div>
          <div style="background: rgb(${gradientPoints[11].toString()}); width: 25%; height: 25%"></div>
          <div style="background: rgb(${gradientPoints[12].toString()}); width: 25%; height: 25%"></div>
          <div style="background: rgb(${gradientPoints[13].toString()}); width: 25%; height: 25%"></div>
          <div style="background: rgb(${gradientPoints[14].toString()}); width: 25%; height: 25%"></div>
          <div style="background: rgb(${gradientPoints[15].toString()}); width: 25%; height: 25%"></div>
        </div>
      </div>
    </div>
  `;

  return gradient;
};
