import type { StoryVector } from './marketing-story.shapes';
export type StorySamples = { rest: Float32Array; parts: Uint8Array; edges: Uint8Array; phases: Float32Array };
const cache = new WeakMap<StoryVector,Map<string,StorySamples>>();
const RESOLUTION = 512;
let surface: OffscreenCanvas | HTMLCanvasElement | undefined;
/** Fixed CSS-pixel spacing, independent of screen DPR and each layer's area. */
export const storyPointSpacing = (size: number) => size < 300 ? 7 : size < 400 ? 8 : 9;
/** Rasterize once at preparation time; sample contours first to preserve thin details. */
export function sampleStoryVector(vector: StoryVector, displaySize: number): StorySamples {
  const size = Math.max(1,Math.round(displaySize)), spacing = storyPointSpacing(size);
  const key = `${size}:${spacing}`;
  let sizes = cache.get(vector); if (!sizes) { sizes = new Map(); cache.set(vector,sizes); }
  const cached = sizes.get(key); if (cached) return cached;
  surface ||= typeof OffscreenCanvas !== 'undefined' ? new OffscreenCanvas(RESOLUTION,RESOLUTION) : Object.assign(document.createElement('canvas'),{ width: RESOLUTION, height: RESOLUTION });
  const ctx = surface.getContext('2d',{ willReadFrequently: true }) as OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D;
  const rest: number[] = [], parts: number[] = [], edges: number[] = [], phases: number[] = [];
  const minDistance = spacing * .82, cells = new Map<string,{ x: number; y: number }[]>();
  const add = (x: number,y: number,part: number,edge: number,phase: number) => {
    const cx = Math.floor(x / minDistance), cy = Math.floor(y / minDistance);
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
      if (cells.get(`${cx + dx}:${cy + dy}`)?.some(p => (p.x - x) ** 2 + (p.y - y) ** 2 < minDistance ** 2)) return;
    }
    const key = `${cx}:${cy}`; const cell = cells.get(key) || []; cell.push({ x,y }); cells.set(key,cell);
    rest.push(x / size,y / size); parts.push(part); edges.push(edge); phases.push(phase);
  };
  vector.layers.forEach(layer => {
    ctx.setTransform(1,0,0,1,0,0); ctx.clearRect(0,0,RESOLUTION,RESOLUTION);
    ctx.setTransform(RESOLUTION / 1000,0,0,RESOLUTION / 1000,0,0);
    if (layer.mirror) { ctx.translate(1000,0); ctx.scale(-1,1); }
    ctx.fillStyle = '#fff'; ctx.fill(new Path2D(layer.d),layer.rule || 'nonzero');
    const mask = ctx.getImageData(0,0,RESOLUTION,RESOLUTION).data;
    const path = document.createElementNS('http://www.w3.org/2000/svg','path'); path.setAttribute('d',layer.d);
    const length = path.getTotalLength();
    let glintStart = Infinity;
    if (layer.glintStart) { const prefix = document.createElementNS('http://www.w3.org/2000/svg','path'); prefix.setAttribute('d',layer.glintStart); glintStart = prefix.getTotalLength(); }
    const contourCount = layer.contour === 0 ? 0 : Math.max(1,Math.ceil(length / 1000 * size / spacing));
    for (let i = 0; i < contourCount; i++) {
      const arc = (i + .5) / contourCount * length, point = path.getPointAtLength(arc);
      const phase = layer.glintStart ? arc >= glintStart ? 1 + (arc - glintStart) / Math.max(1,length - glintStart) : -1 : i / contourCount;
      add((layer.mirror ? 1000 - point.x : point.x) / 1000 * size,point.y / 1000 * size,layer.part,1,phase);
    }
    // The funnel's second layer supplies the moving interior, the first its fixed outline.
    if (layer.contour !== 0 && vector.layers.some(other => other !== layer && other.d === layer.d && other.contour === 0)) return;
    const rowHeight = spacing * Math.sqrt(3) / 2;
    for (let row = 0,y = rowHeight / 2; y < size; row++,y += rowHeight) for (let x = spacing / 2 + (row % 2) * spacing / 2; x < size; x += spacing) {
      const px = Math.min(RESOLUTION - 1,Math.floor(x / size * RESOLUTION)), py = Math.min(RESOLUTION - 1,Math.floor(y / size * RESOLUTION));
      if (mask[(py * RESOLUTION + px) * 4 + 3] >= 128) add(x,y,layer.part,0,y / size);
    }
  });
  const result = { rest: new Float32Array(rest), parts: new Uint8Array(parts), edges: new Uint8Array(edges), phases: new Float32Array(phases) };
  if (sizes.size >= 4) sizes.delete(sizes.keys().next().value!);
  sizes.set(key,result); return result;
}
