import gsap from 'gsap';
import type { MarketingStop } from './marketingServiceFit';
export function createMarketingMotion(root: HTMLElement, reduced: boolean) {
    const q = (s: string) => root.querySelectorAll<HTMLElement>(s);
    const hero = root.querySelector<HTMLElement>('.ms-hero')!;
    let entrance: gsap.core.Timeline | undefined;
    let heroTween: gsap.core.Tween | undefined;
    let deadline = 0;
    const heroFill = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } })
        .fromTo(q('[data-ms-draw]'), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .65 }, 0)
        .fromTo(q('.ms-fill-mask'), { xPercent: -101 }, { xPercent: 0, duration: .65 }, .1)
        .fromTo(q('.ms-fill-text'), { xPercent: 101 }, { xPercent: 0, duration: .65 }, .1)
        .fromTo(q('.ms-seal'), { opacity: 0, y: -50, scale: .8, rotation: -18 }, { opacity: 1, y: 0, scale: 1, rotation: -8, duration: .65 }, .2)
        .fromTo(q('.ms-seal .ms-echo__copy'), { opacity: 0, x: 0, y: 0 }, { opacity: 1, x: (i) => (i === 0 ? 2 : 1) * parseFloat(getComputedStyle(root).getPropertyValue('--ms-echo')), y: (i) => (i === 0 ? 2 : 1) * parseFloat(getComputedStyle(root).getPropertyValue('--ms-echo')), duration: .5 }, .35)
        .fromTo(q('.ms-browser-echo'), { opacity: 0 }, { opacity: 1, duration: .4 }, .5)
        .fromTo(q('.ms-hero__details'), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .45 }, .65);
    const rows = Array.from(q('.ms-problem-row'));
    const drift = rows.map((row, i) => gsap.fromTo(row, { x: i % 2 ? -4 : 4 }, { x: i % 2 ? 4 : -4, duration: 7 + i, repeat: -1, yoyo: true, ease: 'sine.inOut', paused: true }));
    const stars = gsap.to(q('[data-ms-star]'), { opacity: .65, duration: 2, stagger: .3, repeat: -1, yoyo: true, ease: 'sine.inOut', paused: true });
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
    const pause = () => { pausedByUser = !pausedByUser; if (toggle) {
        toggle.setAttribute('aria-pressed', String(pausedByUser));
        toggle.textContent = pausedByUser ? toggle.dataset.resume! : toggle.dataset.pause!;
    } updateLoops(); };
    const over = () => { hovering = true; updateLoops(); };
    const out = () => { hovering = false; updateLoops(); };
    const focus = () => { focused = true; updateLoops(); };
    const blur = (event: FocusEvent) => { if (!problemPanel.contains(event.relatedTarget as Node)) {
        focused = false;
        updateLoops();
    } };
    const touch = (event: PointerEvent) => { if (event.pointerType === 'touch' && !(event.target as Element).closest('button')) {
        pausedByUser = true;
        if (toggle) {
            toggle.setAttribute('aria-pressed', 'true');
            toggle.textContent = toggle.dataset.resume!;
        }
        updateLoops();
    } };
    toggle?.addEventListener('click', pause);
    problemPanel.addEventListener('mouseenter', over);
    problemPanel.addEventListener('mouseleave', out);
    problemPanel.addEventListener('focusin', focus);
    problemPanel.addEventListener('focusout', blur);
    problemPanel.addEventListener('pointerdown', touch);
    document.addEventListener('visibilitychange', updateLoops);
    const finish = () => { clearTimeout(deadline); entrance?.progress(1); heroTween?.progress(1); entrance?.kill(); heroTween?.kill(); };
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
            if (!previous && !fast)
                entrance = gsap.timeline().fromTo(q('[data-ms-intro], .ms-explore'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .7, stagger: .1, ease: 'power3.out' });
        }
        else if (!fast) {
            entrance = gsap.timeline({ defaults: { duration: .8, ease: 'power3.out' } });
            if (stop.panel.dataset.msPanel === 'problems') {
                entrance.fromTo(rows, { x: (i) => i % 2 ? 45 : -45, opacity: 0 }, { x: 0, opacity: 1, stagger: .1 }, 0);
                entrance.fromTo(q('.ms-problem-card p'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .6 }, .25);
            }
            else if (stop.panel.dataset.msPanel === 'solution') {
                entrance.fromTo(q('.ms-cloud'), { xPercent: 0, y: 0, opacity: 1 }, { xPercent: (i) => i % 2 ? 100 : -100, y: -30, opacity: 0, duration: 1, ease: 'power2.inOut' }, 0);
                entrance.fromTo(q('.ms-solution h2'), { y: 30, opacity: 0, scale: .95 }, { y: 0, opacity: 1, scale: 1 }, .15);
                entrance.fromTo(q('.ms-solution__copy'), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: .55 }, .45);
            }
            else if (stop.panel.dataset.msPanel === 'audience') {
                entrance.fromTo(Array.from(q('.ms-profile')).filter(e => getComputedStyle(e).display !== 'none'), { y: 28, opacity: 0 }, { y: 0, opacity: 1, stagger: .12, duration: .7 });
            }
            else if (stop.service !== undefined) {
                const card = root.querySelector<HTMLElement>(`[data-service-index="${stop.service}"]`)!;
                gsap.set(card, { x: 0, xPercent: 0, y: 0, opacity: 1 });
                const backward = previous?.service !== undefined && previous.service > stop.service;
                const outgoing = previous?.service !== undefined ? root.querySelector<HTMLElement>(`[data-service-index="${previous.service}"]`) : null;
                if (backward && outgoing && outgoing !== card) {
                    gsap.set(outgoing, { visibility: 'visible', zIndex: 4 });
                    entrance.to(outgoing, { xPercent: 110, opacity: 0, duration: .85, ease: 'power3.inOut' }, 0).set(outgoing, { visibility: 'hidden', zIndex: 0 });
                }
                else
                    entrance.fromTo(card, { xPercent: previous?.service === stop.service ? 0 : 105, opacity: previous?.service === stop.service ? 0 : 1 }, { xPercent: 0, opacity: 1, duration: .85, ease: 'power3.inOut' });
            }
        }
        if (fast) {
            gsap.set(q('.ms-service-card'), { opacity: 1, x: 0, xPercent: 0, y: 0 });
            gsap.set(q('.ms-cloud'), { opacity: 0 });
            gsap.set(q('.ms-profile, .ms-problem-row, .ms-problem-card p, .ms-solution h2, .ms-solution__copy'), { opacity: 1, x: 0, y: 0, scale: 1 });
        }
        // A throttled frame clock must never leave a card transparent or off screen.
        if (!fast)
            deadline = window.setTimeout(finish, 1150);
        updateLoops();
    };
    return { show, finish, updateLoops, destroy() { finish(); entrance?.kill(); heroTween?.kill(); heroFill.revert(); drift.forEach(t => t.revert()); stars.revert(); toggle?.removeEventListener('click', pause); problemPanel.removeEventListener('mouseenter', over); problemPanel.removeEventListener('mouseleave', out); problemPanel.removeEventListener('focusin', focus); problemPanel.removeEventListener('focusout', blur); problemPanel.removeEventListener('pointerdown', touch); document.removeEventListener('visibilitychange', updateLoops); root.querySelectorAll<HTMLElement>('[style]').forEach(el => { if (!el.matches('.ms-media,.ms-cloud,.ms-deck'))
            el.style.removeProperty('transform'); }); } };
}
