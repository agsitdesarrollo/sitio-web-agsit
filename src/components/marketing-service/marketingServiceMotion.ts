import gsap from 'gsap';
import type { MarketingStop } from './marketingServiceFit';
export function createMarketingMotion(root: HTMLElement, reduced: boolean) {
    const q = (s: string) => root.querySelectorAll<HTMLElement>(s);
    const cssNumber = (name: string) => parseFloat(getComputedStyle(root).getPropertyValue(name)) || 0;
    const hero = root.querySelector<HTMLElement>('.ms-hero')!;
    let entrance: gsap.core.Timeline | undefined;
    let heroTween: gsap.core.Tween | undefined;
    let deadline = 0;
    // Hero stop 2: the window is drawn, the first line fills, the seal drops in and the details arrive.
    const heroFill = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } })
        .fromTo(q('.ms-browser'), { opacity: 0 }, { opacity: 1, duration: .05, ease: 'none' }, 0)
        .fromTo(q('[data-ms-draw]'), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .65 }, 0)
        .fromTo(q('.ms-explore'), { opacity: 1 }, { opacity: 0, duration: .2, ease: 'none' }, 0)
        .fromTo(q('.ms-fill-mask'), { xPercent: -101 }, { xPercent: 0, duration: .65 }, .1)
        .fromTo(q('.ms-fill-text'), { xPercent: 101 }, { xPercent: 0, duration: .65 }, .1)
        .fromTo(q('.ms-seal'), { opacity: 0, y: -70, scale: .7, '--seal-rot': '-20deg', '--seal-echo': 0 }, { opacity: 1, y: 0, scale: 1, '--seal-rot': '-8deg', '--seal-echo': 1, duration: .6, ease: 'back.out(1.5)' }, .25)
        .fromTo(q('.ms-browser-echo'), { opacity: 0 }, { opacity: 1, duration: .35 }, .55)
        .fromTo(q('.ms-hero__details'), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .45 }, .65);
    // Problems: the two rows drift slowly in opposite directions; the echo is part of each card, so it travels with it.
    const rows = Array.from(q('.ms-problem-row'));
    const drift = rows.map((row, i) => {
        const sign = i % 2 ? -1 : 1;
        const tween = gsap.fromTo(row, { x: () => sign * cssNumber('--ms-drift') }, { x: () => -sign * cssNumber('--ms-drift'), duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut', paused: true, immediateRender: false });
        tween.progress(.5);
        return tween;
    });
    const stars = gsap.to(q('[data-ms-star]'), { opacity: .9, duration: 2.2, stagger: .25, repeat: -1, yoyo: true, ease: 'sine.inOut', paused: true });
    const clouds = Array.from(q('.ms-cloud'));
    const cards = Array.from(q('.ms-service-card'));
    let active: MarketingStop | undefined;
    let pausedByUser = false;
    let hovering = false;
    let focused = false;
    const toggle = root.querySelector<HTMLButtonElement>('[data-ms-pause]');
    const problemPanel = root.querySelector<HTMLElement>('.ms-problems')!;
    const updateLoops = () => {
        const visible = !document.hidden && !document.body.classList.contains('drawer-open') && !root.querySelector<HTMLElement>('.ms-viewport')?.inert;
        drift.forEach(t => visible && active?.panel === problemPanel && !reduced && !pausedByUser && !hovering && !focused ? t.play() : t.pause());
        visible && active?.panel === hero && !reduced ? stars.play() : stars.pause();
    };
    const setPaused = (value: boolean) => {
        pausedByUser = value;
        if (toggle) {
            toggle.setAttribute('aria-pressed', String(value));
            toggle.textContent = value ? toggle.dataset.resume! : toggle.dataset.pause!;
        }
        updateLoops();
    };
    const pause = () => setPaused(!pausedByUser);
    const over = () => { hovering = true; updateLoops(); };
    const out = () => { hovering = false; updateLoops(); };
    const focus = () => { focused = true; updateLoops(); };
    const blur = (event: FocusEvent) => { if (!problemPanel.contains(event.relatedTarget as Node)) {
        focused = false;
        updateLoops();
    } };
    const touch = (event: PointerEvent) => { if (event.pointerType === 'touch' && !(event.target as Element).closest('button'))
        setPaused(true); };
    toggle?.addEventListener('click', pause);
    problemPanel.addEventListener('mouseenter', over);
    problemPanel.addEventListener('mouseleave', out);
    problemPanel.addEventListener('focusin', focus);
    problemPanel.addEventListener('focusout', blur);
    problemPanel.addEventListener('pointerdown', touch);
    document.addEventListener('visibilitychange', updateLoops);
    const finish = () => { clearTimeout(deadline); entrance?.progress(1); heroTween?.progress(1); entrance?.kill(); heroTween?.kill(); };
    // Where each card of the deck rests when service `current` is the front one.
    const deckPosition = (k: number, current: number, edge: number) => k < current ? { x: -(current - k) * edge, xPercent: 0 } : k === current ? { x: 0, xPercent: 0 } : { x: window.innerWidth, xPercent: 0 };
    const show = (stop: MarketingStop, previous?: MarketingStop, immediate = false) => {
        finish();
        active = stop;
        const fast = immediate || reduced;
        if (stop.hero !== undefined) {
            const target = stop.hero === 1 ? heroFill.duration() : 0;
            if (fast)
                heroFill.time(target);
            else
                heroTween = heroFill.tweenTo(target, { duration: 1.1, ease: 'none' });
            root.querySelector<HTMLElement>('.ms-hero__details')!.inert = stop.hero === 0;
            root.querySelector<HTMLElement>('.ms-explore')!.inert = stop.hero === 1;
            if (!previous && !fast)
                entrance = gsap.timeline().fromTo(q('[data-ms-intro]'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .7, stagger: .1, ease: 'power3.out' });
        }
        else if (!fast) {
            entrance = gsap.timeline({ defaults: { duration: .8, ease: 'power3.out' } });
            if (stop.panel.dataset.msPanel === 'problems') {
                entrance.fromTo(rows, { xPercent: (i) => i % 2 ? 35 : -35, opacity: 0 }, { xPercent: 0, opacity: 1, stagger: .1 }, 0);
                entrance.fromTo(q('.ms-problem-card p'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .6 }, .25);
            }
            else if (stop.panel.dataset.msPanel === 'solution') {
                // The clouds open from behind the title to the sides, and stay there framing the text.
                const width = (clouds[0]?.parentElement as HTMLElement | undefined)?.clientWidth ?? 0;
                clouds.forEach(cloud => entrance!.fromTo(cloud, { x: width / 2 - (cloud.offsetLeft + cloud.offsetWidth / 2), opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, 0));
                entrance.fromTo(q('.ms-solution h2'), { y: 30, opacity: 0, scale: .95 }, { y: 0, opacity: 1, scale: 1 }, .15);
                entrance.fromTo(q('.ms-solution__copy'), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: .55 }, .45);
            }
            else if (stop.panel.dataset.msPanel === 'audience') {
                entrance.fromTo(Array.from(q('.ms-profile')).filter(e => getComputedStyle(e).display !== 'none'), { y: 28, opacity: 0 }, { y: 0, opacity: 1, stagger: .12, duration: .7 });
            }
            else if (stop.service !== undefined) {
                const current = stop.service;
                const edge = root.querySelector<HTMLElement>('.ms-services')?.dataset.numbers === 'true' ? 0 : cssNumber('--ms-deck-edge');
                const sameService = previous?.service === current;
                // Coming from outside the deck the front card starts off to the right.
                if (previous?.service === undefined)
                    cards.forEach((card, k) => gsap.set(card, k === current ? { x: window.innerWidth, xPercent: 0 } : deckPosition(k, current, edge)));
                cards.forEach((card, k) => entrance!.to(card, deckPosition(k, current, edge), 0));
                if (sameService)
                    entrance.fromTo(cards[current].querySelectorAll('.ms-service-card__body, .ms-media'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .5, clearProps: 'opacity,transform' }, 0);
            }
        }
        if (fast) {
            const current = stop.service ?? -1;
            const edge = root.querySelector<HTMLElement>('.ms-services')?.dataset.numbers === 'true' ? 0 : cssNumber('--ms-deck-edge');
            if (stop.service !== undefined)
                cards.forEach((card, k) => gsap.set(card, deckPosition(k, current, edge)));
            else if (stop.panel.dataset.msPanel === 'services')
                cards.forEach(card => gsap.set(card, { x: 0, xPercent: 0 }));
            gsap.set(clouds, { x: 0, opacity: 1 });
            gsap.set(q('.ms-profile, .ms-problem-card p, .ms-solution h2, .ms-solution__copy'), { opacity: 1, y: 0, scale: 1 });
            gsap.set(rows, { opacity: 1, xPercent: 0 });
        }
        // A throttled frame clock must never leave a card transparent or off screen.
        if (!fast)
            deadline = window.setTimeout(finish, 1300);
        updateLoops();
    };
    return { show, finish, updateLoops, destroy() { finish(); entrance?.kill(); heroTween?.kill(); heroFill.revert(); drift.forEach(t => t.revert()); stars.revert(); toggle?.removeEventListener('click', pause); problemPanel.removeEventListener('mouseenter', over); problemPanel.removeEventListener('mouseleave', out); problemPanel.removeEventListener('focusin', focus); problemPanel.removeEventListener('focusout', blur); problemPanel.removeEventListener('pointerdown', touch); document.removeEventListener('visibilitychange', updateLoops); gsap.set([...cards, ...clouds], { clearProps: 'transform,opacity' }); root.querySelectorAll<HTMLElement>('[style]').forEach(el => { if (!el.matches('.ms-media,.ms-deck,.ms-service-card'))
            el.style.removeProperty('transform'); }); } };
}
