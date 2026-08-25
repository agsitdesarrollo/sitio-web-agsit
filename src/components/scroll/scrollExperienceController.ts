import gsap from 'gsap';
import { ALLIANCE_LOGO_OVERSAMPLE } from '../../animations/allianceLogoZoom';
import { initAllianceVideoExperience } from './allianceVideoExperience';
import { ensureVideoAutoplay } from '../../scripts/videoAutoplay';

export function initScrollExperience(): (() => void) | undefined {
  const root = document.querySelector<HTMLElement>('[data-scroll-root]');

  if (!root) {
    return undefined;
  }

  let cleanupServicesAnchorNavigation: (() => void) | undefined;
  let cleanupAboutServiceVideoPlayback: (() => void) | undefined;
  let cleanupAllianceVideoExperience: (() => void) | undefined;
  let cleanupFloatingPersonSync: (() => void) | undefined;

  const context = gsap.context(() => {
    window.scrollTo(0, 0);

    // These are functions rather than values captured at load. A phone can
    // cross all three breakpoints after it rotates.
    const isCompact = () => window.matchMedia('(max-width: 1024px)').matches;
    const isMobile = () => window.matchMedia('(max-width: 599px)').matches;
    const isShortLandscape = () =>
      window.matchMedia('(pointer: coarse) and (orientation: landscape) and (max-width: 932px) and (max-height: 520px)').matches;
    // Sólo teléfonos: el puente hero→servicios necesita conservar su capa
    // fixed mientras Safari resuelve el snap entre ambas secciones.
    const isPhoneHeroBridge = () => isMobile() || isShortLandscape();
    const getHeroRestYPercent = () => (isShortLandscape() ? 0 : -5);

    const getRootPixelValue = (name: string, fallback: number) => {
      const value = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name));
      return Number.isFinite(value) && value > 0 ? value : fallback;
    };
    const getViewportHeight = () => {
      if (isShortLandscape()) {
        return getRootPixelValue('--app-vh', window.innerHeight);
      }

      return isCompact() ? getRootPixelValue('--app-stable-vh', window.innerHeight) : window.innerHeight;
    };
    const getVisualNavHeight = () =>
      document.querySelector<HTMLElement>('.site-nav')?.getBoundingClientRect().height
      ?? getRootPixelValue('--nav-h', 0);
    const setIfFound = (selector: string, vars: gsap.TweenVars) => {
      const targets = gsap.utils.toArray<HTMLElement>(selector);

      if (targets.length) {
        gsap.set(targets, vars);
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

    // La secuencia Alianza → Video → Frases → Contacto tiene un solo propietario.
    cleanupAllianceVideoExperience = initAllianceVideoExperience();

    const navigateToServices = (event: Event) => {
      event.preventDefault();
      const services = document.querySelector<HTMLElement>('#servicios');

      if (!services) {
        return;
      }

      const panelHeight = getRootPixelValue(
        '--app-content-h',
        Math.max(getViewportHeight() - getVisualNavHeight(), 1),
      );
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

    if (window.location.hash === '#servicios') {
      requestAnimationFrame(() => {
        navigateToServices(new Event('agsit:navigate-services'));
      });
    }

  }, root);

  return () => {
    cleanupServicesAnchorNavigation?.();
    cleanupAboutServiceVideoPlayback?.();
    cleanupAllianceVideoExperience?.();
    cleanupFloatingPersonSync?.();
    context.revert();
  };
}
