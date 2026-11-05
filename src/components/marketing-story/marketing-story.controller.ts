import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { createStoryVideo } from './marketing-story.video';
import { createStoryParticles } from './marketing-story.particles';
import { storyShapes, serviceShapes, mapStoryShape, type StoryShape } from './marketing-story.shapes';

gsap.registerPlugin(ScrollTrigger);
type Direction = -1 | 1;
const SERVICE_STOPS = ['strategyEnd', 'journeyEnd', 'intelligenceEnd', 'automationEnd', 'channelsEnd'] as const;
const STOPS = ['heroEnd', 'attractEnd', 'accompanyEnd', 'growEnd', 'boostEnd', 'planEnd', 'revealEnd', ...SERVICE_STOPS, 'contactEntry'] as const;
type Stop = typeof STOPS[number];
type MotionTarget = Stop | 'start' | 'end' | HTMLElement;
type Decision = { kind: 'free' } | { kind: 'clamp' | 'stop'; stop: Stop };
type Connection = EventTarget & { saveData?: boolean };
const VIDEO_PANELS = 5.6;
const HERO_END = VIDEO_PANELS * .96;
const EPSILON = 3;
const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const easeStop = (t: number) => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeClamp = (t: number) => 1 - Math.pow(1 - t, 3);
const documentTop = (element: HTMLElement) => {
  let value = 0;
  for (let node: HTMLElement | null = element; node; node = node.offsetParent as HTMLElement | null) value += node.offsetTop;
  return value;
};

export function initMarketingStory() {
  const page = document.querySelector<HTMLElement>('[data-marketing-story]');
  if (!page || page.dataset.ready) return;
  page.dataset.ready = 'true';
  const lifetime = new AbortController();
  const connection = (navigator as Navigator & { connection?: Connection }).connection;
  const modes = gsap.matchMedia();
  modes.add({ motion: '(prefers-reduced-motion: no-preference)', reduced: '(prefers-reduced-motion: reduce)' }, context => {
    const canvas = page.querySelector<HTMLCanvasElement>('[data-story-particles]')!;
    const planCanvas = page.querySelector<HTMLCanvasElement>('[data-plan-particles]')!;
    if (context.conditions?.reduced || connection?.saveData) {
      page.dataset.motion = 'static';
      canvas.setAttribute('aria-label', (JSON.parse(canvas.dataset.figureLabels || '[]') as string[])[2] || '');
      const particles = createStoryParticles(canvas, { static: true, initial: storyShapes.growth });
      const planParticles = createStoryParticles(planCanvas, { static: true, initial: storyShapes.servicesFocus, colors: ['#8be2ff', '#41c8f6'], scene: 'services' });
      return () => { particles.dispose(); planParticles.dispose(); delete page.dataset.motion; };
    }
    const track = page.querySelector<HTMLElement>('[data-journey-track]')!;
    const stage = page.querySelector<HTMLElement>('[data-journey-stage]')!;
    const hero = page.querySelector<HTMLElement>('[data-hero]')!;
    const split = page.querySelector<HTMLElement>('[data-story-split]')!;
    const manifesto = page.querySelector<HTMLElement>('#ms-manifesto')!;
    const plan = page.querySelector<HTMLElement>('[data-plan]')!;
    const upper = plan.querySelector<HTMLElement>('[data-plan-half="0"]')!;
    const lower = plan.querySelector<HTMLElement>('[data-plan-half="1"]')!;
    const letters = [...upper.querySelectorAll<HTMLElement>('[data-plan-letter]')];
    const lowerLetters = [...lower.querySelectorAll<HTMLElement>('[data-plan-letter]')];
    const cue = plan.querySelector<HTMLElement>('[data-plan-cue]')!;
    const frame = plan.querySelector<HTMLElement>('[data-plan-frame]')!;
    const services = plan.querySelector<HTMLElement>('[data-services]')!;
    const cards = [...services.querySelectorAll<HTMLElement>('[data-service-card]')];
    const serviceFigure = services.querySelector<HTMLElement>('[data-service-figure]')!;
    const serviceCounter = services.querySelector<HTMLElement>('[data-service-counter]')!;
    const announcement = services.querySelector<HTMLElement>('[data-service-announcement]')!;
    const previous = services.querySelector<HTMLButtonElement>('[data-service-prev]')!;
    const next = services.querySelector<HTMLButtonElement>('[data-service-next]')!;
    const contact = page.querySelector<HTMLElement>('.final-contact-section')!;
    const header = document.querySelector<HTMLElement>('.site-nav');
    const claim = hero.querySelector<HTMLElement>('[data-claim]')!;
    const controls = hero.querySelector<HTMLElement>('[data-hero-controls]')!;
    const captions = [...hero.querySelectorAll<HTMLElement>('[data-caption]')];
    const left = split.querySelector<HTMLElement>('[data-split-left]')!;
    const right = split.querySelector<HTMLElement>('[data-split-right]')!;
    const groups = [...manifesto.querySelectorAll<HTMLElement>('[data-manifesto-group]')];
    const nodes = [...manifesto.querySelectorAll<HTMLElement>('[data-manifesto-node]')];
    const splitWords = [...split.querySelectorAll<HTMLElement>('.ms-split-panel span')];
    const figureLabels = JSON.parse(canvas.dataset.figureLabels || '[]') as string[];
    const thread = manifesto.querySelector<HTMLElement>('[data-manifesto-thread]')!;
    const local = new AbortController();
    const { signal } = local;
    page.dataset.motion = 'enhanced';
    const media = createStoryVideo(hero, signal);
    const particles = createStoryParticles(canvas);
    const planParticles = createStoryParticles(planCanvas, { colors: ['#8be2ff', '#41c8f6'], scene: 'services' });
    let mappedShapes: StoryShape[] = [];
    let announced = -1;
    let g = { panel: 1, start: 0, heroEnd: 0, attractEnd: 0, accompanyEnd: 0, growEnd: 0, boostEnd: 0, planEnd: 0, revealEnd: 0, strategyEnd: 0, journeyEnd: 0, intelligenceEnd: 0, automationEnd: 0, channelsEnd: 0, contactEntry: 0, contact: 0, stageHeight: 1 };
    let lenis: Lenis;
    let trigger: ScrollTrigger;
    let moving = false;
    let motionTarget: MotionTarget | null = null;
    let motionKind: 'stop' | 'clamp' | 'jump' = 'stop';
    let consumed = false;
    let touchTravel = 0;
    let wheelTravel = 0;
    let wheelTimer = 0;
    let refreshTimer = 0;
    let pendingRefresh = false;
    let disposed = false;
    const overlayOpen = () => document.body.classList.contains('drawer-open') || document.documentElement.classList.contains('mobile-menu-open');
    const panelHeight = () => Math.max(1, Math.round(window.visualViewport?.height || window.innerHeight));
    const measurePanel = () => {
      const panel = panelHeight();
      const nav = Math.ceil(header?.getBoundingClientRect().height || 0);
      page.style.setProperty('--ms-panel-h', `${panel}px`);
      page.style.setProperty('--ms-header-h', `${nav}px`);
      const start = Math.round(documentTop(track));
      const heroEnd = Math.round(start + panel * HERO_END);
      g = { ...g, panel, start, heroEnd, attractEnd: heroEnd + panel, accompanyEnd: heroEnd + panel * 2, growEnd: heroEnd + panel * 3, boostEnd: heroEnd + panel * 4, planEnd: heroEnd + panel * 5, revealEnd: heroEnd + panel * 6 };
      SERVICE_STOPS.forEach((name, index) => { g[name] = heroEnd + panel * (index + 7); });
    };
    const measureTrack = () => {
      g.stageHeight = g.panel;
      track.style.height = `${g.stageHeight + g.channelsEnd - g.start}px`;
      g.contact = Math.round(documentTop(contact));
      g.contactEntry = g.contact;
      for (const name of STOPS) page.dataset[name] = String(g[name]);
      const bounds = serviceFigure.getBoundingClientRect();
      const field = planCanvas.getBoundingClientRect();
      const side = Math.min(bounds.width, bounds.height) * 1.02;
      const space = { cx: (bounds.left - field.left + bounds.width / 2) / field.width, cy: (bounds.top - field.top + bounds.height / 2) / field.height, sx: side / field.width, sy: side / field.height };
      mappedShapes = serviceShapes.map(shape => mapStoryShape(shape,space));
      planParticles.setShapeSize(side);
    };
    measurePanel(); measureTrack();

    // One reversible timeline and one pin for the entire existing journey.
    // Its physical scroll position is the source of truth in both directions.
    const master = gsap.timeline({ paused: true, defaults: { ease: 'none' } });
    gsap.set(claim, { opacity: 0, y: 24 });
    gsap.set(hero.querySelector('[data-closing-shade]'), { opacity: 0 });
    gsap.set(captions, { opacity: 0, x: -28 });
    gsap.set(captions[0], { opacity: 1, x: 0 });
    gsap.set(split, { autoAlpha: 0 });
    gsap.set(manifesto, { autoAlpha: 0, xPercent: 100 });
    gsap.set(groups, { autoAlpha: 0, y: 32 });
    gsap.set(nodes, { opacity: 0 });
    gsap.set(splitWords, { opacity: 0, y: 24 });
    gsap.set(thread, { scaleX: 0 });
    gsap.set(plan, { autoAlpha: 0 });
    gsap.set([...letters, ...lowerLetters], { opacity: 0, yPercent: 115 });
    gsap.set([cue, planCanvas, frame], { autoAlpha: 0 });
    gsap.set(services, { autoAlpha: 0 });
    gsap.set(cards, { autoAlpha: 0, y: 16 });
    const span = VIDEO_PANELS * .82 / captions.length;
    captions.forEach((caption, index) => {
      const start = index * span;
      if (index) master.to(caption, { opacity: 1, x: 0, duration: span * .18 }, start + span * .05);
      master.to(caption, { opacity: 0, x: 28, duration: span * .17 }, start + span * .83);
    });
    master.to(hero.querySelector('[data-film]'), { scale: .96, duration: VIDEO_PANELS * .14 }, VIDEO_PANELS * .82)
      .to(hero.querySelector('[data-closing-shade]'), { opacity: 1, duration: VIDEO_PANELS * .08 }, VIDEO_PANELS * .82)
      .to(controls, { opacity: 0, duration: VIDEO_PANELS * .04 }, VIDEO_PANELS * .84)
      .to(claim, { opacity: 1, y: 0, duration: VIDEO_PANELS * .1 }, VIDEO_PANELS * .86)
      .to(manifesto, { xPercent: 0, duration: .68 }, HERO_END)
      .set(manifesto, { autoAlpha: 1 }, HERO_END)
      .to(groups[0], { autoAlpha: 1, y: 0, duration: .25, ease: 'expo.out' }, HERO_END + .72)
      .to(thread, { scaleX: 1 / 3, duration: .85 }, HERO_END + .1)
      .to(nodes[0], { opacity: 1, duration: .2 }, HERO_END + .74);
    groups.slice(1).forEach((group, index) => {
      const start = HERO_END + index + 1;
      master.to(group, { autoAlpha: 1, y: 0, duration: .6, ease: 'expo.out' }, start + .12)
        .to(thread, { scaleX: (index + 2) / 3, duration: .8 }, start + .1)
        .to(nodes[index + 1], { opacity: 1, duration: .3 }, start + .4);
    });
    // Both openings share this reversible timeline and the existing gesture gate.
    master.to(split, { autoAlpha: 1, duration: .4 }, HERO_END + 3.05)
      .to(splitWords, { opacity: 1, y: 0, duration: .4, ease: 'expo.out' }, HERO_END + 3.48)
      .set(plan, { autoAlpha: 1 }, HERO_END + 4)
      .set(manifesto, { autoAlpha: 0 }, HERO_END + 4.01)
      .to(left, { xPercent: -104, duration: 1, ease: 'power2.inOut' }, HERO_END + 4)
      .to(right, { xPercent: 104, duration: 1, ease: 'power2.inOut' }, HERO_END + 4);
    letters.forEach((letter, index) => {
      master.to([letter, lowerLetters[index]], { opacity: 1, yPercent: 0, duration: .32, ease: 'power3.out' }, HERO_END + 4.08 + index * .035);
    });
    master.to(upper, { yPercent: -110, duration: .8, ease: 'power2.inOut' }, HERO_END + 5.05)
      .to(lower, { yPercent: 110, duration: .8, ease: 'power2.inOut' }, HERO_END + 5.05)
      .to(cue, { autoAlpha: 1, duration: .4 }, HERO_END + 5.25)
      .to(planCanvas, { autoAlpha: 1, duration: .15 }, HERO_END + 5.05)
      .to(frame, { autoAlpha: 1, duration: .4 }, HERO_END + 6.08)
      .to([upper, lower, cue], { autoAlpha: 0, duration: .3 }, HERO_END + 6.02)
      .to(services, { autoAlpha: 1, duration: .3 }, HERO_END + 6.3)
      .to({}, { duration: 11 }, HERO_END);
    cards.forEach((card, index) => {
      const start = HERO_END + 6 + index;
      if (index) master.to(cards[index - 1], { autoAlpha: 0, y: -12, duration: .25 }, start + .05);
      master.to(card, { autoAlpha: 1, y: 0, duration: .45, ease: 'expo.out' }, start + .45);
    });
    const render = () => {
      const y = window.scrollY;
      const units = y <= g.heroEnd ? clamp01((y - g.start) / (g.heroEnd - g.start)) * HERO_END : HERO_END + (y - g.heroEnd) / g.panel;
      master.time(Math.max(0, Math.min(HERO_END + 11, units)));
      const localProgress = units - HERO_END;
      const mode = y < g.heroEnd - EPSILON ? 'continuous' : y < g.attractEnd - EPSILON ? 'entry' : y <= g.growEnd + EPSILON ? 'manifesto' : y <= g.boostEnd + EPSILON ? 'boost' : y <= g.planEnd + EPSILON ? 'plan-entry' : y <= g.revealEnd + EPSILON ? 'plan-split' : y <= g.channelsEnd + EPSILON ? 'services' : 'reading';
      const step = String(y < g.attractEnd - EPSILON ? 0 : Math.min(4, 1 + Math.floor((y - g.attractEnd + EPSILON) / g.panel)));
      if (page.dataset.manifestoStep !== step) page.dataset.manifestoStep = step;
      if (page.dataset.scrollStage !== mode) page.dataset.scrollStage = mode;
      const entryValue = clamp01(localProgress / .68).toFixed(4);
      if (page.dataset.entryProgress !== entryValue) page.dataset.entryProgress = entryValue;
      const figureIndex = localProgress < 1.5 ? 0 : localProgress < 2.5 ? 1 : 2;
      if (canvas.getAttribute('aria-label') !== figureLabels[figureIndex]) canvas.setAttribute('aria-label', figureLabels[figureIndex]);
      const t = clamp01(localProgress < 1 ? (localProgress - .1) / .88 : localProgress < 2 ? localProgress - 1 : localProgress - 2);
      const eased = t * t * (3 - 2 * t);
      particles.setMorph(localProgress < 1 ? storyShapes.scatter : localProgress < 2 ? storyShapes.attract : storyShapes.path,
        localProgress < 1 ? storyShapes.attract : localProgress < 2 ? storyShapes.path : storyShapes.growth, eased);
      particles.setActive(!overlayOpen() && localProgress > 0 && localProgress < 3.5);
      const planProgress = clamp01((localProgress - 5.12) / .83);
      if (localProgress <= 6) planParticles.setMorph(storyShapes.planTransit, storyShapes.servicesFocus, planProgress * planProgress * (3 - 2 * planProgress));
      else {
        const segment = Math.min(4, Math.floor(localProgress - 6));
        const progress = clamp01((localProgress - 6 - segment - .08) / .82);
        planParticles.setMorph(segment === 0 ? storyShapes.servicesFocus : mappedShapes[segment - 1], mappedShapes[segment], progress * progress * (3 - 2 * progress));
      }
      planParticles.setActive(!overlayOpen() && localProgress > 5.05 && localProgress < 12.01);
      const expansion = clamp01(localProgress - 6);
      const expand = expansion * expansion * (3 - 2 * expansion);
      frame.style.transform = `scale(${.96 + .04 * expand})`;
      const serviceIndex = Math.max(0, Math.min(4, Math.round(localProgress - 7)));
      if (services.dataset.serviceIndex !== String(serviceIndex)) {
        services.dataset.serviceIndex = String(serviceIndex);
        serviceCounter.textContent = `${serviceIndex + 1} / 5`;
        previous.setAttribute('aria-disabled', String(serviceIndex === 0));
        next.setAttribute('aria-disabled', String(serviceIndex === 4));
      }
      if (y >= g.strategyEnd - EPSILON && Math.abs(y - g[SERVICE_STOPS[serviceIndex]]) <= EPSILON && announced !== serviceIndex) {
        announced = serviceIndex;
        announcement.textContent = (services.dataset.announcement || '').replace('{n}', String(serviceIndex + 1)).replace('{name}', cards[serviceIndex].dataset.serviceName || '');
      } else if (y < g.strategyEnd - EPSILON && announced !== -1) { announced = -1; announcement.textContent = ''; }
      split.classList.toggle('is-open', localProgress >= 5);
      const sequenceVisible = !overlayOpen() && y >= g.start - 1 && units < VIDEO_PANELS * .84;
      media.update(clamp01(units / VIDEO_PANELS), sequenceVisible);
      const setInert = (element: HTMLElement, value: boolean) => { if (element.inert !== value) element.inert = value; };
      setInert(claim, units < VIDEO_PANELS * .88 || localProgress > .01);
      setInert(controls, !sequenceVisible);
      setInert(hero, localProgress > .01);
      hero.classList.toggle('is-occluded', localProgress >= .68);
      setInert(manifesto, y < g.attractEnd - EPSILON || localProgress >= 3.45);
      setInert(plan, y < g.planEnd - EPSILON);
      setInert(split, localProgress >= 5);
      setInert(services, y < g.strategyEnd - EPSILON || y > g.channelsEnd + EPSILON);
      cards.forEach((card, index) => setInert(card, index !== serviceIndex));
      const changing = localProgress > 0 && localProgress < .68;
      const hint = changing ? 'transform' : '';
      if (manifesto.style.willChange !== hint) manifesto.style.willChange = hint;

    };
    trigger = ScrollTrigger.create({
      id: 'marketing-story-journey', trigger: track, start: 'top top',
      end: () => `+=${g.channelsEnd - g.start}`,
      pin: stage, pinSpacing: false,
    });

    const decide = (y: number, direction: Direction, distance: number): Decision => {
      const ahead = y + direction * distance;
      if (y < g.heroEnd - EPSILON) return direction > 0 && ahead >= g.heroEnd - EPSILON ? { kind: 'clamp', stop: 'heroEnd' } : { kind: 'free' };
      if (y > g.contactEntry + EPSILON) return direction < 0 && ahead <= g.contactEntry + EPSILON ? { kind: 'clamp', stop: 'contactEntry' } : { kind: 'free' };
      if (Math.abs(y - g.heroEnd) <= EPSILON && direction < 0) return { kind: 'free' };
      if (Math.abs(y - g.contactEntry) <= EPSILON && direction > 0) return { kind: 'free' };
      const candidates = direction > 0 ? STOPS : [...STOPS].reverse();
      const stop = candidates.find(name => direction > 0 ? g[name] > y + EPSILON : g[name] < y - EPSILON);
      return stop ? { kind: 'stop', stop } : { kind: 'free' };
    };
    const resolveTarget = (target: MotionTarget) => {
      if (target instanceof HTMLElement) return target === manifesto ? g.attractEnd : Math.max(0, documentTop(target) - (header?.offsetHeight || 0));
      if (target === 'start') return 0;
      if (target === 'end') return lenis.limit;
      return g[target];
    };
    const goTo = (y: number, kind: 'stop' | 'clamp' | 'jump', target: MotionTarget | null = null) => {
      if (Math.abs(y - lenis.animatedScroll) < 1) return;
      moving = true; motionTarget = target; motionKind = kind;
      const duration = kind === 'clamp' ? .4 : kind === 'stop' ? .9 : .85;
      lenis.scrollTo(y, { duration, easing: kind === 'clamp' ? easeClamp : easeStop, lock: true, force: true,
        onComplete: () => { moving = false; motionTarget = null; if (pendingRefresh) scheduleRefresh(); },
      });
    };
    for (const [button, direction] of [[previous, -1], [next, 1]] as const) button.addEventListener('click', () => {
      if (moving || overlayOpen() || button.getAttribute('aria-disabled') === 'true') return;
      const index = Math.max(0, Math.min(4, Number(services.dataset.serviceIndex) + direction));
      goTo(g[SERVICE_STOPS[index]], 'stop', SERVICE_STOPS[index]);
    }, { signal });
    const gate = ({ deltaY, event }: { deltaY: number; event: WheelEvent | TouchEvent }) => {
      if ('touches' in event && event.touches.length > 1) return false; // Leave pinch zoom native.
      if (!deltaY || ('ctrlKey' in event && event.ctrlKey)) return true;
      if (overlayOpen()) return true; // The driver's prevent callback leaves overlay scrolling native.
      const veto = () => { if (event.cancelable) event.preventDefault(); return false; };
      if (event.type === 'wheel') {
        window.clearTimeout(wheelTimer);
        wheelTimer = window.setTimeout(() => { consumed = false; wheelTravel = 0; }, 180);
      }
      if (moving || lenis.isLocked) { consumed = true; return veto(); }
      if (consumed) return veto();
      const direction: Direction = deltaY > 0 ? 1 : -1;
      const distance = event.type === 'touchend' ? Math.max(Math.abs(deltaY), Math.abs(lenis.velocity) ** 1.6) : Math.abs(deltaY);
      const decision = decide(lenis.targetScroll, direction, distance);
      if (decision.kind === 'free') return true;
      if (decision.kind === 'stop' && event.type === 'touchmove') {
        touchTravel += deltaY;
        if (Math.abs(touchTravel) < 14) return veto();
      }
      if (decision.kind === 'stop' && event.type === 'wheel') {
        wheelTravel += deltaY;
        if (Math.abs(wheelTravel) < 6) return veto();
      }
      consumed = true;
      goTo(g[decision.stop], decision.kind, decision.stop);
      return veto();
    };
    lenis = new Lenis({
      smoothWheel: true, syncTouch: true, syncTouchLerp: .085, touchInertiaExponent: 1.6,
      // Free wheel follows the input; explicit gesture durations stay animated.
      lerp: 0, autoRaf: false, anchors: false, allowNestedScroll: true,
      prevent: node => node.classList.contains('contact-drawer') || node.closest('.site-nav nav.is-open') !== null,
      virtualScroll: gate,
    });
    // Update once per position, including free scroll after the pin has ended.
    lenis.on('scroll', () => { ScrollTrigger.update(); render(); });
    // Lenis receives wall-clock milliseconds without changing GSAP's global lag policy.
    const tick = () => { const now = performance.now(); lenis.raf(now); media.tick(now); particles.tick(now); planParticles.tick(now); };
    gsap.ticker.add(tick);

    const onKey = (event: KeyboardEvent) => {
      if (overlayOpen() || event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.target instanceof Element && event.target.closest('input,textarea,select,[contenteditable="true"]')) return;
      if (event.key === ' ' && event.target instanceof Element && event.target.closest('button,a')) return;
      let direction: Direction | null = null;
      if (['ArrowDown', 'PageDown', ' '].includes(event.key)) direction = event.key === ' ' && event.shiftKey ? -1 : 1;
      if (['ArrowUp', 'PageUp'].includes(event.key)) direction = -1;
      if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault(); if (!moving) goTo(event.key === 'Home' ? 0 : lenis.limit, 'jump', event.key === 'Home' ? 'start' : 'end'); return;
      }
      if (!direction) return;
      event.preventDefault();
      if (moving || lenis.isLocked) return;
      const distance = event.key.startsWith('Arrow') ? 90 : g.panel * .8;
      const decision = decide(lenis.targetScroll, direction, distance);
      if (event.repeat && decision.kind === 'stop') return; // A held key is one gesture.
      if (decision.kind === 'free') lenis.scrollTo(lenis.targetScroll + direction * distance, { duration: .3, easing: easeClamp });
      else goTo(g[decision.stop], decision.kind, decision.stop);
    };
    window.addEventListener('keydown', onKey, { signal });
    window.addEventListener('touchstart', event => { consumed = event.touches.length > 1; touchTravel = 0; }, { passive: true, signal });
    hero.querySelector('[data-skip]')?.addEventListener('click', () => {
      media.pause(); moving = false; motionTarget = null;
      lenis.scrollTo(g.attractEnd, { immediate: true, force: true });
      manifesto.focus({ preventScroll: true });
    }, { signal });
    document.addEventListener('click', event => {
      if (!(event.target instanceof Element) || (event as MouseEvent).button !== 0 || event.defaultPrevented) return;
      const link = event.target.closest<HTMLAnchorElement>('a[href]');
      if (!link || link.target || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      let target: HTMLElement | null;
      try { target = document.getElementById(decodeURIComponent(url.hash.slice(1))); } catch { return; }
      if (!target) return;
      event.preventDefault();
      const y = target === manifesto ? g.attractEnd : Math.max(0, documentTop(target) - (header?.offsetHeight || 0));
      goTo(y, 'jump', target);
      if (location.hash !== url.hash) history.pushState(null, '', url.hash);
    }, { signal });

    const refresh = () => {
      if (disposed) return;
      if (overlayOpen()) { pendingRefresh = true; return; }
      pendingRefresh = false;
      const old = g;
      const y = lenis.animatedScroll;
      const units = (y - old.start) / old.panel;
      const reading = y > old.channelsEnd;
      const pastContact = y >= old.contact;
      const readingRatio = (y - old.channelsEnd) / Math.max(1, old.contact - old.channelsEnd);
      const resume = motionTarget;
      const resumeKind = motionKind;
      const settled = !moving ? STOPS.find(name => Math.abs(y - old[name]) <= EPSILON) : undefined;
      moving = false; motionTarget = null;
      lenis.scrollTo(y, { immediate: true, force: true });
      measurePanel();
      trigger.refresh();
      measureTrack();
      particles.invalidate();
      planParticles.invalidate();
      lenis.resize();
      const next = settled ? g[settled] : !reading ? g.start + units * g.panel : pastContact ? g.contact + y - old.contact : g.channelsEnd + readingRatio * (g.contact - g.channelsEnd);
      lenis.scrollTo(Math.max(0, next), { immediate: true, force: true });
      ScrollTrigger.update(); render();
      if (resume) goTo(resolveTarget(resume), resumeKind, resume);
    };
    function scheduleRefresh() {
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(refresh, 120);
    }
    let overlayWasOpen = overlayOpen();
    const overlayObserver = new MutationObserver(() => {
      const open = overlayOpen();
      if (open === overlayWasOpen) return; // Lenis also changes html classes during normal scrolling.
      overlayWasOpen = open;
      if (open) { moving = false; motionTarget = null; lenis.stop(); render(); }
      else {
        lenis.start(); lenis.resize();
        lenis.scrollTo(window.scrollY, { immediate: true, force: true });
        render(); if (pendingRefresh) scheduleRefresh();
      }
    });
    overlayObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    overlayObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    const navSize = new ResizeObserver(scheduleRefresh);
    if (header) navSize.observe(header);
    window.addEventListener('resize', scheduleRefresh, { passive: true, signal });
    window.addEventListener('orientationchange', scheduleRefresh, { passive: true, signal });
    window.addEventListener('agsit:viewport-change', scheduleRefresh, { passive: true, signal });
    window.visualViewport?.addEventListener('resize', scheduleRefresh, { passive: true, signal });
    window.addEventListener('pageshow', scheduleRefresh, { signal });
    void document.fonts.ready.then(() => { if (!signal.aborted) scheduleRefresh(); });
    render();
    return () => {
      disposed = true; local.abort();
      window.clearTimeout(wheelTimer); window.clearTimeout(refreshTimer);
      overlayObserver.disconnect(); navSize.disconnect();
      gsap.ticker.remove(tick); lenis.destroy(); media.dispose(); particles.dispose(); planParticles.dispose();
      hero.inert = false; claim.inert = false; controls.inert = false; manifesto.inert = false;
      plan.inert = false; split.inert = false; split.classList.remove('is-open');
      services.inert = false; cards.forEach(card => { card.inert = false; });
      frame.style.removeProperty('transform'); delete services.dataset.serviceIndex; announcement.textContent = '';
      for (const element of [left, right, manifesto]) element.style.removeProperty('will-change');
      hero.classList.remove('is-occluded');
      track.style.removeProperty('height');
      page.style.removeProperty('--ms-panel-h'); page.style.removeProperty('--ms-header-h');
      for (const name of ['motion', ...STOPS, 'scrollStage', 'entryProgress', 'manifestoStep']) delete page.dataset[name];
    };
  }, page);
  connection?.addEventListener('change', () => gsap.matchMediaRefresh(), { signal: lifetime.signal });
  const dispose = () => { modes.revert(); lifetime.abort(); delete page.dataset.ready; };
  document.addEventListener('astro:before-swap', dispose, { once: true, signal: lifetime.signal });
  window.addEventListener('pagehide', event => { if (!event.persisted) dispose(); }, { signal: lifetime.signal });
}
