/** Filled, deterministic point pools. Geometry is sampled once, never inside an animation frame. */
export type StoryPoint = { x: number; y: number; part?: number };
export type StoryMotion = 'magnet' | 'companions' | 'growth' | 'target' | 'funnel' | 'brain' | 'gear' | 'chat' | 'line';
export type StorySpace = { cx: number; cy: number; sx: number; sy: number };
export type StoryShape = ((index: number, count: number) => StoryPoint) & { motion?: StoryMotion; source?: StoryShape; space?: StorySpace };
const fract = (n: number) => n - Math.floor(n);
const halton = (n: number, base: number) => { let f = 1, r = 0; while (n > 0) { f /= base; r += f * (n % base); n = Math.floor(n / base); } return r; };
const ellipse = (x: number, y: number, cx: number, cy: number, rx: number, ry: number) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 < 1;
const line = (x: number, y: number, ax: number, ay: number, bx: number, by: number, w: number) => {
  const t = Math.max(0, Math.min(1, ((x - ax) * (bx - ax) + (y - ay) * (by - ay)) / ((bx - ax) ** 2 + (by - ay) ** 2)));
  return (x - ax - t * (bx - ax)) ** 2 + (y - ay - t * (by - ay)) ** 2 < w * w;
};
/** Negative = outside; nonnegative = an animation part within the filled silhouette. */
const filled = (motion: StoryMotion, mask: (x: number, y: number) => number): StoryShape => {
  const pool: StoryPoint[] = [];
  for (let i = 1; pool.length < 1200 && i < 100000; i++) {
    const x = halton(i, 2), y = halton(i, 3), part = mask(x, y);
    if (part >= 0) pool.push({ x, y, part });
  }
  return Object.assign((index: number, count: number) => pool[Math.min(pool.length - 1, Math.floor(index / Math.max(1, count) * pool.length))], { motion });
};
const magnet = filled('magnet', (x, y) => {
  const r = Math.hypot(x - .5, y - .5);
  if ((y >= .5 && r < .31 && r > .17) || (y >= .18 && y < .5 && ((x > .19 && x < .33) || (x > .67 && x < .81)))) return 0;
  if (y < .15 && x > .06 && x < .94) return 1;
  return -1;
});
const companions = filled('companions', (x, y) => {
  if (ellipse(x, y, .45, .5, .055, .055)) return 1;
  if (ellipse(x, y, .55, .5, .055, .055)) return 2;
  return x > .07 && x < .93 && Math.abs(y - .5 - Math.sin((x - .07) / .86 * Math.PI * 2) * .22) < .018 ? 0 : -1;
});
const growth = filled('growth', (x, y) => {
  for (let bar = 0; bar < 3; bar++) if (x > .18 + bar * .22 && x < .32 + bar * .22 && y > [.60,.43,.27][bar] && y < .87) return bar + 1;
  if (line(x,y,.13,.51,.85,.12,.024) || (y > .09 && y < .25 && x > .73 && x < .88 && x + y > .94)) return 0;
  return -1;
});
const target = filled('target', (x, y) => {
  // A solid arrow overlays broad, filled annuli, rather than hairline circles.
  const along = (x - .5 - (y - .5)) / Math.SQRT2, across = (x - .5 + y - .5) / Math.SQRT2;
  if ((along > 0 && along < .48 && Math.abs(across) < .017) || (along > -.035 && along < .13 && Math.abs(across) < (along + .035) * .48) || (along > .37 && along < .49 && Math.abs(across) < .075 && Math.abs(across) > .015)) return 1;
  const r = Math.hypot(x - .5, y - .5);
  return r < .075 || (r > .12 && r < .21) || (r > .255 && r < .34) || (r > .385 && r < .46) ? 0 : -1;
});
const funnel = filled('funnel', (x, y) => {
  const half = y < .68 ? .43 - (y - .13) * .68 : .056;
  return y > .13 && y < .88 && Math.abs(x - .5) < half ? 0 : -1;
});
const brain = filled('brain', (x, y) => {
  const side = x < .5 ? -1 : 1, xx = .5 + Math.abs(x - .5);
  const lobes = ellipse(xx,y,.66,.46,.23,.29) || ellipse(xx,y,.60,.23,.105,.12) || ellipse(xx,y,.77,.31,.105,.13) || ellipse(xx,y,.82,.49,.10,.14) || ellipse(xx,y,.72,.67,.14,.12);
  const seam = Math.abs(x - .5) < .018 && y < .73;
  const groove = Math.abs(xx - (.66 + Math.sin(y * 23) * .045)) < .012 && y > .27 && y < .68;
  if (lobes && !seam && !groove) return side < 0 ? 0 : 1;
  return x > .48 && x < .57 && y > .70 && y < .86 ? 0 : -1;
});
const gear = filled('gear', (x, y) => {
  const dx = x - .5, dy = y - .5, radius = Math.hypot(dx,dy), tooth = Math.cos(Math.atan2(dy,dx) * 12) > -.1;
  return radius > .14 && radius < (tooth ? .46 : .365) ? 0 : -1;
});
const chat = filled('chat', (x, y) => {
  // Four satellites have their own compact filled point groups.
  for (let group = 0; group < 4; group++) {
    const angle = group * Math.PI / 2;
    if (ellipse(x,y,.5 + Math.cos(angle) * .435,.5 + Math.sin(angle) * .435,.045,.045)) return group + 4;
  }
  for (let dot = 0; dot < 3; dot++) if (ellipse(x,y,.35 + dot * .15,.46,.047,.047)) return dot + 1;
  const body = (x > .18 && x < .82 && y > .23 && y < .67 && (x > .24 && x < .76 || y > .29 && y < .61 || ellipse(x,y,x < .5 ? .24 : .76,y < .46 ? .29 : .61,.06,.06)));
  const tail = y >= .65 && y < .83 && x > .23 && x < .43 - (y - .65) * .85;
  if (!body && !tail) return -1;
  for (let dot = 0; dot < 3; dot++) if (ellipse(x,y,.35 + dot * .15,.46,.067,.067)) return -1;
  return 0;
});
const transit = Object.assign((index: number) => ({ x: .06 + (index % 72) / 71 * .88, y: .455 + (Math.floor(index / 72) % 3 - 1) * .001 }), { motion: 'line' as const });
const entry = Object.assign((index: number) => ({ x: .18 + (index % 60) / 59 * .64, y: .75 + (Math.floor(index / 60) % 3 - 1) * .001 }), { motion: 'line' as const });
export const storyShapes = {
  scatter: ((index: number) => ({ x: .06 + fract((index + 1) * .6180339887) * .88, y: .07 + fract((index + 1) * .4142135623) * .86 })) as StoryShape,
  attract: magnet, path: companions, growth, planTransit: transit, servicesFocus: entry,
};
export const serviceShapes: readonly StoryShape[] = [target, funnel, brain, gear, chat];
/** Mapping carries the animation's local coordinate system; no geometry is resampled on resize. */
export const mapStoryShape = (shape: StoryShape, space: StorySpace): StoryShape => Object.assign((index: number, count: number) => {
  const point = shape(index,count); return { x: space.cx + (point.x - .5) * space.sx, y: space.cy + (point.y - .5) * space.sy, part: point.part };
}, { source: shape, motion: shape.motion, space });
export const sampledStoryShape = (points: readonly StoryPoint[]): StoryShape => (index, count) => points[Math.min(points.length - 1, Math.floor(index / Math.max(1,count) * points.length))] || { x: .5, y: .5 };
