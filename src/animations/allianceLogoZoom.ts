const DARK_BACKGROUND = '#020712';

const getNavHeight = () =>
  parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 0;

type AllianceLogoZoomConfig = {
  timeline: gsap.core.Timeline;
  startAt: number;
  panelEl: HTMLElement;
  floatingLogoEl: HTMLElement;
  transitionLogoEl: HTMLElement;
  veilEl: HTMLElement;
  metricsEls: HTMLElement[];
  contentEls: HTMLElement[];
};

const getLogoFillScale = (logoEl: HTMLElement) => {
  const bounds = logoEl.getBoundingClientRect();
  const width = Math.max(bounds.width, 1);
  const height = Math.max(bounds.height, 1);

  return Math.max(window.innerWidth / width, window.innerHeight / height) * 1.15;
};

export function initAllianceLogoZoom({
  timeline,
  startAt,
  panelEl,
  floatingLogoEl,
  transitionLogoEl,
  veilEl,
  metricsEls,
  contentEls,
}: AllianceLogoZoomConfig) {
  const logoImage = transitionLogoEl.querySelector<HTMLElement>('.about-transition-logo-image');
  const handoffAt = startAt + 0.82;
  const zoomStart = startAt + 2.05;
  const totalDuration = 3.05;

  timeline.call(
    () => {
      floatingLogoEl.classList.remove('is-tooltip-visible');
    },
    [],
    startAt,
  );

  timeline.set(
    [transitionLogoEl, veilEl],
    {
      pointerEvents: 'none',
    },
    startAt,
  );

  timeline.set(
    transitionLogoEl,
    {
      autoAlpha: 0,
      scale: 1,
      xPercent: -50,
      yPercent: -50,
      left: '50%',
      top: () => (window.innerHeight - getNavHeight()) / 2,
    },
    startAt,
  );

  timeline.to(
    floatingLogoEl,
    {
      autoAlpha: 1,
      pointerEvents: 'none',
      left: '50%',
      top: () => (window.innerHeight + getNavHeight()) / 2,
      scale: 1,
      duration: 0.72,
      ease: 'power2.inOut',
    },
    startAt + 0.08,
  );

  timeline.set(
    transitionLogoEl,
    {
      autoAlpha: 1,
      scale: 1,
    },
    handoffAt,
  );

  timeline.set(
    floatingLogoEl,
    {
      autoAlpha: 0,
    },
    handoffAt,
  );

  timeline.to(
    metricsEls,
    {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power3.out',
      stagger: 0.08,
    },
    startAt + 0.96,
  );

  timeline.to(
    contentEls,
    {
      autoAlpha: 0,
      y: -18,
      pointerEvents: 'none',
      duration: 0.36,
      ease: 'none',
      stagger: 0.03,
    },
    zoomStart,
  );

  timeline.to(
    metricsEls,
    {
      autoAlpha: 0,
      y: -18,
      duration: 0.34,
      ease: 'none',
      stagger: 0.03,
    },
    zoomStart,
  );

  timeline.to(
    transitionLogoEl,
    {
      scale: () => getLogoFillScale(transitionLogoEl),
      duration: 0.86,
      ease: 'none',
    },
    zoomStart,
  );

  timeline.to(
    veilEl,
    {
      autoAlpha: 1,
      backgroundColor: DARK_BACKGROUND,
      duration: 0.72,
      ease: 'none',
    },
    zoomStart + 0.12,
  );

  if (logoImage) {
    timeline.to(
      logoImage,
      {
        autoAlpha: 0,
        duration: 0.18,
        ease: 'none',
      },
      zoomStart + 0.72,
    );
  }

  timeline.set(
    panelEl,
    {
      backgroundColor: DARK_BACKGROUND,
    },
    zoomStart + 0.84,
  );

  return totalDuration;
}
