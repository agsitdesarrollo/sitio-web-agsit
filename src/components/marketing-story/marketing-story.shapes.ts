/** Shared vector artwork for offscreen sampling and the static SVG fallback. Units: 0–1000. */
export type StoryPoint = { x: number; y: number; part?: number };
export type StoryMotion = 'magnet' | 'companions' | 'growth' | 'target' | 'funnel' | 'brain' | 'gear' | 'chat' | 'line';
export type StorySpace = { cx: number; cy: number; sx: number; sy: number };
export type StoryVectorLayer = { d: string; part: number; weight: number; mirror?: boolean; rule?: CanvasFillRule; contour?: number; solid?: string; glintStart?: string };
export type StoryVector = { layers: StoryVectorLayer[] };
export type StoryShape = { motion?: StoryMotion; source?: StoryShape; space?: StorySpace; vector?: StoryVector; sample?: (index: number, count: number) => StoryPoint };
const circle = (x: number, y: number, radius: number) => `M${x + radius} ${y}a${radius} ${radius} 0 1 1 ${-radius * 2} 0a${radius} ${radius} 0 1 1 ${radius * 2} 0Z`;
const polygon = (points: number[][]) => {
  let area = 0; points.forEach((p,i) => { const next = points[(i + 1) % points.length]; area += p[0] * next[1] - next[0] * p[1]; });
  const ordered = area < 0 ? [...points].reverse() : points;
  return ordered.map((p,i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join('') + 'Z';
};
const arrowPoint = (along: number, across: number) => [500 + (along + across) / Math.SQRT2,500 + (-along + across) / Math.SQRT2];
const arrow = polygon([[500,500],arrowPoint(115,-48),arrowPoint(115,48)])
  + polygon([arrowPoint(80,-10),arrowPoint(520,-10),arrowPoint(520,10),arrowPoint(80,10)])
  + polygon([arrowPoint(410,10),arrowPoint(460,68),arrowPoint(540,68),arrowPoint(510,10)])
  + polygon([arrowPoint(410,-10),arrowPoint(460,-68),arrowPoint(540,-68),arrowPoint(510,-10)]);
const target: StoryShape = { motion: 'target', vector: { layers: [
  { d: circle(500,500,90) + circle(500,500,250) + circle(500,500,170) + circle(500,500,425) + circle(500,500,335), part: 0, weight: .8, rule: 'evenodd', contour: .4 },
  { d: arrow, part: 1, weight: .2, contour: .62 },
] } };
const funnelPath = 'M900 150H100L440 650V860H560V650Z';
const funnel: StoryShape = { motion: 'funnel', vector: { layers: [
  { d: funnelPath, part: 0, weight: .6, contour: .28 },
  { d: funnelPath, part: 1, weight: .4, contour: 0 },
] } };
const hemisphere = 'M480 190C455 90 310 85 280 170C170 135 95 235 135 320C65 360 75 475 135 510C95 605 160 710 250 700C265 800 415 840 475 735L480 190Z';
const folds = 'M295 235C245 285 365 315 295 365L315 405C420 325 285 295 330 260Z M225 435C320 420 235 535 335 550L350 510C285 500 370 400 235 395Z M370 590C320 625 390 680 345 705L380 730C445 675 360 650 405 625Z';
const brain: StoryShape = { motion: 'brain', vector: { layers: [
  { d: hemisphere + folds, part: 0, weight: .5, rule: 'evenodd', contour: .42, glintStart: hemisphere },
  { d: hemisphere + folds, part: 0, weight: .5, mirror: true, rule: 'evenodd', contour: .42, glintStart: hemisphere },
] } };
let gearOutline = '';
for (let tooth = 0; tooth < 8; tooth++) {
  const angle = tooth * Math.PI / 4, ux = Math.cos(angle), uy = Math.sin(angle), vx = -uy, vy = ux;
  for (const [radial,tangent] of [[330,-75],[455,-75],[455,75],[330,75]]) {
    const x = 500 + ux * radial + vx * tangent, y = 500 + uy * radial + vy * tangent;
    gearOutline += `${tooth === 0 && radial === 330 && tangent === -75 ? 'M' : 'L'}${x} ${y}`;
  }
}
const gear: StoryShape = { motion: 'gear', vector: { layers: [{ d: gearOutline + 'Z' + circle(500,500,150), part: 0, weight: 1, rule: 'evenodd', contour: .36 }] } };
const bubbles = 'M130 180H490Q550 180 550 240V420Q550 480 490 480H280L150 580V480H130Q70 480 70 420V240Q70 180 130 180Z M510 540H870Q930 540 930 600V780Q930 840 870 840H850V940L720 840H510Q450 840 450 780V600Q450 540 510 540Z';
const chatDots = [[225,330],[315,330],[405,330],[595,690],[685,690],[775,690]];
const chat: StoryShape = { motion: 'chat', vector: { layers: [
  { d: bubbles + chatDots.map(([x,y]) => circle(x,y,34)).join(''), part: 0, weight: .76, rule: 'evenodd', contour: .38 },
  ...chatDots.map(([x,y],index) => ({ d: circle(x,y,22), part: index + 1, weight: .04, contour: .4 })),
] } };
const magnet: StoryShape = { motion: 'magnet', vector: { layers: [
  { d: 'M200 340H360V550A140 140 0 0 0 640 550V340H800V550A300 300 0 0 1 200 550Z', part: 0, weight: .76, contour: .38 },
  { d: 'M200 160H360V340H200Z', part: 2, weight: 0, solid: '#1f6f92' },
  { d: 'M640 160H800V340H640Z', part: 3, weight: 0, solid: '#1f6f92' },
  { d: 'M80 20H920V120H80Z', part: 1, weight: .24, contour: 0 },
] } };
const companions: StoryShape = { motion: 'companions', vector: { layers: [
  { d: 'M90 790C310 730 690 850 910 790L910 820C690 880 310 760 90 820Z', part: 0, weight: .24, contour: .18 },
  { d: circle(310,265,85) + 'M130 700V575C130 385 490 385 490 575V700Z', part: 1, weight: .38, contour: .38 },
  { d: circle(690,265,85) + 'M510 700V575C510 385 870 385 870 575V700Z', part: 2, weight: .38, contour: .38 },
] } };
const growth: StoryShape = { motion: 'growth', vector: { layers: [
  { d: 'M160 600H320V870H160Z', part: 1, weight: .24, contour: .34 },
  { d: 'M410 430H570V870H410Z', part: 2, weight: .33, contour: .34 },
  { d: 'M660 260H820V870H660Z', part: 3, weight: .43, contour: .34 },
  { d: polygon([[181,543],[219,597],[814,193],[776,139]]) + polygon([[900,90],[712,124],[822,285]]), part: 4, weight: 0, solid: '#253f6c' },
] } };
const horizontalLine = (): StoryShape => ({ motion: 'line', sample: index => ({ x: .08 + (index % 48) / 47 * .84, y: .5, part: index < 48 ? 0 : 255 }) });
export const storyShapes = {
  scatter: { sample: (index: number) => ({ x: .08 + (index % 16) / 15 * .84, y: .08 + (Math.floor(index / 16) % 16) / 15 * .84 }) } as StoryShape,
  attract: magnet, path: companions, growth,
  planTransit: horizontalLine(), servicesFocus: horizontalLine(),
};
export const serviceShapes: readonly StoryShape[] = [target,funnel,brain,gear,chat];
export const mapStoryShape = (shape: StoryShape, space: StorySpace): StoryShape => ({ source: shape, motion: shape.motion, space });
export const sampledStoryShape = (points: readonly StoryPoint[]): StoryShape => ({ sample: (index,count) => points[Math.min(points.length - 1,Math.floor(index / Math.max(1,count) * points.length))] || { x: .5, y: .5 } });
