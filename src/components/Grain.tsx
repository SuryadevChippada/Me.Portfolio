import { useState } from "react";

interface GrainProps {
  opacity?: number;
}

const TILE_SIZE = 128;

function generateNoiseDataUrl(): string {
  const canvas = document.createElement("canvas");
  canvas.width = TILE_SIZE;
  canvas.height = TILE_SIZE;
  const ctx = canvas.getContext("2d")!;
  const imageData = ctx.createImageData(TILE_SIZE, TILE_SIZE);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const v = Math.random() * 255;
    imageData.data[i] = v;
    imageData.data[i + 1] = v;
    imageData.data[i + 2] = v;
    imageData.data[i + 3] = 255;
  }
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}

// Static noise tile drawn once to a canvas and reused as a repeating CSS
// background — cheaper than a full-viewport SVG filter, and avoids the
// visible origin-corner artifact feTurbulence's Perlin noise produces.
export function Grain({ opacity = 0.05 }: GrainProps) {
  const [dataUrl] = useState(generateNoiseDataUrl);

  return (
    <div
      className="grain"
      aria-hidden="true"
      style={{
        opacity,
        backgroundImage: `url(${dataUrl})`,
        backgroundRepeat: "repeat",
        backgroundSize: `${TILE_SIZE}px ${TILE_SIZE}px`,
      }}
    />
  );
}
