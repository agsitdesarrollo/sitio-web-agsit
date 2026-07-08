const DARK_BACKGROUND = '#020712';

// The transition logo's layout box is oversized by this factor and compensated
// with transform scale. Browsers rasterize <img> content (SVG included) at layout
// size, so an oversized box keeps the full-screen zoom crisp instead of blowing
// up a ~120px raster. Keep in sync with --logo-oversample in AboutHorizontal.css.
export const ALLIANCE_LOGO_OVERSAMPLE = 12;

const getNavHeight = () => {
  const navRectHeight = document.querySelector<HTMLElement>('.site-nav')?.getBoundingClientRect().height;
  if (navRectHeight && Number.isFinite(navRectHeight)) return navRectHeight;

  const cssNavHeight = Number.parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-h'),
  );
  return Number.isFinite(cssNavHeight) ? cssNavHeight : 0;
};

// On mobile the logo lands slightly above the triangle wrap's visual center so it
// sits better between Alcance, Costo and Tiempo.
const getMobileCenterOffset = () =>
  0;

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
  // Layout size (offsetWidth/Height) on purpose: getBoundingClientRect includes the
  // current transform scale and would compound with the oversampled box.
  const width = Math.max(logoEl.offsetWidth, 1);
  const height = Math.max(logoEl.offsetHeight, 1);

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
    panelEl,
    {
      backgroundColor: '#ffffff',
    },
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
      scale: 1 / ALLIANCE_LOGO_OVERSAMPLE,
      xPercent: -50,
      yPercent: -50,
      left: '50%',
      top: () => window.innerHeight / 2 + getMobileCenterOffset(),
    },
    startAt,
  );

  if (logoImage) {
    timeline.set(
      logoImage,
      {
        autoAlpha: 1,
      },
      startAt,
    );
  }

  timeline.to(
    floatingLogoEl,
    {
      autoAlpha: 1,
      pointerEvents: 'none',
      left: '50%',
      top: () => getNavHeight() + window.innerHeight / 2 + getMobileCenterOffset(),
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
      scale: 1 / ALLIANCE_LOGO_OVERSAMPLE,
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

  timeline.to(
    panelEl,
    {
      backgroundColor: DARK_BACKGROUND,
      duration: 0.12,
      ease: 'none',
    },
    zoomStart + 0.84,
  );

  return totalDuration;
}
