import Lenis from 'lenis';
import { measureMarketingStops, type MarketingStop } from './marketingServiceFit';
import { createMarketingMotion } from './marketingServiceMotion';
/** Sole owner of scroll input. All positions refer to the same measured visible stage. */
export function setupMarketingServiceScroll() {
    const root = document.querySelector<HTMLElement>('[data-marketing-service]');
    if (!root || root.dataset.controllerReady)
        return;
    root.dataset.controllerReady = 'true';
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const fontsPending = document.fonts.status !== 'loaded';
    const experience = root.querySelector<HTMLElement>('.ms-experience')!;
    const viewport = root.querySelector<HTMLElement>('.ms-viewport')!;
    const header = document.querySelector<HTMLElement>('.site-nav')!;
    const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-ms-panel]'));
    const serviceCards = Array.from(root.querySelectorAll<HTMLElement>('[data-service-index]'));
    const profiles = Array.from(root.querySelectorAll<HTMLElement>('.ms-profile'));
    const rows = Array.from(root.querySelectorAll<HTMLElement>('.ms-problem-row'));
    let height = 1, stops: MarketingStop[] = [], index = 0, moving = false, resizeFrame = 0, lastWidth = 0, lastHeight = 0;
    let destination = 0, gestureAt = 0, gestureDirection = 0;
    let disposed = false;
    let motion = createMarketingMotion(root, preference.matches);
    const menuOpen = () => !!document.querySelector('.site-nav nav.is-open');
    const blocked = () => menuOpen() || document.body.classList.contains('drawer-open');
    const contactY = () => stops.length * height;
    const setHeaderDirection = (direction: number) => {
        if (!blocked())
            header.classList.toggle('is-scroll-hidden', direction > 0);
    };
    const applyStop = (next: number, immediate = false) => {
        const previous = stops[index];
        index = Math.max(0, Math.min(stops.length - 1, next));
        const stop = stops[index];
        if (!stop)
            return;
        if (stop.service !== undefined && stop.panel.dataset.numbers !== 'true')
            stop.panel.style.setProperty('--deck-space', `${stop.service * 32}px`);
        panels.forEach(p => { const current = p === stop.panel; p.classList.toggle('is-active', current); p.inert = !current; p.setAttribute('aria-hidden', String(!current)); });
        profiles.forEach((p, i) => { const shown = stop.profile === undefined || stop.profile === i; p.classList.toggle('is-current', shown); p.inert = !shown; p.setAttribute('aria-hidden', String(!shown)); });
        rows.forEach((row, i) => row.style.display = stop.problemRow === undefined || stop.problemRow === i ? '' : 'none');
        serviceCards.forEach((card, i) => { const current = i === stop.service; card.classList.toggle('is-current', current); card.inert = !current; card.setAttribute('aria-hidden', String(!current)); card.dataset.part = current ? stop.part ?? 'all' : 'all'; card.style.visibility = current ? 'visible' : 'hidden'; card.style.zIndex = current ? '2' : '0'; });
        root.querySelectorAll<HTMLButtonElement>('[data-ms-service]').forEach((b, i) => { b.setAttribute('aria-current', i === stop.service ? 'step' : 'false'); b.style.display = stop.panel.dataset.numbers === 'true' || stop.service === undefined || i < stop.service ? '' : 'none'; });
        root.querySelector('.ms-position')!.textContent = `${String(index + 1).padStart(2, '0')} / ${String(stops.length).padStart(2, '0')}`;
        root.querySelector<HTMLButtonElement>('[data-ms-previous]')!.disabled = index === 0;
        root.dataset.stop = stop.key;
        root.dataset.stopIndex = String(index);
        root.dataset.stopCount = String(stops.length);
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && root.contains(activeElement) && activeElement.closest('[inert]'))
            activeElement.blur();
        motion.show(stop, immediate ? undefined : previous, immediate);
    };
    const finish = () => { motion.finish(); if (moving) {
        lenis.scrollTo(destination, { immediate: true, force: true });
        moving = false;
    } };
    const go = (next: number, immediate = false) => {
        if (blocked())
            return;
        finish();
        const target = Math.max(0, Math.min(stops.length, next));
        setHeaderDirection(target - index);
        destination = target * height;
        if (target < stops.length)
            applyStop(target, immediate);
        else {
            viewport.inert = true;
            motion.updateLoops();
        }
        if (target < stops.length)
            viewport.inert = false;
        moving = !immediate && !preference.matches;
        lenis.scrollTo(destination, { force: true, immediate: !moving, duration: .65, onComplete: () => { moving = false; } });
    };
    const navigate = (direction: number) => {
        if (blocked())
            return;
        const y = window.scrollY;
        if (y >= contactY() - 2) {
            if (direction < 0)
                go(stops.length - 1);
            return;
        }
        go(index + direction);
    };
    const input = (direction: number) => {
        const now = performance.now();
        if (direction === gestureDirection && now - gestureAt < 220) {
            gestureAt = now;
            return;
        }
        gestureAt = now;
        gestureDirection = direction;
        navigate(direction);
    };
    const lenis = new Lenis({ autoRaf: true, smoothWheel: true, syncTouch: true, virtualScroll: ({ deltaY, event }) => {
            const cancel = () => { if (event.cancelable && (event.type === 'wheel' || event.type === 'touchmove'))
                event.preventDefault(); };
            if (blocked()) {
                if (!document.body.classList.contains('drawer-open'))
                    cancel();
                return false;
            }
            if (event instanceof WheelEvent && (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)))
                return true;
            if (Math.abs(deltaY) < 3) {
                if (window.scrollY < contactY() - 2)
                    cancel();
                return false;
            }
            if (window.scrollY >= contactY() - 2 && !moving) {
                if (deltaY < 0 && window.scrollY + deltaY < contactY()) {
                    cancel();
                    go(stops.length - 1);
                    return false;
                }
                return true;
            }
            cancel();
            // Touch is handled at the end of a deliberate swipe, not once per pixel.
            if (event.type.startsWith('touch'))
                return false;
            input(deltaY > 0 ? 1 : -1);
            return false;
        } });
    const refresh = () => {
        if (disposed || document.body.classList.contains('drawer-open'))
            return;
        const nextHeight = Math.floor(visualViewport?.height || innerHeight);
        const nextWidth = innerWidth;
        const nav = Math.ceil(header.offsetHeight);
        if (nextHeight === lastHeight && nextWidth === lastWidth && stops.length)
            return;
        finish();
        const key = stops[index]?.key;
        const previousStop = stops[index];
        const freeOffset = stops.length > 0 && window.scrollY >= contactY() - 2 ? window.scrollY - contactY() : null;
        lastHeight = nextHeight;
        lastWidth = nextWidth;
        height = Math.max(1, nextHeight - nav);
        root.style.setProperty('--ms-h', `${height}px`);
        root.style.setProperty('--ms-top', `${nav + (visualViewport?.offsetTop || 0)}px`);
        root.dataset.visibleHeight = String(height);
        root.classList.add('is-enhanced');
        root.style.setProperty('--ms-stops', '1');
        profiles.forEach(p => p.classList.add('is-current'));
        rows.forEach(r => r.style.removeProperty('display'));
        stops = measureMarketingStops(root, preference.matches);
        root.style.setProperty('--ms-stops', String(stops.length));
        let found = stops.findIndex(s => s.key === key);
        if (found < 0 && previousStop)
            found = stops.findIndex(s => s.panel === previousStop.panel && s.service === previousStop.service && (s.profile === previousStop.profile || s.profile === undefined));
        applyStop(found < 0 ? Math.min(index, stops.length - 1) : found, true);
        lenis.resize();
        viewport.inert = freeOffset !== null;
        lenis.scrollTo(freeOffset !== null ? contactY() + freeOffset : index * height, { immediate: true, force: true });
    };
    const schedule = () => { cancelAnimationFrame(resizeFrame); resizeFrame = requestAnimationFrame(refresh); };
    const remeasure = () => { lastHeight = 0; schedule(); };
    const click = (event: MouseEvent) => {
        const target = (event.target as Element).closest<HTMLElement>('button,a');
        if (!target)
            return;
        if (target.matches('[data-ms-next]')) {
            event.preventDefault();
            navigate(1);
        }
        else if (target.matches('[data-ms-previous]')) {
            event.preventDefault();
            navigate(-1);
        }
        else if (target.matches('[data-ms-service]')) {
            const i = Number(target.dataset.msService);
            go(stops.findIndex(s => s.service === i));
        }
        else if (target.matches('a[href="#contacto"]')) {
            event.preventDefault();
            go(stops.length);
        }
    };
    const keydown = (event: KeyboardEvent) => {
        if (blocked() || event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey)
            return;
        if ((event.target as Element).closest('input,textarea,select,[contenteditable="true"]'))
            return;
        if (event.key === ' ' && (event.target as Element).closest('button,a'))
            return;
        if (event.key === 'Home') {
            event.preventDefault();
            go(0);
            return;
        }
        const y = window.scrollY;
        const direction = ['ArrowDown', 'PageDown', ' '].includes(event.key) ? event.shiftKey ? -1 : 1 : ['ArrowUp', 'PageUp'].includes(event.key) ? -1 : 0;
        if (y >= contactY() - 2) {
            if (direction < 0 && y <= contactY() + 2) {
                event.preventDefault();
                navigate(-1);
            }
            return;
        }
        if (direction) {
            event.preventDefault();
            if (!event.repeat)
                navigate(direction);
        }
        else if (event.key === 'End') {
            event.preventDefault();
            go(stops.length);
        }
    };
    let touchY: number | null = null;
    const touchstart = (event: TouchEvent) => { touchY = event.touches[0]?.clientY ?? null; };
    const touchend = (event: TouchEvent) => { if (touchY === null)
        return; const delta = touchY - (event.changedTouches[0]?.clientY ?? touchY); touchY = null; if (Math.abs(delta) > 35 && window.scrollY < contactY() - 2)
        navigate(delta > 0 ? 1 : -1); };
    const scroll = () => {
        if (moving || blocked() || !stops.length)
            return;
        const y = window.scrollY;
        const inContact = y >= contactY() - 2;
        viewport.inert = inContact;
        if (!inContact) {
            const nearest = Math.min(stops.length - 1, Math.max(0, Math.round(y / height)));
            if (nearest !== index)
                applyStop(nearest, true);
        }
    };
    const preferenceChanged = () => { finish(); motion.destroy(); motion = createMarketingMotion(root, preference.matches); remeasure(); };
    const bodyObserver = new MutationObserver(() => { blocked() ? lenis.stop() : lenis.start(); motion.updateLoops(); });
    bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    root.addEventListener('click', click);
    // Header links live outside main; contact navigation must still use this owner.
    const headerClick = (event: MouseEvent) => { if ((event.target as Element).closest('a[href="#contacto"]')) {
        event.preventDefault();
        requestAnimationFrame(() => go(stops.length));
    } };
    header.addEventListener('click', headerClick);
    window.addEventListener('keydown', keydown);
    window.addEventListener('touchstart', touchstart, { passive: true });
    window.addEventListener('touchend', touchend, { passive: true });
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    window.addEventListener('orientationchange', remeasure, { passive: true });
    visualViewport?.addEventListener('resize', schedule, { passive: true });
    preference.addEventListener('change', preferenceChanged);
    // Explicit media dimensions keep image loading from changing geometry or interrupting entry.
    document.fonts.ready.then(() => { if (fontsPending && !disposed) {
        lastHeight = 0;
        refresh();
        motion.show(stops[index], undefined, preference.matches);
    } });
    refresh();
    motion.show(stops[index], undefined, preference.matches || fontsPending);
    window.addEventListener('pagehide', () => {
        disposed = true;
        cancelAnimationFrame(resizeFrame);
        bodyObserver.disconnect();
        motion.destroy();
        lenis.destroy();
        root.removeEventListener('click', click);
        header.removeEventListener('click', headerClick);
        window.removeEventListener('keydown', keydown);
        window.removeEventListener('touchstart', touchstart);
        window.removeEventListener('touchend', touchend);
        window.removeEventListener('scroll', scroll);
        window.removeEventListener('resize', schedule);
        window.removeEventListener('orientationchange', remeasure);
        visualViewport?.removeEventListener('resize', schedule);
        preference.removeEventListener('change', preferenceChanged);
        root.classList.remove('is-enhanced');
        delete root.dataset.controllerReady;
    }, { once: true });
}
window.addEventListener('pageshow', event => { if (event.persisted)
    setupMarketingServiceScroll(); });
