import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
type DataConnection = EventTarget & { saveData?: boolean };
type StoryNavigator = Navigator & { connection?: DataConnection };

export function initMarketingStory() {
  const page = document.querySelector<HTMLElement>('[data-marketing-story]');
  if (!page || page.dataset.ready) return;
  page.dataset.ready = 'true';
  const abort = new AbortController();
  const { signal } = abort;
  const connection = (navigator as StoryNavigator).connection;
  const mediaQuery = gsap.matchMedia();
  let comparisonCleanup: (() => void) | undefined;

  mediaQuery.add({ motion: '(prefers-reduced-motion: no-preference)', reduced: '(prefers-reduced-motion: reduce)' }, context => {
    const staticMode = !!context.conditions?.reduced || !!connection?.saveData;
    const hero = page.querySelector<HTMLElement>('[data-hero]')!;
    const video = hero.querySelector<HTMLVideoElement>('[data-story-video]');
    const localAbort = new AbortController();
    const localSignal = localAbort.signal;
    const ios = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    let heroTrigger: ScrollTrigger | undefined;
    let chapter = -1;
    let videoReady = false;
    let videoFailed = false;
    let wantedTime = 0;
    let active = false;
    let tickerAttached = false;
    let generation = 0;
    let chapterEndTimer: ReturnType<typeof setTimeout> | undefined;
    const count = hero.querySelectorAll('[data-caption]').length;
    const duration = Number(hero.dataset.duration);
    const clipSources = JSON.parse(hero.dataset.clips || '[]') as string[];
    const retry = hero.querySelector<HTMLButtonElement>('[data-video-retry]')!;
    const segments = [...hero.querySelectorAll('[data-segment]')];
    const progress = hero.querySelector('[role="progressbar"]')!;
    const captions = [...hero.querySelectorAll<HTMLElement>('[data-caption]')];
    const claim = hero.querySelector<HTMLElement>('[data-claim]')!;
    const controls = hero.querySelector<HTMLElement>('[data-hero-controls]')!;

    // A paused video uses one outstanding seek at a time; no RAF runs outside the hero.
    const scrubVideo = () => {
      if (!video || !videoReady || videoFailed || !active || document.hidden || video.seeking) return;
      const target = Math.min(wantedTime, Math.max(0, video.duration - .04));
      if (Math.abs(video.currentTime - target) > 1 / 30) video.currentTime = target;
    };
    const playChapter = async () => {
      if (!video || !videoReady || videoFailed || chapter < 0 || !active || document.hidden) return;
      const request = ++generation;
      clearTimeout(chapterEndTimer);
      const hasClip = !!clipSources[chapter];
      const source = hasClip ? clipSources[chapter] : video.dataset.src!;
      const start = hasClip ? 0 : chapter * duration / count;
      try {
        if (video.getAttribute('src') !== source) {
          video.src = source;
          video.load();
          await new Promise<void>((resolve, reject) => {
            video.addEventListener('loadedmetadata', () => resolve(), { once: true, signal: localSignal });
            video.addEventListener('error', () => reject(new Error('media')), { once: true, signal: localSignal });
          });
        }
        if (request !== generation || !active || document.hidden) return;
        // On iOS, seek only at chapter boundaries, then let the decoder play normally.
        video.currentTime = Math.min(start + .01, Math.max(0, video.duration - .04));
        await video.play();
        if (!active || document.hidden) { video.pause(); return; }
        // An older play promise must not pause the newer chapter on fast scroll.
        if (request !== generation) return;
        const end = hasClip ? video.duration : Math.min(video.duration, (chapter + 1) * duration / count);
        chapterEndTimer = setTimeout(() => {
          if (request === generation) video.pause();
        }, Math.max(0, end - video.currentTime - .04) * 1000);
        retry.hidden = true;
      } catch {
        if (request === generation && active && !videoFailed) retry.hidden = false;
      }
    };
    const stopVideo = () => { ++generation; clearTimeout(chapterEndTimer); video?.pause(); gsap.ticker.remove(scrubVideo); tickerAttached = false; };
    const syncVideoActivity = () => {
      if (!active || document.hidden || staticMode) { stopVideo(); return; }
      if (ios) { void playChapter(); return; }
      if (!tickerAttached) { gsap.ticker.add(scrubVideo); tickerAttached = true; }
    };

    if (!staticMode) {
      hero.dataset.mode = ios ? 'chapters' : 'scrub';
      gsap.set(claim, { opacity: 0, y: 24 });
      claim.inert = true;
      gsap.set('[data-closing-shade]', { opacity: 0 });
      gsap.set(captions, { opacity: 0, x: -28 });
      gsap.set(captions[0], { opacity: 1, x: 0 });
      const story = gsap.timeline({ defaults: { ease: 'none' } });
      const span = .82 / count;
      captions.forEach((caption, index) => {
        const start = index * span;
        if (index) story.to(caption, { opacity: 1, x: 0, duration: span * .18 }, start + span * .05);
        story.to(caption, { opacity: 0, x: 28, duration: span * .17 }, start + span * .83);
      });
      story.to(hero.querySelector('[data-film]'), { scale: .96, duration: .14 }, .82)
        .to(hero.querySelector('[data-closing-shade]'), { opacity: 1, duration: .08 }, .82)
        .to(controls, { opacity: 0, duration: .04 }, .84)
        .to(claim, { opacity: 1, y: 0, duration: .1 }, .86)
        .to({}, { duration: 1 }, 0);
      heroTrigger = ScrollTrigger.create({
        id: 'marketing-story-hero', trigger: hero.querySelector('[data-hero-stage]'), start: 'top top', end: '+=560%', pin: true, scrub: true, anticipatePin: 1, animation: story,
        onUpdate(self) {
          const sequence = Math.min(1, self.progress / .82);
          const next = Math.min(count - 1, Math.floor(sequence * count));
          wantedTime = sequence * duration;
          const showingSequence = self.progress < .84;
          claim.inert = self.progress < .88;
          controls.inert = !showingSequence;
          captions.forEach((caption, index) => caption.setAttribute('aria-hidden', String(index !== next || !showingSequence)));
          if (next !== chapter) {
            chapter = next;
            progress.setAttribute('aria-valuenow', String(chapter + 1));
            segments.forEach((segment, index) => segment.classList.toggle('is-active', index <= chapter));
            if (ios) void playChapter();
          }
          const nextActive = self.isActive && self.progress < .84;
          if (nextActive !== active) { active = nextActive; syncVideoActivity(); }
        },
        onLeave: () => { active = false; stopVideo(); },
        onLeaveBack: () => { active = false; stopVideo(); },
      });
      hero.querySelector('[data-skip]')?.addEventListener('click', () => {
        active = false; stopVideo();
        // Native jump avoids a slow traversal through seven screens and moves focus too.
        const manifesto = document.getElementById('ms-manifesto');
        const headerHeight = document.querySelector('.site-nav')?.getBoundingClientRect().height ?? 0;
        const destination = manifesto ? manifesto.getBoundingClientRect().top + window.scrollY - headerHeight : (heroTrigger?.end ?? 0) + 1;
        window.scrollTo({ top: destination, behavior: 'instant' });
        manifesto?.focus({ preventScroll: true });
      }, { signal: localSignal });
      if (video) {
        video.muted = true;
        video.addEventListener('loadeddata', () => {
          videoReady = true;
          gsap.set(video, { opacity: 1 });
          // At scroll zero ScrollTrigger has no active interval yet, but chapter one is in view.
          if (heroTrigger && window.scrollY <= heroTrigger.end && heroTrigger.progress < .84) {
            chapter = Math.max(0, chapter);
            active = true;
          }
          syncVideoActivity();
        }, { once: true, signal: localSignal });
        video.addEventListener('error', () => {
          videoFailed = true; stopVideo(); retry.hidden = true;
          gsap.set(video, { opacity: 0 });
        }, { signal: localSignal });
        video.addEventListener('timeupdate', () => {
          if (!ios || !active || chapter < 0) return;
          const end = clipSources[chapter] ? video.duration : Math.min(video.duration, (chapter + 1) * duration / count);
          if (video.currentTime >= end - .06) video.pause();
        }, { signal: localSignal });
        retry.addEventListener('click', () => void playChapter(), { signal: localSignal });
        video.preload = 'auto'; video.src = video.dataset.src!; video.load();
      }
      document.addEventListener('visibilitychange', syncVideoActivity, { signal: localSignal });

      page.querySelectorAll<HTMLElement>('[data-reveal]').forEach(element => {
        const tween = gsap.fromTo(element, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: .65, ease: 'expo.out', paused: true });
        ScrollTrigger.create({ trigger: element, start: 'top 92%', end: 'bottom top', onEnter: () => tween.play(), onEnterBack: () => tween.play(), onLeave: () => tween.progress(1).pause(), onLeaveBack: () => tween.progress(1).pause() });
      });
      gsap.fromTo(page.querySelector('[data-manifesto-rule] i'), { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '#ms-manifesto', start: 'top 85%', end: 'bottom 55%', scrub: true } });
      gsap.fromTo(page.querySelector('[data-between]'), { scaleX: .15 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '[data-between]', start: 'top 90%', end: 'top 45%', scrub: true } });
      const diagram = page.querySelector('[data-integration]')!;
      const integration = gsap.timeline({ paused: true, defaults: { ease: 'expo.out', duration: .55 } })
        .fromTo(diagram.querySelectorAll('[data-integration-source]'), { opacity: 0, x: -18 }, { opacity: 1, x: 0, stagger: .1 })
        .fromTo(diagram.querySelectorAll('[data-integration-line]'), { scale: 0 }, { scale: 1, stagger: .08 }, '-=.2')
        .fromTo(diagram.querySelector('[data-integration-center]'), { opacity: 0, scale: .94 }, { opacity: 1, scale: 1 }, '-=.25')
        .fromTo(diagram.querySelector('[data-integration-output]'), { opacity: 0, x: -12 }, { opacity: 1, x: 0 }, '-=.15');
      ScrollTrigger.create({ trigger: diagram, start: 'top 88%', end: 'bottom top', onEnter: () => integration.play(), onEnterBack: () => integration.play(), onLeave: () => integration.progress(1).pause(), onLeaveBack: () => integration.progress(1).pause() });
    }

    comparisonCleanup = initComparison(page, staticMode);
    void document.fonts.ready.then(() => { if (!localSignal.aborted) ScrollTrigger.refresh(); });
    return () => {
      localAbort.abort(); stopVideo();
      video?.removeAttribute('src'); video?.load();
      delete hero.dataset.mode;
      claim.inert = false; controls.inert = false;
      comparisonCleanup?.();
    };
  });
  // Save-data can change while the page is open; rebuild only this page's animations.
  connection?.addEventListener('change', () => gsap.matchMediaRefresh(), { signal });
  document.addEventListener('astro:before-swap', () => { mediaQuery.revert(); abort.abort(); }, { once: true, signal });
}

function initComparison(page: HTMLElement, staticMode: boolean) {
  const root = page.querySelector<HTMLElement>('[data-comparison]')!;
  const abort = new AbortController();
  const { signal } = abort;
  const range = root.querySelector<HTMLInputElement>('[data-sim-range]')!;
  const play = root.querySelector<HTMLButtonElement>('[data-sim-play]')!;
  const state = { position: 0 };
  let withPlan = true;
  let visible = false;
  let wantsPlay = !staticMode;
  let previousStage = -1;
  let previousMode = '';
  const stages = [...root.querySelectorAll<HTMLElement>('[data-stage-reading]')];
  const actions = [...root.querySelectorAll<HTMLElement>('[data-action]')];
  const nodes = [...root.querySelectorAll<HTMLElement>('[data-sim-node]')];
  const inputs = [...root.querySelectorAll<HTMLElement>('[data-sim-input]')];
  const resultPending = root.querySelector<HTMLElement>('[data-result-pending]')!;
  const progress = root.querySelector<HTMLElement>('[data-sim-progress]')!;
  const curves = [...root.querySelectorAll<SVGGElement>('[data-curve]')].map(element => ({
    element, values: JSON.parse(element.dataset.values!) as number[],
    segments: [...element.querySelectorAll<SVGLineElement>('[data-curve-segment]')],
    cursor: element.querySelector<SVGCircleElement>('[data-curve-cursor]')!,
  }));
  const interestLevel = root.querySelector<HTMLElement>('[data-interest-level]')!;
  const levels = JSON.parse(interestLevel.dataset.levels!) as string[];
  let previousFinal = false;
  // Wall-clock time avoids GSAP lag smoothing stretching the simulation on busy frames.
  const duration = 40_000;
  let elapsed = 0;
  let startedAt = 0;
  let running = false;
  let frame = 0;
  const render = () => {
    const stage = Math.min(stages.length - 1, Math.floor(state.position / 20));
    range.value = String(Math.round(state.position));
    progress.style.transform = `scaleX(${state.position / 100})`;
    const title = stages[stage].querySelector('h4')!.textContent!;
    range.setAttribute('aria-valuetext', title);
    root.querySelector('[data-sim-output]')!.textContent = title;
    resultPending.textContent = root.dataset.inProgress!;
    const final = state.position >= 99.99;
    resultPending.hidden = final;
    root.querySelectorAll<HTMLElement>('[data-result]').forEach(element => { element.hidden = !final || element.dataset.result !== (withPlan ? 'with' : 'without'); });
    const mode = withPlan ? 'with' : 'without';
    curves.forEach(curve => {
      const current = curve.element.dataset.curve === mode;
      curve.element.toggleAttribute('hidden', !current);
      if (!current) return;
      const segment = Math.min(4, Math.floor(state.position / 20));
      const fraction = Math.min(1, state.position / 20 - segment);
      curve.segments.forEach((line, i) => { line.style.transform = `scaleX(${Math.max(0, Math.min(1, state.position / 20 - i))})`; });
      const value = curve.values[segment] + (curve.values[segment + 1] - curve.values[segment]) * fraction;
      curve.cursor.style.transform = `translate(${20 + (segment + fraction) * 108}px,${210 - value * 190}px)`;
      interestLevel.textContent = levels[value < .35 ? 0 : value < .68 ? 1 : 2];
    });
    if (stage !== previousStage || mode !== previousMode || final !== previousFinal) {
      stages.forEach((element, i) => { element.hidden = i !== stage; });
      actions.forEach((element, i) => { element.hidden = i > stage; });
      nodes.forEach((element, i) => element.classList.toggle('is-current', i <= stage));
      inputs.forEach((element, i) => element.classList.toggle('is-current', i === stage));
      root.querySelectorAll('[data-interest-reason]').forEach((element, i) => element.classList.toggle('is-current', i === stage));
      root.querySelectorAll<HTMLElement>('[data-with]').forEach(element => { element.hidden = !withPlan; });
      root.querySelectorAll<HTMLElement>('[data-without]').forEach(element => { element.hidden = withPlan; });
      root.dataset.mode = mode;
      previousStage = stage; previousMode = mode; previousFinal = final;
      requestAnimationFrame(() => { if (!signal.aborted) ScrollTrigger.refresh(); });
    }
  };
  const syncButton = () => {
    const playing = running;
    root.dataset.playing = String(playing);
    play.textContent = playing ? root.dataset.pauseLabel! : root.dataset.playLabel!;
  };
  const tick = (now: number) => {
    if (!running) return;
    state.position = Math.min(100, (elapsed + now - startedAt) / duration * 100);
    render();
    if (state.position >= 100) {
      elapsed = duration; running = false; wantsPlay = false; frame = 0; syncButton();
    } else frame = requestAnimationFrame(tick);
  };
  const freeze = () => {
    if (running) {
      elapsed = Math.min(duration, elapsed + performance.now() - startedAt);
      state.position = elapsed / duration * 100;
    }
    running = false; cancelAnimationFrame(frame); frame = 0;
    render();
  };
  const sync = () => {
    const shouldPlay = visible && wantsPlay && !staticMode && !document.hidden;
    if (shouldPlay && !running) {
      running = true; startedAt = performance.now(); frame = requestAnimationFrame(tick);
    } else if (!shouldPlay && running) freeze();
    syncButton();
  };
  play.addEventListener('click', () => {
    if (staticMode) {
      state.position = state.position >= 100 ? 0 : Math.min(100, state.position + 20);
      elapsed = state.position / 100 * duration; render(); syncButton(); return;
    }
    if (state.position >= 100) { elapsed = 0; state.position = 0; render(); }
    wantsPlay = !running; sync();
  }, { signal });
  root.querySelector('[data-sim-reset]')?.addEventListener('click', () => { wantsPlay = false; freeze(); elapsed = 0; state.position = 0; render(); syncButton(); }, { signal });
  range.addEventListener('input', () => {
    const position = Number(range.value);
    wantsPlay = false; freeze(); elapsed = position / 100 * duration; state.position = position; render(); syncButton();
  }, { signal });
  root.querySelectorAll<HTMLButtonElement>('[data-scenario]').forEach(button => button.addEventListener('click', () => {
    withPlan = button.dataset.scenario === 'with';
    root.querySelectorAll('[data-scenario]').forEach(element => element.setAttribute('aria-pressed', String(element === button)));
    render();
  }, { signal }));
  const observer = new IntersectionObserver(entries => {
    const entry = entries[0];
    // An edge touching the viewport can be "intersecting" with zero visible pixels.
    visible = entry.isIntersecting && entry.intersectionRect.height > 1;
    sync();
  }, { threshold: [0, .001] });
  observer.observe(root);
  document.addEventListener('visibilitychange', sync, { signal });
  render();
  return () => { observer.disconnect(); abort.abort(); running = false; cancelAnimationFrame(frame); root.dataset.playing = 'false'; };
}
