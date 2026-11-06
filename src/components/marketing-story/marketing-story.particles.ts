import { storyShapes, serviceShapes, type StoryShape } from './marketing-story.shapes';
import { animateStoryPoints, type PreparedStoryPoints } from './marketing-story.motion';
import { sampleStoryVector } from './marketing-story.sampling';

type Options = { static?: boolean; initial?: StoryShape; colors?: readonly [string, string]; scene?: 'services' };
/** One canvas per scene, driven exclusively by the existing family ticker. */
export function createStoryParticles(canvas: HTMLCanvasElement, options: Options = {}) {
  const ctx = canvas.getContext('2d');
  const lifetime = new AbortController();
  const compact = matchMedia('(max-width: 799px), (max-height: 520px)');
  const services = options.scene === 'services';
  const desktop = matchMedia('(min-width: 1200px) and (min-height: 521px)');
  const palette = options.colors ? ['#538ba0','#69a8bd',options.colors[0],'#fff','rgba(255,255,255,.75)','rgba(255,255,255,.5)','rgba(255,255,255,.25)','rgba(255,255,255,.1)'] : ['#53789b','#315679','#253f6c','#1f6f92','#1f6f92','#1f6f92','#1f6f92','#1f6f92'];
  let from = options.initial || storyShapes.scatter, to = from, progress = 1;
  let active = !!options.static, intersecting = false, dirty = true;
  let width = 0, height = 0, lastDraw = -Infinity, lastTick = 0, clock = 0;
  let count = 0, rendered = new Float32Array(0), drift = new Float32Array(0);
  let cachedRatio = 0, cachedWidth = 0, cachedHeight = 0;
  let shapeSize = 0, closingSize = 0;
  let logoBlend = 0;
  const cache = new Map<StoryShape, PreparedStoryPoints>();
  const prepare = (shape: StoryShape) => {
    const source = shape.source || shape;
    let points = cache.get(source);
    if (!points) {
      // The closing symbol is shown at its own size, so its lattice snaps to that size's pixels.
      const size = source.motion === 'logo' ? closingSize || shapeSize : shapeSize;
      const sampled = source.vector ? sampleStoryVector(source.vector,count,Math.max(1,Math.round(size))) : null;
      points = { rest: sampled?.rest || new Float32Array(count * 2), parts: sampled?.parts || new Uint8Array(count), edges: sampled?.edges || new Uint8Array(count), seeds: sampled ? source.motion === 'funnel' ? new Float32Array(sampled.phases) : sampled.phases : new Float32Array(count), output: new Float32Array(count * 4), motion: source.motion, time: -1 };
      for (let i = 0; i < count; i++) {
        if (!sampled) {
          const point = source.sample!(i,count);
          points.rest[i * 2] = point.x; points.rest[i * 2 + 1] = point.y;
          points.parts[i] = point.part || 0; points.seeds[i] = point.y;
        }
        if (source.motion === 'funnel' && points.parts[i] === 1) points.seeds[i] = (i * .61803398875) % 1;
      }
      cache.set(source,points);
    }
    return points;
  };
  const allocate = () => {
    count = desktop.matches ? 1200 : Math.max(360,Math.min(1200,Math.round(1200 * (shapeSize / 440) ** 2)));
    cache.clear(); rendered = new Float32Array(count * 4); drift = new Float32Array(count * 2);
    for (let i = 0; i < count; i++) { drift[i * 2] = Math.cos(i * 2.39996323); drift[i * 2 + 1] = Math.sin(i * 2.39996323); }
    if (shapeSize) warm();
    canvas.dataset.particleCount = String(count); dirty = true;
  };
  function warm() { for (const shape of services ? [...serviceShapes,storyShapes.planTransit,storyShapes.servicesFocus,storyShapes.scatter] : [storyShapes.scatter]) prepare(shape); }
  const setShapeSize = (value: number, markSize = value) => {
    const size = Math.max(1,Math.round(value)), mark = Math.max(1,Math.round(markSize));
    if (shapeSize === size && closingSize === mark) return;
    shapeSize = size; closingSize = mark; allocate();
  };
  allocate();
  const tick = (now = performance.now()) => {
    // In enhanced mode the driver owns visibility, including re-entry into the pin.
    // IntersectionObserver is only authoritative for the free-flow static fallback.
    if (!ctx || !active || (options.static && !intersecting) || document.hidden || width < 1 || height < 1) { lastTick = 0; return; }
    const continuous = !options.static && !!(from.motion || to.motion);
    if (!dirty && !continuous) return;
    if (lastTick) clock += Math.min(50,now - lastTick) / 1000;
    lastTick = now;
    if (!options.static && now - lastDraw < 1000 / (compact.matches ? 30 : 60) - 1) return;
    const ratio = Math.min(devicePixelRatio || 1,2);
    if (cachedWidth !== width || cachedHeight !== height || cachedRatio !== ratio) {
      canvas.width = Math.max(1,Math.round(width * ratio)); canvas.height = Math.max(1,Math.round(height * ratio));
      cachedWidth = width; cachedHeight = height; cachedRatio = ratio;
    }
    const a = prepare(from), b = prepare(to);
    const time = options.static ? 0 : clock;
    animateStoryPoints(a,time,!!options.static); if (b !== a) animateStoryPoints(b,time,!!options.static);
    const af = from.space, bf = to.space;
    const side = Math.min(width,height) * .96;
    const acx = af ? af.cx * width : width / 2, acy = af ? af.cy * height : height / 2;
    const asx = af ? af.sx * width : services ? width : side, asy = af ? af.sy * height : services ? height : side;
    const bcx = bf ? bf.cx * width : width / 2, bcy = bf ? bf.cy * height : height / 2;
    const bsx = bf ? bf.sx * width : services ? width : side, bsy = bf ? bf.sy * height : services ? height : side;
    const burst = Math.sin(progress * Math.PI) * Math.min(width,height) * .025;
    const radius = services ? compact.matches ? 1.8 : 2.15 : 2.3;
    for (let i = 0; i < count; i++) {
      const k = i * 4;
      const ax = acx + (a.output[k] - .5) * asx, ay = acy + (a.output[k + 1] - .5) * asy;
      const bx = bcx + (b.output[k] - .5) * bsx, by = bcy + (b.output[k + 1] - .5) * bsy;
      rendered[k] = ax + (bx - ax) * progress + drift[i * 2] * burst;
      rendered[k + 1] = ay + (by - ay) * progress + drift[i * 2 + 1] * burst;
      rendered[k + 2] = radius * (a.output[k + 2] + (b.output[k + 2] - a.output[k + 2]) * progress);
      rendered[k + 3] = Math.round(a.output[k + 3] + (b.output[k + 3] - a.output[k + 3]) * progress);
    }
    ctx.setTransform(ratio,0,0,ratio,0,0); ctx.clearRect(0,0,width,height); ctx.globalAlpha = 1 - logoBlend;
    // Exactly one path/fill per brightness color. No filters, shadows or per-point fillStyle changes.
    for (let color = 0; color < palette.length; color++) {
      ctx.fillStyle = palette[color]; ctx.beginPath();
      for (let i = 0; i < count; i++) {
        const k = i * 4, r = rendered[k + 2];
        if (rendered[k + 3] !== color || r < .1) continue;
        const x = rendered[k], y = rendered[k + 1]; ctx.moveTo(x + r,y); ctx.arc(x,y,r,0,Math.PI * 2);
      }
      ctx.fill();
    }
    canvas.dataset.particlesReady ||= 'true'; dirty = false; lastDraw = now;
    const painted = (progress >= .5 ? to.motion : from.motion) || 'scatter';
    if (canvas.dataset.paintedFigure !== painted) canvas.dataset.paintedFigure = painted;
    const instrumented = canvas as HTMLCanvasElement & { storyPaintCount?: number };
    instrumented.storyPaintCount = (instrumented.storyPaintCount || 0) + 1;
    if (canvas.dataset.particleFigure === 'target') {
      const cycle = clock % 4.8, state = cycle < .85 ? 'flying' : cycle < 2.7 ? 'lodged' : 'fading';
      if (canvas.dataset.arrowState !== state) canvas.dataset.arrowState = state;
    } else if (canvas.dataset.arrowState) delete canvas.dataset.arrowState;
  };
  const sizes = new ResizeObserver(entries => { width = entries[0].contentRect.width; height = entries[0].contentRect.height; if (!services) setShapeSize(Math.min(width,height) * .96); dirty = true; if (options.static) tick(); });
  const visibility = new IntersectionObserver(entries => { intersecting = entries[0].isIntersecting && entries[0].intersectionRect.width > 1 && entries[0].intersectionRect.height > 1; lastTick = 0; if (options.static) tick(); });
  sizes.observe(canvas); if (options.static) visibility.observe(canvas);
  const redraw = () => { dirty = true; if (options.static) tick(); };
  compact.addEventListener('change',() => { allocate(); redraw(); },{ signal: lifetime.signal });
  desktop.addEventListener('change',() => { allocate(); redraw(); },{ signal: lifetime.signal });
  document.addEventListener('visibilitychange',() => { lastTick = 0; dirty = true; if (options.static) tick(); },{ signal: lifetime.signal });
  return {
    tick, invalidate: redraw, setShapeSize, setLogoBlend(value: number) { logoBlend = value; dirty = true; }, warm: (shape: StoryShape) => { if (width > 0) prepare(shape); },
    setActive(value: boolean) { if (active !== value) { active = value; lastTick = 0; dirty = true; } },
    setMorph(nextFrom: StoryShape, nextTo: StoryShape, value: number) {
      const next = Math.max(0,Math.min(1,value));
      if (from === nextFrom && to === nextTo && Math.abs(progress - next) < .0001) return;
      from = nextFrom; to = nextTo; progress = next; dirty = true;
      const motion = (next >= .5 ? to.motion : from.motion) || 'scatter';
      if (canvas.dataset.particleFigure !== motion) canvas.dataset.particleFigure = motion;
    },
    dispose() { active = false; lifetime.abort(); sizes.disconnect(); visibility.disconnect(); cache.clear(); canvas.width = canvas.height = 0; delete canvas.dataset.particlesReady; delete canvas.dataset.particleCount; delete canvas.dataset.particleFigure; delete canvas.dataset.paintedFigure; delete (canvas as HTMLCanvasElement & { storyPaintCount?: number }).storyPaintCount; delete canvas.dataset.arrowState; },
  };
}
