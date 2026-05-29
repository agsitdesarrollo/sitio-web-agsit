import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initAllianceLogoZoom } from '../../animations/allianceLogoZoom';

gsap.registerPlugin(ScrollTrigger);

export function initScrollExperience(): (() => void) | undefined {
  const root = document.querySelector<HTMLElement>('[data-scroll-root]');

  if (!root) {
    return undefined;
  }

  let cleanupBridgeScroll: (() => void) | undefined;
  let cleanupViewportRefresh: (() => void) | undefined;

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
    const getNavHeight = () => document.querySelector('.site-nav')?.getBoundingClientRect().height ?? 0;
    const getPinnedSectionStart = () => `top top+=${getNavHeight()}`;
    const getVideoStoryInset = () => (isMobile ? 22 : isTablet ? 24 : isCompact ? 28 : 34);
    const getHeroScrollEnd = () => (isMobile ? 105 : isCompact ? 105 : 220);
    const getMobileServicesScrollEnd = () => (isMobile ? 275 : 560);
    const getAboutScrollMultiplier = () => (isMobile ? 12.2 : isTablet ? 14.3 : 12.9);
    const getVideoStoryScrollEnd = () => (isMobile ? 250 : isCompact ? 780 : 880);
    const getAboutIntroHold = () => (isMobile ? 0.56 : 0.38);
    const getAboutServiceHold = () => (isMobile ? 0.58 : 0.42);
    const getAboutServiceStep = () => (isMobile ? 1.88 : 1.72);
    const getConsultLogoBottomY = () => getViewportHeight() - (isMobile ? 42 : isTablet ? 44 : 40);
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
        return isMobile ? cta.bottom + 30 : getViewportHeight() + 34;
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
        return isMobile ? cta.bottom + 30 : fallback;
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
        video.play().catch(() => undefined);
      }
    };
    const hydrateVideos = (videos: Iterable<HTMLVideoElement>) => {
      Array.from(videos).forEach(hydrateVideo);
    };
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
    gsap.set('.js-about-intro-fade', { autoAlpha: 0, y: 18 });
    gsap.set('.js-about-service-card', { autoAlpha: 0, y: 24 });
    gsap.set('.js-about-service-visual', { autoAlpha: 1, clipPath: 'inset(0 0 0% 0)' });
    gsap.set('.js-about-service-visual video', { scale: 1.06, xPercent: 2, yPercent: 0 });
    gsap.set('.js-about-service-body', { autoAlpha: 1 });
    gsap.set('.js-about-service-body > *', { autoAlpha: 0, y: 18 });
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
      scale: 0.68,
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
    setIfFound('.js-about-timeline', { autoAlpha: 0 });
    setIfFound('.js-about-fill-word .about-word-fill', { clipPath: 'inset(0 100% 0 0)' });
    setIfFound('.js-about-emphasis-underline', { '--underline-scale': 0 });
    setIfFound('.js-about-emphasis-highlight', { '--highlight-scale': 0 });
    setIfFound('.js-about-emphasis-scale', { scale: 1 });
    setIfFound('.js-about-emphasis-glow .about-word-fill', {
      color: '#08152b',
      textShadow: '0 0 0 rgba(65, 200, 246, 0)',
    });

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
      const about = document.querySelector<HTMLElement>('.js-about-horizontal');
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
        const trackX = Number(gsap.getProperty('.js-about-track', 'x')) || 0;

        if (Math.abs(trackX) < 1) {
          gsap.set('.js-scroll-consult-logo', {
            autoAlpha: 1,
            pointerEvents: 'auto',
            left: '50%',
            top: getConsultLogoBottomY,
            scale: getConsultLogoTravelScale,
          });
          document.querySelector('.js-scroll-consult-logo')?.classList.add('is-tooltip-visible');
        }

        return;
      }

      const progress = gsap.utils.clamp(0, 1, (startY - aboutTop) / Math.max(startY - endY, 1));

      gsap.set('.js-scroll-consult-logo', {
        autoAlpha: progress,
        pointerEvents: progress > 0.08 ? 'auto' : 'none',
        left: '50%',
        top: gsap.utils.interpolate(getConsultLogoBridgeY(), getConsultLogoBottomY(), progress),
        scale: gsap.utils.interpolate(getConsultLogoStartScale(), getConsultLogoTravelScale(), progress),
      });
      document
        .querySelector('.js-scroll-consult-logo')
        ?.classList.toggle('is-tooltip-visible', progress > 0.08);
    };

    window.addEventListener('scroll', updateConsultLogoBridge, { passive: true });
    gsap.ticker.add(updateConsultLogoBridge);

    const consultTooltipEl = document.querySelector<HTMLElement>('.js-scroll-consult-logo .scroll-consult-logo-tooltip');
    const consultLogoEl = document.querySelector<HTMLElement>('.js-scroll-consult-logo');
    const syncTooltipScale = () => {
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

    const aboutPanels = gsap.utils.toArray<HTMLElement>('.js-about-horizontal .about-panel');
    const aboutTrack = document.querySelector<HTMLElement>('.js-about-track');

    if (aboutTrack && aboutPanels.length > 1) {
      const aboutTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.js-about-horizontal',
          start: getPinnedSectionStart,
          end: () => `+=${window.innerWidth * getAboutScrollMultiplier()}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      const animatePanelEmphasis = (panel: HTMLElement, at: number) => {
        const underlines = panel.querySelectorAll<HTMLElement>('.js-about-emphasis-underline');
        const glows = panel.querySelectorAll<HTMLElement>('.js-about-emphasis-glow .about-word-fill');
        const scales = panel.querySelectorAll<HTMLElement>('.js-about-emphasis-scale');
        const highlights = panel.querySelectorAll<HTMLElement>('.js-about-emphasis-highlight');

        if (underlines.length) {
          aboutTimeline.to(
            underlines,
            {
              '--underline-scale': 1,
              duration: 0.34,
              ease: 'power2.out',
              stagger: 0.08,
            },
            at,
          );
        }

        if (glows.length) {
          aboutTimeline.to(
            glows,
            {
              color: '#41c8f6',
              textShadow: '0 0 18px rgba(65, 200, 246, 0.42)',
              duration: 0.42,
              ease: 'power2.out',
            },
            at + 0.06,
          );
        }

        if (scales.length) {
          aboutTimeline
            .to(
              scales,
              {
                scale: 1.02,
                duration: 0.28,
                ease: 'power2.out',
              },
              at + 0.08,
            )
            .to(
              scales,
              {
                scale: 1,
                duration: 0.32,
                ease: 'power2.inOut',
              },
              at + 0.42,
            );
        }

        if (highlights.length) {
          aboutTimeline.to(
            highlights,
            {
              '--highlight-scale': 1,
              duration: 0.36,
              ease: 'power2.out',
              stagger: 0.08,
            },
            at + 0.12,
          );
        }
      };

      const moveToPanel = (index: number, at: number) => {
        aboutTimeline.to(
          aboutTrack,
          {
            x: () => -window.innerWidth * index,
            duration: 0.5,
            ease: 'power2.inOut',
          },
          at,
        );
      };

      const revealServiceCards = (panel: HTMLElement, at: number) => {
        const cards = panel.querySelectorAll<HTMLElement>('.js-about-service-card');
        const visuals = panel.querySelectorAll<HTMLElement>('.js-about-service-visual');
        const videos = panel.querySelectorAll<HTMLElement>('.js-about-service-visual video');
        const serviceVideos = panel.querySelectorAll<HTMLVideoElement>('.js-about-service-visual video');
        const bodies = panel.querySelectorAll<HTMLElement>('.js-about-service-body');
        const bodyItems = panel.querySelectorAll<HTMLElement>('.js-about-service-body > *');

        aboutTimeline.call(() => hydrateVideos(serviceVideos), [], at);

        aboutTimeline
          .to(
            cards,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.18,
              ease: 'power1.out',
              stagger: 0.08,
            },
            at,
          )
          .to(
            visuals,
            {
              autoAlpha: 1,
              clipPath: 'inset(0 0 0% 0)',
              duration: 0.34,
              ease: 'power1.out',
              stagger: 0.12,
            },
            at,
          )
          .to(
            videos,
            {
              scale: 1,
              xPercent: 0,
              yPercent: 0,
              duration: 1.05,
              ease: 'power3.out',
              stagger: 0.12,
            },
            at,
          )
          .to(
            bodies,
            {
              autoAlpha: 1,
              duration: 0.52,
              ease: 'power2.out',
              stagger: 0.12,
            },
            at + 0.18,
          )
          .to(
            bodyItems,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.52,
              ease: 'power3.out',
              stagger: 0.07,
            },
            at + 0.24,
          );
      };

      aboutTimeline.to(
        aboutPanels[0].querySelectorAll<HTMLElement>('.js-about-intro-fade'),
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.38,
          ease: 'power2.out',
          stagger: 0.08,
        },
        0.34,
      );
      aboutTimeline.to({}, { duration: getAboutIntroHold() });
      const servicePanelIndexes = aboutPanels
        .map((panel, index) => ({ panel, index }))
        .filter(({ panel }) => panel.classList.contains('about-panel-services'));
      const clientsPanelIndex = aboutPanels.findIndex((panel) => panel.classList.contains('about-panel-clients'));
      const alliancesPanelIndex = aboutPanels.findIndex((panel) => panel.classList.contains('about-panel-alliances'));
      let nextPanelAt = 0.98;

      const timelineStops = gsap.utils.toArray<HTMLElement>('.js-about-timeline-stop');
      const timelineLine = document.querySelector<HTMLElement>('.js-about-timeline-line');
      const timelineProgress = document.querySelector<HTMLElement>('.js-about-timeline-progress');
      const tlStart = isMobile ? 16 : isTablet ? 11 : 7.5;
      const tlStep = isMobile ? 11 : isTablet ? 12 : 13.5;
      const tlMaxLeft = isMobile ? 74 : isTablet ? 78 : 80;

      if (timelineStops.length > 0) {
        gsap.set(timelineStops, { autoAlpha: 0 });
        timelineStops.forEach((stop, i) => {
          gsap.set(stop, { left: `${Math.min(tlStart + i * tlStep, tlMaxLeft)}%`, xPercent: -50 });
        });
        const lastLeft = Math.min(tlStart + (timelineStops.length - 1) * tlStep, tlMaxLeft);
        if (timelineLine) gsap.set(timelineLine, { left: `${tlStart}%`, right: `${100 - lastLeft}%` });
        if (timelineProgress) gsap.set(timelineProgress, { left: `${tlStart}%`, right: `${100 - tlStart}%` });
      }

      servicePanelIndexes.forEach(({ panel, index }, serviceOrder) => {
        moveToPanel(index, nextPanelAt);

        if (serviceOrder === 0) {
          aboutTimeline.to('.js-about-timeline', { autoAlpha: 1, duration: 0.2, ease: 'power2.out' }, nextPanelAt + 0.5);
          if (timelineStops.length > 1) {
            aboutTimeline.to(timelineStops.slice(1), { autoAlpha: 1, duration: 0.001 }, nextPanelAt + 0.5);
          }
        } else {
          aboutTimeline.to(timelineStops[serviceOrder - 1], { autoAlpha: 1, duration: 0.22, ease: 'power2.out' }, nextPanelAt + 0.08);
          aboutTimeline.to(timelineStops[serviceOrder], { autoAlpha: 0, duration: 0.001 }, nextPanelAt + 0.5);
          const currentLeft = Math.min(tlStart + serviceOrder * tlStep, tlMaxLeft);
          if (timelineProgress) {
            aboutTimeline.to(timelineProgress, { right: `${100 - currentLeft}%`, duration: 0.58, ease: 'power1.inOut' }, nextPanelAt + 0.04);
          }
        }

        aboutTimeline.call(
          () => document.querySelector('.js-scroll-consult-logo')?.classList.add('is-tooltip-visible'),
          [],
          nextPanelAt + 0.02,
        );
        aboutTimeline.to(
          '.js-scroll-consult-logo',
          {
            autoAlpha: 1,
            pointerEvents: 'auto',
            left: () => {
              const start = isMobile ? 16 : isTablet ? 11 : 7.5;
              const step = isMobile ? 11 : isTablet ? 12 : 13.5;
              const maxLeft = isMobile ? 74 : isTablet ? 78 : 80;
              return `${Math.min(start + Math.max(serviceOrder, 0) * step, maxLeft)}%`;
            },
            top: getConsultLogoBottomY,
            scale: getConsultLogoTravelScale,
            duration: 0.58,
            ease: 'power1.inOut',
          },
          nextPanelAt + 0.04,
        );

        revealServiceCards(panel, nextPanelAt + 0.34);
        animatePanelEmphasis(panel, nextPanelAt + 1.1);

        if (serviceOrder === servicePanelIndexes.length - 1) {
          aboutTimeline.to(timelineStops[serviceOrder], { autoAlpha: 1, duration: 0.001 }, nextPanelAt + getAboutServiceStep() - 0.2);
          aboutTimeline.to('.js-about-timeline', { autoAlpha: 0, duration: 0.18, ease: 'power1.in' }, nextPanelAt + getAboutServiceStep());
        }

        aboutTimeline.to({}, { duration: getAboutServiceHold() });
        nextPanelAt += getAboutServiceStep();
      });

      if (clientsPanelIndex < 0 || alliancesPanelIndex < 0) {
        return;
      }

      moveToPanel(clientsPanelIndex, nextPanelAt);
      aboutTimeline.call(
        () => document.querySelector('.js-scroll-consult-logo')?.classList.add('is-tooltip-visible'),
        [],
        nextPanelAt + 0.02,
      );
      aboutTimeline.to(
        '.js-scroll-consult-logo',
        {
          autoAlpha: 1,
          pointerEvents: 'auto',
          left: () => (isMobile ? '72%' : isTablet ? '78%' : '82%'),
          top: getConsultLogoBottomY,
          duration: 0.5,
          ease: 'power1.inOut',
        },
        nextPanelAt + 0.04,
      );
      aboutTimeline.call(
        () => {
          document
            .querySelector('.js-about-clients-stage')
            ?.dispatchEvent(new CustomEvent('agsit-clients-drop', { detail: { impulse: 44 } }));
        },
        [],
        nextPanelAt + 0.34,
      );
      aboutTimeline.to(
        aboutPanels[clientsPanelIndex].querySelectorAll<HTMLElement>('.js-about-clients-copy'),
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.52,
          ease: 'power2.out',
        },
        nextPanelAt + 0.44,
      );
      aboutTimeline.to(
        aboutPanels[clientsPanelIndex].querySelectorAll<HTMLElement>('.js-about-clients-stage'),
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.62,
          ease: 'power2.out',
        },
        nextPanelAt + 0.54,
      );
      aboutTimeline.call(
        () => {
          document
            .querySelector('.js-about-clients-stage')
            ?.dispatchEvent(new CustomEvent('agsit-clients-drop', { detail: { impulse: -58 } }));
        },
        [],
        nextPanelAt + 1.14,
      );
      aboutTimeline.call(
        () => {
          document
            .querySelector('.js-about-clients-stage')
            ?.dispatchEvent(new CustomEvent('agsit-clients-drop', { detail: { impulse: 52 } }));
        },
        [],
        nextPanelAt + 1.74,
      );
      aboutTimeline.call(
        () => {
          document
            .querySelector('.js-about-clients-stage')
            ?.dispatchEvent(new CustomEvent('agsit-clients-drop', { detail: { impulse: -34 } }));
        },
        [],
        nextPanelAt + 2.3,
      );
      aboutTimeline.to({}, { duration: 0.62 });

      nextPanelAt += 2.96;
      moveToPanel(alliancesPanelIndex, nextPanelAt);
      const alliancePanel = aboutPanels[alliancesPanelIndex];
      const allianceCopy = alliancePanel.querySelectorAll<HTMLElement>('.js-about-alliance-copy');
      const allianceCta = alliancePanel.querySelectorAll<HTMLElement>('.js-about-alliance-cta');
      const allianceMetrics = Array.from(alliancePanel.querySelectorAll<HTMLElement>('.js-about-alliance-metric'));
      const floatingLogo = document.querySelector<HTMLElement>('.js-scroll-consult-logo');
      const transitionLogo = alliancePanel.querySelector<HTMLElement>('.js-about-transition-logo');
      const transitionVeil = alliancePanel.querySelector<HTMLElement>('.js-about-transition-veil');

      aboutTimeline.to(
        allianceCopy,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.56,
          ease: 'power3.out',
        },
        nextPanelAt + 0.96,
      );
      aboutTimeline.to(
        allianceCta,
        {
          autoAlpha: 1,
          y: 0,
          pointerEvents: 'auto',
          duration: 0.42,
          ease: 'power2.out',
        },
        nextPanelAt + 1.34,
      );

      if (floatingLogo && transitionLogo && transitionVeil) {
        const zoomDuration = initAllianceLogoZoom({
          timeline: aboutTimeline,
          startAt: nextPanelAt + 0.18,
          panelEl: alliancePanel,
          floatingLogoEl: floatingLogo,
          transitionLogoEl: transitionLogo,
          veilEl: transitionVeil,
          metricsEls: allianceMetrics,
          contentEls: [...Array.from(allianceCopy), ...Array.from(allianceCta)],
        });

        aboutTimeline.to({}, { duration: zoomDuration }, nextPanelAt);
      }
    }

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

    gsap.utils.toArray<HTMLElement>('.js-video-story-line').forEach((line, index) => {
      const startAt = videoLineStart + index * lineStep;
      videoStoryTimeline
        .to(
          line,
          {
            autoAlpha: 1,
            duration: 0.28,
            ease: 'power2.out',
          },
          startAt,
        )
        .to(
          line,
          {
            autoAlpha: 0,
            duration: 0.24,
            ease: 'power1.inOut',
          },
          startAt + lineFadeStart,
        );
    });
  }, root);

  return () => {
    cleanupBridgeScroll?.();
    cleanupViewportRefresh?.();
    context.revert();
  };
}
