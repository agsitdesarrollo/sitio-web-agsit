import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type {
  DigitalMarketingOrbitApi,
  DigitalMarketingOrbitSection,
} from './digitalMarketingOrbitHeroController';

gsap.registerPlugin(ScrollTrigger);

type Direction = 1 | -1;

type PanelSlideOptions = {
  onComplete?: () => void;
  duration?: number;
  lightweight?: boolean;
  handoff?: {
    source: HTMLElement;
    target: HTMLElement;
  };
  visualHandoff?: {
    source: HTMLElement;
    target: HTMLElement;
    sourceSelector: string;
    targetSelector: string;
    startAlpha?: number;
    endAlpha?: number;
  };
  incomingRevealSelector?: string;
};

const BOUNDARY_TOLERANCE = 18;
const WHITE_TRANSITION_DURATION = 0;

const splitWords = (element: HTMLElement) => {
  if (element.dataset.wordsReady === 'true') return;

  element.dataset.wordsReady = 'true';

  const visit = (node: ChildNode) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const fragment = document.createDocumentFragment();
      const text = node.textContent ?? '';

      text.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          fragment.appendChild(document.createTextNode(part));
          return;
        }

        const word = document.createElement('span');
        word.className = 'dm-v2-word';
        word.textContent = part;
        fragment.appendChild(word);
      });

      node.parentNode?.replaceChild(fragment, node);
      return;
    }

    if (!(node instanceof HTMLElement) || node.classList.contains('dm-v2-inline-visual')) return;
    Array.from(node.childNodes).forEach(visit);
  };

  Array.from(element.childNodes).forEach(visit);
};

const getNavHeight = () =>
  Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--app-track-offset')) || 0;

const getPanelHeight = () => {
  const styles = getComputedStyle(document.documentElement);
  const configured = Number.parseFloat(styles.getPropertyValue('--app-panel-h'));
  return Number.isFinite(configured) && configured > 0
    ? configured
    : Math.max(1, window.innerHeight);
};

const getDocumentTop = (element: HTMLElement) =>
  element.getBoundingClientRect().top + window.scrollY;

const isFormOrNavigationTarget = (target: EventTarget | null) =>
  target instanceof Element &&
  Boolean(
    target.closest(
      'input, textarea, select, button, a, [data-contact-drawer], [data-mobile-menu]',
    ),
  );

const isFocusLensTarget = (target: EventTarget | null) =>
  target instanceof Element &&
  Boolean(target.closest('.js-dm-v2-focus-lens'));

const isWheelProtectedTarget = (target: EventTarget | null) =>
  target instanceof Element && Boolean(target.closest('input, textarea, select'));

const setupFocusLens = (
  root: HTMLElement,
  reduceMotion: boolean,
  registerCleanup: (cleanup: () => void) => void,
) => {
  const stage = root.querySelector<HTMLElement>('.js-dm-v2-focus-stage');
  const lens = root.querySelector<HTMLElement>('.js-dm-v2-focus-lens');
  if (!stage || !lens) return;

  const coarsePointer = window.matchMedia('(pointer: coarse)');
  const position = { x: 0.52, y: 0.48 };
  let dragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let resumeTimer = 0;
  let autoTimeline: gsap.core.Timeline | null = null;

  const render = () => {
    const rect = stage.getBoundingClientRect();
    const x = gsap.utils.clamp(0.08, 0.92, position.x) * rect.width;
    const y = gsap.utils.clamp(0.12, 0.88, position.y) * rect.height;

    stage.style.setProperty('--focus-x', `${x}px`);
    stage.style.setProperty('--focus-y', `${y}px`);
    stage.style.setProperty('--focus-radius', `${lens.offsetWidth * 0.205}px`);
    gsap.set(lens, {
      x: x - lens.offsetWidth * 0.37,
      y: y - lens.offsetHeight * 0.347,
    });
  };

  const updateFromPointer = (event: PointerEvent, preserveDragOffset = false) => {
    const rect = stage.getBoundingClientRect();
    const offsetX = preserveDragOffset ? dragOffsetX : 0;
    const offsetY = preserveDragOffset ? dragOffsetY : 0;
    position.x = (event.clientX - rect.left - offsetX) / Math.max(1, rect.width);
    position.y = (event.clientY - rect.top - offsetY) / Math.max(1, rect.height);
    render();
  };

  const createAutoTimeline = () => {
    autoTimeline?.kill();
    autoTimeline = null;

    if (!coarsePointer.matches || reduceMotion) return;

    autoTimeline = gsap
      .timeline({
        repeat: -1,
        defaults: { duration: 2.7, ease: 'sine.inOut', onUpdate: render },
      })
      .to(position, { x: 0.28, y: 0.36 })
      .to(position, { x: 0.73, y: 0.3 })
      .to(position, { x: 0.62, y: 0.7 })
      .to(position, { x: 0.34, y: 0.66 });
  };

  const onStagePointerMove = (event: PointerEvent) => {
    if (coarsePointer.matches || dragging) return;
    updateFromPointer(event);
  };

  const onLensPointerDown = (event: PointerEvent) => {
    if (!coarsePointer.matches) return;
    event.preventDefault();
    event.stopPropagation();
    dragging = true;
    window.clearTimeout(resumeTimer);
    autoTimeline?.pause();
    lens.setPointerCapture(event.pointerId);
    const rect = stage.getBoundingClientRect();
    dragOffsetX = event.clientX - (rect.left + position.x * rect.width);
    dragOffsetY = event.clientY - (rect.top + position.y * rect.height);
    updateFromPointer(event, true);
  };

  const onLensPointerMove = (event: PointerEvent) => {
    if (!dragging) return;
    event.preventDefault();
    event.stopPropagation();
    updateFromPointer(event, true);
  };

  const onLensPointerUp = (event: PointerEvent) => {
    if (!dragging) return;
    event.preventDefault();
    event.stopPropagation();
    dragging = false;
    if (lens.hasPointerCapture(event.pointerId)) lens.releasePointerCapture(event.pointerId);
    resumeTimer = window.setTimeout(() => autoTimeline?.resume(), 900);
  };

  const onPointerChange = () => createAutoTimeline();
  const onResize = () => render();

  stage.addEventListener('pointermove', onStagePointerMove);
  lens.addEventListener('pointerdown', onLensPointerDown);
  lens.addEventListener('pointermove', onLensPointerMove);
  lens.addEventListener('pointerup', onLensPointerUp);
  lens.addEventListener('pointercancel', onLensPointerUp);
  coarsePointer.addEventListener('change', onPointerChange);
  window.addEventListener('resize', onResize, { passive: true });

  render();
  createAutoTimeline();

  registerCleanup(() => {
    window.clearTimeout(resumeTimer);
    autoTimeline?.kill();
    stage.removeEventListener('pointermove', onStagePointerMove);
    lens.removeEventListener('pointerdown', onLensPointerDown);
    lens.removeEventListener('pointermove', onLensPointerMove);
    lens.removeEventListener('pointerup', onLensPointerUp);
    lens.removeEventListener('pointercancel', onLensPointerUp);
    coarsePointer.removeEventListener('change', onPointerChange);
    window.removeEventListener('resize', onResize);
  });
};

const setupCardVideos = (
  root: HTMLElement,
  registerCleanup: (cleanup: () => void) => void,
) => {
  const videos = Array.from(root.querySelectorAll<HTMLVideoElement>('.dm-v2-card-video'));
  if (!videos.length) return;

  const fallbackByVideo = new Map<HTMLVideoElement, HTMLButtonElement>();
  const cleanups: Array<() => void> = [];

  const setFallbackVisible = (video: HTMLVideoElement, visible: boolean) => {
    const fallback = fallbackByVideo.get(video);
    if (fallback) fallback.hidden = !visible;
  };

  const prepareVideo = (video: HTMLVideoElement) => {
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    if (video.preload === 'none') {
      video.preload = 'auto';
      video.load();
    }
  };

  const playVideo = async (video: HTMLVideoElement) => {
    prepareVideo(video);
    try {
      await video.play();
      setFallbackVisible(video, false);
    } catch {
      if (video.dataset.cardVideoVisible === 'true') {
        setFallbackVisible(video, true);
      }
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        video.dataset.cardVideoVisible = String(entry.isIntersecting);
        if (entry.isIntersecting) {
          void playVideo(video);
        } else {
          video.pause();
          setFallbackVisible(video, false);
        }
      });
    },
    { rootMargin: '70% 0px', threshold: 0.01 },
  );

  videos.forEach((video) => {
    const fallback = video
      .closest<HTMLElement>('.dm-v2-card-visual')
      ?.querySelector<HTMLButtonElement>('.js-dm-v2-card-video-play');
    if (fallback) {
      fallbackByVideo.set(video, fallback);
      const onFallbackClick = () => void playVideo(video);
      fallback.addEventListener('click', onFallbackClick);
      cleanups.push(() => fallback.removeEventListener('click', onFallbackClick));
    }

    const onPlaying = () => setFallbackVisible(video, false);
    const onError = () => {
      if (video.dataset.cardVideoVisible === 'true') setFallbackVisible(video, true);
    };
    video.addEventListener('playing', onPlaying);
    video.addEventListener('error', onError);
    cleanups.push(() => {
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('error', onError);
    });
    observer.observe(video);
  });

  registerCleanup(() => {
    observer.disconnect();
    cleanups.forEach((cleanup) => cleanup());
    videos.forEach((video) => {
      video.pause();
      delete video.dataset.cardVideoVisible;
    });
  });
};

export const setupDigitalMarketingStory = () => {
  const root = document.querySelector<HTMLElement>('.js-dm-v2-page');
  if (!root || root.dataset.storytellingReady === 'true') return;

  root.dataset.storytellingReady = 'true';
  document.documentElement.classList.add('dm-v2-story-active');

  const orbitHero = root.querySelector<DigitalMarketingOrbitSection>('.js-dm-v2-orbit-hero');
  const hero = root.querySelector<HTMLElement>('.js-dm-v2-hero');
  const heroCircle = root.querySelector<HTMLElement>('.js-dm-v2-hero-circle');
  const orbitHandoffLabel = root.querySelector<HTMLElement>(
    '.js-dm-v2-orbit-handoff-label',
  );
  const heroEyebrow = root.querySelector<HTMLElement>('.js-dm-v2-eyebrow');
  const focus = root.querySelector<HTMLElement>('.js-dm-v2-focus');
  const focusOrbit = root.querySelector<HTMLElement>('.js-dm-v2-focus-orbit');
  const focusLens = root.querySelector<HTMLElement>('.js-dm-v2-focus-lens');
  const trackOne = root.querySelector<HTMLElement>('.js-dm-v2-track-one');
  const pinOne = root.querySelector<HTMLElement>('.dm-v2-pin-one');
  const inlineLens = root.querySelector<HTMLElement>('.js-dm-v2-inline-lens');
  const inlineTarget = root.querySelector<HTMLElement>('.js-dm-v2-inline-target');
  const trackTwo = root.querySelector<HTMLElement>('.js-dm-v2-track-two');
  const pinTwo = root.querySelector<HTMLElement>('.dm-v2-pin-two');
  const secondTarget = root.querySelector<HTMLElement>('.js-dm-v2-second-target');
  const methodologyTrack = root.querySelector<HTMLElement>('.js-dm-v2-methodology-track');
  const methodology = root.querySelector<HTMLElement>('.js-dm-v2-methodology');
  const methodologyWash = root.querySelector<HTMLElement>('.js-dm-v2-methodology-wash');
  const methodologyShell = root.querySelector<HTMLElement>('.js-dm-v2-methodology-shell');
  const methodologySteps = Array.from(
    root.querySelectorAll<HTMLElement>('.js-dm-v2-methodology-step'),
  );
  const methodologyTitle =
    methodologyShell?.querySelector<HTMLElement>('.dm-v2-methodology-heading');
  const methodologyStepsList = methodologyShell?.querySelector<HTMLElement>(
    '.dm-v2-methodology-steps',
  );
  const methodologyIcons = Array.from(
    root.querySelectorAll<HTMLElement>('.dm-v2-methodology-step .dm-v2-methodology-icon'),
  );
  const methodologyConvergence = root.querySelector<HTMLElement>(
    '.js-dm-v2-methodology-convergence',
  );
  const methodologyFlowNodes = Array.from(
    root.querySelectorAll<HTMLElement>('.js-dm-v2-methodology-flow-node'),
  );
  const methodologyFlowIcons = methodologyFlowNodes
    .map((node) => node.querySelector<HTMLElement>('.dm-v2-methodology-flow-icon'))
    .filter((icon): icon is HTMLElement => Boolean(icon));
  const methodologyCopies = Array.from(
    root.querySelectorAll<HTMLElement>('.dm-v2-methodology-copy'),
  );
  const methodologyConnectors = Array.from(
    root.querySelectorAll<HTMLElement>('.dm-v2-methodology-connector'),
  );
  const methodologyFlow = root.querySelector<HTMLElement>('.dm-v2-methodology-flow');
  const methodologyFlowSvg = root.querySelector<SVGSVGElement>(
    '.dm-v2-methodology-flow-lines',
  );
  const methodologyFlowLines = Array.from(
    root.querySelectorAll<SVGPathElement>('.js-dm-v2-methodology-flow-line'),
  );
  const methodologyFlowGradients = Array.from(
    root.querySelectorAll<SVGLinearGradientElement>('.js-dm-v2-methodology-flow-gradient'),
  );
  const methodologyFocus = root.querySelector<HTMLElement>('.js-dm-v2-methodology-focus');
  const methodologyOutcome = root.querySelector<HTMLElement>(
    '.js-dm-v2-methodology-outcome',
  );
  const transitionTrack = root.querySelector<HTMLElement>('.js-dm-v2-transition-track');
  const transition = root.querySelector<HTMLElement>('.js-dm-v2-transition');
  const cards = root.querySelector<HTMLElement>('.js-dm-v2-card-section');
  const cardItems = Array.from(root.querySelectorAll<HTMLElement>('.js-dm-v2-card'));
  const firstCard = cardItems[0];
  const lastCard = cardItems.at(-1);
  const contact = root.querySelector<HTMLElement>('.final-contact-section');
  const heart = root.querySelector<HTMLElement>('.js-dm-v2-heart');

  if (!orbitHero) return;
  if (
    !hero ||
    !heroCircle ||
    !orbitHandoffLabel ||
    !heroEyebrow ||
    !focus ||
    !focusOrbit ||
    !focusLens ||
    !trackOne ||
    !pinOne ||
    !inlineLens ||
    !inlineTarget ||
    !trackTwo ||
    !pinTwo ||
    !secondTarget ||
    !methodologyTrack ||
    !methodology ||
    !methodologyWash ||
    !methodologyShell ||
    !methodologyTitle ||
    !methodologyStepsList ||
    !methodologyConvergence ||
    !methodologyFlow ||
    !methodologyFlowSvg ||
    !methodologyFocus ||
    !methodologyOutcome ||
    methodologySteps.length < 2 ||
    methodologyIcons.length !== methodologySteps.length ||
    methodologyFlowNodes.length !== methodologySteps.length ||
    methodologyFlowIcons.length !== methodologySteps.length ||
    methodologyCopies.length !== methodologySteps.length ||
    methodologyFlowLines.length !== methodologySteps.length ||
    methodologyFlowGradients.length !== methodologySteps.length ||
    !transitionTrack ||
    !transition ||
    !cards ||
    !firstCard ||
    !lastCard ||
    !contact ||
    !heart
  ) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cleanups: Array<() => void> = [];
  const registerCleanup = (cleanup: () => void) => cleanups.push(cleanup);

  root.querySelectorAll<HTMLElement>('.js-dm-v2-words').forEach(splitWords);
  setupFocusLens(root, reduceMotion, registerCleanup);
  setupCardVideos(root, registerCleanup);

  let navigationAnimating = false;
  let phaseAnimating = false;
  let activeScrollFrame = 0;
  let touchStartY: number | null = null;
  let touchLastY: number | null = null;
  let touchHandled = false;
  let wheelGestureConsumed = false;
  let wheelGestureTimer = 0;
  let whiteExpanded = false;
  let methodologyIntroComplete = false;
  let methodologyStep = 0;
  let methodologyConverged = false;
  let titleCentered = false;
  let resizeTimer = 0;
  let gestureCooldownUntil = 0;
  let panelSlideTimeline: gsap.core.Timeline | null = null;
  let viewportHandoffDepth = 0;
  let scrollViewportLocked = false;
  let panelViewportLocked = false;
  const navigationEase = gsap.parseEase('power3.inOut');
  const getCardsMethodologyHandoff = (onComplete?: () => void): PanelSlideOptions => {
    const lightweight = window.matchMedia('(max-width: 1024px)').matches;
    return {
      onComplete,
      lightweight,
      duration: lightweight ? 0.56 : undefined,
    };
  };
  const getOrbitApi = (): DigitalMarketingOrbitApi | undefined => orbitHero.dmOrbitApi;
  const waitForOrbitApi = (timeout = 1200) =>
    new Promise<DigitalMarketingOrbitApi | undefined>((resolve) => {
      const available = getOrbitApi();
      if (available) {
        resolve(available);
        return;
      }

      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeoutId);
        window.removeEventListener('agsit:orbit-ready', onReady);
        resolve(getOrbitApi());
      };
      const onReady = () => finish();
      const timeoutId = window.setTimeout(finish, timeout);
      window.addEventListener('agsit:orbit-ready', onReady, { once: true });
    });

  const settleOrbitMorph = async (
    orbitApi: DigitalMarketingOrbitApi,
    collapsed: boolean,
  ) => {
    let timeoutId = 0;
    await Promise.race([
      collapsed ? orbitApi.collapse() : orbitApi.expand(),
      new Promise<void>((resolve) => {
        timeoutId = window.setTimeout(resolve, 1200);
      }),
    ]);
    window.clearTimeout(timeoutId);
    orbitApi.setCollapsed(collapsed);
    if (!collapsed) orbitApi.wake();
  };

  const getStops = () => {
    const navHeight = getNavHeight();
    const panelHeight = getPanelHeight();
    const top = (element: HTMLElement) => Math.max(0, getDocumentTop(element) - navHeight);
    const trackRange = (element: HTMLElement) => {
      const start = top(element);
      return {
        start,
        end: Math.max(start, start + element.offsetHeight - panelHeight),
      };
    };

    const cardsRange = trackRange(cards);
    const methodologyRange = trackRange(methodologyTrack);
    const methodologyDistance =
      (methodologyRange.end - methodologyRange.start) / (methodologySteps.length + 1);

    return {
      orbitHero: top(orbitHero),
      hero: top(hero),
      focus: top(focus),
      trackOne: trackRange(trackOne),
      trackTwo: trackRange(trackTwo),
      transition: trackRange(transitionTrack),
      cards: cardsRange,
      methodology: {
        ...methodologyRange,
        steps: Array.from(
          { length: methodologySteps.length + 2 },
          (_, index) => methodologyRange.start + methodologyDistance * index,
        ),
      },
      contact: top(contact),
    };
  };

  const near = (current: number, target: number, tolerance = BOUNDARY_TOLERANCE) =>
    Math.abs(current - target) <= tolerance;

  const lockViewportHandoff = () => {
    viewportHandoffDepth += 1;
    if (viewportHandoffDepth === 1) {
      window.dispatchEvent(new CustomEvent('agsit:handoff-viewport-lock'));
    }
  };

  const unlockViewportHandoff = () => {
    viewportHandoffDepth = Math.max(0, viewportHandoffDepth - 1);
    if (viewportHandoffDepth === 0) {
      window.dispatchEvent(new CustomEvent('agsit:handoff-viewport-unlock'));
    }
  };

  const cancelActiveScroll = () => {
    window.cancelAnimationFrame(activeScrollFrame);
    activeScrollFrame = 0;
    if (scrollViewportLocked) {
      scrollViewportLocked = false;
      unlockViewportHandoff();
    }
  };

  const navigateTo = (
    destination: number,
    onComplete?: () => void,
    durationOverride?: number,
  ) => {
    cancelActiveScroll();

    if (reduceMotion || durationOverride === 0) {
      window.scrollTo(0, destination);
      ScrollTrigger.update();
      gestureCooldownUntil = Date.now() + 120;
      onComplete?.();
      return;
    }

    navigationAnimating = true;
    scrollViewportLocked = true;
    lockViewportHandoff();
    const startY = window.scrollY;
    const distance = destination - startY;
    const duration =
      durationOverride ?? (window.matchMedia('(pointer: coarse)').matches ? 680 : 840);
    const startedAt = performance.now();

    const update = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      window.scrollTo(0, startY + distance * navigationEase(progress));

      if (progress < 1) {
        activeScrollFrame = window.requestAnimationFrame(update);
        return;
      }

      window.scrollTo(0, destination);
      activeScrollFrame = 0;
      navigationAnimating = false;
      if (scrollViewportLocked) {
        scrollViewportLocked = false;
        unlockViewportHandoff();
      }
      gestureCooldownUntil = Date.now() + 220;
      onComplete?.();
    };

    activeScrollFrame = window.requestAnimationFrame(update);

  };
  const removeDuplicateIds = (element: HTMLElement) => {
    element.removeAttribute('id');
    element.querySelectorAll<HTMLElement>('[id]').forEach((child) => {
      child.removeAttribute('id');
    });
  };

  const navigatePanelSlide = (
    destination: number,
    outgoing: HTMLElement,
    incoming: HTMLElement,
    direction: Direction,
    options: PanelSlideOptions = {},
  ) => {
    if (reduceMotion) {
      navigateTo(destination, undefined, 0);
      options.onComplete?.();
      return;
    }

    cancelActiveScroll();
    panelSlideTimeline?.kill();
    root.querySelector('.js-dm-v2-panel-slide')?.remove();

    const portal = document.createElement('div');
    portal.className = 'dm-v2-panel-slide js-dm-v2-panel-slide';
    portal.setAttribute('aria-hidden', 'true');
    portal.style.top = `${getNavHeight()}px`;
    portal.style.height = `${getPanelHeight()}px`;
    const sourceRect = options.handoff?.source.getBoundingClientRect();
    const sourceStyles = options.handoff
      ? getComputedStyle(options.handoff.source)
      : null;
    const visualSourceRect = options.visualHandoff?.source.getBoundingClientRect();
    const visualSourceStyles = options.visualHandoff
      ? getComputedStyle(options.visualHandoff.source)
      : null;

    const createFrame = (source: HTMLElement, hiddenSelector?: string) => {
      const frame = document.createElement('div');
      frame.className = 'dm-v2-panel-slide-frame';
      frame.classList.toggle('is-lightweight', Boolean(options.lightweight));
      const clone = source.cloneNode(true) as HTMLElement;
      removeDuplicateIds(clone);

      if (options.lightweight) {
        const sourceVideos = Array.from(source.querySelectorAll<HTMLVideoElement>('video'));
        const cloneVideos = Array.from(clone.querySelectorAll<HTMLVideoElement>('video'));

        sourceVideos.forEach((sourceVideo, index) => {
          const cloneVideo = cloneVideos[index];
          if (!cloneVideo) return;

          const rect = sourceVideo.getBoundingClientRect();
          const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
          const snapshot = document.createElement('canvas');
          snapshot.className = `${cloneVideo.className} dm-v2-card-video-snapshot`;
          snapshot.width = Math.max(1, Math.min(1200, Math.round(rect.width * ratio)));
          snapshot.height = Math.max(1, Math.min(675, Math.round(rect.height * ratio)));
          snapshot.setAttribute('role', 'presentation');

          if (sourceVideo.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
            try {
              snapshot.getContext('2d')?.drawImage(
                sourceVideo,
                0,
                0,
                snapshot.width,
                snapshot.height,
              );
            } catch {
              // The card surface remains visible if the current video frame is unavailable.
            }
          }

          cloneVideo.replaceWith(snapshot);
        });

        clone.querySelector<HTMLElement>('.dm-v2-methodology-convergence')?.remove();
      }

      const sourceCanvases = Array.from(source.querySelectorAll('canvas'));
      const cloneCanvases = Array.from(clone.querySelectorAll('canvas'));
      sourceCanvases.forEach((sourceCanvas, index) => {
        const cloneCanvas = cloneCanvases[index];
        const cloneContext = cloneCanvas?.getContext('2d');
        if (!cloneCanvas || !cloneContext) return;
        cloneCanvas.width = sourceCanvas.width;
        cloneCanvas.height = sourceCanvas.height;
        cloneContext.drawImage(sourceCanvas, 0, 0);
      });
      if (options.handoff) {
        clone
          .querySelectorAll<HTMLElement>(
            '.js-dm-v2-orbit-handoff-label, .js-dm-v2-eyebrow',
          )
          .forEach((label) => {
            label.style.visibility = 'hidden';
          });
      }
      if (hiddenSelector) {
        clone.querySelectorAll<HTMLElement>(hiddenSelector).forEach((element) => {
          element.style.visibility = 'hidden';
        });
      }
      frame.appendChild(clone);
      return frame;
    };

    const outgoingFrame = createFrame(
      outgoing,
      options.visualHandoff?.sourceSelector,
    );
    const incomingFrame = createFrame(
      incoming,
      options.visualHandoff?.targetSelector,
    );
    portal.append(outgoingFrame, incomingFrame);

    const positionCardClone = (frame: HTMLElement, rect?: DOMRect) => {
      const cardClone = frame.firstElementChild as HTMLElement | null;
      if (!rect || !cardClone?.classList.contains('dm-v2-card')) return;
      const cardsSurface = getComputedStyle(cards);
      frame.style.backgroundColor = cardsSurface.backgroundColor;
      frame.style.backgroundImage = cardsSurface.backgroundImage;
      Object.assign(cardClone.style, {
        position: 'absolute',
        left: `${rect.left}px`,
        top: `${rect.top - getNavHeight()}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        minHeight: `${rect.height}px`,
        margin: '0',
      });
    };

    positionCardClone(outgoingFrame, outgoing.getBoundingClientRect());

    let handoffLabel: HTMLElement | null = null;
    if (options.handoff && sourceRect && sourceStyles) {
      handoffLabel = document.createElement('p');
      handoffLabel.className = 'dm-v2-panel-handoff-label';
      handoffLabel.textContent = options.handoff.source.textContent?.trim() ?? '';
      Object.assign(handoffLabel.style, {
        position: 'fixed',
        left: `${sourceRect.left}px`,
        top: `${sourceRect.top}px`,
        width: `${sourceRect.width}px`,
        height: `${sourceRect.height}px`,
        margin: '0',
        zIndex: '4',
        display: 'grid',
        placeItems: 'center',
        color: sourceStyles.color,
        fontFamily: sourceStyles.fontFamily,
        fontSize: sourceStyles.fontSize,
        fontWeight: sourceStyles.fontWeight,
        letterSpacing: sourceStyles.letterSpacing,
        lineHeight: sourceStyles.lineHeight,
        textTransform: sourceStyles.textTransform,
        whiteSpace: 'nowrap',
        transformOrigin: '0 0',
        willChange: 'transform',
      });
      portal.appendChild(handoffLabel);
    }

    let handoffVisual: HTMLElement | null = null;
    if (
      options.visualHandoff &&
      visualSourceRect &&
      visualSourceStyles &&
      visualSourceRect.width > 0 &&
      visualSourceRect.height > 0
    ) {
      handoffVisual = options.visualHandoff.source.cloneNode(true) as HTMLElement;
      removeDuplicateIds(handoffVisual);
      handoffVisual.classList.add('dm-v2-panel-handoff-visual');
      const computedAlpha = Number.parseFloat(visualSourceStyles.opacity);
      const startAlpha =
        options.visualHandoff.startAlpha ??
        (Number.isFinite(computedAlpha) ? computedAlpha : 1);
      Object.assign(handoffVisual.style, {
        position: 'fixed',
        left: `${visualSourceRect.left}px`,
        top: `${visualSourceRect.top}px`,
        width: `${visualSourceRect.width}px`,
        height: `${visualSourceRect.height}px`,
        minWidth: '0',
        margin: '0',
        zIndex: '6',
        opacity: `${startAlpha}`,
        visibility: 'visible',
        pointerEvents: 'none',
        transform: 'none',
        transformOrigin: '0 0',
        willChange: 'transform, opacity',
      });
      portal.appendChild(handoffVisual);
    }

    root.appendChild(portal);

    navigationAnimating = true;
    panelViewportLocked = true;
    lockViewportHandoff();
    window.scrollTo(0, destination);
    ScrollTrigger.update();
    const targetRect = options.handoff?.target.getBoundingClientRect();
    const visualTargetRect = options.visualHandoff?.target.getBoundingClientRect();
    positionCardClone(incomingFrame, incoming.getBoundingClientRect());
    const incomingReveal = options.incomingRevealSelector
      ? incomingFrame.querySelector<HTMLElement>(options.incomingRevealSelector)
      : null;

    gsap.set(outgoingFrame, { yPercent: 0 });
    gsap.set(incomingFrame, { yPercent: direction > 0 ? 100 : -100 });
    if (incomingReveal) {
      gsap.set(incomingReveal, {
        autoAlpha: 0,
        y: direction > 0 ? 18 : -18,
      });
    }

    let settled = false;
    const settlePanelSlide = (completed: boolean) => {
      if (settled) return;
      settled = true;

      const finalize = () => {
        portal.remove();
        panelSlideTimeline = null;
        navigationAnimating = false;
        if (panelViewportLocked) {
          panelViewportLocked = false;
          unlockViewportHandoff();
        }
        gestureCooldownUntil = Date.now() + 220;
        if (completed) options.onComplete?.();
      };

      if (!completed || !options.lightweight) {
        finalize();
        return;
      }

      window.scrollTo(0, destination);
      ScrollTrigger.update();
      window.requestAnimationFrame(() => {
        ScrollTrigger.update();
        window.requestAnimationFrame(finalize);
      });
    };

    panelSlideTimeline = gsap
      .timeline({
        defaults: { duration: options.duration ?? 0.72, ease: 'power3.inOut' },
        onComplete: () => settlePanelSlide(true),
        onInterrupt: () => settlePanelSlide(false),
      })
      .to(outgoingFrame, { yPercent: direction > 0 ? -100 : 100 }, 0)
      .to(incomingFrame, { yPercent: 0 }, 0);

    if (handoffLabel && sourceRect && targetRect) {
      panelSlideTimeline.to(
        handoffLabel,
        {
          x: targetRect.left - sourceRect.left,
          y: targetRect.top - sourceRect.top,
          scaleX: targetRect.width / Math.max(1, sourceRect.width),
          scaleY: targetRect.height / Math.max(1, sourceRect.height),
        },
        0,
      );
    }

    if (handoffVisual && visualSourceRect && visualTargetRect) {
      const startAlpha = options.visualHandoff?.startAlpha ?? 1;
      const endAlpha = options.visualHandoff?.endAlpha ?? startAlpha;
      panelSlideTimeline.to(
        handoffVisual,
        {
          x: visualTargetRect.left - visualSourceRect.left,
          y: visualTargetRect.top - visualSourceRect.top,
          scaleX: visualTargetRect.width / Math.max(1, visualSourceRect.width),
          scaleY: visualTargetRect.height / Math.max(1, visualSourceRect.height),
          duration: 0.72,
          ease: 'power3.inOut',
        },
        0,
      );

      if (endAlpha !== startAlpha) {
        panelSlideTimeline.to(
          handoffVisual,
          {
            autoAlpha: endAlpha,
            duration: 0.2,
            ease: 'power2.out',
          },
          endAlpha < startAlpha ? 0.5 : 0,
        );
      }
    }

    if (incomingReveal) {
      panelSlideTimeline.to(
        incomingReveal,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.32,
          ease: 'power2.out',
        },
        0.36,
      );
    }
  };

  const getWhiteCoverScale = () => {
    const rect = heart.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const farthestX = Math.max(centerX, window.innerWidth - centerX);
    const farthestY = Math.max(centerY, window.innerHeight - centerY);
    const radius = Math.hypot(farthestX, farthestY);
    const baseRadius = Math.max(1, Math.min(heart.offsetWidth, heart.offsetHeight) / 2);
    return (radius / baseRadius) * 1.28;
  };

  const context = gsap.context(() => {
    const eyebrow = root.querySelector<HTMLElement>('.js-dm-v2-eyebrow');
    const primary = root.querySelector<HTMLElement>('.js-dm-v2-title-primary');
    const secondary = root.querySelector<HTMLElement>('.js-dm-v2-title-secondary');
    const heroCopy = root.querySelector<HTMLElement>('.js-dm-v2-hero-copy');
    const heroCta = root.querySelector<HTMLElement>('.js-dm-v2-hero-cta');

    if (!reduceMotion) {
      if (heroCircle) gsap.set(heroCircle, { scale: 3, transformOrigin: '50% 50%' });
      gsap.set([eyebrow, primary, secondary, heroCopy, heroCta], { autoAlpha: 0 });
      gsap.set(eyebrow, { y: 12 });
      gsap.set(primary, { y: '-0.9em' });
      gsap.set(secondary, { y: '0.9em' });
      gsap.set([heroCopy, heroCta], { y: 16 });

      const heroTimeline = gsap.timeline({ defaults: { ease: 'power2.out' } });
      if (heroCircle) heroTimeline.to(heroCircle, { scale: 1, duration: 0.7, ease: 'power2.inOut' }, 0);
      heroTimeline
        .to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.55 }, 0.38)
        .to(primary, { autoAlpha: 1, y: 0, duration: 0.68, ease: 'power2.inOut' }, 0.48)
        .to(secondary, { autoAlpha: 1, y: 0, duration: 0.68, ease: 'power2.inOut' }, 0.66)
        .to(heroCopy, { autoAlpha: 1, y: 0, duration: 0.55 }, 0.86)
        .to(heroCta, { autoAlpha: 1, y: 0, duration: 0.55 }, 1);
    }

    const createWordReveal = (
      track: HTMLElement,
      selector: string,
      visualSelector?: string,
      trailingVisualSelector?: string,
    ) => {
      const words = gsap.utils.toArray<HTMLElement>(selector, root);
      const visual = visualSelector
        ? root.querySelector<HTMLElement>(visualSelector)
        : null;
      const trailingVisual = trailingVisualSelector
        ? root.querySelector<HTMLElement>(trailingVisualSelector)
        : null;

      if (reduceMotion) {
        gsap.set(words, { opacity: 1 });
        if (visual) gsap.set(visual, { autoAlpha: 1, scale: 1 });
        if (trailingVisual) {
          gsap.set(trailingVisual, {
            autoAlpha: 1,
            xPercent: 0,
            yPercent: 0,
            scale: 1,
            rotation: -45,
          });
        }
        return;
      }

      gsap.set(words, { opacity: 0.18 });
      if (visual) gsap.set(visual, { autoAlpha: 0.34, scale: 0.72 });
      if (trailingVisual) {
        gsap.set(trailingVisual, {
          autoAlpha: 0,
          xPercent: -112,
          yPercent: 112,
          scale: 0.88,
          rotation: -45,
          transformOrigin: '50% 50%',
          force3D: true,
        });
      }

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: track,
          start: () => getDocumentTop(track) - getNavHeight(),
          end: () => {
            const start = getDocumentTop(track) - getNavHeight();
            return start + Math.max(1, track.offsetHeight - getPanelHeight());
          },
          scrub: 0.38,
          invalidateOnRefresh: true,
        },
      });

      timeline.to(words, {
        opacity: 1,
        duration: 0.22,
        stagger: { each: 0.1 },
      });

      if (visual) {
        timeline.to(
          visual,
          { autoAlpha: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
          '>-18%',
        );
      }

      if (trailingVisual) {
        timeline
          .to(
            trailingVisual,
            {
              autoAlpha: 1,
              xPercent: 0,
              yPercent: 0,
              scale: 1,
              rotation: -45,
              duration: 0.52,
              ease: 'power4.in',
              force3D: true,
            },
            '>',
          )
          .to(
            trailingVisual,
            {
              rotation: -47.4,
              duration: 0.07,
              ease: 'power1.out',
            },
            '>',
          )
          .to(trailingVisual, {
            rotation: -45,
            duration: 0.2,
            ease: 'elastic.out(1, 0.38)',
          });
      }
    };

    createWordReveal(
      trackOne,
      '.js-dm-v2-words-one .dm-v2-word',
      '.js-dm-v2-inline-target',
    );
    createWordReveal(
      trackTwo,
      '.js-dm-v2-words-two .dm-v2-word',
      undefined,
      '.js-dm-v2-target-arrow',
    );

    gsap.set('.js-dm-v2-target', {
      autoAlpha: 1,
      scale: 1,
      rotation: 0,
    });

    gsap.set(heart, {
      position: 'relative',
      zIndex: 40,
      scale: 1,
      transformOrigin: '50% 50%',
      force3D: true,
    });

    const whiteTimeline = gsap
      .timeline({ paused: true })
      .to(heart, {
        scale: () => getWhiteCoverScale(),
        duration: 0.92,
        ease: 'power3.inOut',
        force3D: true,
      });

    gsap.set(methodologyWash, { autoAlpha: 0, backgroundColor: '#06142b' });
    gsap.set(methodologyShell, { autoAlpha: 0, y: reduceMotion ? 0 : 18 });

    const methodologyIntroTimeline = gsap
      .timeline({ paused: true })
      .to(
        methodologyShell,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.48,
          ease: 'power2.out',
        },
        0,
      );

    const methodologyStepTimelines = methodologySteps.map((step) => {
      const icon = step.querySelector<HTMLElement>('.dm-v2-methodology-icon');
      const copy = step.querySelector<HTMLElement>('.dm-v2-methodology-copy');
      const connector = step.querySelector<HTMLElement>('.dm-v2-methodology-connector');
      const timeline = gsap.timeline({ paused: true });

      timeline
        .to(step, {
          opacity: 1,
          filter: 'saturate(1)',
          duration: 0.36,
          ease: 'power2.out',
        })
        .to(
          icon,
          {
            scale: 1.08,
            duration: 0.2,
            ease: 'back.out(2.2)',
          },
          '<',
        )
        .to(copy, { y: 0, duration: 0.32, ease: 'power2.out' }, '<')
        .to(icon, { scale: 1, duration: 0.16, ease: 'power1.out' })
        .add(() => step.classList.add('is-revealed'), 0);

      if (connector) {
        timeline.to(
          connector,
          {
            scaleX: 1,
            scaleY: 1,
            duration: 0.34,
            ease: 'power2.out',
          },
          0,
        );
      }

      timeline.eventCallback('onReverseComplete', () => {
        step.classList.remove('is-revealed');
      });
      return timeline;
    });

    gsap.set(methodologyConvergence, { autoAlpha: 0 });
    gsap.set(methodologyFlowNodes, { autoAlpha: 1, x: 0, y: 0, scale: 1 });
    gsap.set(methodologyFlowIcons, { autoAlpha: 0 });
    const methodologyFlowLabels = methodologyFlowNodes
      .map((node) => node.querySelector<HTMLElement>(':scope > span:last-child'))
      .filter((label): label is HTMLElement => Boolean(label));
    gsap.set(methodologyFlowLabels, { autoAlpha: 0, y: 6 });
    gsap.set(methodologyFlowLines, { strokeDashoffset: 1 });
    gsap.set(methodologyFocus, { autoAlpha: 0, scale: 0.25 });
    gsap.set(methodologyOutcome, { autoAlpha: 0, x: reduceMotion ? 0 : 24 });

    const updateMethodologyFlowGeometry = () => {
      const flowRect = methodologyFlow.getBoundingClientRect();
      const focusRect = methodologyFocus.getBoundingClientRect();
      if (flowRect.width < 1 || flowRect.height < 1) return;

      const endX = focusRect.left + focusRect.width / 2 - flowRect.left;
      const endY = focusRect.top + focusRect.height / 2 - flowRect.top;
      methodologyFlowSvg.setAttribute('viewBox', `0 0 ${flowRect.width} ${flowRect.height}`);

      const firstIcon = methodologyFlowNodes[0]?.querySelector<HTMLElement>(
        '.dm-v2-methodology-flow-icon',
      );
      if (!firstIcon) return;
      const firstIconRect = firstIcon.getBoundingClientRect();
      const firstIconCenterY = firstIconRect.top + firstIconRect.height / 2 - flowRect.top;
      const focusIsBelow = endY > firstIconCenterY + firstIconRect.height * 1.25;

      methodologyFlowGradients.forEach((gradient) => {
        gradient.setAttribute('x1', focusIsBelow ? '50%' : '0%');
        gradient.setAttribute('y1', focusIsBelow ? '0%' : '50%');
        gradient.setAttribute('x2', focusIsBelow ? '50%' : '100%');
        gradient.setAttribute('y2', focusIsBelow ? '100%' : '50%');
      });

      methodologyFlowLines.forEach((line, index) => {
        if (focusIsBelow) {
          const startX =
            flowRect.width * ((index + 0.5) / methodologyFlowLines.length);
          const startY = flowRect.height * 0.52;
          const distanceY = Math.max(40, endY - startY);
          const controlOneY = startY + distanceY * 0.3;
          const controlTwoY = endY - distanceY * 0.22;
          line.setAttribute(
            'd',
            `M ${startX} ${startY} C ${startX} ${controlOneY}, ${endX} ${controlTwoY}, ${endX} ${endY}`,
          );
          return;
        }

        const startX = Math.min(endX - 90, flowRect.width * 0.58);
        const fanPosition =
          methodologyFlowLines.length > 1
            ? index / (methodologyFlowLines.length - 1) - 0.5
            : 0;
        const startY = endY + flowRect.height * fanPosition * 1.28;
        const distanceX = Math.max(48, endX - startX);
        const firstControlX = startX + distanceX * 0.26;
        const finalControlX = endX - distanceX * 0.2;
        line.setAttribute(
          'd',
          `M ${startX} ${startY} C ${firstControlX} ${startY}, ${finalControlX} ${endY}, ${endX} ${endY}`,
        );
      });
    };

    updateMethodologyFlowGeometry();

    const getMethodologyIconDestination = (index: number) => {
      const source = methodologyIcons[index];
      const target = methodologyFlowIcons[index];
      if (!source || !target) return { x: 0, y: 0, scale: 1 };

      const sourceRect = source.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      return {
        x: targetRect.left + targetRect.width / 2 - (sourceRect.left + sourceRect.width / 2),
        y: targetRect.top + targetRect.height / 2 - (sourceRect.top + sourceRect.height / 2),
        scale: targetRect.width / Math.max(1, sourceRect.width),
      };
    };

    const prepareMethodologyIconHandoff = () => {
      gsap.set(methodologyIcons, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        transformOrigin: '50% 50%',
      });
      gsap.set(methodologyFlowIcons, { autoAlpha: 0 });
      gsap.set(methodologyFlowLabels, { autoAlpha: 0, y: 6 });

      return methodologyIcons.map((_, index) => getMethodologyIconDestination(index));
    };

    let methodologyIconDestinations = prepareMethodologyIconHandoff();

    const methodologyOutcomeIcon = methodologyOutcome.querySelector<HTMLElement>(
      '.dm-v2-methodology-outcome-icon',
    );
    const methodologyConvergenceTimeline = gsap
      .timeline({ paused: true, defaults: { ease: 'power3.inOut' } })
      .to(methodologyTitle, { autoAlpha: 0, y: -22, duration: 0.38 }, 0)
      .to(methodologyConvergence, { autoAlpha: 1, duration: 0.01 }, 0)
      .to(
        methodologyCopies,
        { autoAlpha: 0, duration: 0.24, ease: 'power2.out' },
        0.02,
      )
      .to(
        methodologyConnectors,
        { autoAlpha: 0, duration: 0.24, ease: 'power2.out' },
        0.02,
      )
      .to(
        methodologyIcons,
        {
          x: (index) => methodologyIconDestinations[index]?.x ?? 0,
          y: (index) => methodologyIconDestinations[index]?.y ?? 0,
          scale: (index) => methodologyIconDestinations[index]?.scale ?? 1,
          duration: 0.92,
          ease: 'power3.inOut',
        },
        0.02,
      )
      .to(methodologyFlowIcons, { autoAlpha: 1, duration: 0.08, ease: 'none' }, 0.94)
      .to(methodologyIcons, { autoAlpha: 0, duration: 0.08, ease: 'none' }, 0.94)
      .to(methodologyStepsList, { autoAlpha: 0, duration: 0.01 }, 1.03)
      .to(
        methodologyFlowLabels,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.28,
          stagger: 0.025,
          ease: 'power2.out',
        },
        1.02,
      )
      .to(
        methodologyFlowLines,
        {
          strokeDashoffset: 0,
          duration: 0.7,
          stagger: 0.025,
          ease: 'power2.inOut',
        },
        1.13,
      )
      .to(
        methodologyFocus,
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.32,
          ease: 'back.out(2.2)',
        },
        1.76,
      )
      .to(
        methodologyOutcome,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          ease: 'power3.out',
        },
        1.9,
      )
      .fromTo(
        methodologyOutcomeIcon,
        { scale: 0.82 },
        { scale: 1, duration: 0.46, ease: 'back.out(2)', immediateRender: false },
        1.9,
      );

    const leftTitle = root.querySelector<HTMLElement>('.js-dm-v2-transition-left');
    const rightTitle = root.querySelector<HTMLElement>('.js-dm-v2-transition-right');
    gsap.set(leftTitle, { x: reduceMotion ? 0 : () => -window.innerWidth * 1.08 });
    gsap.set(rightTitle, { x: reduceMotion ? 0 : () => window.innerWidth * 1.08 });

    const titleTimeline = gsap
      .timeline({
        paused: true,
        defaults: { ease: 'expo.inOut' },
      })
      .to(leftTitle, { x: 0, duration: 1.65 }, 0)
      .to(rightTitle, { x: 0, duration: 1.65 }, 0);

    const animatePhase = (
      timeline: gsap.core.Timeline,
      forward: boolean,
      setCompleted: (complete: boolean) => void,
      onSettled?: () => void,
    ) => {
      if (phaseAnimating) return;
      phaseAnimating = true;

      if (reduceMotion) {
        timeline.progress(forward ? 1 : 0);
        setCompleted(forward);
        phaseAnimating = false;
        gestureCooldownUntil = Date.now() + 120;
        onSettled?.();
        return;
      }

      const callbackName = forward ? 'onComplete' : 'onReverseComplete';
      timeline.eventCallback(callbackName, () => {
        timeline.eventCallback(callbackName, null);
        setCompleted(forward);
        phaseAnimating = false;
        gestureCooldownUntil = Date.now() + 220;
        onSettled?.();
      });

      if (forward) timeline.restart();
      else timeline.progress(1).reverse();
    };

    const expandWhite = (forward: boolean, onSettled?: () => void) => {
      if (forward) root.classList.remove('is-white-passed');
      if (forward) {
        whiteExpanded = false;
        root.classList.remove('is-white-expanded');
        gsap.set(heart, { scale: 1 });
        whiteTimeline.invalidate();
      }
      animatePhase(whiteTimeline, forward, (complete) => {
        whiteExpanded = complete;
        if (!complete) gsap.set(heart, { scale: 1 });
        root.classList.toggle('is-white-expanded', complete);
      }, onSettled);
    };

    const animateTitle = (forward: boolean, onSettled?: () => void) => {
      animatePhase(titleTimeline, forward, (complete) => {
        titleCentered = complete;
      }, onSettled);
    };

    const animateMethodologyIntro = (forward: boolean, onSettled?: () => void) => {
      animatePhase(methodologyIntroTimeline, forward, (complete) => {
        methodologyIntroComplete = complete;
      }, onSettled);
    };

    const animateMethodologyStep = (
      stepNumber: number,
      forward: boolean,
      onSettled?: () => void,
    ) => {
      const timeline = methodologyStepTimelines[stepNumber - 1];
      const step = methodologySteps[stepNumber - 1];
      if (!timeline || !step) {
        onSettled?.();
        return;
      }

      animatePhase(timeline, forward, (complete) => {
        step.classList.toggle('is-revealed', complete);
        methodologyStep = complete ? stepNumber : stepNumber - 1;
      }, onSettled);
    };

    const animateMethodologyConvergence = (
      forward: boolean,
      onSettled?: () => void,
    ) => {
      if (forward) {
        updateMethodologyFlowGeometry();
        methodologyConvergenceTimeline.progress(0).pause();
        methodologyIconDestinations = prepareMethodologyIconHandoff();
        methodologyConvergenceTimeline.invalidate();
      }
      animatePhase(methodologyConvergenceTimeline, forward, (complete) => {
        methodologyConverged = complete;
        methodology.classList.toggle('is-converged', complete);
      }, onSettled);
    };

    const setMethodologyConvergenceState = (complete: boolean) => {
      updateMethodologyFlowGeometry();
      methodologyConvergenceTimeline.progress(0).pause();
      methodologyIconDestinations = prepareMethodologyIconHandoff();
      methodologyConvergenceTimeline.invalidate().progress(complete ? 1 : 0).pause();
      methodologyConverged = complete;
      methodology.classList.toggle('is-converged', complete);
    };

    const setMethodologyState = (stepNumber: number) => {
      const nextStep = gsap.utils.clamp(0, methodologySteps.length, stepNumber);
      methodologyIntroComplete = true;
      methodologyIntroTimeline.progress(1);
      methodologyStepTimelines.forEach((timeline, index) => {
        const complete = index < nextStep;
        timeline.progress(complete ? 1 : 0);
        methodologySteps[index]?.classList.toggle('is-revealed', complete);
      });
      methodologyStep = nextStep;
    };

    const handleDirection = (direction: Direction, projectedDistance = 0) => {
      if (navigationAnimating || phaseAnimating) return true;

      const stops = getStops();
      const y = window.scrollY;
      const crosses = (boundary: number) =>
        projectedDistance > 0 &&
        (direction > 0 ? y + projectedDistance > boundary : y - projectedDistance < boundary);

      if (direction > 0) {
        if (near(y, stops.orbitHero)) {
          navigationAnimating = true;
          void waitForOrbitApi().then(async (orbitApi) => {
            if (orbitApi) await settleOrbitMorph(orbitApi, true);
            navigationAnimating = false;
            navigatePanelSlide(stops.hero, orbitHero, hero, 1, {
              handoff: {
                source: orbitHandoffLabel,
                target: heroEyebrow,
              },
            });
          });
          return true;
        }

        if (near(y, stops.hero)) {
          navigatePanelSlide(stops.focus, hero, focus, 1, {
            visualHandoff: {
              source: heroCircle,
              target: focusOrbit,
              sourceSelector: '.js-dm-v2-hero-circle',
              targetSelector: '.js-dm-v2-focus-orbit',
              startAlpha: 0.5,
              endAlpha: 0,
            },
            incomingRevealSelector: '.dm-v2-focus-shell',
          });
          return true;
        }

        if (near(y, stops.focus)) {
          navigatePanelSlide(stops.trackOne.start, focus, pinOne, 1, {
            visualHandoff: {
              source: focusLens,
              target: inlineLens,
              sourceSelector: '.js-dm-v2-focus-lens',
              targetSelector: '.js-dm-v2-inline-lens',
              startAlpha: 1,
              endAlpha: 1,
            },
          });
          return true;
        }

        if (y >= stops.trackOne.start - BOUNDARY_TOLERANCE && y <= stops.trackOne.end + BOUNDARY_TOLERANCE) {
          if (y < stops.trackOne.end - BOUNDARY_TOLERANCE) {
            if (crosses(stops.trackOne.end)) {
              navigateTo(stops.trackOne.end);
              return true;
            }
            return false;
          }

          navigatePanelSlide(stops.trackTwo.start, pinOne, pinTwo, 1, {
            visualHandoff: {
              source: inlineTarget,
              target: secondTarget,
              sourceSelector: '.js-dm-v2-inline-target',
              targetSelector: '.js-dm-v2-second-target',
              startAlpha: 1,
              endAlpha: 1,
            },
          });
          return true;
        }

        if (y > stops.trackOne.end && y < stops.trackTwo.start - BOUNDARY_TOLERANCE) {
          navigatePanelSlide(stops.trackTwo.start, pinOne, pinTwo, 1, {
            visualHandoff: {
              source: inlineTarget,
              target: secondTarget,
              sourceSelector: '.js-dm-v2-inline-target',
              targetSelector: '.js-dm-v2-second-target',
              startAlpha: 1,
              endAlpha: 1,
            },
          });
          return true;
        }

        if (y >= stops.trackTwo.start - BOUNDARY_TOLERANCE && y <= stops.trackTwo.end + BOUNDARY_TOLERANCE) {
          if (y < stops.trackTwo.end - BOUNDARY_TOLERANCE) {
            if (crosses(stops.trackTwo.end)) {
              navigateTo(stops.trackTwo.end);
              return true;
            }
            return false;
          }

          expandWhite(true, () => {
            navigateTo(stops.transition.start, () => {
              root.classList.add('is-white-passed');
              animateTitle(true);
            }, WHITE_TRANSITION_DURATION);
          });
          return true;
        }

        if (y > stops.trackTwo.end && y < stops.transition.start - BOUNDARY_TOLERANCE) {
          navigateTo(stops.transition.start, () => {
            root.classList.add('is-white-passed');
            animateTitle(true);
          }, WHITE_TRANSITION_DURATION);
          return true;
        }

        if (y >= stops.transition.start - BOUNDARY_TOLERANCE && y <= stops.transition.end + BOUNDARY_TOLERANCE) {
          if (!titleCentered) {
            animateTitle(true);
            return true;
          }

          navigatePanelSlide(stops.cards.start, transition, firstCard, 1);
          return true;
        }

        if (y >= stops.cards.start - BOUNDARY_TOLERANCE && y <= stops.cards.end + BOUNDARY_TOLERANCE) {
          if (y < stops.cards.end - BOUNDARY_TOLERANCE) {
            if (crosses(stops.cards.end)) {
              navigateTo(stops.cards.end);
              return true;
            }
            return false;
          }

          navigatePanelSlide(
            stops.methodology.start,
            lastCard,
            methodology,
            1,
            getCardsMethodologyHandoff(() => animateMethodologyIntro(true)),
          );
          return true;
        }

        if (y > stops.cards.end && y < stops.methodology.start - BOUNDARY_TOLERANCE) {
          navigatePanelSlide(
            stops.methodology.start,
            lastCard,
            methodology,
            1,
            getCardsMethodologyHandoff(() => animateMethodologyIntro(true)),
          );
          return true;
        }

        if (
          y >= stops.methodology.start - BOUNDARY_TOLERANCE &&
          y <= stops.methodology.end + BOUNDARY_TOLERANCE
        ) {
          if (!methodologyIntroComplete) {
            animateMethodologyIntro(true);
            return true;
          }

          if (methodologyStep < methodologySteps.length) {
            const nextStep = methodologyStep + 1;
            navigateTo(stops.methodology.steps[nextStep] ?? stops.methodology.end, () => {
              animateMethodologyStep(nextStep, true);
            });
            return true;
          }

          if (!methodologyConverged) {
            navigateTo(
              stops.methodology.steps[methodologySteps.length + 1] ??
                stops.methodology.end,
              () => animateMethodologyConvergence(true),
            );
            return true;
          }

          navigateTo(stops.contact);
          return true;
        }

        if (y > stops.methodology.end && y < stops.contact - BOUNDARY_TOLERANCE) {
          setMethodologyState(methodologySteps.length);
          setMethodologyConvergenceState(true);
          navigateTo(stops.contact);
          return true;
        }

        return false;
      }

      if (near(y, stops.contact)) {
        setMethodologyState(methodologySteps.length);
        setMethodologyConvergenceState(true);
        navigateTo(stops.methodology.end);
        return true;
      }

      if (y > stops.methodology.end + BOUNDARY_TOLERANCE && y < stops.contact) {
        setMethodologyState(methodologySteps.length);
        setMethodologyConvergenceState(true);
        navigateTo(stops.methodology.end);
        return true;
      }

      if (
        y >= stops.methodology.start - BOUNDARY_TOLERANCE &&
        y <= stops.methodology.end + BOUNDARY_TOLERANCE
      ) {
        if (methodologyConverged) {
          animateMethodologyConvergence(false, () => {
            navigateTo(
              stops.methodology.steps[methodologySteps.length] ?? stops.methodology.start,
            );
          });
          return true;
        }

        if (methodologyStep > 0) {
          const currentStep = methodologyStep;
          animateMethodologyStep(currentStep, false, () => {
            navigateTo(stops.methodology.steps[currentStep - 1] ?? stops.methodology.start);
          });
          return true;
        }

        if (methodologyIntroComplete) {
          animateMethodologyIntro(false, () => {
            navigatePanelSlide(
              stops.cards.end,
              methodology,
              lastCard,
              -1,
              getCardsMethodologyHandoff(),
            );
          });
          return true;
        }

        navigatePanelSlide(
          stops.cards.end,
          methodology,
          lastCard,
          -1,
          getCardsMethodologyHandoff(),
        );
        return true;
      }

      if (y > stops.cards.end + BOUNDARY_TOLERANCE && y < stops.methodology.start) {
        navigatePanelSlide(
          stops.cards.end,
          methodology,
          lastCard,
          -1,
          getCardsMethodologyHandoff(),
        );
        return true;
      }

      if (y >= stops.cards.start - BOUNDARY_TOLERANCE && y <= stops.cards.end + BOUNDARY_TOLERANCE) {
        if (y > stops.cards.start + BOUNDARY_TOLERANCE) {
          if (crosses(stops.cards.start)) {
            navigateTo(stops.cards.start);
            return true;
          }
          return false;
        }

        navigatePanelSlide(stops.transition.end, firstCard, transition, -1, {
          onComplete: () => {
            whiteExpanded = true;
            whiteTimeline.progress(1);
            root.classList.add('is-white-expanded');
            root.classList.add('is-white-passed');
            titleCentered = true;
            titleTimeline.progress(1);
          },
        });
        return true;
      }

      if (y > stops.transition.end + BOUNDARY_TOLERANCE && y < stops.cards.start) {
        navigatePanelSlide(stops.transition.end, firstCard, transition, -1, {
          onComplete: () => {
            titleCentered = true;
            titleTimeline.progress(1);
          },
        });
        return true;
      }

      if (y >= stops.transition.start - BOUNDARY_TOLERANCE && y <= stops.transition.end + BOUNDARY_TOLERANCE) {
        if (titleCentered) {
          animateTitle(false, () => {
            navigateTo(stops.trackTwo.end, () => {
              whiteExpanded = true;
              whiteTimeline.progress(1);
              root.classList.add('is-white-expanded');
              root.classList.remove('is-white-passed');
              expandWhite(false);
            }, WHITE_TRANSITION_DURATION);
          });
          return true;
        }

        navigateTo(stops.trackTwo.end, () => {
          whiteExpanded = true;
          whiteTimeline.progress(1);
          root.classList.add('is-white-expanded');
          root.classList.remove('is-white-passed');
          expandWhite(false);
        }, WHITE_TRANSITION_DURATION);
        return true;
      }

      if (y > stops.trackTwo.end + BOUNDARY_TOLERANCE && y < stops.transition.start) {
        navigateTo(stops.trackTwo.end, () => {
          whiteExpanded = true;
          whiteTimeline.progress(1);
          root.classList.add('is-white-expanded');
          root.classList.remove('is-white-passed');
          expandWhite(false);
        }, WHITE_TRANSITION_DURATION);
        return true;
      }

      if (y >= stops.trackTwo.start - BOUNDARY_TOLERANCE && y <= stops.trackTwo.end + BOUNDARY_TOLERANCE) {
        if (near(y, stops.trackTwo.end) && whiteExpanded) {
          expandWhite(false);
          return true;
        }

        if (y > stops.trackTwo.start + BOUNDARY_TOLERANCE) {
          if (crosses(stops.trackTwo.start)) {
            navigateTo(stops.trackTwo.start);
            return true;
          }
          return false;
        }

        navigatePanelSlide(stops.trackOne.end, pinTwo, pinOne, -1, {
          visualHandoff: {
            source: secondTarget,
            target: inlineTarget,
            sourceSelector: '.js-dm-v2-second-target',
            targetSelector: '.js-dm-v2-inline-target',
            startAlpha: 1,
            endAlpha: 1,
          },
        });
        return true;
      }

      if (y > stops.trackOne.end + BOUNDARY_TOLERANCE && y < stops.trackTwo.start) {
        navigatePanelSlide(stops.trackOne.end, pinTwo, pinOne, -1, {
          visualHandoff: {
            source: secondTarget,
            target: inlineTarget,
            sourceSelector: '.js-dm-v2-second-target',
            targetSelector: '.js-dm-v2-inline-target',
            startAlpha: 1,
            endAlpha: 1,
          },
        });
        return true;
      }

      if (y >= stops.trackOne.start - BOUNDARY_TOLERANCE && y <= stops.trackOne.end + BOUNDARY_TOLERANCE) {
        if (y > stops.trackOne.start + BOUNDARY_TOLERANCE) {
          if (crosses(stops.trackOne.start)) {
            navigateTo(stops.trackOne.start);
            return true;
          }
          return false;
        }

        navigatePanelSlide(stops.focus, pinOne, focus, -1, {
          visualHandoff: {
            source: inlineLens,
            target: focusLens,
            sourceSelector: '.js-dm-v2-inline-lens',
            targetSelector: '.js-dm-v2-focus-lens',
            startAlpha: 1,
            endAlpha: 1,
          },
          incomingRevealSelector: '.dm-v2-focus-shell',
        });
        return true;
      }

      if (near(y, stops.focus)) {
        navigatePanelSlide(stops.hero, focus, hero, -1, {
          visualHandoff: {
            source: focusOrbit,
            target: heroCircle,
            sourceSelector: '.js-dm-v2-focus-orbit',
            targetSelector: '.js-dm-v2-hero-circle',
            startAlpha: 0.06,
            endAlpha: 0.5,
          },
        });
        return true;
      }

      if (near(y, stops.hero)) {
        orbitHero.dataset.orbitState = 'collapsed';
        getOrbitApi()?.setCollapsed(true);
        const orbitExpansion = waitForOrbitApi().then(async (orbitApi) => {
          orbitApi?.wake();
          if (orbitApi) await settleOrbitMorph(orbitApi, false);
        });
        navigatePanelSlide(stops.orbitHero, hero, orbitHero, -1, {
          handoff: {
            source: heroEyebrow,
            target: orbitHandoffLabel,
          },
          onComplete: () => {
            getOrbitApi()?.wake();
            navigationAnimating = true;
            void orbitExpansion.finally(() => {
              navigationAnimating = false;
              gestureCooldownUntil = Date.now() + 220;
            });
          },
        });
        return true;
      }

      return false;
    };

    const onWheel = (event: WheelEvent) => {
      if (isWheelProtectedTarget(event.target)) return;
      const stops = getStops();
      if (Math.abs(event.deltaY) < 1) return;
      const direction: Direction = event.deltaY > 0 ? 1 : -1;
      const controlled =
        window.scrollY >= stops.orbitHero - BOUNDARY_TOLERANCE &&
        (window.scrollY < stops.contact - BOUNDARY_TOLERANCE ||
          (direction < 0 && window.scrollY <= stops.contact + BOUNDARY_TOLERANCE));
      if (!controlled) return;

      const useNativeCardScroll =
        window.matchMedia('(max-width: 1024px)').matches &&
        event.target instanceof Element &&
        Boolean(event.target.closest('.js-dm-v2-card-section'));
      if (useNativeCardScroll) return;

      event.preventDefault();
      window.clearTimeout(wheelGestureTimer);
      wheelGestureTimer = window.setTimeout(() => {
        wheelGestureConsumed = false;
      }, 180);
      if (wheelGestureConsumed) return;
      if (navigationAnimating || phaseAnimating || Date.now() < gestureCooldownUntil) {
        return;
      }
      const handled = handleDirection(direction, Math.abs(event.deltaY));
      if (handled) {
        wheelGestureConsumed = true;
      } else {
        const destination = gsap.utils.clamp(
          stops.orbitHero,
          stops.methodology.end,
          window.scrollY + event.deltaY,
        );
        window.scrollTo(0, destination);
        ScrollTrigger.update();
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      if (isFormOrNavigationTarget(event.target) || isFocusLensTarget(event.target)) {
        touchStartY = null;
        return;
      }

      const useNativeCardScroll =
        window.matchMedia('(max-width: 1024px)').matches &&
        event.target instanceof Element &&
        Boolean(event.target.closest('.js-dm-v2-card-section'));
      if (useNativeCardScroll) {
        touchStartY = null;
        touchLastY = null;
        touchHandled = false;
        return;
      }

      touchStartY = event.touches[0]?.clientY ?? null;
      touchLastY = touchStartY;
      touchHandled = false;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (touchStartY === null || touchLastY === null) return;
      const currentY = event.touches[0]?.clientY ?? touchLastY;
      const delta = touchLastY - currentY;
      touchLastY = currentY;
      if (Math.abs(delta) < 0.5) return;

      const stops = getStops();
      const direction: Direction = delta > 0 ? 1 : -1;
      const controlled =
        window.scrollY >= stops.orbitHero - BOUNDARY_TOLERANCE &&
        (window.scrollY < stops.contact - BOUNDARY_TOLERANCE ||
          (direction < 0 && window.scrollY <= stops.contact + BOUNDARY_TOLERANCE));
      if (!controlled) return;

      event.preventDefault();
      if (touchHandled) {
        return;
      }
      if (navigationAnimating || phaseAnimating || Date.now() < gestureCooldownUntil) return;

      touchHandled = handleDirection(direction, Math.abs(delta));
      if (!touchHandled) {
        const destination = gsap.utils.clamp(
          stops.orbitHero,
          stops.methodology.end,
          window.scrollY + delta,
        );
        window.scrollTo(0, destination);
        ScrollTrigger.update();
      }
    };

    const onTouchEnd = () => {
      touchStartY = null;
      touchLastY = null;
      touchHandled = false;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (isFormOrNavigationTarget(event.target)) return;
      const forward = ['ArrowDown', 'PageDown', ' '].includes(event.key);
      const backward = ['ArrowUp', 'PageUp'].includes(event.key);
      if (!forward && !backward) return;

      const direction: Direction = forward ? 1 : -1;
      if (handleDirection(direction, getPanelHeight())) event.preventDefault();
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    registerCleanup(() => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
      window.removeEventListener('keydown', onKeyDown);
    });

    if (!reduceMotion) {
      gsap.matchMedia().add('(min-width: 901px)', () => {
        gsap.utils.toArray<HTMLElement>('.js-dm-v2-card', root).forEach((card, index) => {
          gsap.to(card, {
            scale: 0.8 + index * 0.04,
            transformOrigin: 'center top',
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'center center',
              end: 'center top',
              scrub: 0.45,
            },
          });
        });
      });
    }

    const syncDeepLinkState = () => {
      const stops = getStops();
      const y = window.scrollY;
      getOrbitApi()?.setCollapsed(y >= stops.hero - BOUNDARY_TOLERANCE);
      if (y >= stops.transition.start - BOUNDARY_TOLERANCE) {
        whiteExpanded = true;
        whiteTimeline.progress(1);
        root.classList.add('is-white-expanded');
        root.classList.add('is-white-passed');
        titleCentered = true;
        titleTimeline.progress(1);
      }
      if (y >= stops.methodology.start - BOUNDARY_TOLERANCE) {
        const methodologyPhase = gsap.utils.clamp(
          0,
          methodologySteps.length + 1,
          Math.round(
            ((y - stops.methodology.start) /
              Math.max(1, stops.methodology.end - stops.methodology.start)) *
              (methodologySteps.length + 1),
          ),
        );
        const hasReachedContact = y >= stops.contact - BOUNDARY_TOLERANCE;
        setMethodologyState(
          hasReachedContact
            ? methodologySteps.length
            : Math.min(methodologySteps.length, methodologyPhase),
        );
        setMethodologyConvergenceState(
          hasReachedContact || methodologyPhase > methodologySteps.length,
        );
      }
    };

    const refresh = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (!phaseAnimating) {
          const whiteProgress = whiteTimeline.progress();
          const methodologyIntroProgress = methodologyIntroTimeline.progress();
          const titleProgress = titleTimeline.progress();
          whiteTimeline.invalidate().progress(whiteProgress);
          methodologyIntroTimeline.invalidate().progress(methodologyIntroProgress);
          titleTimeline.invalidate().progress(titleProgress);
          updateMethodologyFlowGeometry();
        }
        ScrollTrigger.refresh();
      }, 160);
    };

    window.addEventListener('resize', refresh, { passive: true });
    window.addEventListener('agsit:viewport-change', refresh, { passive: true });
    registerCleanup(() => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', refresh);
      window.removeEventListener('agsit:viewport-change', refresh);
    });

    syncDeepLinkState();
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, root);

  const destroy = () => {
    cancelActiveScroll();
    window.clearTimeout(wheelGestureTimer);
    panelSlideTimeline?.kill();
    root.querySelector('.js-dm-v2-panel-slide')?.remove();
    while (viewportHandoffDepth > 0) unlockViewportHandoff();
    cleanups.forEach((cleanup) => cleanup());
    context.revert();
    document.documentElement.classList.remove('dm-v2-story-active');
  };

  window.addEventListener('pagehide', destroy, { once: true });
};
