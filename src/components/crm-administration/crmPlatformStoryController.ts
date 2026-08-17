import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const getNavOffset = () =>
  Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--app-track-offset')) || 0;

export const setupCrmPlatformStory = () => {
  const root = document.querySelector<HTMLElement>('.crm-platform-page');
  const section = root?.querySelector<HTMLElement>('.js-crm-story');
  const stage = section?.querySelector<HTMLElement>('.crm-story-stage');
  const cards = stage ? gsap.utils.toArray<HTMLElement>('.crm-story-card', stage) : [];
  const dots = section ? Array.from(section.querySelectorAll<HTMLElement>('[data-crm-story-dot]')) : [];

  if (!root || !section || !stage || cards.length < 2 || root.dataset.crmStoryReady === 'true') return;
  root.dataset.crmStoryReady = 'true';

  const setActiveDot = (index: number) => {
    dots.forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === index));
  };

  const media = gsap.matchMedia();
  media.add(
    {
      desktop: '(min-width: 961px) and (min-height: 640px)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    },
    (context) => {
      const { desktop, reduceMotion } = context.conditions as { desktop: boolean; reduceMotion: boolean };

      if (!desktop || reduceMotion) {
        gsap.set(cards, { clearProps: 'all' });
        setActiveDot(0);
        return;
      }

      gsap.set(cards, { autoAlpha: 0, y: 22, scale: 0.985 });
      gsap.set(cards[0], { autoAlpha: 1, y: 0, scale: 1 });

      const timeline = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          id: 'crm-platform-story',
          trigger: section,
          start: () => `top top+=${getNavOffset()}`,
          end: () => `+=${Math.round(window.innerHeight * 2.15)}`,
          pin: true,
          scrub: 0.55,
          snap: { snapTo: 'labelsDirectional', duration: { min: 0.16, max: 0.34 }, ease: 'power2.inOut' },
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => setActiveDot(Math.round(self.progress * (cards.length - 1))),
        },
      });

      timeline.addLabel('story-0', 0).to({}, { duration: 0.72 });
      cards.slice(1).forEach((card, index) => {
        const previous = cards[index];
        const label = `story-${index + 1}`;
        timeline
          .addLabel(label)
          .to(previous, { autoAlpha: 0, y: -18, scale: 0.985, duration: 0.34 }, label)
          .to(card, { autoAlpha: 1, y: 0, scale: 1, duration: 0.46 }, label)
          .to({}, { duration: 0.48 });
      });

      return () => {
        timeline.kill();
        gsap.set(cards, { clearProps: 'all' });
        setActiveDot(0);
      };
    },
  );

  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener('agsit:viewport-change', refresh, { passive: true });
  window.addEventListener('pagehide', () => media.revert(), { once: true });
  requestAnimationFrame(refresh);
};
