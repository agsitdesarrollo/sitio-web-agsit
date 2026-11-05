import type { StoryVector, StoryVectorLayer } from './marketing-story.shapes';
export type StorySamples = { rest: Float32Array; parts: Uint8Array; edges: Uint8Array; phases: Float32Array };
const cache = new WeakMap<StoryVector,Map<string,StorySamples>>();
const RESOLUTION = 512;
let surface: OffscreenCanvas | HTMLCanvasElement | undefined;
/** One offscreen vector rasterization per vector/budget/display size; never runs in the draw loop. */
export function sampleStoryVector(vector: StoryVector, budget: number, displaySize: number): StorySamples {
  const key = `${budget}:${Math.max(1,Math.round(displaySize))}`;
  let sizes = cache.get(vector); if (!sizes) { sizes = new Map(); cache.set(vector,sizes); }
  const cached = sizes.get(key); if (cached) return cached;
  surface ||= typeof OffscreenCanvas !== 'undefined' ? new OffscreenCanvas(RESOLUTION,RESOLUTION) : Object.assign(document.createElement('canvas'),{ width: RESOLUTION, height: RESOLUTION });
  const ctx = surface.getContext('2d',{ willReadFrequently: true }) as OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D;
  const result: StorySamples = { rest: new Float32Array(budget * 2), parts: new Uint8Array(budget), edges: new Uint8Array(budget), phases: new Float32Array(budget) };
  result.parts.fill(255);
  const weight = vector.layers.reduce((total,layer) => total + layer.weight,0);
  let offset = 0;
  vector.layers.forEach((layer: StoryVectorLayer,layerIndex) => {
    const quota = Math.min(budget - offset,Math.floor(budget * layer.weight / weight));
    if (quota < 1) return;
    ctx.setTransform(1,0,0,1,0,0); ctx.clearRect(0,0,RESOLUTION,RESOLUTION);
    ctx.setTransform(RESOLUTION / 1000,0,0,RESOLUTION / 1000,0,0);
    if (layer.mirror) { ctx.translate(1000,0); ctx.scale(-1,1); }
    ctx.fillStyle = '#fff'; ctx.fill(new Path2D(layer.d),layer.rule || 'nonzero');
    const mask = ctx.getImageData(0,0,RESOLUTION,RESOLUTION).data;
    let area = 0; for (let i = 3; i < mask.length; i += 4) if (mask[i] > 127) area++;
    const path = document.createElementNS('http://www.w3.org/2000/svg','path'); path.setAttribute('d',layer.d);
    const length = path.getTotalLength(), contourCount = Math.min(quota,Math.round(quota * (layer.contour ?? .33)));
    const contour = new Float32Array(contourCount * 2);
    for (let i = 0; i < contourCount; i++) {
      const point = path.getPointAtLength((i + .5) / contourCount * length);
      contour[i * 2] = (layer.mirror ? 1000 - point.x : point.x) / 1000;
      contour[i * 2 + 1] = point.y / 1000;
    }
    const interiorQuota = quota - contourCount;
    const rawStep = Math.sqrt(area / (RESOLUTION * RESOLUTION) / Math.max(1,interiorQuota) / (Math.sqrt(3) / 2));
    // Snap spacing to display pixels. The same hexagonal lattice covers the whole layer.
    const step = Math.max(1,Math.ceil(rawStep * displaySize)) / Math.max(1,displaySize);
    const rowHeight = step * Math.sqrt(3) / 2;
    const candidates: { x: number; y: number; distance: number }[] = [];
    for (let row = 0,y = rowHeight / 2; y < 1; row++,y += rowHeight) for (let x = step / 2 + (row % 2) * step / 2; x < 1; x += step) {
      const px = Math.min(RESOLUTION - 1,Math.floor(x * RESOLUTION)), py = Math.min(RESOLUTION - 1,Math.floor(y * RESOLUTION));
      if (mask[(py * RESOLUTION + px) * 4 + 3] < 128) continue;
      let distance = Infinity;
      for (let i = 0; i < contourCount; i++) distance = Math.min(distance,(x - contour[i * 2]) ** 2 + (y - contour[i * 2 + 1]) ** 2);
      candidates.push({ x,y,distance });
    }
    // If the boundary count rounds upward, remove only near-edge lattice points already covered by the contour.
    if (candidates.length > interiorQuota) { candidates.sort((a,b) => b.distance - a.distance); candidates.length = interiorQuota; }
    for (const point of candidates) {
      result.rest[offset * 2] = point.x; result.rest[offset * 2 + 1] = point.y;
      result.parts[offset] = layer.part; result.phases[offset] = point.y; offset++;
    }
    for (let i = 0; i < contourCount && offset < budget; i++,offset++) {
      result.rest[offset * 2] = contour[i * 2]; result.rest[offset * 2 + 1] = contour[i * 2 + 1];
      result.parts[offset] = layer.part; result.edges[offset] = 1; result.phases[offset] = i / Math.max(1,contourCount);
    }
    // Keep a deterministic reserve for every layer, including small arrow and typing details.
    const reservedEnd = Math.min(budget,Math.floor(budget * vector.layers.slice(0,layerIndex + 1).reduce((total,item) => total + item.weight,0) / weight));
    for (; offset < reservedEnd; offset++) {
      result.rest[offset * 2] = .5; result.rest[offset * 2 + 1] = .5;
    }
  });
  if (sizes.size >= 4) sizes.delete(sizes.keys().next().value!);
  sizes.set(key,result); return result;
}
