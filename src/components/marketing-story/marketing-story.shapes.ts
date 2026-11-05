/** Normalized geometry, independent of canvas, scroll and viewport size. */
export type StoryPoint = { x: number; y: number };
export type StoryShape = (index: number, count: number) => StoryPoint;
const noise = (index: number, salt: number) => {
  const value = Math.sin((index + 1) * 127.1 + salt * 311.7) * 43758.5453;
  return value - Math.floor(value);
};

export const storyShapes: Record<'scatter' | 'attract' | 'path' | 'growth' | 'planTransit' | 'servicesFocus', StoryShape> = {
  scatter: index => ({ x: .06 + noise(index, 1) * .88, y: .07 + noise(index, 2) * .86 }),
  attract: index => {
    const angle = noise(index, 3) * Math.PI * 2;
    const radius = Math.sqrt(noise(index, 4)) * .27;
    return { x: .5 + Math.cos(angle) * radius, y: .5 + Math.sin(angle) * radius };
  },
  path: (index, count) => {
    const t = index / Math.max(1, count - 1);
    return { x: .1 + t * .8, y: .5 + Math.sin(t * Math.PI * 2) * .22 + (noise(index, 5) - .5) * .045 };
  },
  growth: (index, count) => {
    const perBar = Math.floor(count * .75 / 4);
    if (index < perBar * 4) {
      const bar = Math.floor(index / perBar);
      const local = index % perBar;
      const columns = Math.max(3, Math.round(Math.sqrt(count / 4) * .5));
      const rows = Math.ceil(perBar / columns);
      return {
        x: .2 + bar * .2 + ((local % columns) / (columns - 1) - .5) * .1,
        y: .85 - Math.floor(local / columns) / Math.max(1, rows - 1) * [.18, .32, .5, .7][bar],
      };
    }
    const t = (index - perBar * 4) / Math.max(1, count - perBar * 4 - 1);
    return { x: .12 + t * .76, y: .77 - Math.pow(t, .85) * .67 };
  },
  planTransit: (index, count) => {
    const t = index / Math.max(1, count - 1);
    return { x: .08 + t * .84, y: .455 + Math.sin(t * Math.PI * 4) * .015 };
  },
  servicesFocus: index => {
    const angle = noise(index, 6) * Math.PI * 2;
    const radius = Math.sqrt(noise(index, 7)) * .14;
    return { x: .5 + Math.cos(angle) * radius, y: .86 + Math.sin(angle) * radius * .25 };
  },
};

const circle = (x: number, y: number, radius: number, t: number): StoryPoint => ({ x: x + Math.cos(t * Math.PI * 2) * radius, y: y + Math.sin(t * Math.PI * 2) * radius });
const nodes = [[.18,.25], [.75,.16], [.85,.68], [.45,.83], [.12,.65], [.5,.45]] as const;
const links = [[0,1], [1,2], [2,3], [3,4], [4,0], [0,5], [1,5], [2,5], [3,5], [4,5]] as const;
export const serviceShapes: readonly StoryShape[] = [
  (index, count) => { const ring = index % 3; return circle(.5, .5, [.13,.28,.43][ring], Math.floor(index / 3) / Math.ceil(count / 3)); },
  (index, count) => {
    if (index % 3 === 0) { const station = Math.floor(index / 3) % 4; const t = station / 3; return circle(.1 + t * .8, .5 + Math.sin(t * Math.PI * 2) * .22, .055, noise(index, 8)); }
    const t = index / Math.max(1, count - 1); return { x: .1 + t * .8, y: .5 + Math.sin(t * Math.PI * 2) * .22 };
  },
  index => {
    if (index % 3 === 0) { const node = nodes[Math.floor(index / 3) % nodes.length]; return circle(node[0], node[1], .045, noise(index, 9)); }
    const [a,b] = links[index % links.length]; const t = noise(index, 10); return { x: nodes[a][0] + (nodes[b][0] - nodes[a][0]) * t, y: nodes[a][1] + (nodes[b][1] - nodes[a][1]) * t };
  },
  (index, count) => {
    if (index < count * .8) return circle(.5, .5, .37 + (index % 2) * .025, index / (count * .8) * .91 + .06);
    const t = (index - count * .8) / (count * .2); return { x: .84 - t * .15, y: .26 + Math.abs(t - .5) * .16 };
  },
  index => {
    if (index % 4 === 0) { const angle = (index % 3) * Math.PI * 2 / 3 - Math.PI / 2; const t = noise(index, 12); return { x: .5 + Math.cos(angle) * t * .32, y: .5 + Math.sin(angle) * t * .32 }; }
    const group = Math.floor(index / 4) % 4; const angle = (group - 1) * Math.PI * 2 / 3 - Math.PI / 2; const center = group === 0 ? { x: .5, y: .5 } : { x: .5 + Math.cos(angle) * .32, y: .5 + Math.sin(angle) * .32 }; return circle(center.x, center.y, Math.sqrt(noise(index, 13)) * .105, noise(index, 14));
  },
];

/** Service/logo shapes can reuse the renderer with sampled point arrays. */
export const sampledStoryShape = (points: readonly StoryPoint[]): StoryShape => (index, count) =>
  points[Math.min(points.length - 1, Math.floor(index / Math.max(1, count) * points.length))] || { x: .5, y: .5 };
