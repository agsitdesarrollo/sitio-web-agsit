import type { StoryMotion } from './marketing-story.shapes';
export type PreparedStoryPoints = { rest: Float32Array; parts: Uint8Array; seeds: Float32Array; output: Float32Array; motion?: StoryMotion; time: number };
const fract = (value: number) => value - Math.floor(value);
/** Writes x, y, radius factor and brightness in place. No objects or point allocation per frame. */
export function animateStoryPoints(points: PreparedStoryPoints, time: number, fixed: boolean) {
  if (points.time === time) return;
  points.time = time;
  const rotation = time * .15, cos = Math.cos(rotation), sin = Math.sin(rotation);
  const cycle = time % 4.8;
  const wave = time * 4.5;
  for (let i = 0; i < points.parts.length; i++) {
    const baseX = points.rest[i * 2], baseY = points.rest[i * 2 + 1], part = points.parts[i], seed = points.seeds[i];
    let x = baseX, y = baseY, size = .83 + seed * .38, light = .35 + seed * .35;
    if (!fixed) switch (points.motion) {
      case 'target': {
        if (part === 1) {
          const flight = Math.max(0, 1 - cycle / .85);
          x += flight * .68; y -= flight * .68;
          light = cycle < 2.7 ? .98 : Math.max(0, 1 - (cycle - 2.7) / .55);
          size *= cycle > 3.25 ? 0 : 1;
        } else {
          const radius = Math.hypot(x - .5,y - .5), pulse = Math.sin(wave - radius * 22);
          const scale = 1 + pulse * .018;
          x = .5 + (x - .5) * scale; y = .5 + (y - .5) * scale;
          light += Math.max(0,pulse) * .28; size *= 1 + pulse * .10;
        }
        break;
      }
      case 'funnel': {
        const oldHalf = baseY < .68 ? .43 - (baseY - .13) * .68 : .056;
        y = .13 + fract((baseY - .13) / .75 + time * .19) * .75;
        const half = y < .68 ? .43 - (y - .13) * .68 : .056;
        x = .5 + (baseX - .5) / oldHalf * half;
        light += .2 * Math.sin(y * 16 - time * 4); break;
      }
      case 'brain': {
        const phase = fract(time * .22), hotX = .20 + phase * .60, hotY = .48 + Math.sin(phase * Math.PI * 4) * .22;
        const distance = Math.hypot(x - hotX,y - hotY);
        const flash = Math.max(0,1 - distance / .15);
        light += flash * .85; size *= 1 + flash * .55;
        break;
      }
      case 'gear': {
        const dx = x - .5, dy = y - .5;
        x = .5 + dx * cos - dy * sin; y = .5 + dx * sin + dy * cos;
        light += .10 * Math.sin(time * 1.5 + seed * 6.28); break;
      }
      case 'chat': {
        if (part >= 4) {
          const angle = (part - 4) * Math.PI / 2, orbit = angle + time * .28;
          x += (Math.cos(orbit) - Math.cos(angle)) * .435;
          y += (Math.sin(orbit) - Math.sin(angle)) * .435;
          light = .65 + seed * .3;
        } else if (part > 0) {
          const beat = Math.max(0,Math.sin(time * 4 - (part - 1) * 1.2));
          light = .25 + beat * .75; size *= .8 + beat * .65;
        } else light *= .78;
        break;
      }
      case 'magnet': {
        if (part === 1) {
          const travel = fract(time * .24 + seed), pull = travel * travel;
          const pole = seed > .5 ? .74 : .26;
          x = baseX + (pole - baseX) * pull;
          y = -.05 + .25 * travel;
          size *= .8 + travel * .35; light = .3 + travel * .6;
        } else light += .1 * Math.sin(wave + baseY * 6);
        break;
      }
      case 'companions': {
        if (part > 0) {
          const t = fract(time * .13), cx = .10 + t * .8, cy = .5 + Math.sin(t * Math.PI * 2) * .22;
          x += cx - .5; y += cy - .5;
          light = .8 + seed * .2; size *= 1.15;
        } else light *= .6;
        break;
      }
      case 'growth': {
        if (part > 0) y = .87 + (y - .87) * (1 + Math.sin(time * 2 + part) * .055);
        light += .12 * Math.sin(time * 2 + baseX * 7); break;
      }
      case 'line': x += Math.sin(time * 1.2 + seed * 6.28) * .008; light += .18 * Math.sin(time * 2 + baseX * 8); break;
    }
    const offset = i * 4;
    points.output[offset] = x; points.output[offset + 1] = y;
    points.output[offset + 2] = size;
    points.output[offset + 3] = Math.max(0,Math.min(.999,light));
  }
}
