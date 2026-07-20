import gsap from 'gsap';
import { ALLIANCE_LOGO_OVERSAMPLE } from '../../animations/allianceLogoZoom';
import { ensureVideoAutoplay } from '../../scripts/videoAutoplay';

export function initScrollExperience(): (() => void) | undefined {
  const root = document.querySelector<HTMLElement>('[data-scroll-root]');

  if (!root) {
    return undefined;
  }

  let cleanupViewportRefresh: (() => void) | undefined;
  let cleanupServicesAnchorNavigation: (() => void) | undefined;
  let cleanupAboutServiceVideoPlayback: (() => void) | undefined;
  let cleanupVideoStoryReadyNavigation: (() => void) | undefined;
  let cleanupVideoStorySync: (() => void) | undefined;
  let cleanupFloatingPersonSync: (() => void) | undefined;

  const context = gsap.context(() => {
    window.scrollTo(0, 0);

    const isCompact = window.matchMedia('(max-width: 1024px)').matches;
    const isMobile = window.matchMedia('(max-width: 749px)').matches;
    const isTablet = isCompact && !isMobile;
    const shouldReduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const getRootPixelValue = (name: string, fallback: number) => {
      const value = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name));
      return Number.isFinite(value) && value > 0 ? value : fallback;
    };
    const getViewportHeight = () =>
      isCompact ? getRootPixelValue('--app-stable-vh', window.innerHeight) : window.innerHeight;
    const getNavHeight = () => document.querySelector('.site-nav')?.getBoundingClientRect().height ?? 0;
    const getVideoStoryInset = () => (isMobile ? 22 : isTablet ? 24 : isCompact ? 28 : 34);

    const setIfFound = (selector: string, vars: gsap.TweenVars) => {
      const targets = gsap.utils.toArray<HTMLElement>(selector);

      if (targets.length) {
        gsap.set(targets, vars);
      }
    };
    const getVideoStoryWidth = () => {
      const ratio = isMobile ? 0.92 : isTablet ? 0.94 : isCompact ? 0.92 : 0.68;
      const base = window.innerWidth * ratio;

      if (isTablet) {
        // En tablet apaisada la altura manda: el marco 16:9 no debe pasar de
        // ~52% del viewport de alto o aplasta la frase contra la barra.
        return Math.min(base, getViewportHeight() * 0.52 * (16 / 9));
      }

      return base;
    };
    const getVideoStoryHeight = () => {
      if (isMobile) {
        return getViewportHeight() * 0.32;
      }

      if (isTablet) {
        return getVideoStoryWidth() * 0.5625;
      }

      return getViewportHeight() * (isCompact ? 0.34 : 0.44);
    };
    const hydrateVideo = (video: HTMLVideoElement | null | undefined) => {
      if (!video) {
        return;
      }

      if (isMobile && video.dataset.mobile === 'static') {
        video.pause();
        video.removeAttribute('src');
        video.load();
        return;
      }

      const src = video.dataset.src;

      if (src && !video.currentSrc) {
        video.src = src;
        video.load();
      }

      if (video.autoplay) {
        ensureVideoAutoplay(video);
      }
    };
    const getAboutServiceVideos = () =>
      Array.from(document.querySelectorAll<HTMLVideoElement>('.js-about-service-visual video'));
    const pauseAboutServiceVideos = (activeVideos: Iterable<HTMLVideoElement> = []) => {
      const activeSet = new Set(activeVideos);

      getAboutServiceVideos().forEach((video) => {
        if (!activeSet.has(video)) {
          video.pause();
        }
      });
    };
    cleanupAboutServiceVideoPlayback = () => pauseAboutServiceVideos();

    // iOS can leave the hero video paused even with autoplay/muted/playsinline in
    // the markup; harden it and register the first-gesture unlock.
    const heroVideo = document.querySelector<HTMLVideoElement>('.hero-video');
    if (heroVideo) {
      ensureVideoAutoplay(heroVideo);
    }

    gsap.set('.js-video-story-line', { autoAlpha: 0, y: 0 });
    setIfFound('.js-floating-person', { y: 0, yPercent: -5, scale: 1.08, autoAlpha: 1 });
    setIfFound('.js-services-person', { autoAlpha: 0 });
    setIfFound('.js-scroll-consult-logo', {
      autoAlpha: 0,
      pointerEvents: 'none',
      left: '50%',
      xPercent: -50,
      yPercent: -50,
    });
    setIfFound('.js-about-clients-copy', { autoAlpha: 0, y: 22 });
    setIfFound('.js-about-clients-stage', { autoAlpha: 0, y: 34, scale: 0.98 });
    setIfFound('.js-about-transition-logo', {
      '--logo-reveal-y': '100%',
      autoAlpha: 0,
      scale: 0.68 / ALLIANCE_LOGO_OVERSAMPLE,
      x: 0,
      y: 0,
      xPercent: -50,
      yPercent: -50,
      rotate: 0,
      backgroundColor: 'rgba(2, 7, 18, 0)',
    });
    setIfFound('.js-about-transition-logo .about-transition-logo-image', { autoAlpha: 1 });
    setIfFound('.js-about-transition-veil', { autoAlpha: 0 });
    setIfFound('.js-about-alliance-copy', { autoAlpha: 0, y: 24 });
    setIfFound('.js-about-alliance-metric', { autoAlpha: 0, y: 22, scale: 0.96 });
    setIfFound('.js-about-alliance-cta', { autoAlpha: 0, y: 16, pointerEvents: 'none' });

    // ── Personaje flotante: puente hero→servicios ─────────────────────────────
    // Réplica del modelo previo al refactor (commit c2442f4): el personaje del
    // hero es fixed al viewport; mientras el top de servicios viaja del borde
    // inferior al superior, se interpola su y/escala (en compact hasta el rect
    // exacto del personaje de servicios; en desktop los valores literales del
    // commit) y al cruzar se crossfadea con .js-services-person. El tramo es un
    // paso de snap, así que el scrub sigue la animación del snap nativo.
    const floatingPersonEl = document.querySelector<HTMLElement>('.js-floating-person');
    const servicesSectionEl = document.querySelector<HTMLElement>('.js-services');

    const getServicesPersonTargetRect = () => {
      const person = document.querySelector<HTMLElement>('.js-services-person');

      if (!servicesSectionEl || !person) {
        return undefined;
      }

      const servicesRect = servicesSectionEl.getBoundingClientRect();
      const personRect = person.getBoundingClientRect();

      return {
        bottom: personRect.bottom - servicesRect.top,
        width: personRect.width,
      };
    };
    const getFloatingPersonTargetY = () => {
      const target = getServicesPersonTargetRect();

      if (!target) {
        return -getViewportHeight() * (isCompact ? 0.28 : 0.18);
      }

      return target.bottom - getViewportHeight();
    };
    const getFloatingPersonTargetScale = () => {
      const target = getServicesPersonTargetRect();

      if (!floatingPersonEl || !target) {
        return isCompact ? 0.58 : 0.74;
      }

      return target.width / Math.max(floatingPersonEl.offsetWidth, 1);
    };

    let personSyncFrame = 0;
    let personZone: 'above' | 'inside' | 'below' | undefined;

    const syncFloatingPersonToScroll = () => {
      personSyncFrame = 0;

      if (!floatingPersonEl || !servicesSectionEl) {
        return;
      }

      const viewportHeight = getViewportHeight();
      const servicesTop = servicesSectionEl.getBoundingClientRect().top;
      const progress = gsap.utils.clamp(0, 1, (viewportHeight - servicesTop) / viewportHeight);
      const zone: 'above' | 'inside' | 'below' =
        progress <= 0 ? 'above' : progress >= 1 ? 'below' : 'inside';

      if (zone !== personZone) {
        personZone = zone;

        if (zone === 'above') {
          gsap.set(floatingPersonEl, { autoAlpha: 1, zIndex: 4 });
          setIfFound('.js-services-person', { autoAlpha: 0 });
        } else if (zone === 'inside') {
          gsap.set(floatingPersonEl, { autoAlpha: 1, zIndex: 1 });
          setIfFound('.js-services-person', { autoAlpha: 0 });
        } else {
          gsap.set(floatingPersonEl, { autoAlpha: 0 });
          setIfFound('.js-services-person', { autoAlpha: 1 });
        }
      }

      if (zone === 'below') {
        return;
      }

      const targetY = isCompact ? getFloatingPersonTargetY() : -viewportHeight * 0.18;
      const targetScale = isCompact ? getFloatingPersonTargetScale() : 0.74;

      gsap.set(floatingPersonEl, {
        y: gsap.utils.interpolate(0, targetY, progress),
        yPercent: gsap.utils.interpolate(-5, 0, progress),
        scale: gsap.utils.interpolate(1.08, targetScale, progress),
      });
    };
    const requestFloatingPersonSync = () => {
      if (personSyncFrame) {
        return;
      }
      personSyncFrame = requestAnimationFrame(syncFloatingPersonToScroll);
    };

    window.addEventListener('scroll', requestFloatingPersonSync, { passive: true });
    window.addEventListener('resize', requestFloatingPersonSync, { passive: true });
    window.addEventListener('agsit:viewport-change', requestFloatingPersonSync, { passive: true });
    cleanupFloatingPersonSync = () => {
      cancelAnimationFrame(personSyncFrame);
      window.removeEventListener('scroll', requestFloatingPersonSync);
      window.removeEventListener('resize', requestFloatingPersonSync);
      window.removeEventListener('agsit:viewport-change', requestFloatingPersonSync);
    };
    syncFloatingPersonToScroll();

    // ── Video story: timeline pausada dirigida por la posición real de scroll ──
    // Igual que Servicios/About: la sección es un track de pasos con viewport
    // sticky; un paso de scroll = un estado. time == progreso en pasos.
    const videoStorySection = document.querySelector<HTMLElement>('.js-video-story');
    const storyLineEls = gsap.utils.toArray<HTMLElement>('.js-video-story-line');
    // Paradas: 0 video fullscreen (sin texto, aterrizaje del zoom de alianza),
    // 1 video enmarcado + primera línea, 2.. una por línea restante. La subida
    // es el espejo: enmarcado → fullscreen → (rueda arriba) zoom inverso.
    const VIDEO_STORY_READY_STOP = 0;
    const VIDEO_STORY_MAX_TIME = Math.max(storyLineEls.length, 1);

    const getVideoStoryPanelHeight = () => Math.max(getViewportHeight() - getNavHeight(), 1);

    const videoStoryTimeline = gsap.timeline({ paused: true });

    // fromTo en posición 0: GSAP revierte los targets al estado previo cuando el
    // playhead queda antes del inicio de un tween normal (gotcha de timelines
    // scrubeadas), y además fija el estado fullscreen inicial.
    videoStoryTimeline.fromTo(
      '.js-video-story-frame',
      {
        autoAlpha: 1,
        top: 0,
        left: '50%',
        xPercent: -50,
        width: () => window.innerWidth,
        height: () => getVideoStoryPanelHeight(),
        borderRadius: 0,
        boxShadow: '0 0 0 rgba(8, 21, 43, 0)',
      },
      {
        top: () => getVideoStoryInset(),
        width: () => getVideoStoryWidth(),
        height: () => getVideoStoryHeight(),
        borderRadius: isMobile ? 10 : 14,
        boxShadow: '0 28px 60px rgba(8, 21, 43, 0.2)',
        ease: 'none',
        duration: 1,
      },
      0,
    );
    videoStoryTimeline.fromTo(
      '.js-video-story-stage',
      { backgroundColor: '#020712' },
      { backgroundColor: '#ffffff', ease: 'none', duration: 1 },
      0,
    );

    storyLineEls.forEach((line, index) => {
      const stopAt = index + 1;
      videoStoryTimeline.fromTo(
        line,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.6, ease: 'power2.out', immediateRender: false },
        stopAt - 0.65,
      );

      if (index < storyLineEls.length - 1) {
        videoStoryTimeline.to(
          line,
          { autoAlpha: 0, duration: 0.45, ease: 'power1.inOut' },
          stopAt + 0.15,
        );
      }
    });

    if (videoStoryTimeline.duration() < VIDEO_STORY_MAX_TIME) {
      videoStoryTimeline.to({}, { duration: VIDEO_STORY_MAX_TIME - videoStoryTimeline.duration() });
    }

    let videoStoryHydrated = false;
    const hydrateVideoStory = () => {
      if (videoStoryHydrated) {
        return;
      }
      videoStoryHydrated = true;
      hydrateVideo(document.querySelector<HTMLVideoElement>('.js-video-story-frame video'));
    };

    const getVideoStoryProgress = () => {
      if (!videoStorySection) {
        return 0;
      }
      const rect = videoStorySection.getBoundingClientRect();
      return gsap.utils.clamp(
        0,
        VIDEO_STORY_MAX_TIME,
        (getNavHeight() - rect.top) / getVideoStoryPanelHeight(),
      );
    };

    let videoStorySyncFrame = 0;
    const syncVideoStoryToScroll = () => {
      videoStorySyncFrame = 0;
      if (!videoStorySection) {
        return;
      }

      if (videoStorySection.getBoundingClientRect().top < getViewportHeight() * 1.5) {
        hydrateVideoStory();
      }

      videoStoryTimeline.time(getVideoStoryProgress());
    };
    const requestVideoStorySync = () => {
      if (videoStorySyncFrame) {
        return;
      }
      videoStorySyncFrame = requestAnimationFrame(syncVideoStoryToScroll);
    };

    window.addEventListener('scroll', requestVideoStorySync, { passive: true });
    window.addEventListener('resize', requestVideoStorySync, { passive: true });
    cleanupVideoStorySync = () => {
      cancelAnimationFrame(videoStorySyncFrame);
      window.removeEventListener('scroll', requestVideoStorySync);
      window.removeEventListener('resize', requestVideoStorySync);
    };
    syncVideoStoryToScroll();

    let viewportRefreshFrame = 0;
    let viewportRefreshTimeout = 0;
    const requestViewportRefresh = (event?: Event) => {
      const viewportEvent = event as CustomEvent<{ stableChanged?: boolean }> | undefined;

      if (isCompact && event?.type === 'agsit:viewport-change' && !viewportEvent?.detail?.stableChanged) {
        return;
      }

      cancelAnimationFrame(viewportRefreshFrame);
      window.clearTimeout(viewportRefreshTimeout);
      viewportRefreshTimeout = window.setTimeout(
        () => {
          viewportRefreshFrame = requestAnimationFrame(() => {
            // Re-lee los getters de dimensiones del marco y re-aplica el estado
            // que corresponde a la posición actual de scroll.
            videoStoryTimeline.invalidate();
            syncVideoStoryToScroll();
          });
        },
        isCompact ? 180 : 0,
      );
    };

    window.addEventListener('orientationchange', requestViewportRefresh, { passive: true });
    window.addEventListener('agsit:viewport-change', requestViewportRefresh, { passive: true });
    cleanupViewportRefresh = () => {
      cancelAnimationFrame(viewportRefreshFrame);
      window.clearTimeout(viewportRefreshTimeout);
      window.removeEventListener('orientationchange', requestViewportRefresh);
      window.removeEventListener('agsit:viewport-change', requestViewportRefresh);
    };

    const navigateToServices = (event: Event) => {
      event.preventDefault();
      const services = document.querySelector<HTMLElement>('#servicios');

      if (!services) {
        return;
      }

      const navHeight = getNavHeight();
      const stableHeight = getRootPixelValue('--app-stable-vh', window.innerHeight);
      const panelHeight = Math.max(stableHeight - navHeight, 1);
      const servicesTop = window.scrollY + services.getBoundingClientRect().top;

      window.scrollTo({
        top: servicesTop + panelHeight,
        left: 0,
        behavior: 'auto',
      });
    };
    window.addEventListener('agsit:navigate-services', navigateToServices);
    cleanupServicesAnchorNavigation = () => {
      window.removeEventListener('agsit:navigate-services', navigateToServices);
    };

    let isReturningToAlliance = false;
    let cleanupVideoStoryWheelReturn: (() => void) | undefined;

    const returnVideoStoryToAlliance = () => {
      if (isReturningToAlliance) {
        return false;
      }

      const about = document.querySelector<HTMLElement>('.js-about-snap');

      if (about?.dataset.aboutState !== 'done') {
        return false;
      }

      // Claim this handoff before dispatching: scrolling during the custom
      // event must not allow a second wheel event to start a competing
      // reverse sequence.
      isReturningToAlliance = true;
      const returnEvent = new CustomEvent('agsit:return-about-alliance', { cancelable: true });
      const wasHandled = !window.dispatchEvent(returnEvent);

      if (!wasHandled) {
        isReturningToAlliance = false;
        return false;
      }

      window.setTimeout(() => {
        isReturningToAlliance = false;
      }, shouldReduceMotion() ? 0 : 1250);

      return true;
    };

    const onVideoStoryWheel = (event: WheelEvent) => {
      if (event.deltaY >= 0 || isReturningToAlliance) {
        return;
      }

      const videoStoryTop = videoStorySection?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
      const isAtVideoStoryStart = Math.abs(videoStoryTop - getNavHeight()) <= 6;
      const aboutIsDone = document.querySelector<HTMLElement>('.js-about-snap')?.dataset.aboutState === 'done';
      if (!isAtVideoStoryStart || !aboutIsDone) {
        return;
      }

      if (returnVideoStoryToAlliance()) {
        event.preventDefault();
      }
    };

    const showVideoStoryReady = (event: Event) => {
      event.preventDefault();

      if (!videoStorySection) {
        return;
      }

      hydrateVideoStory();

      const applyReadyState = () => {
        const top =
          window.scrollY +
          videoStorySection.getBoundingClientRect().top -
          getNavHeight() +
          getVideoStoryPanelHeight() * VIDEO_STORY_READY_STOP;

        window.scrollTo({ top, left: 0, behavior: 'auto' });
        syncVideoStoryToScroll();
      };

      applyReadyState();
      requestAnimationFrame(applyReadyState);
      window.setTimeout(applyReadyState, 120);
    };
    window.addEventListener('agsit:show-video-story-ready', showVideoStoryReady);
    // Capture guarantees the upward wheel is claimed before the browser starts
    // scrolling back into the About section.
    window.addEventListener('wheel', onVideoStoryWheel, { passive: false, capture: true });
    cleanupVideoStoryReadyNavigation = () => {
      window.removeEventListener('agsit:show-video-story-ready', showVideoStoryReady);
      cleanupVideoStoryWheelReturn?.();
    };
    cleanupVideoStoryWheelReturn = () => {
      window.removeEventListener('wheel', onVideoStoryWheel, { capture: true });
    };
  }, root);

  return () => {
    cleanupViewportRefresh?.();
    cleanupServicesAnchorNavigation?.();
    cleanupAboutServiceVideoPlayback?.();
    cleanupVideoStoryReadyNavigation?.();
    cleanupVideoStorySync?.();
    cleanupFloatingPersonSync?.();
    context.revert();
  };
}
