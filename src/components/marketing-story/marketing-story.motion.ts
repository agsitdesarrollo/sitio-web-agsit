import type { StoryMotion } from './marketing-story.shapes';
export type PreparedStoryPoints = { rest: Float32Array; parts: Uint8Array; edges: Uint8Array; seeds: Float32Array; output: Float32Array; motion?: StoryMotion; time: number };
const fract = (value: number) => value - Math.floor(value);
/** Uniform visible radius; only rigid elements, flow particles and subtle brightness animate. */
export function animateStoryPoints(points: PreparedStoryPoints, time: number, fixed: boolean) {
  if (points.time === time) return;
  points.time = time;
  const rotation = fixed ? 0 : time * .42, cos = Math.cos(rotation), sin = Math.sin(rotation), cycle = time % 4.8;
  for (let i = 0; i < points.parts.length; i++) {
    const baseX = points.rest[i * 2], baseY = points.rest[i * 2 + 1], part = points.parts[i], edge = points.edges[i], phase = points.seeds[i];
    let x = baseX, y = baseY, tone = part === 255 ? -1 : edge ? 2 : 1;
    if (part !== 255) switch (points.motion) {
      case 'target': {
        if (part === 1) {
          tone = 3;
          if (!fixed) {
            const flight = Math.max(0,1 - cycle / .85);
            x += flight * .64; y -= flight * .64;
            if (cycle > 2.7) tone = cycle >= 3.5 ? -1 : 4 + Math.min(3,Math.floor((cycle - 2.7) / .2));
          }
        } else {
          const radius = Math.hypot(x - .5,y - .5);
          tone = radius < .091 ? 2 : edge ? 2 : 1;
          if (!fixed && cycle > .85 && Math.abs(radius - (cycle - .85) * .32) < .035) tone = 3;
        }
        break;
      }
      case 'funnel': {
        tone = part === 1 ? phase < .4 ? 3 : 2 : edge ? 1 : 0;
        if (part === 1 && !fixed) {
          const oldHalf = baseY < .65 ? .4 - (baseY - .15) * .68 : .06;
          y = .15 + fract(phase + time * .42) * .78;
          const half = y < .65 ? .4 - (y - .15) * .68 : .06;
          x = .5 + (baseX - .5) / Math.max(.06,oldHalf) * half;
        }
        break;
      }
      case 'brain': {
        // Glints follow the empty folds' fixed contour, never a moving white blob.
        const folded = edge && phase >= 1;
        tone = edge ? 2 : 1;
        if (folded && !fixed) tone = Math.sin(time * 5.5 - (phase - 1) * Math.PI * 6) > .55 ? 3 : 1;
        break;
      }
      case 'gear': {
        const gx = x - .5, gy = y - .5;
        x = .5 + gx * cos - gy * sin; y = .5 + gx * sin + gy * cos;
        break;
      }
      case 'chat': {
        if (part > 0) {
          const bubble = part <= 3 ? 0 : 1, dot = (part - 1) % 3;
          tone = fixed || (Math.floor(time / 2.4) % 2 === bubble && Math.sin(time * 4 - dot * 1.1) > .1) ? 2 : 0;
        } else tone = edge ? 2 : 0;
        break;
      }
      case 'logo': {
        // A soft diagonal glint crosses the symbol; the core stays bright.
        const glint = fixed ? -1 : Math.sin(time * 1.6 - (baseX + baseY) * 6);
        tone = glint > .95 ? 3 : part === 0 ? edge ? 2 : 1 : part === 1 ? edge ? 1 : 0 : 2;
        break;
      }
      case 'line': {
        tone = fixed || Math.sin(time * 2 - baseX * 8) > 0 ? 2 : 1; break;
      }
    }
    const k = i * 4; points.output[k] = x; points.output[k + 1] = y;
    points.output[k + 2] = points.motion === 'logo' && !fixed ? 1 + .06 * Math.sin(time * 1.4) : 1; points.output[k + 3] = tone;
  }
}
