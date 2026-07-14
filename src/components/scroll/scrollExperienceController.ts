import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ALLIANCE_LOGO_OVERSAMPLE } from '../../animations/allianceLogoZoom';
import { ensureVideoAutoplay } from '../../scripts/videoAutoplay';

gsap.registerPlugin(ScrollTrigger);

export function initScrollExperience(): (() => void) | undefined {
  const root = document.querySelector<HTMLElement>('[data-scroll-root]');

  if (!root) {
    return undefined;
  }

  let cleanupBridgeScroll: (() => void) | undefined;
  let cleanupViewportRefresh: (() => void) | undefined;
  let cleanupServicesAnchorNavigation: (() => void) | undefined;
  let cleanupAboutServiceVideoPlayback: (() => void) | undefined;

  const context = gsap.context(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    const isCompact = window.matchMedia('(max-width: 1024px)').matches;
    const isMobile = window.matchMedia('(max-width: 749px)').matches;
    const isTablet = isCompact && !isMobile;
    ScrollTrigger.config({ ignoreMobileResize: true });

    const getRootPixelValue = (name: string, fallback: number) => {
      const value = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name));
      return Number.isFinite(value) && value > 0 ? value : fallback;
    };
    const getViewportHeight = () =>
      isCompact ? getRootPixelValue('--app-stable-vh', window.innerHeight) : window.innerHeight;
    // For elements anchored to the visible bottom edge (consult logo): the stable
    // height is the LARGE viewport, which sits below the fold while the mobile
    // browser UI is showing.
    const getDynamicViewportHeight = () => window.visualViewport?.height ?? window.innerHeight;
    const getNavHeight = () => document.querySelector('.site-nav')?.getBoundingClientRect().height ?? 0;
    const getPinnedSectionStart = () => `top top+=${getNavHeight()}`;
    const getVideoStoryInset = () => (isMobile ? 22 : isTablet ? 24 : isCompact ? 28 : 34);
    const getVideoStoryScrollEnd = () => (isMobile ? 250 : isCompact ? 780 : 880);
    const getConsultLogoBottomY = () => getDynamicViewportHeight() - (isMobile ? 68 : isTablet ? 72 : 70);
    const getConsultLogoTravelScale = () => (isMobile ? 0.58 : isTablet ? 0.66 : 0.30);
    const getConsultLogoBridgeY = () => getViewportHeight() + (isMobile ? 26 : isTablet ? 34 : 42);


        // Track the button continuously — even once it has scrolled past the
        // top edge — so the bridge interpolation never jumps mid-flight.

    const setIfFound = (selector: string, vars: gsap.TweenVars) => {
      const targets = gsap.utils.toArray<HTMLElement>(selector);

      if (targets.length) {
        gsap.set(targets, vars);
      }
    };
    const getVideoStoryWidth = () => {
      const ratio = isMobile ? 0.92 : isTablet ? 0.94 : isCompact ? 0.92 : 0.68;
      return window.innerWidth * ratio;
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

    gsap.set('.js-video-story-stage', { backgroundColor: '#020712' });
    gsap.set('.js-video-story-line', { autoAlpha: 0, y: 0 });
    gsap.set('.js-video-story-frame', {
      autoAlpha: 0,
      top: 0,
      left: '50%',
      width: () => window.innerWidth,
      height: () => getViewportHeight() - getNavHeight(),
      xPercent: -50,
    });
    setIfFound('.js-scroll-consult-logo', {
      autoAlpha: 0,
      pointerEvents: 'none',
      left: '50%',
      top: getConsultLogoBottomY,
      scale: getConsultLogoTravelScale,
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

    // While the about snap section is active it is position:fixed and out of the
    // document flow, so a ScrollTrigger.refresh() fired in that state (window load,
    // resize, viewport-change) measures every trigger below it one viewport short
    // and the video-story pin ends up unpinning early. Re-insert the section into
    // the flow for the synchronous measurement pass and restore it right after.
    let aboutStateHeldForRefresh: string | undefined;
    const onScrollTriggerRefreshInit = () => {
      const about = document.querySelector<HTMLElement>('.js-about-snap');
      if (about?.dataset.aboutState === 'active') {
        aboutStateHeldForRefresh = about.dataset.aboutState;
        delete about.dataset.aboutState;
      }
    };
    const onScrollTriggerRefreshDone = () => {
      if (!aboutStateHeldForRefresh) {
        return;
      }
      const about = document.querySelector<HTMLElement>('.js-about-snap');
      if (about) {
        about.dataset.aboutState = aboutStateHeldForRefresh;
      }
      aboutStateHeldForRefresh = undefined;
    };
    ScrollTrigger.addEventListener('refreshInit', onScrollTriggerRefreshInit);
    ScrollTrigger.addEventListener('refresh', onScrollTriggerRefreshDone);

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
            ScrollTrigger.refresh();
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
      ScrollTrigger.removeEventListener('refreshInit', onScrollTriggerRefreshInit);
      ScrollTrigger.removeEventListener('refresh', onScrollTriggerRefreshDone);
    };

    const updateConsultLogoBridge = () => {
      const about = document.querySelector<HTMLElement>('.js-about-snap');
      const isAboutReleasingBackward = about?.dataset.aboutRelease === 'backward';
      if (about?.dataset.aboutState === 'active' && !isAboutReleasingBackward) {
        return;
      }

      const aboutTop = about?.getBoundingClientRect().top ?? getViewportHeight();
      const startY = getViewportHeight() * (isMobile ? 1.18 : isTablet ? 1.06 : 0.72);
      const endY = getNavHeight() + (isMobile ? 44 : isTablet ? 52 : 58);

      // Fade the consult logo in only as the horizontal section takes over.
      if (aboutTop > startY) {
        gsap.set('.js-scroll-consult-logo', {
          autoAlpha: 0,
          pointerEvents: 'none',
          left: '50%',
          top: getConsultLogoBottomY,
          scale: getConsultLogoTravelScale,
        });
        document.querySelector('.js-scroll-consult-logo')?.classList.remove('is-tooltip-visible');
        return;
      }

      if (aboutTop <= endY) {
        if (
          !isAboutReleasingBackward &&
          (about?.dataset.aboutState === 'active' || about?.dataset.aboutState === 'done')
        ) {
          return;
        }
        gsap.set('.js-scroll-consult-logo', {
          autoAlpha: 1,
          pointerEvents: isAboutReleasingBackward ? 'none' : 'auto',
          left: '50%',
          top: getConsultLogoBottomY,
          scale: getConsultLogoTravelScale,
        });
        document
          .querySelector('.js-scroll-consult-logo')
          ?.classList.toggle('is-tooltip-visible', !isAboutReleasingBackward);
        return;
      }

      const progress = gsap.utils.clamp(0, 1, (startY - aboutTop) / Math.max(startY - endY, 1));

      gsap.set('.js-scroll-consult-logo', {
        autoAlpha: progress,
        pointerEvents: !isAboutReleasingBackward && progress > 0.08 ? 'auto' : 'none',
        left: '50%',
        top: gsap.utils.interpolate(getConsultLogoBridgeY(), getConsultLogoBottomY(), progress),
        scale: getConsultLogoTravelScale,
      });
      document
        .querySelector('.js-scroll-consult-logo')
        ?.classList.toggle('is-tooltip-visible', !isAboutReleasingBackward && progress > 0.08);
    };

    window.addEventListener('scroll', updateConsultLogoBridge, { passive: true });
    gsap.ticker.add(updateConsultLogoBridge);

    const consultTooltipEl = document.querySelector<HTMLElement>('.js-scroll-consult-logo .scroll-consult-logo-tooltip');
    const consultLogoEl = document.querySelector<HTMLElement>('.js-scroll-consult-logo');
    const syncTooltipScale = () => {
      if (document.querySelector<HTMLElement>('.js-about-snap')?.dataset.aboutState === 'active') return;
      if (!consultLogoEl || !consultTooltipEl) return;
      const s = Number(gsap.getProperty(consultLogoEl, 'scaleX')) || 1;
      if (s > 0) gsap.set(consultTooltipEl, { scale: 0.68 / s, transformOrigin: '50% 100%' });
    };
    gsap.ticker.add(syncTooltipScale);

    cleanupBridgeScroll = () => {
      window.removeEventListener('scroll', updateConsultLogoBridge);
      gsap.ticker.remove(updateConsultLogoBridge);
      gsap.ticker.remove(syncTooltipScale);
    };
    updateConsultLogoBridge();

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


    const videoStoryTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.js-video-story',
        start: getPinnedSectionStart,
        end: () => `+=${getVideoStoryScrollEnd()}%`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    videoStoryTimeline
      .to({}, { duration: 0.04 })
      .call(() => hydrateVideo(document.querySelector<HTMLVideoElement>('.js-video-story-frame video')), [], 0.02)
      .to(
        '.js-video-story-frame',
        {
          autoAlpha: 1,
          top: 0,
          ease: 'none',
          duration: 0.18,
        },
      );

    videoStoryTimeline.to({}, { duration: 0.06 });

    videoStoryTimeline
      .to('.js-video-story-frame', {
        top: () => getVideoStoryInset(),
        width: () => getVideoStoryWidth(),
        height: () => getVideoStoryHeight(),
        borderRadius: isMobile ? 10 : 14,
        boxShadow: '0 28px 60px rgba(8, 21, 43, 0.2)',
        ease: 'none',
        duration: 0.72,
      })
      .to(
        '.js-video-story-stage',
        {
          backgroundColor: '#ffffff',
          ease: 'none',
          duration: 0.6,
        },
        '<',
      );

    const videoLineStart = videoStoryTimeline.duration() + 0.22;

    const lineStep = isMobile ? 0.92 : 0.72;
    const lineFadeStart = isMobile ? 0.58 : 0.46;

    const storyLineEls = gsap.utils.toArray<HTMLElement>('.js-video-story-line');
    storyLineEls.forEach((line, index) => {
      const startAt = videoLineStart + index * lineStep;
      videoStoryTimeline.to(
        line,
        {
          autoAlpha: 1,
          duration: 0.28,
          ease: 'power2.out',
        },
        startAt,
      );

      if (index < storyLineEls.length - 1) {
        videoStoryTimeline.to(
          line,
          {
            autoAlpha: 0,
            duration: 0.24,
            ease: 'power1.inOut',
          },
          startAt + lineFadeStart,
        );
      } else {
        // The last line stays visible into the contact section; the hold keeps the
        // timeline length so it appears at the same scroll point as before.
        videoStoryTimeline.to({}, { duration: lineFadeStart + 0.24 - 0.28 }, startAt + 0.28);
      }
    });
  }, root);

  return () => {
    cleanupBridgeScroll?.();
    cleanupViewportRefresh?.();
    cleanupServicesAnchorNavigation?.();
    cleanupAboutServiceVideoPlayback?.();
    context.revert();
  };
}
