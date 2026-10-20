export type ServicePart = 'all' | 'text' | 'media';
export type MarketingStop = {
    panel: HTMLElement;
    key: string;
    hero?: 0 | 1;
    profile?: number;
    service?: number;
    part?: ServicePart;
    problemRow?: number;
};
/**
 * Puts the longer of the two languages into every translatable element while we measure, so the
 * density and the number of stops are the same in Spanish and English. Returns the restore function.
 */
function useLongestText(root: HTMLElement) {
    const saved: Array<[HTMLElement, string]> = [];
    root.querySelectorAll<HTMLElement>('[data-ms-alt]').forEach(el => {
        const alt = el.dataset.msAlt;
        if (!alt)
            return;
        const leaves = el.hasAttribute('data-ms-flat') || !el.children.length
            ? [el]
            : Array.from(el.querySelectorAll<HTMLElement>('*')).filter(n => !n.children.length && (n.textContent || '').trim());
        if (!leaves.length)
            return;
        const current = (leaves[0].textContent || '').replace(/\s+/g, ' ').trim();
        if (alt.length <= current.length)
            return;
        leaves.forEach(leaf => { saved.push([leaf, leaf.innerHTML]); leaf.textContent = alt; });
    });
    return () => saved.forEach(([leaf, html]) => { leaf.innerHTML = html; });
}
/** Actual content bounds, after fonts and responsive recomposition. No device-height guesses. */
export function measureMarketingStops(root: HTMLElement, reduced: boolean): MarketingStop[] {
    const restoreText = useLongestText(root);
    const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-ms-panel]'));
    const stops: MarketingStop[] = [];
    const rootStyle = getComputedStyle(root);
    const echo = parseFloat(rootStyle.getPropertyValue('--ms-echo')) * 2 + 2;
    const edge = parseFloat(rootStyle.getPropertyValue('--ms-deck-edge')) || 30;
    const fits = (panel: HTMLElement) => {
        const box = panel.getBoundingClientRect();
        const bottom = root.querySelector<HTMLElement>('.ms-navigation')!.getBoundingClientRect().top - 4;
        const candidates = panel.querySelectorAll<HTMLElement>('[data-ms-fit], .ms-service-card, .ms-profile, .ms-hero__details, .ms-service-card > .ms-media');
        return Array.from(candidates).filter(el => el.getClientRects().length > 0).every(el => {
            // Layout offsets exclude a running entrance transform. We measure the complete resting state.
            let x = el.offsetLeft, y = el.offsetTop, parent = el.offsetParent as HTMLElement | null;
            while (parent && parent !== panel) {
                x += parent.offsetLeft;
                y += parent.offsetTop;
                parent = parent.offsetParent as HTMLElement | null;
            }
            const left = box.left + x, top = box.top + y;
            const inside = top >= box.top + 4 && top + el.offsetHeight <= bottom + 1 && left >= 8 && left + el.offsetWidth + echo <= window.innerWidth - 8;
            const content = el.scrollWidth <= el.clientWidth + echo && (!el.matches('.ms-hero__frame,.ms-service-card') || el.scrollHeight <= el.clientHeight + (el.matches('.ms-hero__frame') ? 10 : 1));
            // A service card must keep its content clear of its own border, not just inside the stage.
            const clear = !el.matches('.ms-service-card') || Array.from(el.querySelectorAll<HTMLElement>('.ms-service-card__body, .ms-media')).filter(c => c.getClientRects().length > 0).every(c => {
                const inner = c.getBoundingClientRect(), outer = el.getBoundingClientRect();
                return inner.top >= outer.top + 10 && inner.bottom <= outer.bottom - 10;
            });
            return inside && content && clear;
        });
    };
    panels.forEach(panel => {
        panel.dataset.density = 'roomy';
        panel.classList.add('is-measuring');
        delete panel.dataset.split;
        delete panel.dataset.recompose;
        const kind = panel.dataset.msPanel!;
        const cards = Array.from(panel.querySelectorAll<HTMLElement>('.ms-service-card'));
        cards.forEach(card => { card.dataset.part = 'all'; card.style.removeProperty('transform'); });
        const profiles = Array.from(panel.querySelectorAll<HTMLElement>('.ms-profile'));
        panel.style.setProperty('--profile-count', String(Math.max(1, profiles.length)));
        if (kind === 'services') {
            // Reserve the edges of every older card from the first service, so the active card never moves or changes width.
            const edgeSpace = Math.max(0, cards.length - 1) * edge;
            panel.dataset.numbers = String(window.innerWidth < 860 || edgeSpace > window.innerWidth * .16);
            panel.style.setProperty('--deck-space', panel.dataset.numbers === 'true' ? '0px' : `${edgeSpace}px`);
            panel.style.setProperty('--numbers-h', `${(panel.querySelector<HTMLElement>('.ms-deck-tabs')?.offsetHeight || 40) + 8}px`);
        }
        for (const density of ['roomy', 'compact', 'small']) {
            panel.dataset.density = density;
            if (fits(panel))
                break;
        }
        if (kind === 'hero') {
            if (!reduced)
                stops.push({ panel, key: 'hero-start', hero: 0 });
            stops.push({ panel, key: 'hero-complete', hero: 1 });
        }
        else if (kind === 'audience') {
            if (!fits(panel))
                panel.dataset.recompose = 'true';
            if (!fits(panel)) {
                panel.dataset.split = 'true';
                profiles.forEach((profile, i) => { profile.classList.toggle('is-current', i === 0); });
                profiles.forEach((_, i) => stops.push({ panel, key: `profile-${i}`, profile: i }));
            }
            else
                stops.push({ panel, key: 'audience' });
        }
        else if (kind === 'services') {
            // A service is split only when it truly does not fit, and never in more than two stops: text, then image.
            cards.forEach((card, i) => {
                cards.forEach(c => c.style.display = c === card ? '' : 'none');
                if (fits(panel))
                    stops.push({ panel, key: `service-${i}`, service: i, part: 'all' });
                else {
                    stops.push({ panel, key: `service-${i}-text`, service: i, part: 'text' });
                    stops.push({ panel, key: `service-${i}-media`, service: i, part: 'media' });
                }
            });
            cards.forEach(c => c.style.removeProperty('display'));
        }
        else if (kind === 'problems' && !fits(panel)) {
            panel.dataset.split = 'true';
            panel.querySelectorAll('.ms-problem-row').forEach((_, i) => stops.push({ panel, key: `problems-${i}`, problemRow: i }));
        }
        else
            stops.push({ panel, key: kind });
        panel.classList.remove('is-measuring');
    });
    // Validate the final compositions too, including every split profile and service part.
    // The diagnostic is consumed by the browser audit; an empty stage is never a fit success.
    const overflow: string[] = [];
    stops.forEach(stop => {
        const panel = stop.panel;
        panel.classList.add('is-measuring');
        panel.querySelectorAll<HTMLElement>('.ms-profile').forEach((profile, i) => profile.classList.toggle('is-current', stop.profile === undefined || stop.profile === i));
        panel.querySelectorAll<HTMLElement>('.ms-problem-row').forEach((row, i) => row.style.display = stop.problemRow === undefined || stop.problemRow === i ? '' : 'none');
        panel.querySelectorAll<HTMLElement>('.ms-service-card').forEach((card, i) => { card.style.display = stop.service === i ? '' : 'none'; card.dataset.part = stop.part ?? 'all'; });
        if (!fits(panel))
            overflow.push(stop.key);
        panel.classList.remove('is-measuring');
    });
    root.querySelectorAll<HTMLElement>('.ms-service-card,.ms-problem-row').forEach(el => el.style.removeProperty('display'));
    root.querySelectorAll<HTMLElement>('.ms-service-card').forEach(card => { card.dataset.part = 'all'; });
    restoreText();
    root.dataset.fitOverflow = overflow.join(',');
    return stops;
}
