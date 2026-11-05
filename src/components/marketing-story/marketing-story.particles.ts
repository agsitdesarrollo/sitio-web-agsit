import { storyShapes, type StoryShape } from './marketing-story.shapes';

type Options = { static?: boolean; initial?: StoryShape; colors?: readonly [string, string] };

/** No RAF, ticker or physics loop: the family driver supplies time and progress. */
export function createStoryParticles(canvas: HTMLCanvasElement, options: Options = {}) {
  const ctx = canvas.getContext('2d');
  const lifetime = new AbortController();
  const compact = matchMedia('(max-width: 799px), (max-height: 520px)');
  let from = options.initial || storyShapes.scatter;
  let to = from;
  let progress = 1;
  let active = !!options.static;
  let intersecting = false;
  let dirty = true;
  let width = 0;
  let height = 0;
  let count = 0;
  let lastDraw = -Infinity;
  let cachedRatio = 0;
  let cachedWidth = 0;
  let cachedHeight = 0;
  const cache = new Map<StoryShape, Float32Array>();
  const points = (shape: StoryShape) => {
    let value = cache.get(shape);
    if (!value) {
      value = new Float32Array(count * 2);
      for (let i = 0; i < count; i++) {
        const point = shape(i, count);
        value[i * 2] = point.x; value[i * 2 + 1] = point.y;
      }
      cache.set(shape, value);
    }
    return value;
  };
  const tick = (now = performance.now()) => {
    if (!ctx || !dirty || !active || !intersecting || document.hidden || width < 1 || height < 1) return;
    if (!options.static && now - lastDraw < 1000 / (compact.matches ? 30 : 60)) return;
    const nextCount = compact.matches ? 160 : 360;
    if (count !== nextCount) { count = nextCount; cache.clear(); }
    const ratio = Math.min(devicePixelRatio || 1, compact.matches ? 1.25 : 1.5);
    if (cachedWidth !== width || cachedHeight !== height || cachedRatio !== ratio) {
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      cachedWidth = width; cachedHeight = height; cachedRatio = ratio;
    }
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, width, height);
    const a = points(from), b = points(to);
    const radius = compact.matches ? 1.55 : 2.1;
    for (let color = 0; color < 2; color++) {
      ctx.fillStyle = (options.colors || ['#253f6c', '#1f6f92'])[color];
      ctx.beginPath();
      for (let i = 0; i < count; i++) {
        if ((i % 5 === 0 ? 1 : 0) !== color) continue;
        const x = (a[i * 2] + (b[i * 2] - a[i * 2]) * progress) * width;
        const y = (a[i * 2 + 1] + (b[i * 2 + 1] - a[i * 2 + 1]) * progress) * height;
        ctx.moveTo(x + radius, y); ctx.arc(x, y, radius, 0, Math.PI * 2);
      }
      ctx.fill();
    }
    if (!canvas.dataset.particlesReady) canvas.dataset.particlesReady = 'true';
    dirty = false; lastDraw = now;
  };
  const sizes = new ResizeObserver(entries => {
    width = entries[0].contentRect.width; height = entries[0].contentRect.height;
    dirty = true;
    if (options.static) tick();
  });
  const visibility = new IntersectionObserver(entries => {
    intersecting = entries[0].isIntersecting && entries[0].intersectionRect.width > 1 && entries[0].intersectionRect.height > 1;
    if (options.static) tick();
  });
  sizes.observe(canvas); visibility.observe(canvas);
  const redraw = () => { cache.clear(); dirty = true; if (options.static) tick(); };
  compact.addEventListener('change', redraw, { signal: lifetime.signal });
  document.addEventListener('visibilitychange', () => { if (options.static) tick(); }, { signal: lifetime.signal });
  return {
    tick,
    invalidate: redraw,
    setActive(value: boolean) { active = value; },
    setMorph(nextFrom: StoryShape, nextTo: StoryShape, value: number) {
      const next = Math.max(0, Math.min(1, value));
      if (from === nextFrom && to === nextTo && Math.abs(progress - next) < .0001) return;
      from = nextFrom; to = nextTo; progress = next; dirty = true;
    },
    dispose() {
      active = false;
      lifetime.abort(); sizes.disconnect(); visibility.disconnect(); cache.clear();
      canvas.width = canvas.height = 0; delete canvas.dataset.particlesReady;
    },
  };
}
