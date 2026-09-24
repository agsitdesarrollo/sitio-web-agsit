import Lenis from 'lenis';

/*
 * Scroll model of the process-detail pages
 * ----------------------------------------
 * Every gesture (wheel, touch, keyboard, route links, in-page anchors) goes
 * through ONE scroll driver: Lenis owns the momentum and writes
 * window.scrollTo itself, so the browser never scrolls this page on its own
 * and there is nothing to "correct" afterwards. Same idea as the Growth
 * Marketing page, reduced to what this page needs:
 *
 *   track  → one gesture = one eased move to the next station (panel).
 *   free   → Contact and the footer are a reading zone. Going up, the page
 *            settles on the top of Contact before the track takes over.
 *
 * The bottom route bar mirrors the nearest station. It is hidden on the hero
 * and while Contact is on screen.
 */

type Direction = -1 | 1;
type Decision = { kind: 'free' } | { kind: 'clamp' | 'stop'; y: number };

const FREE: Decision = { kind: 'free' };
const TOLERANCE = 6;
const TOUCH_INERTIA_EXPONENT = 1.6;

const clamp = (min: number, max: number, value: number) => Math.min(max, Math.max(min, value));
const stopEase = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clampEase = (t: number) => 1 - Math.pow(1 - t, 3);

const cssNumber = (name: string) =>
  Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name)) || 0;

// Layout positions, never transformed rectangles.
const layoutTop = (element: HTMLElement) => {
  let offset = 0;
  let current: HTMLElement | null = element;
  while (current) {
    offset += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }
  return Math.max(0, Math.round(offset));
};

export const setupProcessDetailScroll = () => {
  const root = document.querySelector<HTMLElement>('[data-pd-page]');
  if (!root || root.dataset.pdReady === 'true') return;

  const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-pd-panel]'));
  const contact = root.querySelector<HTMLElement>('.final-contact-section');
  const route = root.querySelector<HTMLElement>('[data-pd-route]');
  const stationLinks = Array.from(root.querySelectorAll<HTMLAnchorElement>('[data-pd-station]'));
  const routeLabel = root.querySelector<HTMLElement>('[data-pd-route-label]');
  const routeCount = root.querySelector<HTMLElement>('[data-pd-route-count]');
  if (!panels.length || !contact || !route) return;

  root.dataset.pdReady = 'true';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const menuOpen = () => document.documentElement.classList.contains('mobile-menu-open');
  const drawerOpen = () => document.body.classList.contains('drawer-open');
  const panelHeight = () =>
    Math.max(
      1,
      Math.round((cssNumber('--app-panel-h') || window.innerHeight) + (menuOpen() ? cssNumber('--mobile-menu-open-h') : 0)),
    );

  // ── Geometry ───────────────────────────────────────────────────────────
  type Geometry = { stops: number[]; lastPanel: number; contact: number };
  const geometry = (): Geometry => {
    const tops = panels.map(layoutTop);
    const contactTop = layoutTop(contact);
    return { stops: [...tops, contactTop], lastPanel: tops[tops.length - 1], contact: contactTop };
  };

  // ── Route bar + panel state ────────────────────────────────────────────
  const stationCount = stationLinks.length;
  let currentIndex = -1;

  const setCurrent = (index: number) => {
    currentIndex = index;
    root.dataset.pdCurrent = String(index);
    panels.forEach((panel, panelIndex) => panel.classList.toggle('is-current', panelIndex === index));
    stationLinks.forEach((link, linkIndex) => {
      const item = link.closest('.pd-route-item');
      item?.classList.toggle('is-done', linkIndex < index);
      item?.classList.toggle('is-active', linkIndex === index);
      if (linkIndex === index) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    });
    route.style.setProperty('--pd-progress', String(stationCount > 1 ? index / (stationCount - 1) : 0));
    if (routeLabel) routeLabel.textContent = stationLinks[index]?.dataset.pdStationLabel ?? '';
    if (routeCount) routeCount.textContent = `${index + 1} / ${stationCount}`;
  };

  const updateFromScroll = (y: number) => {
    const g = geometry();
    let index = 0;
    let best = Number.POSITIVE_INFINITY;
    panels.forEach((_, panelIndex) => {
      const distance = Math.abs(g.stops[panelIndex] - y);
      if (distance < best) {
        best = distance;
        index = panelIndex;
      }
    });

    if (index !== currentIndex) setCurrent(index);
    route.classList.toggle('is-visible', index >= 1 && y <= g.lastPanel + panelHeight() * 0.5);
  };

  // ── Reduced motion: the browser scrolls, the route bar still follows ───
  if (reduceMotion) {
    root.classList.add('is-static');
    const onScroll = () => updateFromScroll(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('agsit:viewport-change', onScroll, { passive: true });
    onScroll();
    return;
  }

  // ── Scroll decisions ───────────────────────────────────────────────────
  const nextStop = (list: number[], y: number, direction: Direction) => {
    if (direction > 0) return list.find((stop) => stop > y + TOLERANCE) ?? null;
    for (let index = list.length - 1; index >= 0; index -= 1) {
      if (list[index] < y - TOLERANCE) return list[index];
    }
    return null;
  };

  const decide = (y: number, direction: Direction, distance: number, origin: number): Decision => {
    const g = geometry();
    const ahead = direction > 0 ? y + distance : y - distance;

    // Contact + footer: free reading. Going up, settle on the top of Contact
    // before handing control back to the stations.
    if (y > g.contact + TOLERANCE) {
      if (direction > 0 || ahead >= g.contact) return FREE;
      return { kind: 'clamp', y: g.contact };
    }

    // A gesture that began inside Contact ends on its top edge, even when a
    // touch step lands inside the tolerance band: crossing into the stations
    // takes a new gesture.
    if (direction < 0 && origin > g.contact + TOLERANCE) return { kind: 'clamp', y: g.contact };

    // Everything else is a track: one gesture, one station.
    const destination = nextStop(g.stops, y, direction);
    return destination === null ? FREE : { kind: 'stop', y: destination };
  };

  // ── Single scroll driver ───────────────────────────────────────────────
  let moving = false;
  let movingTimer = 0;
  let consumed = false;
  let wheelTimer = 0;
  let gestureOrigin: number | null = null;

  const lenis = new Lenis({
    smoothWheel: true,
    syncTouch: true,
    syncTouchLerp: 0.085,
    touchInertiaExponent: TOUCH_INERTIA_EXPONENT,
    lerp: 0.11,
    anchors: false,
    allowNestedScroll: true,
    prevent: (node) => node.classList.contains('contact-drawer'),
    virtualScroll: (data) => gate(data),
  });

  const goTo = (y: number, kind: 'stop' | 'clamp') => {
    const distance = Math.abs(y - lenis.animatedScroll);
    if (distance < 1) return;
    const screens = distance / panelHeight();
    const duration =
      kind === 'stop'
        ? clamp(0.55, 1.35, 0.55 + screens * (screens > 1.5 ? 0.09 : 0.2))
        : clamp(0.28, 0.6, screens * 0.8);
    moving = true;
    window.clearTimeout(movingTimer);
    movingTimer = window.setTimeout(() => {
      moving = false;
    }, duration * 1000 + 400);
    lenis.scrollTo(y, {
      duration,
      easing: kind === 'stop' ? stopEase : clampEase,
      lock: true,
      force: true,
      onComplete: () => {
        window.clearTimeout(movingTimer);
        moving = false;
      },
    });
  };

  const gate = (data: { deltaX: number; deltaY: number; event: Event }) => {
    const { deltaX, deltaY, event } = data;
    if (deltaX === 0 && deltaY === 0) return true; // tap / touchstart reset
    if (deltaY === 0) return true;
    if ((event as WheelEvent).ctrlKey) return true;
    if (menuOpen() || drawerOpen()) return true;

    const veto = () => {
      if (event.cancelable) event.preventDefault();
      return false;
    };

    if (event.type === 'wheel') {
      // A wheel burst (mouse notches or trackpad inertia) is one gesture until it goes quiet.
      window.clearTimeout(wheelTimer);
      wheelTimer = window.setTimeout(() => {
        consumed = false;
        gestureOrigin = null;
      }, 180);
    }

    if (moving || lenis.isLocked) {
      consumed = true;
      return veto();
    }
    if (consumed) return veto();

    const direction: Direction = deltaY > 0 ? 1 : -1;
    // Lenis derives the touch inertia from its velocity, not from deltaY.
    const distance =
      event.type === 'touchend' ? Math.abs(lenis.velocity) ** TOUCH_INERTIA_EXPONENT : Math.abs(deltaY);
    if (gestureOrigin === null) gestureOrigin = lenis.targetScroll;
    const decision = decide(lenis.targetScroll, direction, distance, gestureOrigin);
    if (decision.kind === 'free') return true;

    consumed = true;
    goTo(decision.y, decision.kind);
    return veto();
  };

  lenis.on('scroll', () => updateFromScroll(lenis.animatedScroll));

  // ── Keyboard ───────────────────────────────────────────────────────────
  const onKeyDown = (event: KeyboardEvent) => {
    if (menuOpen() || drawerOpen()) return;
    const target = event.target;
    if (target instanceof Element && target.closest('input, textarea, select, button, a, [contenteditable="true"]')) return;

    const direction: Direction | null = ['ArrowDown', 'PageDown', ' '].includes(event.key)
      ? 1
      : ['ArrowUp', 'PageUp'].includes(event.key)
        ? -1
        : null;
    if (direction === null) return;

    event.preventDefault();
    if (moving || lenis.isLocked) return;

    const distance = event.key.startsWith('Arrow') ? 90 : Math.round(panelHeight() * 0.8);
    const decision = decide(lenis.targetScroll, direction, distance, lenis.targetScroll);
    if (decision.kind === 'free') {
      lenis.scrollTo(lenis.targetScroll + direction * distance, { duration: 0.45, easing: clampEase });
      return;
    }
    goTo(decision.y, decision.kind);
  };

  // ── In-page links (route bar, hero diagram, header "Contacto") ────────
  const onLinkClick = (event: MouseEvent) => {
    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey) return;

    const id = link.getAttribute('href')?.slice(1);
    const destination = id ? document.getElementById(id) : null;
    if (!destination) return;

    event.preventDefault();
    if (moving || lenis.isLocked) return;
    // A click is not a wheel gesture: nothing to swallow afterwards.
    goTo(layoutTop(destination), 'stop');
  };

  const onTouchStart = () => {
    consumed = false;
    gestureOrigin = null;
  };

  // The contact drawer freezes the body (position: fixed). Lenis must sleep
  // while it is open and re-read the real scroll position when it closes.
  const bodyObserver = new MutationObserver(() => {
    if (drawerOpen()) {
      window.clearTimeout(movingTimer);
      moving = false;
      lenis.stop();
    } else {
      lenis.start();
    }
  });
  bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

  let refreshTimer = 0;
  const refresh = () => {
    window.clearTimeout(refreshTimer);
    refreshTimer = window.setTimeout(() => {
      if (moving) {
        refresh();
        return;
      }
      lenis.resize();
      updateFromScroll(lenis.animatedScroll);
    }, 160);
  };

  document.addEventListener('click', onLinkClick);
  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('agsit:viewport-change', refresh, { passive: true });
  window.addEventListener('agsit:mobile-menu-change', refresh, { passive: true });
  window.addEventListener('load', refresh, { once: true });
  document.fonts?.ready.then(refresh);
  root.querySelectorAll('img').forEach((image) => image.addEventListener('load', refresh, { once: true }));

  // Turn the entrance choreography on and mark the first station together, so
  // the hero never flashes hidden.
  root.classList.add('is-enhanced');
  updateFromScroll(window.scrollY);

  const tick = (time: number) => {
    lenis.raf(time);
    frame = window.requestAnimationFrame(tick);
  };
  let frame = window.requestAnimationFrame(tick);

  window.addEventListener(
    'pagehide',
    () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(refreshTimer);
      window.clearTimeout(wheelTimer);
      window.clearTimeout(movingTimer);
      document.removeEventListener('click', onLinkClick);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('agsit:viewport-change', refresh);
      window.removeEventListener('agsit:mobile-menu-change', refresh);
      bodyObserver.disconnect();
      lenis.destroy();
    },
    { once: true },
  );
};
