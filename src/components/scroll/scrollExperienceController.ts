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

    const cards = gsap.utils.toArray<HTMLElement>('.service-card');
    const fillLetters = gsap.utils.toArray<HTMLElement>('.js-title-fill-letter');
    const isCompact = window.matchMedia('(max-width: 1024px)').matches;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const isTablet = isCompact && !isMobile;
    const isDesktop = !isCompact;
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
    const getHeroScrollEnd = () => (isMobile ? 105 : isCompact ? 105 : 220);
    const getMobileServicesScrollEnd = () => (isMobile ? 275 : 560);
    const getVideoStoryScrollEnd = () => (isMobile ? 250 : isCompact ? 780 : 880);
    const getConsultLogoBottomY = () => getDynamicViewportHeight() - (isMobile ? 68 : isTablet ? 72 : 70);
    const getConsultLogoTravelScale = () => (isMobile ? 0.58 : isTablet ? 0.66 : 0.30);
    const getConsultLogoStartScale = () => (isMobile ? 0.26 : isTablet ? 0.34 : 0.46);
    const getElementRect = (selector: string) => document.querySelector<HTMLElement>(selector)?.getBoundingClientRect();
    const getServicesPersonTargetRect = () => {
      const services = document.querySelector<HTMLElement>('.js-services');
      const person = document.querySelector<HTMLElement>('.js-services-person');

      if (!services || !person) {
        return undefined;
      }

      const servicesRect = services.getBoundingClientRect();
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
      const floating = document.querySelector<HTMLElement>('.js-floating-person');
      const target = getServicesPersonTargetRect();

      if (!floating || !target) {
        return isCompact ? 0.58 : 0.74;
      }

      return target.width / Math.max(floating.offsetWidth, 1);
    };
    const getConsultLogoStartTop = () => {
      const cta = getElementRect('.services-advice-cta');

      if (isCompact && cta) {
        return isMobile ? Math.min(cta.bottom + 12, getViewportHeight() - 18) : getViewportHeight() + 34;
      }

      return getViewportHeight() - 128;
    };
    const getConsultLogoBridgeY = () => {
      const cta = getElementRect('.services-advice-cta');
      const fallback = getViewportHeight() + (isMobile ? 26 : isTablet ? 34 : 42);

      if (!cta || cta.bottom <= 0 || cta.top >= getViewportHeight()) {
        return fallback;
      }

      if (isCompact) {
        return isMobile ? Math.min(cta.bottom + 12, getViewportHeight() - 18) : fallback;
      }

      return cta.bottom + 70;
    };
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

    gsap.set('.js-floating-person', { y: 0, yPercent: -5, scale: 1.08, autoAlpha: 1 });
    gsap.set('.js-services-person', { autoAlpha: 0 });
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
    gsap.set('.js-hero-copy', { autoAlpha: 1, y: 0 });
    gsap.set('.js-title-fill-letter', { clipPath: 'inset(0 100% 0 0)' });
    setIfFound('.js-scroll-consult-logo', {
      autoAlpha: 0,
      pointerEvents: 'none',
      left: '50%',
      top: getConsultLogoStartTop,
      scale: getConsultLogoStartScale,
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

    const heroTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.js-hero',
        start: () => `top top+=${getNavHeight()}`,
        end: () => `+=${getHeroScrollEnd()}%`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    fillLetters.forEach((letter) => {
      heroTimeline.to(letter, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 0.08,
        ease: 'none',
      });
    });

    heroTimeline.to('.js-hero-copy', {
      autoAlpha: 0,
      y: 28,
      ease: 'none',
      duration: 0.32,
    });

    if (isCompact) {
      gsap.timeline({
        scrollTrigger: {
          trigger: '.js-services',
          start: 'top bottom',
          end: 'top top',
          scrub: true,
          invalidateOnRefresh: true,
          onEnter: () => gsap.set('.js-floating-person', { zIndex: 1 }),
          onLeave: () => {
            gsap.set('.js-floating-person', { autoAlpha: 0 });
            gsap.set('.js-services-person', { autoAlpha: 1 });
          },
          onEnterBack: () => {
            gsap.set('.js-floating-person', { autoAlpha: 1, zIndex: 1 });
            gsap.set('.js-services-person', { autoAlpha: 0 });
          },
          onLeaveBack: () => {
            gsap.set('.js-floating-person', { autoAlpha: 1, zIndex: 4 });
            gsap.set('.js-services-person', { autoAlpha: 0 });
          },
        },
      }).to('.js-floating-person', {
        y: getFloatingPersonTargetY,
        yPercent: 0,
        scale: getFloatingPersonTargetScale,
        ease: 'none',
        duration: 1,
      });
    } else {
      gsap.timeline({
        scrollTrigger: {
          trigger: '.js-services',
          start: 'top bottom',
          end: 'top top',
          scrub: true,
          invalidateOnRefresh: true,
          onEnter: () => gsap.set('.js-floating-person', { zIndex: 1 }),
          onLeave: () => {
            gsap.set('.js-floating-person', { autoAlpha: 0 });
            gsap.set('.js-services-person', { autoAlpha: 1 });
          },
          onEnterBack: () => {
            gsap.set('.js-floating-person', { autoAlpha: 1, zIndex: 1 });
            gsap.set('.js-services-person', { autoAlpha: 0 });
          },
          onLeaveBack: () => {
            gsap.set('.js-floating-person', { autoAlpha: 1, zIndex: 4 });
            gsap.set('.js-services-person', { autoAlpha: 0 });
          },
        },
      }).to('.js-floating-person', {
        y: () => -getViewportHeight() * 0.18,
        yPercent: 0,
        scale: 0.74,
        ease: 'none',
        duration: 1,
      });
    }

    let compactServicesScrollTrigger: ScrollTrigger | undefined;
    let compactServicesLogoStartProgress = 1;

    if (isDesktop) {
      const getDesktopCardStartY = () => Math.min(Math.max(getViewportHeight() * 0.3, 220), 330);
      const getDesktopCardStartX = () => Math.min(Math.max(window.innerWidth * 0.18, 260), 380);

      cards.forEach((card, index) => {
        const side = index % 2 === 0 ? -1 : 1;

        gsap.set(card, {
          autoAlpha: 0,
          x: () => side * getDesktopCardStartX(),
          y: getDesktopCardStartY,
        });
      });

      const servicesTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.js-services',
          start: 'top top',
          end: '+=560%',
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: () => {
            gsap.set('.js-floating-person', { autoAlpha: 0 });
            gsap.set('.js-services-person', { autoAlpha: 1 });
          },
          onLeave: () => {
            gsap.set('.js-floating-person', { autoAlpha: 0 });
            gsap.set('.js-services-person', { autoAlpha: 1 });
          },
          onEnterBack: () => {
            gsap.set('.js-floating-person', { autoAlpha: 0, zIndex: 1 });
            gsap.set('.js-services-person', { autoAlpha: 1 });
          },
        },
      });

      cards.forEach((card, index) => {
        const startAt = index * 0.64 + 0.1;
        const side = index % 2 === 0 ? -1 : 1;

        servicesTimeline
          .to(
            card,
            {
              autoAlpha: 0.32,
              x: () => side * getDesktopCardStartX() * 0.34,
              y: () => getDesktopCardStartY() * 0.85,
              duration: 0.1,
              ease: 'power2.out',
            },
            startAt,
          )
          .to(
            card,
            {
              autoAlpha: 0.78,
              x: () => side * getDesktopCardStartX() * 0.16,
              y: () => getDesktopCardStartY() * 0.22,
              duration: 0.1,
              ease: 'power1.inOut',
            },
            startAt + 0.1,
          )
          .to(
            card,
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              duration: 0.12,
              ease: 'power3.out',
            },
            startAt + 0.2,
          )
          .to(
            card,
            {
              autoAlpha: 0,
              x: 0,
              y: -92,
              duration: 0.24,
              ease: 'power1.inOut',
            },
            startAt + 0.85,
          );
      });

    } else if (!isMobile) {
      cards.forEach((card, index) => {
        gsap.set(card, {
          autoAlpha: 0,
          y: 24,
          x: index % 2 === 0 ? -140 : 140,
        });
      });

      const servicesTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.js-services',
          start: 'top top',
          end: '+=560%',
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: () => {
            gsap.set('.js-floating-person', { autoAlpha: 0 });
            gsap.set('.js-services-person', { autoAlpha: 1 });
          },
          onLeave: () => {
            gsap.set('.js-floating-person', { autoAlpha: 0 });
            gsap.set('.js-services-person', { autoAlpha: 1 });
          },
          onEnterBack: () => {
            gsap.set('.js-floating-person', { autoAlpha: 0, zIndex: 1 });
            gsap.set('.js-services-person', { autoAlpha: 1 });
          },
        },
      });
      compactServicesScrollTrigger = servicesTimeline.scrollTrigger;
      const tabletCardStep = 0.98;
      const tabletCardExitStart = 0.74;
      const tabletCardExitDuration = 0.26;
      const tabletCardOutEnd =
        Math.max(cards.length - 1, 0) * tabletCardStep + 0.1 + tabletCardExitStart + tabletCardExitDuration;
      const tabletLogoTravelDuration = 0.72;
      servicesTimeline.to({}, { duration: tabletLogoTravelDuration }, tabletCardOutEnd);
      compactServicesLogoStartProgress = tabletCardOutEnd / (tabletCardOutEnd + tabletLogoTravelDuration);

      cards.forEach((card, index) => {
        const startAt = index * tabletCardStep + 0.1;
        servicesTimeline
          .to(
            card,
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              duration: 0.26,
              ease: 'power2.out',
            },
            startAt,
          )
          .to(
            card,
            {
              autoAlpha: 0,
              y: -28,
              duration: tabletCardExitDuration,
              ease: 'power1.inOut',
            },
            startAt + tabletCardExitStart,
          );
      });

    } else {
      cards.forEach((card) => {
        gsap.set(card, {
          autoAlpha: 0,
          x: 0,
          y: 24,
        });
      });

      const compactServicesTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.js-services',
          start: 'top top',
          end: () => `+=${getMobileServicesScrollEnd()}%`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: () => {
            gsap.set('.js-floating-person', { autoAlpha: 0 });
            gsap.set('.js-services-person', { autoAlpha: 1 });
          },
          onLeave: () => {
            gsap.set('.js-floating-person', { autoAlpha: 0 });
            gsap.set('.js-services-person', { autoAlpha: 1 });
          },
          onEnterBack: () => {
            gsap.set('.js-floating-person', { autoAlpha: 0 });
            gsap.set('.js-services-person', { autoAlpha: 1 });
          },
        },
      });
      compactServicesScrollTrigger = compactServicesTimeline.scrollTrigger;
      const mobileCardStep = 0.96;
      const mobileCardExitStart = 0.7;
      const mobileCardExitDuration = 0.24;
      const mobileCardOutEnd =
        Math.max(cards.length - 1, 0) * mobileCardStep + 0.08 + mobileCardExitStart + mobileCardExitDuration;
      const mobileLogoTravelDuration = 0.72;
      compactServicesTimeline.to({}, { duration: mobileLogoTravelDuration }, mobileCardOutEnd);
      compactServicesLogoStartProgress = mobileCardOutEnd / (mobileCardOutEnd + mobileLogoTravelDuration);

      cards.forEach((card, index) => {
        const startAt = index * mobileCardStep + 0.08;
        compactServicesTimeline
          .to(
            card,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.26,
              ease: 'power2.out',
            },
            startAt,
          )
          .to(
            card,
            {
              autoAlpha: 0,
              y: -24,
              duration: mobileCardExitDuration,
              ease: 'power1.inOut',
            },
            startAt + mobileCardExitStart,
          );
      });
    }

    const updateConsultLogoBridge = () => {
      const about = document.querySelector<HTMLElement>('.js-about-snap');
      const isAboutReleasingBackward = about?.dataset.aboutRelease === 'backward';
      if (about?.dataset.aboutState === 'active' && !isAboutReleasingBackward) {
        return;
      }

      const aboutTop = about?.getBoundingClientRect().top ?? getViewportHeight();
      const startY = getViewportHeight() * (isMobile ? 1.18 : isTablet ? 1.06 : 0.72);
      const endY = getNavHeight() + (isMobile ? 44 : isTablet ? 52 : 58);

      if (isCompact && compactServicesScrollTrigger) {
        const serviceProgress = compactServicesScrollTrigger.progress;

        if (compactServicesScrollTrigger.isActive && (isTablet || serviceProgress < compactServicesLogoStartProgress)) {
          gsap.set('.js-scroll-consult-logo', {
            autoAlpha: 0,
            pointerEvents: 'none',
            left: '50%',
            top: getConsultLogoStartTop,
            scale: getConsultLogoStartScale,
          });
          document.querySelector('.js-scroll-consult-logo')?.classList.remove('is-tooltip-visible');
          return;
        }

        const servicesCta = getElementRect('.services-advice-cta');
        const isServicesCtaVisible =
          Boolean(servicesCta) && servicesCta!.bottom > 0 && servicesCta!.top < getViewportHeight();

        if (
          !isTablet &&
          serviceProgress >= compactServicesLogoStartProgress &&
          aboutTop > endY &&
          (compactServicesScrollTrigger.isActive || isServicesCtaVisible)
        ) {
          const serviceLogoProgress = gsap.utils.clamp(
            0,
            1,
            (serviceProgress - compactServicesLogoStartProgress) /
              Math.max(1 - compactServicesLogoStartProgress, 0.01),
          );
          const aboutLogoProgress =
            aboutTop > startY ? 0 : gsap.utils.clamp(0, 1, (startY - aboutTop) / Math.max(startY - endY, 1));
          const logoProgress = Math.max(serviceLogoProgress, aboutLogoProgress);
          const logoStartY = getConsultLogoStartTop();
          const logoLiftY = logoStartY + (isMobile ? 22 : 30);
          const liftProgress = gsap.utils.clamp(0, 1, logoProgress / 0.36);
          const travelProgress = gsap.utils.clamp(0, 1, (logoProgress - 0.28) / 0.72);

          gsap.set('.js-scroll-consult-logo', {
            autoAlpha: logoProgress,
            pointerEvents: logoProgress > 0.4 ? 'auto' : 'none',
            left: '50%',
            top: gsap.utils.interpolate(
              gsap.utils.interpolate(logoStartY, logoLiftY, liftProgress),
              getConsultLogoBottomY(),
              travelProgress,
            ),
            scale: gsap.utils.interpolate(
              getConsultLogoStartScale() * 0.58,
              getConsultLogoTravelScale(),
              logoProgress,
            ),
          });
          document.querySelector('.js-scroll-consult-logo')?.classList.remove('is-tooltip-visible');
          return;
        }
      }

      if (aboutTop > startY) {
        gsap.set('.js-scroll-consult-logo', {
          autoAlpha: 0,
          pointerEvents: 'none',
          left: '50%',
          top: getConsultLogoStartTop,
          scale: getConsultLogoStartScale,
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
        scale: gsap.utils.interpolate(getConsultLogoStartScale(), getConsultLogoTravelScale(), progress),
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
      document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' });
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
