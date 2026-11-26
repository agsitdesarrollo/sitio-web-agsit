import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const setupContactNavigation = () => {
  const contactState = ScrollTrigger.getById('service-page-contact-state');
  const contact = contactState?.trigger;
  if (!contactState || !(contact instanceof HTMLElement) || contact.id !== 'contacto') return;
  if (contact.closest('[data-project-management-detail]')) return;

  // ScrollTrigger counts progress zero as outside. Include the aligned Contact
  // stop in the active range so arriving from below does not restore a panel.
  const getContactOffset = () =>
    Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--app-track-offset')) || 0;
  contactState.vars.start = () => `top top+=${getContactOffset() + 1}`;

  const scroll = ScrollTrigger.getScrollFunc(window);
  let pendingFrame = 0;
  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = (event.target as Element | null)?.closest('.site-nav a[href="#contacto"], .site-footer a[href="#contacto"]');
    if (!link) return;

    event.preventDefault();
    // Header links already use the shared mobile menu close handler.
    document.querySelector<HTMLButtonElement>('.site-nav .menu-toggle[aria-expanded="true"]')?.click();
    cancelAnimationFrame(pendingFrame);
    const requestedAt = performance.now();
    let lastMovementAt = requestedAt;
    let previousScroll = window.scrollY;

    const navigateToContact = (now: number) => {
      // Let the mobile menu finish closing and any active panel animation
      // finish writing scroll positions before jumping to Contact.
      const currentScroll = window.scrollY;
      if (currentScroll !== previousScroll) {
        previousScroll = currentScroll;
        lastMovementAt = now;
      }
      if (now - lastMovementAt < 50 && now - requestedAt < 1200) {
        pendingFrame = requestAnimationFrame(navigateToContact);
        return;
      }

      pendingFrame = 0;
      const position = Math.round(currentScroll + contact.getBoundingClientRect().top - getContactOffset());
      if (window.location.hash !== '#contacto') window.history.pushState(null, '', '#contacto');
      scroll(position);
      if (Math.abs(contactState.start - (position - 1)) > 1) contactState.refresh();
      ScrollTrigger.update();
      contact.tabIndex = -1;
      contact.focus({ preventScroll: true });
    };

    pendingFrame = requestAnimationFrame(navigateToContact);
  });
};
