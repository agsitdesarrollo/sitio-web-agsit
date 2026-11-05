import type { StoryMotion } from './marketing-story.shapes';
export type PreparedStoryPoints = { rest: Float32Array; parts: Uint8Array; edges: Uint8Array; seeds: Float32Array; output: Float32Array; motion?: StoryMotion; time: number };
const fract = (value: number) => value - Math.floor(value);
/** Uniform visible radius; only rigid elements, flow particles and subtle brightness animate. */
export function animateStoryPoints(points: PreparedStoryPoints, time: number, fixed: boolean) {
  if (points.time === time) return;
  points.time = time;
  const rotation = fixed ? 0 : time * .15, cos = Math.cos(rotation), sin = Math.sin(rotation), cycle = time % 4.8;
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
        tone = part === 1 ? 2 : edge ? 1 : 0;
        if (part === 1 && !fixed) {
          const oldHalf = baseY < .65 ? .4 - (baseY - .15) * .68 : .06;
          y = .15 + fract((baseY - .15) / .78 + time * .19) * .78;
          const half = y < .65 ? .4 - (y - .15) * .68 : .06;
          x = .5 + (baseX - .5) / Math.max(.06,oldHalf) * half;
        }
        break;
      }
      case 'brain': {
        // Glints follow the empty folds' fixed contour, never a moving white blob.
        const folded = edge && Math.abs(x - .5) > .07 && Math.abs(x - .5) < .3 && y > .23 && y < .74;
        tone = edge ? 2 : 1;
        if (folded && !fixed) tone = Math.sin(time * 3 - phase * Math.PI * 6) > .7 ? 2 : 1;
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
      case 'magnet': {
        if (part >= 2) tone = 3;
        if (part === 1 && !fixed) {
          const pull = Math.min(1,fract(time * .24 + baseY * .7 + baseX) / .78);
          const eased = pull * pull * (3 - 2 * pull), poleY = baseY < .5 ? .28 : .72;
          x = baseX + (.205 - baseX) * eased; y = baseY + (poleY - baseY) * eased;
          tone = pull === 1 ? 3 : 1;
        }
        break;
      }
      case 'companions': {
        tone = part > 0 ? 2 : 1;
        if (part > 0 && !fixed) {
          x = baseX + (fract(time * .16) - .5) * .1;
          y = baseY + Math.sin(time * 5 + part * .4) * .007;
        } else if (part === 0 && !fixed) {
          tone = Math.sin(baseX * 10 + time * 2) > 0 ? 1 : 0;
        }
        break;
      }
      case 'growth': {
        const beat = time % 5.6;
        if (part >= 1 && part <= 3 && !fixed) {
          const growing = Math.max(0,Math.min(1,(beat - (part - 1) * .55) / .65));
          const reset = Math.max(0,Math.min(1,(beat - 4.6) / 1));
          y = .87 + (y - .87) * (.55 + .45 * growing * (1 - reset));
        } else if (part === 4) {
          const traced = fixed ? 1 : Math.max(0,Math.min(1,(beat - 1.9) / .85)) * (1 - Math.max(0,Math.min(1,(beat - 4.6) / 1)));
          const along = ((baseX - .11) * .79 + (.51 - baseY) * .41) / (.79 * .79 + .41 * .41);
          tone = along <= traced ? 2 : 0;
        }
        break;
      }
      case 'line': {
        tone = fixed || Math.sin(time * 2 - baseX * 8) > 0 ? 2 : 1; break;
      }
    }
    const k = i * 4; points.output[k] = x; points.output[k + 1] = y;
    points.output[k + 2] = 1; points.output[k + 3] = tone;
  }
}
