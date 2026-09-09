import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type TrackDefinition = {
  section: string;
  items: string;
  variant?: 'default' | 'vertical';
};

type PageDefinition = {
  root: string;
  tracks: TrackDefinition[];
};

type TrackDestination = {
  position: number;
  owner: Element;
};

const PAGE_DEFINITIONS: PageDefinition[] = [
  {
    root: '.technology-page',
    tracks: [{ section: '.technology-benefits', items: '.technology-benefit-card' }],
  },
  {
    root: '[data-technology-solution-detail]',
    tracks: [],
  },
  ...['itg', 'auto', 'ops', 'data', 'inn'].map((prefix) => ({
    root: `.${prefix}-page`,
    tracks: [
      { section: `.${prefix}-services`, items: `.${prefix}-service-card` },
      { section: `.${prefix}-benefits`, items: `.${prefix}-benefit-card` },
      { section: `.${prefix}-approach`, items: `.${prefix}-approach-step` },
    ],
  })),
  {
    root: '.quality-page',
    tracks: [
      { section: '.quality-areas', items: '.quality-area-grid article' },
      { section: '.quality-system', items: '.quality-system-grid article' },
      { section: '.quality-certification', items: '.quality-certification-steps article' },
      { section: '.quality-outcomes', items: '.quality-outcomes li' },
    ],
  },
];

const getNavOffset = () =>
  Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--app-track-offset')) || 0;

const getPanelHeight = () => {
  const styles = getComputedStyle(document.documentElement);
  const panelHeight = Number.parseFloat(styles.getPropertyValue('--app-panel-h'));
  const stableViewportHeight = Number.parseFloat(styles.getPropertyValue('--app-stable-vh'));

  if (Number.isFinite(panelHeight) && panelHeight > 0) return panelHeight;
  if (Number.isFinite(stableViewportHeight) && stableViewportHeight > 0) {
    return stableViewportHeight;
  }

  return Math.max(1, window.innerHeight);
};

const setupTechnologySolutionIntroBridgeProgress = (root: HTMLElement) => {
  if (!root.matches('[data-technology-solution-detail]')) return;

  const intro = root.querySelector<HTMLElement>('[data-technology-solution-journey-intro]');
  const firstStep = root.querySelector<HTMLElement>('[data-technology-solution-journey-step="1"]');
  const straightProgress = intro?.querySelector<HTMLElement>('[data-technology-solution-intro-line-progress]');
  const curveProgress = intro?.querySelector<SVGRectElement>('[data-technology-solution-intro-curve-progress]');
  if (!intro || !firstStep || !straightProgress || !curveProgress) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  gsap.set(straightProgress, { scaleY: reduceMotion ? 1 : 0, transformOrigin: '50% 0' });
  gsap.set(curveProgress, { attr: { height: reduceMotion ? 100 : 0 } });
  if (reduceMotion) return;

  const timeline = gsap.timeline({
    scrollTrigger: {
      id: 'technology-solution-intro-bridge-progress',
      trigger: intro,
      endTrigger: firstStep,
      start: () => `top top+=${getNavOffset()}`,
      end: () => `top top+=${getNavOffset()}`,
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  timeline
    .to(straightProgress, { scaleY: 1, ease: 'none' }, 0)
    .to(curveProgress, { attr: { height: 100 }, ease: 'none' }, 0);
};

const setupTechnologySolutionJourneyPathProgress = (root: HTMLElement) => {
  if (!root.matches('[data-technology-solution-detail]')) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const entries = Array.from(root.querySelectorAll<HTMLElement>('[data-technology-solution-journey-step]')).flatMap((step) => {
    const fill = step.querySelector<SVGRectElement>('[data-technology-solution-path-fill]');
    if (!fill) return [];

    const parsedFillStop = Number.parseFloat(fill.dataset.pillarFillStop ?? '50');
    const fillStop = Number.isFinite(parsedFillStop) ? parsedFillStop : 50;
    const marker = step.querySelector<HTMLElement>('[data-technology-solution-path-marker]');

    gsap.set(fill, { attr: { height: 0 } });

    const setFill = (height: number, immediate = false) => {
      if (reduceMotion || immediate) {
        gsap.set(fill, { attr: { height } });
        return;
      }

      const timeline = gsap.timeline({ defaults: { overwrite: 'auto' } });
      timeline.to(fill, { attr: { height }, duration: 0.46, ease: 'power2.out' });
      if (marker) {
        timeline.fromTo(
          marker,
          { scale: 0.82 },
          { scale: 1, duration: 0.34, ease: 'back.out(2)' },
          0.18,
        );
      }
    };

    return [{ step, fillStop, setFill }];
  });

  if (!entries.length) return;

  let activeIndex = -1;
  const sync = (immediate = false) => {
    const threshold = window.scrollY + getNavOffset() + 2;
    const firstTop = entries[0].step.getBoundingClientRect().top + window.scrollY;

    if (threshold < firstTop) {
      if (activeIndex !== -1) {
        entries.forEach(({ setFill }) => setFill(0, immediate));
        activeIndex = -1;
      }
      return;
    }

    const nextIndex = entries.reduce((currentIndex, { step }, index) => {
      const stepTop = step.getBoundingClientRect().top + window.scrollY;
      return threshold >= stepTop ? index : currentIndex;
    }, 0);

    if (nextIndex === activeIndex) return;

    entries.forEach(({ fillStop, setFill }, index) => {
      setFill(index < nextIndex ? 100 : index === nextIndex ? fillStop : 0, immediate);
    });
    activeIndex = nextIndex;
  };

  sync(true);
  window.addEventListener('scroll', () => sync(), { passive: true });
  window.addEventListener('agsit:viewport-change', () => sync(true), { passive: true });
};

const clearLegacyReveal = (section: HTMLElement, items: HTMLElement[]) => {
  [section, ...items].forEach((element) => {
    element.removeAttribute('data-service-reveal');
    element.classList.remove('is-visible');
    element.style.removeProperty('--service-delay');
  });
};

const setupTrack = (
  section: HTMLElement,
  items: HTMLElement[],
  trackIndex: number,
  variant: TrackDefinition['variant'] = 'default',
) => {
  if (items.length < 2 || section.dataset.serviceTrackReady === 'true') return;

  section.dataset.serviceTrackReady = 'true';
  section.dataset.serviceTrackStops = String(items.length);
  section.classList.add('service-slide-panel', 'service-card-track');
  section.classList.toggle('service-card-track-vertical', variant === 'vertical');
  clearLegacyReveal(section, items);

  const matchMedia = gsap.matchMedia();
  const getStart = () => `top top+=${getNavOffset()}`;
  const getEnd = () => `+=${Math.round(getPanelHeight() * Math.max(items.length, 2))}`;

  matchMedia.add(
    {
      desktop: '(min-width: 680px) and (min-height: 521px)',
      compact: '(max-width: 679px), (max-width: 1024px) and (max-height: 520px)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    },
    (context) => {
      const { desktop, compact, reduceMotion } = context.conditions as {
        desktop: boolean;
        compact: boolean;
        reduceMotion: boolean;
      };

      if (reduceMotion) {
        gsap.set(items, { clearProps: 'all' });
        section.classList.add('service-card-track-reduced');
        return () => section.classList.remove('service-card-track-reduced');
      }

      section.classList.toggle('service-card-track-desktop', desktop);
      section.classList.toggle('service-card-track-compact', compact);

      if (variant === 'vertical') {
        const incomingOffset = compact ? 78 : 16;
        const outgoingOffset = compact ? -78 : -16;

        gsap.set(items, { autoAlpha: 0, yPercent: incomingOffset });
        gsap.set(items[0], { autoAlpha: 1, yPercent: 0 });
        gsap.set(section, { '--crm-pillar-progress': '0%' });

        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            id: `service-card-track-${trackIndex}-vertical`,
            trigger: section,
            start: getStart,
            end: getEnd,
            pin: true,
            pinSpacing: true,
            scrub: compact ? 0.52 : 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline.to({}, { duration: 0.7 });
        items.slice(1).forEach((item, index) => {
          const previous = items[index];
          const progress = (index + 1) / (items.length - 1);
          const label = `service-track-${trackIndex}-${index + 1}`;

          timeline
            .addLabel(label)
            .to(previous, { autoAlpha: 0, yPercent: outgoingOffset, duration: 0.48, ease: 'power1.in' }, label)
            .fromTo(
              item,
              { autoAlpha: 0, yPercent: incomingOffset },
              { autoAlpha: 1, yPercent: 0, duration: 0.62, ease: 'power2.out', immediateRender: false },
              label,
            )
            .to(section, { '--crm-pillar-progress': `${progress * 100}%`, duration: 0.62, ease: 'none' }, label)
            .to({}, { duration: 0.38 });
        });

        return () => {
          timeline.kill();
          section.classList.remove('service-card-track-vertical');
          section.style.removeProperty('--crm-pillar-progress');
          gsap.set(items, { clearProps: 'all' });
        };
      }

      if (desktop) {
        gsap.set(items, { autoAlpha: 0, y: 34, scale: 0.975 });
        gsap.set(items[0], { autoAlpha: 1, y: 0, scale: 1 });

        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            id: `service-card-track-${trackIndex}-desktop`,
            trigger: section,
            start: getStart,
            end: getEnd,
            pin: true,
            pinSpacing: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline.to({}, { duration: 0.7 });
        items.slice(1).forEach((item) => {
          timeline
            .to(item, { autoAlpha: 1, y: 0, scale: 1, duration: 0.62, ease: 'power2.out' })
            .to({}, { duration: 0.38 });
        });

        return () => {
          timeline.kill();
          section.classList.remove('service-card-track-desktop');
          gsap.set(items, { clearProps: 'all' });
        };
      }

      gsap.set(items, { autoAlpha: 0, xPercent: 112 });
      gsap.set(items[0], { autoAlpha: 1, xPercent: 0 });

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          id: `service-card-track-${trackIndex}-compact`,
          trigger: section,
          start: getStart,
          end: getEnd,
          pin: true,
          pinSpacing: true,
          scrub: 0.52,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline.to({}, { duration: 0.62 });
      items.slice(1).forEach((item, index) => {
        const previous = items[index];
        const label = `service-track-${trackIndex}-${index + 1}`;
        timeline
          .addLabel(label)
          .to(previous, { autoAlpha: 0, xPercent: -112, duration: 0.48, ease: 'power1.in' }, label)
          .fromTo(
            item,
            { autoAlpha: 0, xPercent: 112 },
            { autoAlpha: 1, xPercent: 0, duration: 0.62, ease: 'power2.out', immediateRender: false },
            label,
          )
          .to({}, { duration: 0.38 });
      });

      return () => {
        timeline.kill();
        section.classList.remove('service-card-track-compact');
        gsap.set(items, { clearProps: 'all' });
      };
    },
  );
};

const setupPageSnapState = (root: HTMLElement) => {
  const html = document.documentElement;
  const activeTracks = new Set<Element>();
  const getStart = () => `top top+=${getNavOffset()}`;
  const syncTrackState = () => {
    html.classList.toggle('service-track-active', activeTracks.size > 0);
  };

  root.querySelectorAll<HTMLElement>(':scope > .pin-spacer').forEach((spacer, index) => {
    ScrollTrigger.create({
      id: `service-page-track-state-${index}`,
      trigger: spacer,
      start: getStart,
      end: () => `bottom top+=${getNavOffset()}`,
      invalidateOnRefresh: true,
      onEnter: () => {
        activeTracks.add(spacer);
        syncTrackState();
      },
      onEnterBack: () => {
        activeTracks.add(spacer);
        syncTrackState();
      },
      onLeave: () => {
        activeTracks.delete(spacer);
        syncTrackState();
      },
      onLeaveBack: () => {
        activeTracks.delete(spacer);
        syncTrackState();
      },
    });
  });

  const contact = root.querySelector<HTMLElement>('.final-contact-section');
  if (!contact) return;

  const getPreviousTrackPosition = () => {
    let previousSibling = contact.previousElementSibling;

    while (previousSibling) {
      if (previousSibling instanceof HTMLElement && previousSibling.matches('.pin-spacer')) {
        const section = previousSibling.querySelector<HTMLElement>(':scope > section');
        const track = ScrollTrigger.getAll().find(
          (trigger) => trigger.trigger === section && Boolean(trigger.vars.pin),
        );

        if (track) return Math.round(track.end);
      }

      if (previousSibling instanceof HTMLElement && previousSibling.matches('section.service-slide-panel')) {
        const rootTop = root.getBoundingClientRect().top + window.scrollY;
        return Math.max(0, Math.round(rootTop + previousSibling.offsetTop - getNavOffset()));
      }

      previousSibling = previousSibling.previousElementSibling;
    }

    return null;
  };

  const resumePreviousTrack = () => {
    const previousTrackPosition = getPreviousTrackPosition();

    // El traspaso debe resolverse dentro del mismo evento de ScrollTrigger.
    // Esperar un frame permite que el navegador pinte Contacto junto con una
    // franja de la lámina anterior antes de restaurar el track.
    if (previousTrackPosition !== null && Math.abs(window.scrollY - previousTrackPosition) > 2) {
      window.scrollTo(0, previousTrackPosition);
    }
  };

  ScrollTrigger.create({
    id: 'service-page-contact-state',
    trigger: contact,
    start: getStart,
    end: () => `bottom top+=${getNavOffset()}`,
    invalidateOnRefresh: true,
    onEnter: () => html.classList.add('service-slides-footer-free'),
    onEnterBack: () => html.classList.add('service-slides-footer-free'),
    onLeaveBack: () => {
      html.classList.remove('service-slides-footer-free');
      resumePreviousTrack();
    },
  });
};

const setupLandingTrackNavigation = (root: HTMLElement) => {
  const html = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const buffersRapidGestures = root.matches('[data-technology-solution-detail]');
  const contact = root.querySelector<HTMLElement>('.final-contact-section');
  let navigationLocked = false;
  let navigationAnimating = false;
  let unlockTimer = 0;
  let lastWheelEventAt = 0;
  let wheelGestureTimer = 0;
  let wheelGestureDirection: 1 | -1 | null = null;
  let activeScrollFrame = 0;
  let touchStartY: number | null = null;
  const queuedDirections: Array<1 | -1> = [];
  let processNavigationDirection: (direction: 1 | -1) => boolean = () => false;
  const navigationEase = gsap.parseEase('power2.inOut');
  const touchThreshold = Number.parseFloat(root.dataset.serviceTouchThreshold ?? '') || 34;
  const wheelGestureIdle = 140;
  const maxQueuedDirections = Math.max(4, root.querySelectorAll(':scope > section').length);
  const isContactFree = () => html.classList.contains('service-slides-footer-free');
  const isMenuOpen = () => html.classList.contains('mobile-menu-open');

  const queueNavigationDirection = (direction: 1 | -1) => {
    if (!buffersRapidGestures) return;

    const lastQueuedDirection = queuedDirections.at(-1);
    if (lastQueuedDirection && lastQueuedDirection !== direction) {
      queuedDirections.pop();
      return;
    }

    if (queuedDirections.length < maxQueuedDirections) {
      queuedDirections.push(direction);
    }
  };

  const getPinnedStopCount = (section: HTMLElement) => {
    const explicitStops = Number.parseInt(section.dataset.serviceTrackStops ?? '', 10);
    if (Number.isFinite(explicitStops) && explicitStops > 0) return explicitStops;

    if (section.matches('.technology-capabilities')) {
      const usesMobileCapabilitySequence = window.matchMedia(
        '(max-width: 679px), (max-width: 1024px) and (max-height: 520px)',
      ).matches;

      if (usesMobileCapabilitySequence) {
        return Math.ceil(section.querySelectorAll('.technology-capability').length / 2) + 1;
      }

      return section.querySelectorAll('.technology-capabilities-panel-grid').length + 1;
    }

    if (section.matches('[class*="-method"]')) {
      return section.querySelectorAll('[class*="-method-step"]').length + 1;
    }

    return 1;
  };

  const getDestinations = (): TrackDestination[] => {
    const destinations: TrackDestination[] = [];
    const navOffset = getNavOffset();
    const rootTop = root.getBoundingClientRect().top + window.scrollY;

    Array.from(root.children).forEach((child) => {
      if (!(child instanceof HTMLElement)) return;

      // Un pin desplaza visualmente su spacer mientras está activo. offsetTop
      // conserva la coordenada del documento y evita que una parada se mueva.
      const childTop = Math.max(0, rootTop + child.offsetTop - navOffset);

      if (child.matches('.pin-spacer')) {
        const section = child.querySelector<HTMLElement>(':scope > section');
        if (!section) return;

        const stops = getPinnedStopCount(section);
        const spacerHeight = child.getBoundingClientRect().height;
        const panelHeight = section.getBoundingClientRect().height;
        const trackDistance = Math.max(0, spacerHeight - panelHeight);

        if (stops <= 1 || trackDistance <= 1) {
          destinations.push({ position: Math.round(childTop), owner: child });
          return;
        }

        for (let index = 0; index < stops; index += 1) {
          destinations.push({
            position: Math.round(childTop + (trackDistance * index) / (stops - 1)),
            owner: child,
          });
        }
        return;
      }

      if (child.matches('section.service-slide-panel')) {
        destinations.push({ position: Math.round(childTop), owner: child });
      }
    });

    return destinations.filter(
      (destination, index) => index === 0 || Math.abs(destination.position - destinations[index - 1].position) > 2,
    );
  };

  const getClosestIndex = (destinations: TrackDestination[]) => {
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    destinations.forEach((destination, index) => {
      const distance = Math.abs(destination.position - window.scrollY);
      if (distance >= closestDistance) return;
      closestDistance = distance;
      closestIndex = index;
    });

    return closestIndex;
  };

  const scheduleNavigationUnlock = () => {
    window.clearTimeout(unlockTimer);
    if (navigationAnimating) return;

    const quietWindow = reduceMotion ? 40 : 180;
    const delay = Math.max(quietWindow, lastWheelEventAt + quietWindow - Date.now());

    unlockTimer = window.setTimeout(() => {
      navigationLocked = false;

      if (!buffersRapidGestures || !queuedDirections.length || isMenuOpen()) {
        if (isMenuOpen()) queuedDirections.length = 0;
        return;
      }

      const queuedDirection = queuedDirections.shift();
      if (!queuedDirection || processNavigationDirection(queuedDirection)) return;

      // Si ya alcanzamos un extremo, los gestos pendientes no deben provocar
      // saltos cuando el usuario cambie de sentido más adelante.
      queuedDirections.length = 0;
    }, delay);
  };

  const navigateTo = (destination: number, instant = false) => {
    navigationLocked = true;
    navigationAnimating = !reduceMotion;
    window.cancelAnimationFrame(activeScrollFrame);

    if (reduceMotion || instant) {
      window.scrollTo(0, destination);
      navigationAnimating = false;
      scheduleNavigationUnlock();
      return;
    }

    const startY = window.scrollY;
    const distance = destination - startY;
    const duration = 720;
    const startedAt = performance.now();

    const updateScroll = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      window.scrollTo(0, startY + distance * navigationEase(progress));

      if (progress < 1) {
        activeScrollFrame = window.requestAnimationFrame(updateScroll);
        return;
      }

      window.scrollTo(0, destination);
      activeScrollFrame = 0;
      navigationAnimating = false;
      scheduleNavigationUnlock();
    };

    activeScrollFrame = window.requestAnimationFrame(updateScroll);
  };

  const getContactStart = () => {
    if (!contact) return null;
    const rootTop = root.getBoundingClientRect().top + window.scrollY;
    return Math.max(0, Math.round(rootTop + contact.offsetTop - getNavOffset()));
  };

  const resumeContactToPreviousPanel = () => {
    if (!contact || !isContactFree()) return false;

    const contactStart = getContactStart();
    if (contactStart === null || window.scrollY > contactStart + 3) return false;

    const previousDestination = getDestinations()
      .filter(({ position }) => position < contactStart - 2)
      .at(-1);
    if (!previousDestination) return false;

    html.classList.remove('service-slides-footer-free');
    navigateTo(previousDestination.position, true);
    return true;
  };

  const navigateByDirection = (direction: 1 | -1) => {
    const destinations = getDestinations();
    if (destinations.length < 2) return false;

    const currentIndex = getClosestIndex(destinations);
    const nextIndex = Math.max(0, Math.min(destinations.length - 1, currentIndex + direction));
    if (nextIndex === currentIndex) return false;

    const currentDestination = destinations[currentIndex];
    const nextDestination = destinations[nextIndex];
    const getDestinationSection = (owner: Element) =>
      owner.matches('section') ? owner : owner.querySelector<HTMLElement>(':scope > section');
    const currentSection = getDestinationSection(currentDestination.owner);
    const nextSection = getDestinationSection(nextDestination.owner);
    const isTechnologyMethodCatalogHandoff =
      (currentSection?.matches('.technology-method') && nextSection?.matches('.technology-capabilities')) ||
      (currentSection?.matches('.technology-capabilities') && nextSection?.matches('.technology-method'));
    const isTechnologySolutionIntroHandoff =
      (currentSection?.matches('[data-technology-solution-journey-intro]') &&
        nextSection?.matches('[data-technology-solution-journey-step="1"]')) ||
      (currentSection?.matches('[data-technology-solution-journey-step="1"]') &&
        nextSection?.matches('[data-technology-solution-journey-intro]'));

    // La metodología y el catálogo forman una secuencia visual continua. Al
    // cruzar entre ambos preservamos el desplazamiento interpolado para que la
    // última lámina de uno y la introducción del otro no se perciban como un salto.
    const shouldJumpAcrossTracks =
      currentDestination.owner !== nextDestination.owner &&
      !isTechnologyMethodCatalogHandoff &&
      !isTechnologySolutionIntroHandoff;

    navigateTo(nextDestination.position, shouldJumpAcrossTracks);
    return true;
  };

  processNavigationDirection = (direction) => {
    if (isContactFree()) {
      return direction < 0 ? resumeContactToPreviousPanel() : false;
    }

    const navigated = navigateByDirection(direction);
    if (!navigated && direction > 0) {
      html.classList.add('service-slides-footer-free');
    }

    return navigated;
  };

  const isScrollControlTarget = (target: EventTarget | null) =>
    target instanceof Element &&
    Boolean(target.closest('input, textarea, select, [data-contact-drawer], [data-mobile-menu]'));

  const isInteractiveTarget = (target: EventTarget | null) =>
    target instanceof Element &&
    Boolean(target.closest('input, textarea, select, button, a, [data-contact-drawer], [data-mobile-menu]'));

  window.addEventListener(
    'wheel',
    (event) => {
      if (Math.abs(event.deltaY) < 8 || isMenuOpen()) return;

      const target = event.target;
      if (isScrollControlTarget(target)) return;

      const eventAt = Date.now();
      const direction = event.deltaY > 0 ? 1 : -1;
      const startsNewGesture =
        wheelGestureDirection === null ||
        wheelGestureDirection !== direction ||
        eventAt - lastWheelEventAt > wheelGestureIdle;

      wheelGestureDirection = direction;
      lastWheelEventAt = eventAt;
      window.clearTimeout(wheelGestureTimer);
      wheelGestureTimer = window.setTimeout(() => {
        wheelGestureDirection = null;
      }, wheelGestureIdle);

      if (navigationLocked) {
        event.preventDefault();
        if (startsNewGesture) queueNavigationDirection(direction);
        scheduleNavigationUnlock();
        return;
      }

      if (isContactFree()) {
        if (direction < 0 && resumeContactToPreviousPanel()) event.preventDefault();
        return;
      }

      const navigated = processNavigationDirection(direction);

      if (navigated) event.preventDefault();
    },
    { passive: false },
  );

  window.addEventListener(
    'touchstart',
    (event) => {
      if (isMenuOpen() || isInteractiveTarget(event.target)) return;
      touchStartY = event.touches[0]?.clientY ?? null;
    },
    { passive: true },
  );

  window.addEventListener(
    'touchmove',
    (event) => {
      if (touchStartY === null || isMenuOpen()) return;

      if (isContactFree()) {
        const currentY = event.touches[0]?.clientY ?? touchStartY;
        const contactStart = getContactStart();
        const isMovingBack = touchStartY - currentY < 0;
        if (isMovingBack && contactStart !== null && window.scrollY <= contactStart + 3) {
          event.preventDefault();
        }
        return;
      }

      event.preventDefault();
    },
    { passive: false },
  );

  window.addEventListener(
    'touchend',
    (event) => {
      if (touchStartY === null || isMenuOpen()) {
        touchStartY = null;
        return;
      }

      const touchEndY = event.changedTouches[0]?.clientY ?? touchStartY;
      const delta = touchStartY - touchEndY;
      touchStartY = null;
      if (Math.abs(delta) < touchThreshold) return;

      const direction = delta > 0 ? 1 : -1;
      if (navigationLocked) {
        queueNavigationDirection(direction);
        return;
      }

      if (isContactFree()) {
        if (delta < 0) resumeContactToPreviousPanel();
        return;
      }

      processNavigationDirection(direction);
    },
    { passive: true },
  );

  window.addEventListener('keydown', (event) => {
    const forward = ['ArrowDown', 'PageDown', ' '].includes(event.key);
    const backward = ['ArrowUp', 'PageUp'].includes(event.key);
    if (!forward && !backward) return;

    if (isMenuOpen() || isInteractiveTarget(event.target)) return;

    const direction = forward ? 1 : -1;
    if (navigationLocked) {
      event.preventDefault();
      if (!event.repeat) queueNavigationDirection(direction);
      return;
    }

    if (isContactFree()) {
      if (backward && resumeContactToPreviousPanel()) event.preventDefault();
      return;
    }

    event.preventDefault();
    processNavigationDirection(direction);
  });
};

export const setupServiceSlides = () => {
  const definition = PAGE_DEFINITIONS.find(({ root }) => document.querySelector(root));
  if (!definition) return;

  const root = document.querySelector<HTMLElement>(definition.root);
  if (!root || root.dataset.serviceSlidesReady === 'true') return;

  root.dataset.serviceSlidesReady = 'true';
  root.classList.add('service-slides-page');
  document.documentElement.classList.add('service-slides-active');

  Array.from(root.children).forEach((child) => {
    if (child instanceof HTMLElement && child.matches('section')) {
      child.classList.add('service-slide-panel');
    }
  });

  definition.tracks.forEach(({ section: sectionSelector, items: itemSelector, variant }, index) => {
    const section = root.querySelector<HTMLElement>(sectionSelector);
    if (!section) return;

    const items = gsap.utils.toArray<HTMLElement>(itemSelector, section);
    setupTrack(section, items, index, variant);
  });

  setupTechnologySolutionIntroBridgeProgress(root);
  setupTechnologySolutionJourneyPathProgress(root);
  setupPageSnapState(root);
  setupLandingTrackNavigation(root);

  const refresh = () => ScrollTrigger.refresh();
  requestAnimationFrame(refresh);
  window.addEventListener('agsit:viewport-change', refresh, { passive: true });
  window.addEventListener('load', refresh, { once: true });
};
