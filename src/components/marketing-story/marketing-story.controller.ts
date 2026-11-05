import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { createStoryVideo } from './marketing-story.video';

gsap.registerPlugin(ScrollTrigger);
type Direction = -1 | 1;
type Stop = 'heroEnd' | 'openingEnd';
type MotionTarget = Stop | 'start' | 'end' | HTMLElement;
type Decision = { kind: 'free' } | { kind: 'clamp' | 'stop'; stop: Stop };
type Connection = EventTarget & { saveData?: boolean };
const VIDEO_PANELS = 5.6;
const WORD_PANELS = 1;
const OPENING_PANELS = 1;
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
    if (context.conditions?.reduced || connection?.saveData) {
      page.dataset.motion = 'static';
      return () => { delete page.dataset.motion; };
    }
    const track = page.querySelector<HTMLElement>('[data-journey-track]')!;
    const stage = page.querySelector<HTMLElement>('[data-journey-stage]')!;
    const hero = page.querySelector<HTMLElement>('[data-hero]')!;
    const split = page.querySelector<HTMLElement>('[data-hero-split]')!;
    const manifesto = page.querySelector<HTMLElement>('#ms-manifesto')!;
    const contact = page.querySelector<HTMLElement>('.final-contact-section')!;
    const header = document.querySelector<HTMLElement>('.site-nav');
    const claim = hero.querySelector<HTMLElement>('[data-claim]')!;
    const controls = hero.querySelector<HTMLElement>('[data-hero-controls]')!;
    const captions = [...hero.querySelectorAll<HTMLElement>('[data-caption]')];
    const upper = split.querySelector<HTMLElement>('[data-split-upper]')!;
    const lower = split.querySelector<HTMLElement>('[data-split-lower]')!;
    const local = new AbortController();
    const { signal } = local;
    page.dataset.motion = 'enhanced';
    const media = createStoryVideo(hero, signal);
    let g = { panel: 1, start: 0, heroEnd: 0, openingEnd: 0, contact: 0, stageHeight: 1 };
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
      g = { ...g, panel, start, heroEnd: Math.round(start + panel * (VIDEO_PANELS + WORD_PANELS)), openingEnd: Math.round(start + panel * (VIDEO_PANELS + WORD_PANELS + OPENING_PANELS)) };
    };
    const measureReading = () => {
      g.stageHeight = Math.max(g.panel, manifesto.offsetHeight);
      track.style.height = `${g.stageHeight + g.openingEnd - g.start}px`;
      g.contact = documentTop(contact);
      page.dataset.heroEnd = String(g.heroEnd);
      page.dataset.openingEnd = String(g.openingEnd);
    };
    measurePanel(); measureReading();

    // One reversible timeline and one pin for the entire existing journey.
    // Its physical scroll position is the source of truth in both directions.
    const master = gsap.timeline({ paused: true, defaults: { ease: 'none' } });
    gsap.set(claim, { opacity: 0, y: 24 });
    gsap.set(hero.querySelector('[data-closing-shade]'), { opacity: 0 });
    gsap.set(captions, { opacity: 0, x: -28 });
    gsap.set(captions[0], { opacity: 1, x: 0 });
    gsap.set(split, { autoAlpha: 0 });
    gsap.set(manifesto, { autoAlpha: 0 });
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
      .to(claim, { opacity: 0, duration: .28 }, VIDEO_PANELS + .05)
      .to(split, { autoAlpha: 1, duration: .4 }, VIDEO_PANELS + .12)
      .to(manifesto, { autoAlpha: 1, duration: .01 }, VIDEO_PANELS + WORD_PANELS - .1)
      .to(upper, { yPercent: -52, duration: OPENING_PANELS }, VIDEO_PANELS + WORD_PANELS)
      .to(lower, { yPercent: 52, duration: OPENING_PANELS }, VIDEO_PANELS + WORD_PANELS);
    const render = () => {
      const y = window.scrollY;
      const units = (y - g.start) / g.panel;
      const opening = clamp01((y - g.heroEnd) / (g.openingEnd - g.heroEnd));
      const mode = y < g.heroEnd - EPSILON ? 'continuous' : y < g.openingEnd - EPSILON ? 'opening' : 'reading';
      if (page.dataset.scrollStage !== mode) page.dataset.scrollStage = mode;
      const progressValue = opening.toFixed(4);
      if (page.dataset.openingProgress !== progressValue) page.dataset.openingProgress = progressValue;
      const sequenceVisible = !overlayOpen() && y >= g.start - 1 && units < VIDEO_PANELS * .84;
      media.update(clamp01(units / VIDEO_PANELS), sequenceVisible);
      const setInert = (element: HTMLElement, value: boolean) => { if (element.inert !== value) element.inert = value; };
      setInert(claim, units < VIDEO_PANELS * .88 || units > VIDEO_PANELS + .05);
      setInert(controls, !sequenceVisible);
      setInert(hero, units >= VIDEO_PANELS + .6);
      hero.classList.toggle('is-occluded', units >= VIDEO_PANELS + .6);
      setInert(manifesto, opening < 1);
      // Remove the empty clipped layers from painting at the pin boundary.
      split.classList.toggle('is-open', opening >= 1);
      const changing = opening > 0 && opening < 1;
      const hint = changing ? 'transform' : '';
      if (upper.style.willChange !== hint) { upper.style.willChange = hint; lower.style.willChange = hint; }
    };
    trigger = ScrollTrigger.create({
      id: 'marketing-story-journey', trigger: track, start: 'top top',
      end: () => `+=${g.openingEnd - g.start}`,
      pin: stage, pinSpacing: false, scrub: true, animation: master,
      onUpdate: render,
    });

    const decide = (y: number, direction: Direction, distance: number): Decision => {
      const ahead = y + direction * distance;
      if (y < g.heroEnd - EPSILON) return direction > 0 && ahead >= g.heroEnd ? { kind: 'clamp', stop: 'heroEnd' } : { kind: 'free' };
      if (y > g.openingEnd + EPSILON) return direction < 0 && ahead <= g.openingEnd ? { kind: 'clamp', stop: 'openingEnd' } : { kind: 'free' };
      if (Math.abs(y - g.heroEnd) <= EPSILON && direction < 0) return { kind: 'free' };
      if (Math.abs(y - g.openingEnd) <= EPSILON && direction > 0) return { kind: 'free' };
      return { kind: 'stop', stop: direction > 0 ? 'openingEnd' : 'heroEnd' };
    };
    const resolveTarget = (target: MotionTarget) => {
      if (target instanceof HTMLElement) return target === manifesto ? g.openingEnd : Math.max(0, documentTop(target) - (header?.offsetHeight || 0));
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
      lerp: .3, autoRaf: false, anchors: false, allowNestedScroll: true,
      prevent: node => node.classList.contains('contact-drawer') || node.closest('.site-nav nav.is-open') !== null,
      virtualScroll: gate,
    });
    lenis.on('scroll', ScrollTrigger.update);
    // Lenis receives wall-clock milliseconds without changing GSAP's global lag policy.
    const tick = () => { const now = performance.now(); lenis.raf(now); media.tick(now); };
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
      if (decision.kind === 'free') lenis.scrollTo(lenis.targetScroll + direction * distance, { duration: .3, easing: easeClamp });
      else goTo(g[decision.stop], decision.kind, decision.stop);
    };
    window.addEventListener('keydown', onKey, { signal });
    window.addEventListener('touchstart', event => { consumed = event.touches.length > 1; touchTravel = 0; }, { passive: true, signal });
    hero.querySelector('[data-skip]')?.addEventListener('click', () => {
      media.pause(); moving = false; motionTarget = null;
      lenis.scrollTo(g.openingEnd, { immediate: true, force: true });
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
      const y = target === manifesto ? g.openingEnd : Math.max(0, documentTop(target) - (header?.offsetHeight || 0));
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
      const reading = y > old.openingEnd;
      const pastContact = y >= old.contact;
      const readingRatio = (y - old.openingEnd) / Math.max(1, old.contact - old.openingEnd);
      const resume = motionTarget;
      const resumeKind = motionKind;
      moving = false; motionTarget = null;
      lenis.scrollTo(y, { immediate: true, force: true });
      measurePanel();
      trigger.refresh(); // Restores natural width before measuring the manifesto after rotation.
      measureReading();
      lenis.resize();
      const next = !reading ? g.start + units * g.panel : pastContact ? g.contact + y - old.contact : g.openingEnd + readingRatio * (g.contact - g.openingEnd);
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
      gsap.ticker.remove(tick); lenis.destroy(); media.dispose();
      hero.inert = false; claim.inert = false; controls.inert = false; manifesto.inert = false;
      upper.style.removeProperty('will-change'); lower.style.removeProperty('will-change');
      split.classList.remove('is-open');
      hero.classList.remove('is-occluded');
      track.style.removeProperty('height');
      page.style.removeProperty('--ms-panel-h'); page.style.removeProperty('--ms-header-h');
      for (const name of ['motion', 'heroEnd', 'openingEnd', 'scrollStage', 'openingProgress']) delete page.dataset[name];
    };
  }, page);
  connection?.addEventListener('change', () => gsap.matchMediaRefresh(), { signal: lifetime.signal });
  const dispose = () => { modes.revert(); lifetime.abort(); delete page.dataset.ready; };
  document.addEventListener('astro:before-swap', dispose, { once: true, signal: lifetime.signal });
  window.addEventListener('pagehide', event => { if (!event.persisted) dispose(); }, { signal: lifetime.signal });
}
