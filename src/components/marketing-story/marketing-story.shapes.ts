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

/** Future service/logo shapes can reuse the renderer with sampled point arrays. */
export const sampledStoryShape = (points: readonly StoryPoint[]): StoryShape => (index, count) =>
  points[Math.min(points.length - 1, Math.floor(index / Math.max(1, count) * points.length))] || { x: .5, y: .5 };
