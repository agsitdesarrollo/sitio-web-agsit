import type { StoryMotion } from './marketing-story.shapes';
export type PreparedStoryPoints = { rest: Float32Array; parts: Uint8Array; edges: Uint8Array; seeds: Float32Array; output: Float32Array; motion?: StoryMotion; time: number; lineTop: number; lineHeight: number };
const fract = (value: number) => value - Math.floor(value);
const PATH_X = [[.07,.22,.35,.5],[.5,.65,.78,.93]];
const PATH_Y = [[.5,.18,.18,.5],[.5,.82,.82,.5]];
/** Uniform visible radius; only rigid elements, flow particles and subtle brightness animate. */
export function animateStoryPoints(points: PreparedStoryPoints, time: number, fixed: boolean) {
  if (points.time === time) return;
  points.time = time;
  const rotation = fixed ? 0 : time * .15, cos = Math.cos(rotation), sin = Math.sin(rotation), cycle = time % 4.8;
  const travel = fract(time * .13), u = travel < .5 ? travel * 2 : (travel - .5) * 2, v = 1 - u;
  const px = PATH_X[travel < .5 ? 0 : 1], py = PATH_Y[travel < .5 ? 0 : 1];
  const cx = v ** 3 * px[0] + 3 * v * v * u * px[1] + 3 * v * u * u * px[2] + u ** 3 * px[3];
  const cy = v ** 3 * py[0] + 3 * v * v * u * py[1] + 3 * v * u * u * py[2] + u ** 3 * py[3];
  const dx = 3 * v * v * (px[1] - px[0]) + 6 * v * u * (px[2] - px[1]) + 3 * u * u * (px[3] - px[2]);
  const dy = 3 * v * v * (py[1] - py[0]) + 6 * v * u * (py[2] - py[1]) + 3 * u * u * (py[3] - py[2]);
  const norm = Math.max(.001,Math.hypot(dx,dy));
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
        if (part === 1 && !fixed) {
          const pull = fract(time * .24 + baseX * .7), pole = baseX > .5 ? .74 : .26;
          x = baseX + (pole - baseX) * pull * pull; y = .025 + .15 * pull;
          tone = 1;
        }
        break;
      }
      case 'companions': {
        tone = part > 0 ? 2 : 0;
        if (part > 0 && !fixed) {
          const side = part === 1 ? -1 : 1;
          x = baseX - (part === 1 ? .445 : .555) + cx - dy / norm * side * .055;
          y = baseY - .5 + cy + dx / norm * side * .055;
        }
        break;
      }
      case 'growth': {
        if (part > 0 && !fixed) y = .87 + (y - .87) * (1 + Math.sin(time * 2 + part) * .012);
        break;
      }
      case 'line': {
        if (!fixed) y = points.lineTop + fract((baseY - points.lineTop) / Math.max(.001,points.lineHeight) + time * .23) * points.lineHeight;
        tone = 2; break;
      }
    }
    const k = i * 4; points.output[k] = x; points.output[k + 1] = y;
    points.output[k + 2] = 1; points.output[k + 3] = tone;
  }
}
