// Sales curve as fractions of the plotting area: a clear climb with a single small dip in the middle.
const CURVE = [[0, .88], [.2, .73], [.4, .56], [.52, .62], [.7, .4], [.86, .24], [1, .14]];
/** Path data in a 1:1 viewBox so strokes keep their real width at any size. */
export function growthCurve(width: number, height: number) {
  const left = Math.max(8, width * .03), right = Math.max(18, width * .07), top = Math.max(16, height * .12), bottom = Math.max(8, height * .06);
  const points = CURVE.map(([x, y]) => [left + x * (width - left - right), top + y * (height - top - bottom)]);
  const round = (value: number) => Math.round(value * 10) / 10;
  const line = points.map((p, i) => {
    if (!i) return `M${round(p[0])} ${round(p[1])}`;
    const [p0, p1, p3] = [points[i - 2] || points[i - 1], points[i - 1], points[i + 1] || p];
    const c1 = [p1[0] + (p[0] - p0[0]) / 6, p1[1] + (p[1] - p0[1]) / 6], c2 = [p[0] - (p3[0] - p1[0]) / 6, p[1] - (p3[1] - p1[1]) / 6];
    return `C${round(c1[0])} ${round(c1[1])} ${round(c2[0])} ${round(c2[1])} ${round(p[0])} ${round(p[1])}`;
  }).join('');
  const base = round(height - bottom), end = points[points.length - 1].map(round);
  const guides = [0, 1, 2, 3].map(i => round(top + i * (base - top) / 3));
  return { line, area: `${line}L${end[0]} ${base}L${round(points[0][0])} ${base}Z`, end, guides, width, height };
}
