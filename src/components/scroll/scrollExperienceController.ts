import gsap from 'gsap';
import { ALLIANCE_LOGO_OVERSAMPLE } from '../../animations/allianceLogoZoom';
import { getAllianceVideoHandoff } from './allianceVideoHandoff';
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

    // These are functions rather than values captured at load. A phone can
    // cross all three breakpoints after it rotates.
    const isCompact = () => window.matchMedia('(max-width: 1024px)').matches;
    const isMobile = () => window.matchMedia('(max-width: 599px)').matches;
    const isTablet = () => isCompact() && !isMobile();
    const isShortLandscape = () =>
      window.matchMedia('(pointer: coarse) and (orientation: landscape) and (max-width: 932px) and (max-height: 520px)').matches;
    // Sólo teléfonos: el puente hero→servicios necesita conservar su capa
    // fixed mientras Safari resuelve el snap entre ambas secciones.
    const isPhoneHeroBridge = () => isMobile() || isShortLandscape();
    const getHeroRestYPercent = () => (isShortLandscape() ? 0 : -5);
    const shouldReduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const getRootPixelValue = (name: string, fallback: number) => {
      const value = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name));
      return Number.isFinite(value) && value > 0 ? value : fallback;
    };
    const handoff = getAllianceVideoHandoff();
    const getViewportHeight = () => {
      if (handoff.snapshot.viewportHeight) {
        return handoff.getViewportHeight();
      }
      if (isShortLandscape()) {
        return getRootPixelValue('--app-vh', window.innerHeight);
      }

      return isCompact() ? getRootPixelValue('--app-stable-vh', window.innerHeight) : window.innerHeight;
    };
    const getNavHeight = () => document.querySelector('.site-nav')?.getBoundingClientRect().height ?? 0;
    const getVideoStoryInset = () => (isShortLandscape() ? 10 : isMobile() ? 22 : isTablet() ? 24 : isCompact() ? 28 : 34);

    const setIfFound = (selector: string, vars: gsap.TweenVars) => {
      const targets = gsap.utils.toArray<HTMLElement>(selector);

      if (targets.length) {
        gsap.set(targets, vars);
      }
    };
    const getVideoStoryWidth = () => {
      const ratio = isShortLandscape() ? 0.76 : isMobile() ? 0.92 : isTablet() ? 0.94 : isCompact() ? 0.92 : 0.68;
      const base = window.innerWidth * ratio;

      if (isShortLandscape()) {
        return Math.min(base, getViewportHeight() * 0.44 * (16 / 9));
      }

      if (isTablet()) {
        // En tablet apaisada la altura manda: el marco 16:9 no debe pasar de
        // ~52% del viewport de alto o aplasta la frase contra la barra.
        return Math.min(base, getViewportHeight() * 0.52 * (16 / 9));
      }

      return base;
    };
    const getVideoStoryHeight = () => {
      if (isShortLandscape()) {
        return getViewportHeight() * 0.44;
      }

      if (isMobile()) {
        return getViewportHeight() * 0.32;
      }

      if (isTablet()) {
        return getVideoStoryWidth() * 0.5625;
      }

      return getViewportHeight() * (isCompact() ? 0.34 : 0.44);
    };
    const hydrateVideo = (video: HTMLVideoElement | null | undefined) => {
      if (!video) {
        return;
      }

      if (isMobile() && video.dataset.mobile === 'static') {
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
    setIfFound('.js-floating-person', { y: 0, yPercent: getHeroRestYPercent(), scale: 1.08, autoAlpha: 1 });
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
    const heroCopyEls = gsap.utils.toArray<HTMLElement>('.hero-copy-block, .hero-cta-wrap');
    const HERO_COPY_FADE_END = 0.5;

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
        return -getViewportHeight() * (isCompact() ? 0.28 : 0.18);
      }

      return target.bottom - getViewportHeight();
    };
    const getFloatingPersonTargetScale = () => {
      const target = getServicesPersonTargetRect();

      if (!floatingPersonEl || !target) {
        return isCompact() ? 0.58 : 0.74;
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
      const heroCopyFadeProgress = gsap.utils.clamp(0, 1, progress / HERO_COPY_FADE_END);

      gsap.set(heroCopyEls, { autoAlpha: 1 - heroCopyFadeProgress });

      if (isPhoneHeroBridge()) {
        // El relevo ocurre únicamente al final, cuando ambos personajes ya
        // coinciden. Así el snap nativo no deja un frame vacío y al subir se
        // ejecuta el mismo trayecto en sentido inverso.
        const handoff = gsap.utils.clamp(0, 1, (progress - 0.985) / 0.015);

        gsap.set(floatingPersonEl, { autoAlpha: 1 - handoff, zIndex: 4 });
        setIfFound('.js-services-person', { autoAlpha: handoff });

        gsap.set(floatingPersonEl, {
          y: gsap.utils.interpolate(0, getFloatingPersonTargetY(), progress),
          yPercent: gsap.utils.interpolate(getHeroRestYPercent(), 0, progress),
          scale: gsap.utils.interpolate(1.08, getFloatingPersonTargetScale(), progress),
        });

        personZone = zone;
        return;
      }

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

      const targetY = isCompact() ? getFloatingPersonTargetY() : -viewportHeight * 0.18;
      const targetScale = isCompact() ? getFloatingPersonTargetScale() : 0.74;

      gsap.set(floatingPersonEl, {
        y: gsap.utils.interpolate(0, targetY, progress),
        yPercent: gsap.utils.interpolate(getHeroRestYPercent(), 0, progress),
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
    const videoStoryVideo = document.querySelector<HTMLVideoElement>('.js-video-story-frame video');
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
        borderRadius: isMobile() ? 10 : 14,
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

    // This is also used on the reverse handoff. Timeline time alone is not
    // enough after a native snap: GSAP may keep an already-visible line's
    // inline opacity until the following render. Set the visual stop first.
    const resetVideoStoryFullscreen = () => {
      gsap.set(storyLineEls, { autoAlpha: 0, y: 0 });
      videoStoryTimeline.time(VIDEO_STORY_READY_STOP, false);
      gsap.set('.js-video-story-stage', { backgroundColor: '#020712' });
      gsap.set('.js-video-story-frame', {
        autoAlpha: 1,
        top: 0,
        left: '50%',
        xPercent: -50,
        width: window.innerWidth,
        height: getVideoStoryPanelHeight(),
        borderRadius: 0,
        boxShadow: '0 0 0 rgba(8, 21, 43, 0)',
      });
    };

    let videoStoryHydrated = false;
    const hydrateVideoStory = () => {
      if (videoStoryHydrated) {
        return;
      }
      videoStoryHydrated = true;
      hydrateVideo(videoStoryVideo);
    };

    // Start loading before Alliance is reached. Visibility still remains gated
    // by a decoded frame during the actual handoff.
    hydrateVideoStory();

    const debugScroll = new URLSearchParams(window.location.search).get('debugScroll') === '1';
    const logScrollSnapshot = (reason: string) => {
      if (!debugScroll) return;
      const about = document.querySelector<HTMLElement>('.js-about-snap');
      const timeline = { allianceTime: null as number | null };
      window.dispatchEvent(new CustomEvent('agsit:debug-scroll-snapshot', { detail: timeline }));
      const rootStyles = getComputedStyle(document.documentElement);
      console.debug('[agsit scroll]', {
        reason,
        timestamp: performance.now(),
        scrollY: window.scrollY,
        visualViewportHeight: window.visualViewport?.height ?? null,
        innerHeight: window.innerHeight,
        appVh: rootStyles.getPropertyValue('--app-vh').trim(),
        appStableVh: rootStyles.getPropertyValue('--app-stable-vh').trim(),
        handoff: handoff.snapshot,
        aboutRect: about?.getBoundingClientRect().toJSON(),
        videoStoryRect: videoStorySection?.getBoundingClientRect().toJSON(),
        aboutProgress: about ? (getNavHeight() - about.getBoundingClientRect().top) / Math.max(getVideoStoryPanelHeight(), 1) : null,
        videoProgress: getVideoStoryProgress(),
        allianceTimelineTime: timeline.allianceTime,
        videoTimelineTime: videoStoryTimeline.time(),
        video: videoStoryVideo ? {
          readyState: videoStoryVideo.readyState,
          currentTime: videoStoryVideo.currentTime,
          paused: videoStoryVideo.paused,
          firstFrameDecoded: handoff.hasDecodedVideoFrame,
        } : null,
      });
    };

    const getVideoStoryProgress = () => {
      if (!videoStorySection) {
        return 0;
      }
      const rect = videoStorySection.getBoundingClientRect();
      const panelHeight = getVideoStoryPanelHeight();
      const distanceFromReadyStop = getNavHeight() - rect.top;
      const progress = gsap.utils.clamp(
        0,
        VIDEO_STORY_MAX_TIME,
        distanceFromReadyStop / panelHeight,
      );

      // La rueda ya reconoce la parada fullscreen con una tolerancia de 6px.
      // En escritorio fijamos también la timeline a 0 dentro de ese mismo
      // margen: sin ello el frame conserva una fracción de su reducción y el
      // primer scroll de regreso deja el overlay apenas incompleto.
      if (handoff.isFullscreenLocked || Math.abs(distanceFromReadyStop) <= 10) {
        return VIDEO_STORY_READY_STOP;
      }

      return progress;
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

      const distanceFromReadyStop = getNavHeight() - videoStorySection.getBoundingClientRect().top;
      if (handoff.snapshot.state === 'returning-alliance') {
        resetVideoStoryFullscreen();
        return;
      }
      if (handoff.snapshot.state === 'video-fullscreen' && distanceFromReadyStop > 10) {
        handoff.beginVideoFrame();
      }

      const progress = getVideoStoryProgress();
      videoStoryTimeline.time(progress);
      // Mismo gotcha que resetVideoStoryFullscreen: en un salto del snap
      // nativo hacia arriba (parada N → N-1), GSAP no revierte los fromTo con
      // immediateRender:false cuyo inicio queda por delante del playhead y la
      // línea conserva su opacidad inline. Una línea cuyo fade-in aún no
      // comienza a este progreso debe estar oculta SIEMPRE; se fuerza tras el
      // render (solo oculta, nunca muestra, así no pisa la timeline).
      storyLineEls.forEach((line, index) => {
        if (progress < index + 1 - 0.65) {
          gsap.set(line, { autoAlpha: 0 });
        }
      });
      logScrollSnapshot('sync');
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
    window.addEventListener('agsit:handoff-state', (event) => {
      const state = (event as CustomEvent<{ state: string }>).detail.state;
      if (state === 'returning-alliance') {
        resetVideoStoryFullscreen();
      }
      logScrollSnapshot(`state:${state}`);
    });

    let viewportRefreshFrame = 0;
    let viewportRefreshTimeout = 0;
    const requestViewportRefresh = (event?: Event) => {
      const viewportEvent = event as CustomEvent<{ stableChanged?: boolean; dynamicChanged?: boolean }> | undefined;

      // En landscape corto --video-panel-h sigue a --app-vh (dinámico): cuando
      // la barra de Chrome cambia el alto, el marco debe invalidarse o se queda
      // con las dimensiones horneadas del alto anterior.
      const dynamicLandscapeChange = isShortLandscape() && viewportEvent?.detail?.dynamicChanged;

      if (
        isCompact() &&
        event?.type === 'agsit:viewport-change' &&
        !viewportEvent?.detail?.stableChanged &&
        !dynamicLandscapeChange
      ) {
        return;
      }

      if (handoff.isActive) {
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
        isCompact() ? 180 : 0,
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
      const panelHeight = getRootPixelValue('--app-panel-h', Math.max(getViewportHeight() - navHeight, 1));
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

      if (handoff.snapshot.state === 'video-fullscreen' && !handoff.isVideoFullscreenSettled) {
        return false;
      }

      const about = document.querySelector<HTMLElement>('.js-about-snap');

      if (about?.dataset.aboutState !== 'done') {
        return false;
      }

      // Claim this handoff before dispatching: scrolling during the custom
      // event must not allow a second wheel event to start a competing
      // reverse sequence.
      if (!handoff.beginReturn()) {
        return false;
      }
      resetVideoStoryFullscreen();
      isReturningToAlliance = true;
      const returnEvent = new CustomEvent('agsit:return-about-alliance', { cancelable: true });
      const wasHandled = !window.dispatchEvent(returnEvent);

      if (!wasHandled) {
        isReturningToAlliance = false;
        handoff.arriveVideoFullscreen();
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

    const showVideoStoryReady = async (event: Event) => {
      event.preventDefault();

      if (!videoStorySection) {
        return;
      }

      hydrateVideoStory();
      if (!videoStoryVideo) return;

      resetVideoStoryFullscreen();

      const frameDecoded = await handoff.waitForVideoFrame(videoStoryVideo);
      if (handoff.snapshot.state !== 'waiting-video-frame') return;

      if (!frameDecoded) {
        ensureVideoAutoplay(videoStoryVideo);
      }

      handoff.beginMoveToVideo();
      // En dispositivos lentos el tween del zoom se estira (lagSmoothing) y el
      // usuario puede haber seguido scrolleando dentro del video mientras
      // tanto. Solo recoloca en la parada fullscreen si aún no la pasó; si ya
      // va en las frases, se respeta su posición y el sync lo pasa a
      // 'video-framed' en el siguiente frame.
      // Deja que Safari pinte primero el overlay fijo negro. scrollTo en el
      // mismo frame que un cambio de layout/composición puede mostrar capas
      // sticky antiguas o un frame blanco en iOS.
      let moveApplied = false;
      let arrivalApplied = false;
      let arrivalRetryTimeout = 0;
      let readyStopStableAt = 0;
      const requiresExactVideoStop = isCompact() || window.matchMedia('(pointer: coarse)').matches;
      const cleanupArrivalRetry = () => {
        window.clearTimeout(arrivalRetryTimeout);
        window.removeEventListener('scrollend', arriveAtVideo);
      };
      const arriveAtVideo = () => {
        if (arrivalApplied || handoff.snapshot.state !== 'moving-to-video') {
          cleanupArrivalRetry();
          return;
        }

        const navHeight = getNavHeight();
        const videoTop = videoStorySection.getBoundingClientRect().top;
        const isAtReadyStop = Math.abs(videoTop - navHeight) <= 10;

        // iOS ignora scrollTo mientras el gesto o su inercia siguen activos.
        // No ocultes About hasta comprobar geométricamente que el video está
        // realmente bajo la navegación; reintenta sin pedir otro gesto.
        if (requiresExactVideoStop && !isAtReadyStop) {
          readyStopStableAt = 0;
          window.scrollTo({ top: window.scrollY + videoTop - navHeight, left: 0, behavior: 'auto' });
          window.clearTimeout(arrivalRetryTimeout);
          arrivalRetryTimeout = window.setTimeout(arriveAtVideo, 140);
          return;
        }

        if (requiresExactVideoStop) {
          const now = performance.now();
          if (!readyStopStableAt) {
            readyStopStableAt = now;
          }

          const stableFor = now - readyStopStableAt;
          if (stableFor < 450) {
            window.clearTimeout(arrivalRetryTimeout);
            arrivalRetryTimeout = window.setTimeout(arriveAtVideo, Math.max(450 - stableFor, 80));
            return;
          }
        }

        arrivalApplied = true;
        cleanupArrivalRetry();
        handoff.arriveVideoFullscreen();
        syncVideoStoryToScroll();
      };
      const moveToVideo = () => {
        if (moveApplied || handoff.snapshot.state !== 'moving-to-video') return;
        moveApplied = true;

        const videoTop = videoStorySection.getBoundingClientRect().top;
        // En móvil/tablet la inercia puede rebasar la parada mientras el velo
        // está fijo. Siempre aterriza en el inicio fullscreen; escritorio
        // conserva la posibilidad de continuar hacia las frases.
        if (requiresExactVideoStop || getNavHeight() - videoTop < 10) {
          window.scrollTo({ top: window.scrollY + videoTop - getNavHeight(), left: 0, behavior: 'auto' });
        }
        syncVideoStoryToScroll();
        window.addEventListener('scrollend', arriveAtVideo, { passive: true });
        requestAnimationFrame(arriveAtVideo);
        // WebKit puede posponer RAF durante el asentamiento de un gesto. Este
        // respaldo evita que el velo quede esperando otro tap para ceder.
        arrivalRetryTimeout = window.setTimeout(arriveAtVideo, 140);
      };

      requestAnimationFrame(moveToVideo);
      window.setTimeout(moveToVideo, 140);
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
