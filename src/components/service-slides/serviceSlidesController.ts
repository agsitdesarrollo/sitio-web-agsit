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
    root: '.crm-platform-page',
    tracks: [],
  },
  ...['itg', 'auto', 'dev', 'ops', 'data', 'inn'].map((prefix) => ({
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
  let contactHandoffFrame = 0;
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

  const getPreviousTrackEnd = () => {
    let previousSibling = contact.previousElementSibling;

    while (previousSibling) {
      if (previousSibling instanceof HTMLElement && previousSibling.matches('.pin-spacer')) {
        const section = previousSibling.querySelector<HTMLElement>(':scope > section');
        const track = ScrollTrigger.getAll().find(
          (trigger) => trigger.trigger === section && Boolean(trigger.vars.pin),
        );

        if (track) return Math.round(track.end);
      }

      previousSibling = previousSibling.previousElementSibling;
    }

    return null;
  };

  const resumePreviousTrack = () => {
    window.cancelAnimationFrame(contactHandoffFrame);
    contactHandoffFrame = window.requestAnimationFrame(() => {
      contactHandoffFrame = 0;
      const trackEnd = getPreviousTrackEnd();

      // La zona libre del formulario termina después del spacer del pin. Al
      // volver, aterrizamos en el último estado del track anterior en vez de
      // recorrer ese spacer con Contacto aún visible bajo el menú fijo.
      if (trackEnd !== null && window.scrollY > trackEnd + 2) {
        window.scrollTo(0, trackEnd);
      }
    });
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
  let navigationLocked = false;
  let navigationAnimating = false;
  let unlockTimer = 0;
  let lastWheelEventAt = 0;
  let activeScrollFrame = 0;
  let touchStartY: number | null = null;
  const navigationEase = gsap.parseEase('power2.inOut');
  const touchThreshold = Number.parseFloat(root.dataset.serviceTouchThreshold ?? '') || 34;
  const isNavigationSuspended = () =>
    html.classList.contains('service-slides-footer-free') || html.classList.contains('mobile-menu-open');

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

  const navigateByDirection = (direction: 1 | -1) => {
    const destinations = getDestinations();
    if (destinations.length < 2) return false;

    const currentIndex = getClosestIndex(destinations);
    const nextIndex = Math.max(0, Math.min(destinations.length - 1, currentIndex + direction));
    if (nextIndex === currentIndex) return false;

    const currentDestination = destinations[currentIndex];
    const nextDestination = destinations[nextIndex];
    const currentSection = currentDestination.owner.querySelector<HTMLElement>(':scope > section');
    const nextSection = nextDestination.owner.querySelector<HTMLElement>(':scope > section');
    const isTechnologyMethodCatalogHandoff =
      (currentSection?.matches('.technology-method') && nextSection?.matches('.technology-capabilities')) ||
      (currentSection?.matches('.technology-capabilities') && nextSection?.matches('.technology-method'));

    // La metodología y el catálogo forman una secuencia visual continua. Al
    // cruzar entre ambos preservamos el desplazamiento interpolado para que la
    // última lámina de uno y la introducción del otro no se perciban como un salto.
    const shouldJumpAcrossTracks =
      currentDestination.owner !== nextDestination.owner && !isTechnologyMethodCatalogHandoff;

    navigateTo(nextDestination.position, shouldJumpAcrossTracks);
    return true;
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
      if (navigationLocked) {
        event.preventDefault();
        lastWheelEventAt = Date.now();
        scheduleNavigationUnlock();
        return;
      }

      if (Math.abs(event.deltaY) < 8 || isNavigationSuspended()) {
        return;
      }

      const target = event.target;
      if (isScrollControlTarget(target)) return;

      lastWheelEventAt = Date.now();
      const direction = event.deltaY > 0 ? 1 : -1;
      const navigated = navigateByDirection(direction);
      if (!navigated && direction > 0) {
        html.classList.add('service-slides-footer-free');
        return;
      }

      if (navigated) event.preventDefault();
    },
    { passive: false },
  );

  window.addEventListener(
    'touchstart',
    (event) => {
      if (isNavigationSuspended() || isInteractiveTarget(event.target)) return;
      touchStartY = event.touches[0]?.clientY ?? null;
    },
    { passive: true },
  );

  window.addEventListener(
    'touchmove',
    (event) => {
      if (touchStartY === null || isNavigationSuspended()) return;
      event.preventDefault();
    },
    { passive: false },
  );

  window.addEventListener(
    'touchend',
    (event) => {
      if (touchStartY === null || navigationLocked || isNavigationSuspended()) {
        touchStartY = null;
        return;
      }

      const touchEndY = event.changedTouches[0]?.clientY ?? touchStartY;
      const delta = touchStartY - touchEndY;
      touchStartY = null;
      if (Math.abs(delta) < touchThreshold) return;

      const direction = delta > 0 ? 1 : -1;
      const navigated = navigateByDirection(direction);
      if (!navigated && direction > 0) {
        html.classList.add('service-slides-footer-free');
      }
    },
    { passive: true },
  );

  window.addEventListener('keydown', (event) => {
    if (
      navigationLocked ||
      isNavigationSuspended() ||
      isInteractiveTarget(event.target)
    ) {
      return;
    }

    const forward = ['ArrowDown', 'PageDown', ' '].includes(event.key);
    const backward = ['ArrowUp', 'PageUp'].includes(event.key);
    if (!forward && !backward) return;

    event.preventDefault();
    const direction = forward ? 1 : -1;
    const navigated = navigateByDirection(direction);
    if (!navigated && direction > 0) {
      html.classList.add('service-slides-footer-free');
    }
  });
};

const setupCrmPillarPathProgress = (root: HTMLElement) => {
  if (!root.matches('.crm-platform-page')) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const entries = Array.from(root.querySelectorAll<HTMLElement>('.crm-pillar-step')).flatMap((step) => {
    const progressFill = step.querySelector<SVGRectElement>('.crm-pillar-path-fill');
    if (!progressFill) return [];

    const fillStop = Number.parseFloat(progressFill.dataset.pillarFillStop ?? '') || 0;
    const marker = step.querySelector<HTMLElement>('.crm-pillar-path-marker');
    gsap.set(progressFill, { attr: { height: 0 } });

    const setFill = (height: number, immediate = false) => {
      if (reduceMotion) {
        gsap.set(progressFill, { attr: { height } });
        return;
      }

      const timeline = gsap.timeline({ defaults: { overwrite: 'auto' } });
      timeline.to(progressFill, { attr: { height }, duration: immediate ? 0 : 0.46, ease: 'power2.out' });
      if (marker) {
        timeline.fromTo(marker, { scale: 0.82 }, { scale: 1, duration: 0.34, ease: 'back.out(2)' }, 0.18);
      }
    };

    return [{ step, fillStop, setFill }];
  });

  let activeIndex = -1;
  const syncPathProgress = (immediate = false) => {
    const firstEntry = entries[0];
    if (!firstEntry) return;

    const threshold = window.scrollY + getNavOffset() + 2;
    const firstTop = firstEntry.step.getBoundingClientRect().top + window.scrollY;

    if (threshold < firstTop) {
      if (activeIndex !== -1) {
        entries.forEach(({ setFill }) => setFill(0, immediate));
        activeIndex = -1;
      }
      return;
    }

    const nextIndex = entries.reduce((currentIndex, { step }, index) => {
      const top = step.getBoundingClientRect().top + window.scrollY;
      return threshold >= top ? index : currentIndex;
    }, 0);

    if (nextIndex === activeIndex) return;

    entries.forEach(({ fillStop, setFill }, index) => {
      const target = index < nextIndex ? 100 : index === nextIndex ? fillStop : 0;
      setFill(target, immediate);
    });
    activeIndex = nextIndex;
  };

  syncPathProgress(true);
  window.addEventListener('scroll', () => syncPathProgress(), { passive: true });
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

  setupCrmPillarPathProgress(root);
  setupPageSnapState(root);
  setupLandingTrackNavigation(root);

  const refresh = () => ScrollTrigger.refresh();
  requestAnimationFrame(refresh);
  window.addEventListener('agsit:viewport-change', refresh, { passive: true });
  window.addEventListener('load', refresh, { once: true });
};
