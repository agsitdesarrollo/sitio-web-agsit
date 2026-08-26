import gsap from 'gsap';
import { ALLIANCE_LOGO_OVERSAMPLE } from '../../animations/allianceLogoZoom';
import { ensureVideoAutoplay } from '../../scripts/videoAutoplay';
import { getAllianceVideoHandoff } from './allianceVideoHandoff';

type ExperiencePhase =
  | 'about'
  | 'to-video'
  | 'canvas'
  | 'to-contact'
  | 'contact'
  | 'to-logo';

type CompactGeometry = {
  clipPath: string;
  copyY: number;
  scale: number;
  x: number;
  y: number;
};

type LogoGeometry = {
  height: number;
  width: number;
  x: number;
  y: number;
};

const DARK_BACKGROUND = '#020712';
const VIDEO_RATIO = 16 / 9;
const WHEEL_THRESHOLD = 72;
const WHEEL_END_DELAY = 180;
const TOUCH_THRESHOLD = 48;
const LOGO_ZOOM_DURATION = 1.18;

const clamp = (min: number, value: number, max: number) => Math.min(Math.max(value, min), max);

export function initAllianceVideoExperience(): (() => void) | undefined {
  const root = document.documentElement;
  const scene = document.querySelector<HTMLElement>('.js-video-handoff-scene');
  const shell = scene?.querySelector<HTMLElement>('.js-video-handoff-shell');
  const host = scene?.querySelector<HTMLElement>('.js-video-handoff-host');
  const cover = scene?.querySelector<HTMLElement>('.js-video-handoff-cover');
  const loading = scene?.querySelector<HTMLElement>('.js-video-handoff-loading');
  const logoLayer = scene?.querySelector<HTMLElement>('.js-video-handoff-logo');
  const logoMark = scene?.querySelector<HTMLElement>('.js-video-handoff-logo-mark');
  const story = document.querySelector<HTMLElement>('.js-video-story');
  const storyFrame = document.querySelector<HTMLElement>('.js-video-story-frame');
  const contact = document.querySelector<HTMLElement>('.final-contact-section');
  const transitionLogo = document.querySelector<HTMLElement>('.js-about-transition-logo');
  const video = host?.querySelector<HTMLVideoElement>('video')
    ?? storyFrame?.querySelector<HTMLVideoElement>('video');
  const copy = scene?.querySelector<HTMLElement>('.js-video-handoff-copy');
  const lines = scene
    ? Array.from(scene.querySelectorAll<HTMLElement>('.js-video-handoff-line'))
    : [];

  if (
    !scene
    || !shell
    || !host
    || !cover
    || !loading
    || !logoLayer
    || !logoMark
    || !story
    || !storyFrame
    || !contact
    || !transitionLogo
    || !video
    || !copy
    || !lines.length
  ) {
    return undefined;
  }

  // El elemento de video se mueve una sola vez, antes de cargar el recurso.
  // Reparentarlo en cada ida y vuelta reinicia el pipeline de composición en
  // Safari/iPadOS y deja cuadros negros aunque play() ya se haya resuelto.
  if (video.parentElement !== host) {
    host.append(video);
  }

  const handoff = getAllianceVideoHandoff();
  const maxStop = lines.length + 1;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  let phase: ExperiencePhase = 'about';
  let stop = 1;
  let animating = false;
  let activeTimeline: gsap.core.Timeline | undefined;
  let activationId = 0;
  let wheelAmount = 0;
  let wheelDirection = 0;
  let wheelConsumed = false;
  let wheelEndTimer = 0;
  let touchStartY: number | null = null;
  let touchCurrentY: number | null = null;
  let touchMode: 'canvas' | 'contact' | undefined;
  let keyConsumed = false;
  let viewportFrame = 0;
  let pendingViewportSync = false;
  let playbackRetryTimer = 0;
  let shouldKeepPlaying = false;
  let lastPlaybackTime = 0;
  let lastPlaybackProgressAt = 0;
  let lastPlaybackReloadAt = 0;
  let waitingForFirstFrame = false;
  let canRevealFirstFrame = false;
  let minimumFirstFrameTime = 0.32;
  let lastLayoutWidth = Math.round(scene.getBoundingClientRect().width);
  let lastLayoutOrientation = window.matchMedia('(orientation: portrait)').matches;

  const animationDuration = (seconds: number) => (reduceMotion.matches ? 0 : seconds);
  const isCanvasActive = () => ['to-video', 'canvas', 'to-contact', 'to-logo'].includes(phase);

  const hasAdvancingVideoFrame = () =>
    !video.paused
    && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA
    && video.currentTime >= minimumFirstFrameTime;

  const revealVideoCoverIfReady = () => {
    if (
      phase !== 'canvas'
      || !waitingForFirstFrame
      || !canRevealFirstFrame
      || !hasAdvancingVideoFrame()
    ) return false;

    waitingForFirstFrame = false;
    canRevealFirstFrame = false;
    gsap.killTweensOf([cover, loading]);
    gsap.set(loading, { autoAlpha: 0 });
    gsap.to(cover, {
      autoAlpha: 0,
      duration: animationDuration(0.18),
      ease: 'none',
      overwrite: true,
    });
    if (scene.dataset.canvasState === 'video-loading') {
      scene.dataset.canvasState = 'video-full';
    }
    return true;
  };

  const resetFirstFrameGate = () => {
    waitingForFirstFrame = false;
    canRevealFirstFrame = false;
    minimumFirstFrameTime = 0.32;
    gsap.killTweensOf([cover, loading]);
    gsap.set(loading, { autoAlpha: 0 });
  };

  const hydrateVideo = () => {
    const source = video.dataset.src;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.preload = 'auto';
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('autoplay', '');

    if (source && !video.currentSrc && !video.getAttribute('src')) {
      video.src = source;
      video.load();
      lastPlaybackReloadAt = performance.now();
    } else if (
      source
      && video.error
      && performance.now() - lastPlaybackReloadAt >= 5000
    ) {
      // Recupera errores transitorios de red/decodificación sin reiniciar el
      // recurso en cada tick del watchdog.
      video.src = source;
      video.load();
      lastPlaybackReloadAt = performance.now();
    }
  };

  const keepVideoPlaying = () => {
    window.clearTimeout(playbackRetryTimer);
    if (!shouldKeepPlaying) return;

    hydrateVideo();
    const now = performance.now();
    const currentTime = video.currentTime;
    if (currentTime > lastPlaybackTime + 0.02 || currentTime < lastPlaybackTime - 0.1) {
      lastPlaybackTime = currentTime;
      lastPlaybackProgressAt = now;
    }

    revealVideoCoverIfReady();

    // `paused === false` no garantiza reproducción: varios WebView quedan en
    // waiting sin avanzar currentTime. El watchdog vuelve a solicitar play().
    if (video.paused || now - lastPlaybackProgressAt > 1100) {
      ensureVideoAutoplay(video);
    }
    playbackRetryTimer = window.setTimeout(() => {
      if (shouldKeepPlaying) keepVideoPlaying();
    }, 650);
  };

  const playVideo = (fromStart = false) => {
    hydrateVideo();
    if (fromStart) {
      try {
        video.currentTime = 0;
      } catch {
        // Metadata can still be pending. The decoded-frame gate retries it.
      }
    }
    shouldKeepPlaying = true;
    lastPlaybackTime = video.currentTime;
    lastPlaybackProgressAt = performance.now();
    ensureVideoAutoplay(video);
    keepVideoPlaying();
  };

  const stopVideo = (resetTime = false) => {
    shouldKeepPlaying = false;
    window.clearTimeout(playbackRetryTimer);
    video.pause();
    if (!resetTime) return;

    try {
      video.currentTime = 0;
    } catch {
      // El recurso puede estar descargándose; ya inicia en cero por defecto.
    }
    lastPlaybackTime = 0;
    lastPlaybackProgressAt = 0;
  };

  const setRootActive = (isActive: boolean) => {
    if (isActive) {
      root.dataset.allianceVideoCanvas = 'active';
      scene.classList.add('is-active');
      scene.setAttribute('aria-hidden', 'false');
    } else {
      delete root.dataset.allianceVideoCanvas;
      scene.classList.remove('is-active');
      scene.setAttribute('aria-hidden', 'true');
    }

    // Android can preserve an x-pan after an overflowing layer disappears.
    if (window.scrollX !== 0) {
      window.scrollTo({ top: window.scrollY, left: 0, behavior: 'auto' });
    }
  };

  const getContainedVideoRect = (width: number, height: number) => {
    if (width / height > VIDEO_RATIO) {
      const videoWidth = height * VIDEO_RATIO;
      return { left: (width - videoWidth) / 2, top: 0, width: videoWidth, height };
    }

    const videoHeight = width / VIDEO_RATIO;
    return { left: 0, top: (height - videoHeight) / 2, width, height: videoHeight };
  };

  const getCompactGeometry = (): CompactGeometry => {
    const sceneRect = scene.getBoundingClientRect();
    const width = Math.max(sceneRect.width, 1);
    const height = Math.max(sceneRect.height, 1);
    const isPortrait = height >= width;
    const isShortLandscape = !isPortrait && height <= 540;
    const maxWidth = isPortrait
      ? width * 0.92
      : isShortLandscape
        ? Math.min(width * 0.7, 720)
        : Math.min(width * 0.68, 1300);
    const maxHeight = isPortrait ? height * 0.36 : isShortLandscape ? height * 0.55 : height * 0.52;
    const targetWidth = Math.max(1, Math.min(maxWidth, maxHeight * VIDEO_RATIO));
    const targetHeight = targetWidth / VIDEO_RATIO;
    const targetTop = isPortrait
      ? Math.max(24, height * 0.08)
      : isShortLandscape
        ? Math.max(12, height * 0.04)
        : clamp(22, height * 0.07, 84);
    const targetLeft = (width - targetWidth) / 2;
    const contained = getContainedVideoRect(width, height);
    const scale = targetWidth / contained.width;
    const rightInset = width - contained.left - contained.width;
    const bottomInset = height - contained.top - contained.height;
    const targetRadius = clamp(10, targetWidth * 0.012, 16);
    const copyGap = isPortrait
      ? clamp(68, height * 0.15, 132)
      : isShortLandscape
        ? height * 0.1
        : clamp(72, height * 0.14, 156);

    return {
      x: targetLeft - contained.left * scale,
      y: targetTop - contained.top * scale,
      scale,
      clipPath: `inset(${contained.top}px ${rightInset}px ${bottomInset}px ${contained.left}px round ${targetRadius / scale}px)`,
      copyY: targetTop + targetHeight + copyGap,
    };
  };

  const getLogoGeometry = (): LogoGeometry => {
    const sceneRect = scene.getBoundingClientRect();
    const logoRect = transitionLogo.getBoundingClientRect();
    const fallbackWidth = clamp(82, sceneRect.width * 0.12, 122);
    const width = logoRect.width > 1 ? logoRect.width : fallbackWidth;
    const height = logoRect.height > 1 ? logoRect.height : fallbackWidth / 1.08;

    return {
      width,
      height,
      x: logoRect.width > 1 ? logoRect.left - sceneRect.left : (sceneRect.width - width) / 2,
      y: logoRect.height > 1 ? logoRect.top - sceneRect.top : (sceneRect.height - height) / 2,
    };
  };

  const getLogoFillScale = (geometry: LogoGeometry) => {
    const sceneRect = scene.getBoundingClientRect();
    return Math.max(
      sceneRect.width / Math.max(geometry.width, 1),
      sceneRect.height / Math.max(geometry.height, 1),
    ) * 1.18;
  };

  const getLogoLayerScale = (visualScale: number) => visualScale / ALLIANCE_LOGO_OVERSAMPLE;

  const setLogoGeometry = (geometry: LogoGeometry, visualScale = 1) => {
    const oversampledWidth = geometry.width * ALLIANCE_LOGO_OVERSAMPLE;
    const oversampledHeight = geometry.height * ALLIANCE_LOGO_OVERSAMPLE;
    gsap.set(logoLayer, {
      left: 0,
      top: 0,
      width: oversampledWidth,
      height: oversampledHeight,
      // El centro visual permanece idéntico al logo de Alianzas, pero la capa
      // interna conserva doce veces más superficie. Así el navegador parte de
      // la resolución completa del PNG embebido y no de una textura de 82 px.
      x: geometry.x - (oversampledWidth - geometry.width) / 2,
      y: geometry.y - (oversampledHeight - geometry.height) / 2,
      scale: getLogoLayerScale(visualScale),
      autoAlpha: 1,
      transformOrigin: '50% 50%',
    });
  };

  const setLines = (activeIndex: number | undefined) => {
    lines.forEach((line, index) => {
      gsap.set(line, {
        autoAlpha: index === activeIndex ? 1 : 0,
        y: index === activeIndex ? 0 : 24,
      });
    });
  };

  const setFullGeometry = () => {
    scene.dataset.canvasState = 'video-full';
    gsap.set(scene, { backgroundColor: DARK_BACKGROUND });
    gsap.set(logoLayer, { autoAlpha: 0 });
    gsap.set(logoMark, { autoAlpha: 1 });
    gsap.set(shell, {
      autoAlpha: 1,
      x: 0,
      y: 0,
      scale: 1,
      clipPath: 'inset(0px 0px 0px 0px round 0px)',
    });
    gsap.set(copy, { autoAlpha: 0, y: 0 });
    setLines(undefined);
    if (waitingForFirstFrame) {
      scene.dataset.canvasState = 'video-loading';
      gsap.set(cover, { autoAlpha: 1, backgroundColor: DARK_BACKGROUND });
      gsap.set(loading, { autoAlpha: 1 });
    }
  };

  const setCompactGeometry = (lineIndex: number) => {
    const geometry = getCompactGeometry();
    scene.dataset.canvasState = 'video-compact';
    gsap.set(scene, { backgroundColor: '#ffffff' });
    gsap.set(logoLayer, { autoAlpha: 0 });
    gsap.set(shell, {
      autoAlpha: 1,
      x: geometry.x,
      y: geometry.y,
      scale: geometry.scale,
      clipPath: geometry.clipPath,
    });
    gsap.set(copy, { autoAlpha: 1, y: geometry.copyY });
    setLines(lineIndex);
    if (waitingForFirstFrame) {
      scene.dataset.canvasState = 'video-loading';
      gsap.set(cover, { autoAlpha: 1, backgroundColor: '#ffffff' });
      gsap.set(loading, { autoAlpha: 0 });
    }
  };

  const renderCurrentStop = () => {
    activeTimeline?.kill();
    activeTimeline = undefined;
    if (stop === 1) setFullGeometry();
    else setCompactGeometry(stop - 2);
  };

  const scrollElementToTop = (element: HTMLElement) => {
    window.scrollTo({
      top: window.scrollY + element.getBoundingClientRect().top,
      left: 0,
      behavior: 'auto',
    });
  };

  const requestViewportSync = (force = false) => {
    const nextWidth = Math.round(scene.getBoundingClientRect().width);
    const nextOrientation = window.matchMedia('(orientation: portrait)').matches;
    const layoutChanged = Math.abs(nextWidth - lastLayoutWidth) > 1
      || nextOrientation !== lastLayoutOrientation;

    // En móvil visualViewport emite resize cuando aparecen las barras. El
    // lienzo usa una altura congelada, por lo que ese evento no debe matar ni
    // reconstruir la animación que está en pantalla.
    if (!force && !layoutChanged) return;

    lastLayoutWidth = nextWidth;
    lastLayoutOrientation = nextOrientation;
    cancelAnimationFrame(viewportFrame);
    viewportFrame = requestAnimationFrame(() => {
      viewportFrame = 0;
      if (phase !== 'canvas') return;
      if (animating) {
        pendingViewportSync = true;
        return;
      }
      pendingViewportSync = false;
      renderCurrentStop();
    });
  };

  const finishAnimation = () => {
    activeTimeline = undefined;
    animating = false;
    if (pendingViewportSync) requestViewportSync(true);
  };

  const animateBetweenStops = (nextStop: number) => {
    const previousStop = stop;
    const previousLine = previousStop >= 2 ? lines[previousStop - 2] : undefined;
    const nextLine = nextStop >= 2 ? lines[nextStop - 2] : undefined;
    stop = nextStop;
    animating = true;
    activeTimeline?.kill();

    if (previousStop === 1 && nextStop === 2) {
      const geometry = getCompactGeometry();
      scene.dataset.canvasState = 'video-compact';
      gsap.set(copy, { autoAlpha: 1, y: geometry.copyY });
      setLines(undefined);
      activeTimeline = gsap.timeline({ onComplete: finishAnimation });
      activeTimeline.to(scene, {
        backgroundColor: '#ffffff',
        duration: animationDuration(1.05),
        ease: 'power3.inOut',
      }, 0);
      if (waitingForFirstFrame) {
        activeTimeline.to(cover, {
          backgroundColor: '#ffffff',
          duration: animationDuration(1.05),
          ease: 'power3.inOut',
        }, 0);
        activeTimeline.to(loading, {
          autoAlpha: 0,
          duration: animationDuration(0.2),
          ease: 'none',
        }, 0);
      }
      activeTimeline.to(shell, {
        x: geometry.x,
        y: geometry.y,
        scale: geometry.scale,
        clipPath: geometry.clipPath,
        duration: animationDuration(1.05),
        ease: 'power3.inOut',
      }, 0);
      if (nextLine) {
        activeTimeline.fromTo(
          nextLine,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: animationDuration(0.42), ease: 'power2.out', immediateRender: false },
          animationDuration(0.78),
        );
      }
      activeTimeline.call(() => handoff.beginVideoFrame(), undefined, animationDuration(1.05));
      return;
    }

    if (previousStop === 2 && nextStop === 1) {
      scene.dataset.canvasState = 'video-full';
      activeTimeline = gsap.timeline({
        onComplete: () => {
          handoff.arriveVideoFullscreen();
          finishAnimation();
        },
      });
      if (previousLine) {
        activeTimeline.to(previousLine, {
          autoAlpha: 0,
          y: -18,
          duration: animationDuration(0.25),
          ease: 'power1.in',
        }, 0);
      }
      activeTimeline.to(copy, { autoAlpha: 0, duration: animationDuration(0.25) }, 0);
      activeTimeline.to(scene, {
        backgroundColor: DARK_BACKGROUND,
        duration: animationDuration(1.05),
        ease: 'power3.inOut',
      }, 0);
      if (waitingForFirstFrame) {
        activeTimeline.to(cover, {
          backgroundColor: DARK_BACKGROUND,
          duration: animationDuration(1.05),
          ease: 'power3.inOut',
        }, 0);
        activeTimeline.to(loading, {
          autoAlpha: 1,
          duration: animationDuration(0.2),
          ease: 'none',
        }, animationDuration(0.85));
      }
      activeTimeline.to(shell, {
        x: 0,
        y: 0,
        scale: 1,
        clipPath: 'inset(0px 0px 0px 0px round 0px)',
        duration: animationDuration(1.05),
        ease: 'power3.inOut',
      }, 0);
      return;
    }

    activeTimeline = gsap.timeline({ onComplete: finishAnimation });
    if (previousLine) {
      activeTimeline.to(previousLine, {
        autoAlpha: 0,
        y: -18,
        duration: animationDuration(0.28),
        ease: 'power1.in',
      }, 0);
    }
    if (nextLine) {
      activeTimeline.fromTo(
        nextLine,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: animationDuration(0.45), ease: 'power2.out', immediateRender: false },
        animationDuration(0.22),
      );
    }
  };

  const finishToContact = () => {
    phase = 'contact';
    animating = false;
    activeTimeline = undefined;
    scene.dataset.canvasState = 'idle';
    setRootActive(false);
    gsap.set(scene, { autoAlpha: 0 });
    stopVideo(false);
    handoff.arriveContact();
    // El scroll programático hacia Contacto puede publicar un último delta
    // descendente después de liberar el header. Se muestra de nuevo al cerrar
    // el handoff para que Contacto siempre reserve el espacio que realmente usa.
    requestAnimationFrame(() => {
      document.querySelector<HTMLElement>('.site-nav')?.classList.remove('is-scroll-hidden');
    });
  };

  const moveToContact = () => {
    if (phase !== 'canvas' || animating) return;
    phase = 'to-contact';
    animating = true;
    activeTimeline?.kill();
    scrollElementToTop(contact);

    activeTimeline = gsap.timeline({ onComplete: finishToContact });
    activeTimeline.to([...lines, shell], {
      autoAlpha: 0,
      duration: animationDuration(0.42),
      ease: 'power1.inOut',
    }, 0);
    activeTimeline.to(scene, {
      autoAlpha: 0,
      duration: animationDuration(0.28),
      ease: 'none',
    }, animationDuration(0.22));
  };

  const finishLogoReturn = () => {
    activationId += 1;
    activeTimeline = undefined;
    animating = false;
    phase = 'about';
    stop = 1;
    scene.dataset.canvasState = 'idle';
    setRootActive(false);
    gsap.set(scene, { autoAlpha: 0 });
    gsap.set(logoLayer, { autoAlpha: 0 });
    resetFirstFrameGate();
    stopVideo(true);
    handoff.finishReturn();
    window.dispatchEvent(new CustomEvent('agsit:alliance-video-canvas-returned'));
  };

  const animateReturnToLogo = () => {
    if (phase !== 'to-logo') return;

    const geometry = getLogoGeometry();
    const fillScale = getLogoFillScale(geometry);
    gsap.set(transitionLogo, { autoAlpha: 0 });
    scene.dataset.canvasState = 'logo-zoom';
    gsap.set(scene, { autoAlpha: 1, backgroundColor: DARK_BACKGROUND });
    gsap.set(shell, {
      autoAlpha: 1,
      x: 0,
      y: 0,
      scale: 1,
      clipPath: 'inset(0px 0px 0px 0px round 0px)',
    });
    setLogoGeometry(geometry, fillScale);
    gsap.set(logoMark, { autoAlpha: 0 });
    gsap.set(copy, { autoAlpha: 0 });
    setLines(undefined);

    activeTimeline?.kill();
    activeTimeline = gsap.timeline({ onComplete: finishLogoReturn });
    activeTimeline.to(shell, {
      autoAlpha: 0,
      duration: animationDuration(0.22),
      ease: 'none',
    }, 0);
    activeTimeline.to(logoMark, {
      autoAlpha: 1,
      duration: animationDuration(0.2),
      ease: 'none',
    }, animationDuration(0.08));
    activeTimeline.to(scene, {
      backgroundColor: '#ffffff',
      duration: animationDuration(LOGO_ZOOM_DURATION),
      ease: 'power2.inOut',
    }, 0);
    activeTimeline.to(logoLayer, {
      scale: getLogoLayerScale(1),
      duration: animationDuration(LOGO_ZOOM_DURATION),
      ease: 'power2.inOut',
    }, 0);
    // Entrega atómica: ambos logos tienen la misma geometría y cambian de
    // propietario dentro del mismo callback, sin un frame con dos logotipos ni
    // una franja del documento expuesta.
    activeTimeline.call(() => {
      gsap.set(transitionLogo, { autoAlpha: 1 });
      gsap.set(logoLayer, { autoAlpha: 0 });
      gsap.set(scene, { autoAlpha: 0 });
    }, undefined, animationDuration(LOGO_ZOOM_DURATION));
  };

  const returnToLogo = () => {
    if (phase !== 'canvas' || animating || stop !== 1) return;
    if (!handoff.beginReturn()) return;
    phase = 'to-logo';
    animating = true;
    window.dispatchEvent(new CustomEvent('agsit:alliance-video-canvas-return'));
  };

  const navigate = (direction: 1 | -1) => {
    if (phase !== 'canvas' || animating) return;
    const nextStop = stop + direction;

    if (nextStop > maxStop) {
      moveToContact();
      return;
    }
    if (nextStop < 1) {
      returnToLogo();
      return;
    }

    animateBetweenStops(nextStop);
  };

  const activateForward = async () => {
    if (phase !== 'about') return;
    const currentActivation = ++activationId;
    const geometry = getLogoGeometry();
    const fillScale = getLogoFillScale(geometry);

    phase = 'to-video';
    stop = 1;
    animating = true;
    setRootActive(true);
    scene.dataset.canvasState = 'logo-zoom';
    gsap.set(scene, { autoAlpha: 1, backgroundColor: '#ffffff' });
    gsap.set(shell, {
      autoAlpha: 1,
      x: 0,
      y: 0,
      scale: 1,
      clipPath: 'inset(0px 0px 0px 0px round 0px)',
    });
    gsap.set(cover, { autoAlpha: 1, backgroundColor: '#ffffff' });
    resetFirstFrameGate();
    waitingForFirstFrame = true;
    minimumFirstFrameTime = 0.32;
    setLogoGeometry(geometry, 1);
    gsap.set(logoMark, { autoAlpha: 1 });
    gsap.set(copy, { autoAlpha: 0 });
    setLines(undefined);
    gsap.set(transitionLogo, { autoAlpha: 0 });
    // Se solicita play() al entrar desde el gesto real. El velo mantiene el
    // video fuera de la vista hasta que WebKit confirme un frame presentado.
    playVideo(true);

    let videoFramePromise: Promise<boolean> = Promise.resolve(false);
    const zoomPromise = new Promise<void>((resolve) => {
      activeTimeline?.kill();
      activeTimeline = gsap.timeline({ onComplete: resolve, onInterrupt: resolve });
      activeTimeline.to(scene, {
        backgroundColor: DARK_BACKGROUND,
        duration: animationDuration(LOGO_ZOOM_DURATION),
        ease: 'power2.inOut',
      }, 0);
      activeTimeline.to(cover, {
        backgroundColor: DARK_BACKGROUND,
        duration: animationDuration(LOGO_ZOOM_DURATION),
        ease: 'power2.inOut',
      }, 0);
      activeTimeline.to(logoLayer, {
        scale: getLogoLayerScale(fillScale),
        duration: animationDuration(LOGO_ZOOM_DURATION),
        ease: 'power2.inOut',
      }, 0);
      activeTimeline.to(logoMark, {
        autoAlpha: 0,
        duration: animationDuration(0.22),
        ease: 'none',
      }, animationDuration(LOGO_ZOOM_DURATION - 0.22));
      activeTimeline.call(() => {
        if (activationId !== currentActivation || phase !== 'to-video') return;
        playVideo(true);
        videoFramePromise = handoff.waitForVideoFrame(video);
      }, undefined, animationDuration(Math.max(0, LOGO_ZOOM_DURATION - 0.42)));
    });

    await zoomPromise;
    if (activationId !== currentActivation || phase !== 'to-video') return;

    // El final del zoom no espera un timeout de red: entrega de inmediato una
    // parada navegable. El velo solo desaparece si hay avance real del medio;
    // la promesa y el watchdog pueden confirmarlo después sin bloquear gestos.
    void videoFramePromise.then(() => {
      if (activationId !== currentActivation || phase !== 'canvas') return;
      revealVideoCoverIfReady();
    });

    handoff.beginMoveToVideo();
    activeTimeline?.kill();
    activeTimeline = undefined;
    phase = 'canvas';
    animating = false;
    canRevealFirstFrame = true;
    scene.dataset.canvasState = 'video-loading';
    gsap.set(logoLayer, { autoAlpha: 0 });
    const didRevealFrame = revealVideoCoverIfReady();
    if (!didRevealFrame) gsap.set(loading, { autoAlpha: 1 });
    scrollElementToTop(story);
    window.dispatchEvent(new CustomEvent('agsit:alliance-video-canvas-entered'));
    if (pendingViewportSync) requestViewportSync(true);
  };

  const isContactAtEntry = () => {
    const rect = contact.getBoundingClientRect();
    return Math.abs(rect.top) <= 16 && rect.bottom > 16;
  };

  const activateFromContact = () => {
    if (phase !== 'contact' || !isContactAtEntry()) return;
    activationId += 1;
    handoff.resumeVideoExperience();
    phase = 'canvas';
    stop = maxStop;
    animating = false;
    setRootActive(true);
    renderCurrentStop();
    gsap.set(scene, { autoAlpha: 1 });
    scrollElementToTop(story);
    playVideo(false);
  };

  const scheduleWheelEnd = () => {
    window.clearTimeout(wheelEndTimer);
    wheelEndTimer = window.setTimeout(() => {
      wheelAmount = 0;
      wheelDirection = 0;
      wheelConsumed = false;
    }, WHEEL_END_DELAY);
  };

  const onWheel = (event: WheelEvent) => {
    const returningFromContact = phase === 'contact' && event.deltaY < 0 && isContactAtEntry();
    if (!isCanvasActive() && !returningFromContact) return;

    event.preventDefault();
    scheduleWheelEnd();
    if (event.deltaY === 0 || animating || wheelConsumed) return;

    const direction = Math.sign(event.deltaY);
    if (direction !== wheelDirection) wheelAmount = 0;
    wheelDirection = direction;
    wheelAmount += event.deltaY;

    if (Math.abs(wheelAmount) < WHEEL_THRESHOLD) return;
    wheelConsumed = true;
    if (returningFromContact) activateFromContact();
    else if (phase === 'canvas') navigate(direction as 1 | -1);
  };

  const onTouchStart = (event: TouchEvent) => {
    const currentY = event.touches[0]?.clientY;
    if (currentY === undefined) return;

    if (isCanvasActive()) touchMode = 'canvas';
    else if (phase === 'contact' && isContactAtEntry()) touchMode = 'contact';
    else {
      touchMode = undefined;
      return;
    }

    touchStartY = currentY;
    touchCurrentY = currentY;
  };

  const onTouchMove = (event: TouchEvent) => {
    if (!touchMode || touchStartY === null) return;
    const currentY = event.touches[0]?.clientY;
    if (currentY === undefined) return;
    touchCurrentY = currentY;

    if (touchMode === 'canvas' || touchStartY - currentY < 0) event.preventDefault();
  };

  const onTouchEnd = () => {
    if (!touchMode || touchStartY === null || touchCurrentY === null) {
      touchMode = undefined;
      touchStartY = null;
      touchCurrentY = null;
      return;
    }

    const delta = touchStartY - touchCurrentY;
    const threshold = Math.max(
      TOUCH_THRESHOLD,
      (window.visualViewport?.height ?? window.innerHeight) * 0.06,
    );

    if (Math.abs(delta) >= threshold && !animating) {
      if (touchMode === 'contact' && delta < 0) activateFromContact();
      else if (touchMode === 'canvas' && phase === 'canvas') navigate(Math.sign(delta) as 1 | -1);
    }

    touchMode = undefined;
    touchStartY = null;
    touchCurrentY = null;
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement | null;
    if (target?.closest('input, textarea, select, [contenteditable="true"]')) return;

    const direction = event.key === 'ArrowDown' || event.key === 'PageDown' || (event.key === ' ' && !event.shiftKey)
      ? 1
      : event.key === 'ArrowUp' || event.key === 'PageUp' || (event.key === ' ' && event.shiftKey)
        ? -1
        : 0;
    const returningFromContact = phase === 'contact' && direction < 0 && isContactAtEntry();
    if (!direction || (!isCanvasActive() && !returningFromContact)) return;

    event.preventDefault();
    if (keyConsumed || animating) return;
    keyConsumed = true;
    if (returningFromContact) activateFromContact();
    else if (phase === 'canvas') navigate(direction as 1 | -1);
  };

  const onKeyUp = () => {
    keyConsumed = false;
  };

  const resetCanvas = () => {
    activationId += 1;
    activeTimeline?.kill();
    activeTimeline = undefined;
    animating = false;
    pendingViewportSync = false;
    phase = 'about';
    stop = 1;
    scene.dataset.canvasState = 'idle';
    setRootActive(false);
    gsap.set(scene, { autoAlpha: 0 });
    gsap.set(logoLayer, { autoAlpha: 0 });
    resetFirstFrameGate();
    gsap.set(cover, { autoAlpha: 0 });
    stopVideo(true);
  };

  const retryPlayback = () => {
    if (!shouldKeepPlaying) return;
    ensureVideoAutoplay(video);
    keepVideoPlaying();
    revealVideoCoverIfReady();
  };

  const syncViewportOnResize = () => requestViewportSync(false);
  const syncViewportOnOrientation = () => requestViewportSync(true);
  const syncPlaybackOnVisibility = () => {
    if (!document.hidden) retryPlayback();
  };

  gsap.set(scene, { autoAlpha: 0 });
  gsap.set(cover, { autoAlpha: 0 });
  gsap.set(shell, { transformOrigin: '0 0', force3D: true });
  // El logo contiene un PNG: forzar una capa 3D cuando todavía mide lo mismo
  // que el logo de reposo hace que WebKit/Chromium rastericen esa miniatura y
  // luego la amplíen. La geometría sobredimensionada mantiene la nitidez.
  gsap.set(logoLayer, { transformOrigin: '50% 50%', force3D: false, autoAlpha: 0 });
  gsap.set(copy, { xPercent: -50, autoAlpha: 0 });
  setLines(undefined);

  window.addEventListener('agsit:alliance-video-canvas-forward', activateForward);
  window.addEventListener('agsit:alliance-video-underlay-ready', animateReturnToLogo);
  window.addEventListener('agsit:alliance-video-canvas-reset', resetCanvas);
  window.addEventListener('wheel', onWheel, { passive: false, capture: true });
  window.addEventListener('touchstart', onTouchStart, { passive: true, capture: true });
  window.addEventListener('touchmove', onTouchMove, { passive: false, capture: true });
  window.addEventListener('touchend', onTouchEnd, { passive: true, capture: true });
  window.addEventListener('touchcancel', onTouchEnd, { passive: true, capture: true });
  window.addEventListener('keydown', onKeyDown, { capture: true });
  window.addEventListener('keyup', onKeyUp, { capture: true });
  video.addEventListener('pause', retryPlayback);
  video.addEventListener('stalled', retryPlayback);
  video.addEventListener('waiting', retryPlayback);
  video.addEventListener('canplay', retryPlayback);
  video.addEventListener('error', retryPlayback);
  video.addEventListener('playing', revealVideoCoverIfReady);
  video.addEventListener('timeupdate', revealVideoCoverIfReady);
  video.addEventListener('loadeddata', revealVideoCoverIfReady);
  document.addEventListener('visibilitychange', syncPlaybackOnVisibility);
  window.addEventListener('resize', syncViewportOnResize, { passive: true });
  window.visualViewport?.addEventListener('resize', syncViewportOnResize, { passive: true });
  window.addEventListener('orientationchange', syncViewportOnOrientation, { passive: true });

  return () => {
    window.clearTimeout(wheelEndTimer);
    window.clearTimeout(playbackRetryTimer);
    cancelAnimationFrame(viewportFrame);
    activeTimeline?.kill();
    window.removeEventListener('agsit:alliance-video-canvas-forward', activateForward);
    window.removeEventListener('agsit:alliance-video-underlay-ready', animateReturnToLogo);
    window.removeEventListener('agsit:alliance-video-canvas-reset', resetCanvas);
    window.removeEventListener('wheel', onWheel, { capture: true });
    window.removeEventListener('touchstart', onTouchStart, { capture: true });
    window.removeEventListener('touchmove', onTouchMove, { capture: true });
    window.removeEventListener('touchend', onTouchEnd, { capture: true });
    window.removeEventListener('touchcancel', onTouchEnd, { capture: true });
    window.removeEventListener('keydown', onKeyDown, { capture: true });
    window.removeEventListener('keyup', onKeyUp, { capture: true });
    video.removeEventListener('pause', retryPlayback);
    video.removeEventListener('stalled', retryPlayback);
    video.removeEventListener('waiting', retryPlayback);
    video.removeEventListener('canplay', retryPlayback);
    video.removeEventListener('error', retryPlayback);
    video.removeEventListener('playing', revealVideoCoverIfReady);
    video.removeEventListener('timeupdate', revealVideoCoverIfReady);
    video.removeEventListener('loadeddata', revealVideoCoverIfReady);
    document.removeEventListener('visibilitychange', syncPlaybackOnVisibility);
    window.removeEventListener('resize', syncViewportOnResize);
    window.visualViewport?.removeEventListener('resize', syncViewportOnResize);
    window.removeEventListener('orientationchange', syncViewportOnOrientation);
    resetCanvas();
  };
}
