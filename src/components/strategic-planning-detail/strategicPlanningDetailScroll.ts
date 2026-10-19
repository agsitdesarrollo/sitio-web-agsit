
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import Lenis from 'lenis';

  gsap.registerPlugin(ScrollTrigger);
  type Direction = -1 | 1;

  const splitWords = (element: HTMLElement) => {
    if (element.dataset.wordsReady === 'true') return;
    element.dataset.wordsReady = 'true';
    const visit = (node: ChildNode) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const fragment = document.createDocumentFragment();
        (node.textContent ?? '').split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) return void fragment.appendChild(document.createTextNode(part));
          const word = document.createElement('span');
          word.className = 'sp-word'; word.textContent = part; fragment.appendChild(word);
        });
        node.parentNode?.replaceChild(fragment, node);
      } else if (node instanceof HTMLElement) Array.from(node.childNodes).forEach(visit);
    };
    Array.from(element.childNodes).forEach(visit);
  };

  // Derived from Marketing's single Lenis driver. All pre-contact zones
  // are discrete stops, including the pinned word reveal and service journey.
  const initStrategicPlanning = () => {
    const root = document.querySelector<HTMLElement>('.js-sp-page');
    if (!root || root.dataset.spReady === 'true') return;
    root.dataset.spReady = 'true';

    const hero = root.querySelector<HTMLElement>('.js-sp-hero');
    const narrativeTrack = root.querySelector<HTMLElement>('.js-sp-narrative-track');
    const narrative = root.querySelector<HTMLElement>('.js-sp-narrative');
    const lifecycleIntro = root.querySelector<HTMLElement>('.sp-lifecycle-intro');
    const lifecycleTrack = root.querySelector<HTMLElement>('.js-sp-lifecycle-track');
    const lifecyclePanel = root.querySelector<HTMLElement>('.js-sp-lifecycle-panel');
    const method = root.querySelector<HTMLElement>('.sp-method');
    const methodTrack = root.querySelector<HTMLElement>('.sp-method-track');
    const methodSteps = root.querySelector<HTMLElement>('.sp-method-steps');
    const methodIntro = root.querySelector<HTMLElement>('.sp-method-intro');
    const methodList = root.querySelector<HTMLOListElement>('.sp-method-list');
    const contact = root.querySelector<HTMLElement>('.final-contact-section');
    const stages = Array.from(root.querySelectorAll<HTMLElement>('.js-sp-stage'));
    const words = root.querySelector<HTMLElement>('.js-sp-words');
    if (!hero || !narrativeTrack || !narrative || !lifecycleIntro || !lifecycleTrack || !lifecyclePanel || !method || !methodTrack || !methodSteps || !methodIntro || !methodList || !contact) return;
    if (words) splitWords(words);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { root.classList.add('is-reduced-motion'); return () => { root.classList.remove('is-reduced-motion'); delete root.dataset.spReady; }; }
    root.classList.add('is-enhanced');
    ScrollTrigger.config({ ignoreMobileResize: true });

    const stageCount = Math.max(1, stages.length);
    const cssValue = (name: string) => Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name)) || 0;
    let stablePanelHeight = Math.max(1, Math.round(cssValue('--app-panel-h') || window.innerHeight));
    const panelHeight = () => stablePanelHeight;
    const visibleHeight = () => Math.max(1, Math.floor(window.visualViewport?.height || window.innerHeight));
    let methodSplit = false;
    let methodPosition: 'overview' | 'steps' = 'overview';
    const measureMethod = () => {
      // Measure the original, fully assembled layout at the actual visible
      // height. Never infer fit from a device breakpoint or from stable vh.
      root.style.setProperty('--sp-method-panel-h', `${visibleHeight()}px`);
      root.classList.remove('is-method-split', 'is-method-compact');
      methodIntro.appendChild(methodList);
      methodSteps.hidden = true;
      const styles = getComputedStyle(method);
      const available = method.clientHeight - Number.parseFloat(styles.paddingTop) - Number.parseFloat(styles.paddingBottom);
      const grid = method.querySelector<HTMLElement>('.sp-method-grid')!;
      methodSplit = Math.max(grid.scrollHeight, grid.getBoundingClientRect().height) > available + 0.5;
      if (methodSplit) {
        root.classList.add('is-method-split');
        methodSteps.hidden = false;
        methodSteps.appendChild(methodList);
        const stepStyles = getComputedStyle(methodSteps);
        const stepsAvailable = methodSteps.clientHeight - Number.parseFloat(stepStyles.paddingTop) - Number.parseFloat(stepStyles.paddingBottom);
        root.classList.toggle('is-method-compact', methodList.scrollHeight > stepsAvailable);
      }
      root.dataset.methodStops = methodSplit ? '2' : '1';
    };
    const setTrackGeometry = () => {
      stablePanelHeight = Math.max(1, Math.round(cssValue('--app-panel-h') || window.innerHeight));
      const height = panelHeight();
      root.style.setProperty('--sp-panel-h', `${height}px`);
      // Narrative: one visible panel + 1.3 panels of word reveal.
      root.style.setProperty('--sp-narrative-track-h', `${Math.round(height * 2.3)}px`);
      // Lifecycle: one visible panel + one panel between consecutive cards.
      // The last card sits exactly at the end of the pin, so the very next
      // stop (Method) is a single panel away and the move is fully visible.
      root.style.setProperty('--sp-lifecycle-track-h', `${Math.round(height * stageCount)}px`);
      measureMethod();
    };
    // Layout positions, never pinned rectangles.
    const top = (element: HTMLElement) => {
      let offset = 0;
      let current: HTMLElement | null = element;
      while (current) {
        offset += current.offsetTop;
        current = current.offsetParent as HTMLElement | null;
      }
      return Math.max(0, Math.round(offset));
    };
    setTrackGeometry();

    // ── Scroll-linked animation (pins, reveal, cards) ──────────────────────
    let activeStage = 0;
    let stageTimeline: gsap.core.Timeline | null = null;
    const methodItems = Array.from(methodTrack.querySelectorAll<HTMLElement>('.js-sp-reveal'));
    const methodShown = new Set<HTMLElement>();
    let methodTween: gsap.core.Tween | null = null;
    let methodFallback = 0;
    const finishMethod = () => {
      methodTween?.kill();
      window.clearTimeout(methodFallback);
      methodTrack.classList.remove('is-entering');
      gsap.set(methodItems, { clearProps: 'opacity,visibility,transform' });
    };
    const revealMethod = (panel: HTMLElement) => {
      if (panel.hidden || methodShown.has(panel)) return;
      finishMethod();
      methodShown.add(panel);
      methodTrack.classList.add('is-entering');
      // Natural CSS stays visible until the whole section arrives. No step
      // waits for its own viewport threshold, including the last one.
      methodFallback = window.setTimeout(finishMethod, 900);
      methodTween = gsap.fromTo(Array.from(panel.querySelectorAll<HTMLElement>('.js-sp-reveal')), { opacity: 0, y: 12 }, {
        opacity: 1, y: 0, duration: 0.4, stagger: 0.04,
        ease: 'power3.out', onComplete: finishMethod,
      });
    };
    const context = gsap.context(() => {
      const narrativeTimeline = gsap.timeline({ defaults: { ease: 'none' } });
      narrativeTimeline.from('.js-sp-words .sp-word', { opacity: 0.14, duration: 0.3, stagger: { each: 0.4 } });
      ScrollTrigger.create({ id: 'sp-narrative-reveal', trigger: narrativeTrack, start: 'top top', end: 'bottom bottom', pin: narrative, pinSpacing: false, animation: narrativeTimeline, scrub: 0.45, invalidateOnRefresh: true, refreshPriority: 1 });

      const railItems = gsap.utils.toArray<HTMLElement>('.js-sp-rail-item', root);
      const counter = root.querySelector<HTMLElement>('.js-sp-counter');
      const progress = root.querySelector<HTMLElement>('.js-sp-progress');
      stages.forEach((stage, index) => gsap.set(stage, index === 0 ? { autoAlpha: 1, y: 0 } : { autoAlpha: 0, y: 44 }));
      if (progress) gsap.set(progress, { scaleY: 1 / stageCount, transformOrigin: '50% 0%' });
      const setActiveStage = (requestedStage: number) => {
        const nextStage = Math.max(0, Math.min(stages.length - 1, requestedStage));
        if (nextStage === activeStage) return;
        railItems.forEach((item, index) => item.classList.toggle('is-active', index === nextStage));
        if (counter) counter.textContent = String(nextStage + 1).padStart(2, '0');
        if (progress) gsap.to(progress, { scaleY: (nextStage + 1) / stageCount, duration: 0.32, ease: 'power2.out', overwrite: 'auto' });
        const outgoing = stages[activeStage];
        const next = stages[nextStage];
        if (!next) return;
        activeStage = nextStage;
        stageTimeline?.kill();
        // Only one card on screen at a time: any third card is force-hidden,
        // the outgoing card leaves, then the incoming card enters.
        gsap.killTweensOf(stages);
        stages.forEach((stage, index) => {
          if (stage === outgoing || index === nextStage) return;
          gsap.set(stage, { autoAlpha: 0, y: 44 });
        });
        stageTimeline = gsap.timeline({ defaults: { overwrite: 'auto' } });
        if (outgoing) stageTimeline.to(outgoing, { autoAlpha: 0, y: 44, duration: 0.2, ease: 'power1.in' });
        stageTimeline.fromTo(next, { autoAlpha: 0, y: 44 }, { autoAlpha: 1, y: 0, duration: 0.26, ease: 'power2.out' });
      };
      ScrollTrigger.create({
        id: 'sp-lifecycle-journey', trigger: lifecycleTrack, start: 'top top', end: 'bottom bottom', pin: lifecyclePanel, pinSpacing: false, invalidateOnRefresh: true, refreshPriority: 2,
        // Stops sit at i / (N - 1) of the pin; the card flips halfway between
        // two stops, which also keeps a scrollbar drag in sync.
        onUpdate: (self) => setActiveStage(Math.round(self.progress * (stageCount - 1))),
      });
      gsap.fromTo('.js-sp-method-img', { yPercent: 5 }, { yPercent: -5, ease: 'none', scrollTrigger: { trigger: method, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true, refreshPriority: 3 } });
      gsap.utils.toArray<HTMLElement>('.js-sp-reveal', root).filter((element) => !methodTrack.contains(element)).forEach((element) => gsap.from(element, { autoAlpha: 0, y: 30, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 88%', refreshPriority: 4 } }));
      [method, methodSteps].forEach((panel) => ScrollTrigger.create({
        trigger: panel, start: () => panel.hidden ? top(contact) + 1 : top(panel),
        end: () => panel.hidden ? top(contact) + 2 : top(panel) + panel.offsetHeight,
        onEnter: () => revealMethod(panel), onEnterBack: () => revealMethod(panel), refreshPriority: 4,
      }));
    }, root);

    // ── Geometry ───────────────────────────────────────────────────────────
    const TOLERANCE = 6;
    const at = (a: number, b: number) => Math.abs(a - b) <= TOLERANCE;
    const narrativeRange = () => {
      const start = top(narrativeTrack);
      return { start, end: start + Math.max(0, narrativeTrack.offsetHeight - panelHeight()) };
    };
    const journeyRange = () => {
      const start = top(lifecycleTrack);
      return { start, end: start + Math.max(0, lifecycleTrack.offsetHeight - panelHeight()) };
    };
    type Geometry = {
      hero: number; narrativeStart: number; narrativeEnd: number; intro: number;
      stages: number[]; method: number; methodLast: number; contact: number; methodNative: boolean; trackStops: number[];
    };
    const geometry = (): Geometry => {
      const n = narrativeRange();
      const j = journeyRange();
      const stageStops = stages.map((_, index) => Math.round(j.start + ((j.end - j.start) * index) / Math.max(1, stageCount - 1)));
      const methodTop = top(method);
      const methodStops = methodSplit ? [methodTop, top(methodSteps)] : [methodTop];
      const contactTop = top(contact);
      const methodNative = false;
      return {
        hero: top(hero), narrativeStart: n.start, narrativeEnd: n.end, intro: top(lifecycleIntro),
        stages: stageStops, method: methodTop, methodLast: methodStops[methodStops.length - 1], contact: contactTop, methodNative,
        trackStops: [top(hero), n.start, n.end, top(lifecycleIntro), ...stageStops, ...methodStops, contactTop],
      };
    };
    const nextStop = (list: number[], y: number, direction: Direction) => {
      if (direction > 0) return list.find((stop) => stop > y + TOLERANCE) ?? null;
      for (let index = list.length - 1; index >= 0; index -= 1) if (list[index] < y - TOLERANCE) return list[index];
      return null;
    };

    type Decision = { kind: 'free' } | { kind: 'clamp'; y: number } | { kind: 'stop'; y: number };
    const FREE: Decision = { kind: 'free' };
    const decide = (y: number, direction: Direction, distance: number): Decision => {
      const g = geometry();
      const ahead = direction > 0 ? y + distance : y - distance;

      // Contact + footer: free reading. Going up, settle on the top of Contact
      // before handing control back to the tracks.
      if (y > g.contact + TOLERANCE) {
        if (direction > 0 || ahead > g.contact) return FREE;
        return { kind: 'clamp', y: g.contact };
      }
      if (at(y, g.contact)) {
        if (direction > 0) return FREE;
        if (!g.methodNative) return { kind: 'stop', y: g.methodLast };
        return ahead <= g.method ? { kind: 'clamp', y: g.method } : FREE;
      }
      // The pinned narrative has two stops: unrevealed and fully revealed.
      // One gesture reveals (or reverses) all words; only a later gesture exits.
      // Everything else is a track: one gesture, one stop.
      const destination = nextStop(g.trackStops, y, direction);
      return destination === null ? FREE : { kind: 'stop', y: destination };
    };

    // ── Single scroll driver ───────────────────────────────────────────────
    const TOUCH_INERTIA_EXPONENT = 1.6;
    const menuOpen = () => document.documentElement.classList.contains('mobile-menu-open');
    const drawerOpen = () => document.body.classList.contains('drawer-open');
    let moving = false;
    let movingTimer = 0;
    let consumed = false;
    let wheelTimer = 0;
    const stopEase = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const clampEase = (t: number) => 1 - Math.pow(1 - t, 3);

    const lenis = new Lenis({
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.085,
      touchInertiaExponent: TOUCH_INERTIA_EXPONENT,
      lerp: 0.11,
      anchors: true,
      autoRaf: false,
      allowNestedScroll: true,
      prevent: (node) => node.classList.contains('contact-drawer'),
      virtualScroll: (data) => gate(data),
    });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const goTo = (y: number, kind: 'stop' | 'clamp') => {
      const distance = Math.abs(y - lenis.animatedScroll);
      if (distance < 1) return;
      const duration = kind === 'stop'
        ? gsap.utils.clamp(0.55, 0.9, 0.55 + (distance / panelHeight()) * 0.2)
        : gsap.utils.clamp(0.28, 0.6, (distance / panelHeight()) * 0.8);
      moving = true;
      window.clearTimeout(movingTimer);
      movingTimer = window.setTimeout(() => { moving = false; }, duration * 1000 + 400);
      lenis.scrollTo(y, {
        duration,
        easing: kind === 'stop' ? stopEase : clampEase,
        lock: true,
        force: true,
        onComplete: () => {
          window.clearTimeout(movingTimer); moving = false;
          if (at(y, top(method))) { methodPosition = 'overview'; revealMethod(method); }
          if (methodSplit && at(y, top(methodSteps))) { methodPosition = 'steps'; revealMethod(methodSteps); }
        },
      });
    };

    const gate = (data: { deltaX: number; deltaY: number; event: Event }) => {
      const { deltaX, deltaY, event } = data;
      if (deltaX === 0 && deltaY === 0) return true; // tap / touchstart reset
      if (deltaY === 0) return true;
      if ((event as WheelEvent).ctrlKey) return true;
      if (menuOpen() || drawerOpen()) { if (event.cancelable && !drawerOpen()) event.preventDefault(); return false; }
      const veto = () => { if (event.cancelable) event.preventDefault(); return false; };
      if (event.type === 'wheel') {
        // A wheel burst (mouse notches or trackpad inertia) is one gesture
        // until it goes quiet.
        window.clearTimeout(wheelTimer);
        wheelTimer = window.setTimeout(() => { consumed = false; }, 180);
      }
      if (moving || lenis.isLocked) { consumed = true; return veto(); }
      if (consumed) return veto();
      const direction: Direction = deltaY > 0 ? 1 : -1;
      // Lenis derives the touch inertia from its velocity, not from deltaY.
      const distance = event.type === 'touchend'
        ? Math.abs(lenis.velocity) ** TOUCH_INERTIA_EXPONENT
        : Math.abs(deltaY);
      const decision = decide(lenis.targetScroll, direction, distance);
      if (decision.kind === 'free') return true;
      consumed = true;
      goTo(decision.y, decision.kind);
      return veto();
    };

    const onTouchStart = () => { consumed = false; };
    const onKeyDown = (event: KeyboardEvent) => {
      if (menuOpen() || drawerOpen()) return;
      const target = event.target;
      if (target instanceof Element && target.closest('input, textarea, select, button, a, [contenteditable="true"]')) return;
      const direction: Direction | null = ['ArrowDown', 'PageDown', ' '].includes(event.key) ? 1 : ['ArrowUp', 'PageUp'].includes(event.key) ? -1 : null;
      if (direction === null) return;
      event.preventDefault();
      if (moving || lenis.isLocked) return;
      const distance = event.key.startsWith('Arrow') ? 90 : Math.round(panelHeight() * 0.8);
      const decision = decide(lenis.targetScroll, direction, distance);
      if (decision.kind === 'free') { lenis.scrollTo(lenis.targetScroll + direction * distance, { duration: 0.45, easing: clampEase }); return; }
      goTo(decision.y, decision.kind);
    };
    const heroNext = () => { if (!moving && !lenis.isLocked) goTo(geometry().narrativeStart, 'stop'); };

    // The contact drawer freezes the body (position: fixed). Lenis must sleep
    // while it is open and re-read the real scroll position when it closes.
    const bodyObserver = new MutationObserver(() => {
      if (drawerOpen()) { window.clearTimeout(movingTimer); moving = false; lenis.stop(); }
      else lenis.start();
    });
    bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    let refreshTimer = 0;
    const refresh = () => {
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => {
        if (moving || drawerOpen()) { refresh(); return; }
        // Preserve the semantic stop, including steps -> unified Method and
        // the visitor's offset inside freely scrolling Contact / footer.
        const before = geometry();
        const y = lenis.animatedScroll;
        const oldStops = before.trackStops;
        const index = oldStops.reduce((best, stop, i) => Math.abs(stop - y) < Math.abs(oldStops[best] - y) ? i : best, 0);
        const methodIndex = oldStops.indexOf(before.method);
        const onSteps = at(y, before.methodLast) && (methodSplit || methodPosition === 'steps');
        const contactOffset = y >= before.contact - TOLERANCE ? y - before.contact : null;
        finishMethod();
        setTrackGeometry();
        ScrollTrigger.refresh();
        lenis.resize();
        const after = geometry();
        const destination = contactOffset !== null ? after.contact + contactOffset
          : onSteps ? after.methodLast : after.trackStops[Math.min(index, methodIndex)];
        if (onSteps) methodPosition = 'steps';
        lenis.scrollTo(destination, { immediate: true, force: true });
        ScrollTrigger.update();
      }, 160);
    };

    root.addEventListener('agsit:track-next', heroNext);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('agsit:viewport-change', refresh, { passive: true });
    window.addEventListener('agsit:mobile-menu-change', refresh, { passive: true });
    window.addEventListener('resize', refresh, { passive: true });
    window.addEventListener('orientationchange', refresh, { passive: true });
    window.visualViewport?.addEventListener('resize', refresh, { passive: true });
    window.addEventListener('load', refresh, { once: true });
    document.fonts?.ready.then(refresh);
    root.querySelectorAll('img').forEach((image) => image.addEventListener('load', refresh, { once: true }));
    window.requestAnimationFrame(refresh);
    return () => {
      window.clearTimeout(refreshTimer); window.clearTimeout(wheelTimer); window.clearTimeout(movingTimer);
      root.removeEventListener('agsit:track-next', heroNext);
      window.removeEventListener('touchstart', onTouchStart); window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('agsit:viewport-change', refresh); window.removeEventListener('agsit:mobile-menu-change', refresh);
      window.removeEventListener('resize', refresh); window.removeEventListener('orientationchange', refresh);
      window.visualViewport?.removeEventListener('resize', refresh);
      bodyObserver.disconnect(); gsap.ticker.remove(tick); lenis.destroy(); context.revert();
      finishMethod();
      methodIntro.appendChild(methodList); methodSteps.hidden = true;
      root.classList.remove('is-method-split', 'is-method-compact');
      root.classList.remove('is-enhanced');
      delete root.dataset.spReady;
    };
  };


export const setupStrategicPlanningDetailScroll = () => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let dispose = initStrategicPlanning();
  const rebuild = () => { dispose?.(); dispose = initStrategicPlanning(); };
  preference.addEventListener('change', rebuild);
  window.addEventListener('pagehide', () => { preference.removeEventListener('change', rebuild); dispose?.(); }, { once: true });
};
