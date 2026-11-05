/** Shared cloud parameters and smooth analytical motion; no object allocation in a draw frame. */
export type StoryCloudMotion = 'attractCloud' | 'guideCloud' | 'riseCloud';
const TAU = Math.PI * 2;
const fract = (value: number) => value - Math.floor(value);
const smooth = (value: number) => { const t = Math.max(0,Math.min(1,value)); return t * t * (3 - 2 * t); };
const parameters = new Map<number,Float32Array>();
export const isCloudMotion = (motion: string | undefined): motion is StoryCloudMotion => motion === 'attractCloud' || motion === 'guideCloud' || motion === 'riseCloud';
export function cloudParameters(count: number) {
  let values = parameters.get(count);
  if (!values) {
    values = new Float32Array(count * 4);
    for (let i = 0; i < count; i++) { const k = i * 4; values[k] = fract((i + 1) * .61803398875); values[k + 1] = fract((i + 1) * .41421356237); values[k + 2] = i * 2.39996323; values[k + 3] = fract((i + 1) * .754877666); }
    parameters.set(count,values);
  }
  return values;
}
const pathX = (u: number) => .12 + .76 * u;
const pathY = (u: number) => .54 + Math.sin(u * TAU) * .16;
export function writeCloudPoint(mode: StoryCloudMotion, index: number, count: number, time: number, fixed: boolean, params: Float32Array, out: Float32Array, k: number) {
  const seed = params[k], noise = params[k + 1], angle = params[k + 2], depth = params[k + 3];
  const t = fixed ? 0 : time, core = index < Math.max(6,Math.round(count * .016));
  let x = .5, y = .5, light = .4, size = .72 + depth * .22;
  if (mode === 'attractCloud') {
    const phase = fract(seed + t / 14), envelope = (1 + Math.cos(phase * TAU)) / 2;
    const radius = core ? .013 * Math.sqrt(noise) : .055 + .35 * envelope * envelope;
    const theta = angle + phase * TAU + Math.sin(phase * TAU) * .13 + t * .045;
    x = .56 + Math.cos(theta) * radius; y = .52 + Math.sin(theta) * radius * .83;
    light = core ? .98 : .22 + .52 * (1 - envelope) + depth * .06;
    if (core) size = 1.16;
  } else if (mode === 'guideCloud') {
    const leader = .5 + .47 * Math.sin(t * .25 + .3);
    if (core) {
      const r = .011 * Math.sqrt(noise); x = pathX(leader) + Math.cos(angle + t * .15) * r; y = pathY(leader) + Math.sin(angle + t * .15) * r; light = .98; size = 1.16;
    } else if (seed < .17) {
      const u = noise; x = pathX(u); y = pathY(u); light = .13 + depth * .07; size = .66;
    } else if (seed < .76) {
      const r = .022 + Math.sqrt(noise) * .085, theta = angle + t * .17;
      x = pathX(leader) + Math.cos(theta) * r; y = pathY(leader) + Math.sin(theta) * r * .78;
      light = .22 + .43 * (1 - noise);
    } else {
      const delay = .15 + noise * 3.7, past = .5 + .47 * Math.sin((t - delay) * .25 + .3);
      x = pathX(past) + Math.cos(angle) * .012; y = pathY(past) + Math.sin(angle) * .012;
      light = .07 + .37 * (1 - delay / 4); size = .68 + depth * .16;
    }
  } else {
    const flow = fract(seed + t * .095), u = 1 - (1 - flow) * (1 - flow);
    const theta = angle + t * .08, spread = core ? .012 : .012 + (1 - u) * .043;
    const position = core ? 1 : u;
    x = .14 + .69 * position + Math.sin(position * Math.PI) * .035 + Math.cos(theta) * spread * Math.sqrt(noise);
    y = .84 - .7 * (.3 * position + .7 * position * position) + Math.sin(theta) * spread * .7;
    light = core ? .96 : (.18 + .7 * u * u) * (fixed ? 1 : smooth(flow / .08) * smooth((1 - flow) / .11));
    if (core) size = 1.12;
  }
  out[k] = x; out[k + 1] = y; out[k + 2] = size; out[k + 3] = light < .02 ? -1 : Math.min(7,Math.floor(light * 8));
}
const staticPositions = new Map<string,Float32Array>();
function staticCloudPositions(mode: StoryCloudMotion, count: number) {
  const key = `${mode}:${count}`; let values = staticPositions.get(key);
  if (!values) { values = new Float32Array(count * 4); const params = cloudParameters(count); for (let i = 0; i < count; i++) writeCloudPoint(mode,i,count,0,true,params,values,i * 4); staticPositions.set(key,values); }
  return values;
}
export function sampleCloudPoint(mode: StoryCloudMotion, index: number, count: number) {
  const values = staticCloudPositions(mode,count), k = index * 4;
  return { x: values[k], y: values[k + 1], part: 0 };
}
export function staticCloudPaths(mode: StoryCloudMotion, count = 450) {
  const output = staticCloudPositions(mode,count), paths = Array.from({ length: 8 },() => '');
  for (let i = 0; i < count; i++) {
    const k = i * 4;
    const tone = output[k + 3]; if (tone < 0) continue;
    const x = (output[k] * 1000).toFixed(2), y = (output[k + 1] * 1000).toFixed(2), r = (output[k + 2] * 4.1).toFixed(2), diameter = (Number(r) * 2).toFixed(2);
    paths[tone] += `M${(Number(x) + Number(r)).toFixed(2)} ${y}a${r} ${r} 0 1 1 -${diameter} 0a${r} ${r} 0 1 1 ${diameter} 0`;
  }
  return paths;
}
