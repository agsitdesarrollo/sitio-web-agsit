export type ServicePart = 'all' | 'overview' | 'details' | 'intro' | 'copy';
export type MarketingStop = {
    panel: HTMLElement;
    key: string;
    hero?: 0 | 1;
    profile?: number;
    service?: number;
    part?: ServicePart;
    problemRow?: number;
};
/** Actual content bounds, after fonts and responsive recomposition. No device-height guesses. */
export function measureMarketingStops(root: HTMLElement, reduced: boolean): MarketingStop[] {
    const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-ms-panel]'));
    const stops: MarketingStop[] = [];
    const height = Number(root.dataset.visibleHeight);
    const echo = parseFloat(getComputedStyle(root).getPropertyValue('--ms-echo')) * 2 + 2;
    const fits = (panel: HTMLElement) => {
        const box = panel.getBoundingClientRect();
        const bottom = root.querySelector<HTMLElement>('.ms-navigation')!.getBoundingClientRect().top - 4;
        const candidates = panel.querySelectorAll<HTMLElement>('[data-ms-fit], .ms-service-card, .ms-profile, .ms-hero__details, .ms-explore, .ms-service-card > .ms-media');
        return Array.from(candidates).filter(el => el.getClientRects().length > 0).every(el => {
            // Layout offsets exclude a running entrance transform. We measure the complete resting state.
            let x = el.offsetLeft, y = el.offsetTop, parent = el.offsetParent as HTMLElement | null;
            while (parent && parent !== panel) {
                x += parent.offsetLeft;
                y += parent.offsetTop;
                parent = parent.offsetParent as HTMLElement | null;
            }
            const left = box.left + x, top = box.top + y;
            return top >= box.top + 4 && top + el.offsetHeight <= bottom + 1 && left >= 8 && left + el.offsetWidth + echo <= window.innerWidth - 8 && el.scrollWidth <= el.clientWidth + echo;
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
            // Reserve edges for arbitrary service counts; use numbers before they steal reading width.
            const edge = 32;
            const edgeSpace = Math.max(0, cards.length - 1) * edge;
            panel.dataset.numbers = String(window.innerWidth < 760 || edgeSpace > window.innerWidth * .18);
            panel.style.setProperty('--deck-edge', `${edge}px`);
            panel.style.setProperty('--deck-space', panel.dataset.numbers === 'true' ? '0px' : `${edgeSpace}px`);
            panel.querySelectorAll<HTMLElement>('[data-ms-service]').forEach(button => button.style.removeProperty('display'));
            panel.style.setProperty('--numbers-h', `${(panel.querySelector<HTMLElement>('.ms-deck-tabs')?.offsetHeight || 40) + 6}px`);
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
            cards.forEach((card, i) => {
                cards.forEach(c => c.style.display = c === card ? '' : 'none');
                if (fits(panel))
                    stops.push({ panel, key: `service-${i}`, service: i, part: 'all' });
                else {
                    card.dataset.part = 'overview';
                    if (fits(panel))
                        stops.push({ panel, key: `service-${i}-overview`, service: i, part: 'overview' });
                    else {
                        stops.push({ panel, key: `service-${i}-intro`, service: i, part: 'intro' });
                        stops.push({ panel, key: `service-${i}-copy`, service: i, part: 'copy' });
                    }
                    stops.push({ panel, key: `service-${i}-details`, service: i, part: 'details' });
                }
                card.dataset.part = 'all';
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
        panel.querySelectorAll<HTMLElement>('.ms-profile').forEach((profile, i) => profile.classList.toggle('is-current', stop.profile === undefined || stop.profile === i));
        panel.querySelectorAll<HTMLElement>('.ms-problem-row').forEach((row, i) => row.style.display = stop.problemRow === undefined || stop.problemRow === i ? '' : 'none');
        panel.querySelectorAll<HTMLElement>('.ms-service-card').forEach((card, i) => { card.style.display = stop.service === i ? '' : 'none'; card.dataset.part = stop.part ?? 'all'; });
        if (!fits(panel))
            overflow.push(stop.key);
    });
    root.querySelectorAll<HTMLElement>('.ms-service-card,.ms-problem-row').forEach(el => el.style.removeProperty('display'));
    root.dataset.fitOverflow = overflow.join(',');
    return stops;
}
