/** Media player only. Scroll position and all animation timing belong to the family driver. */
export function createStoryVideo(hero: HTMLElement, signal: AbortSignal) {
  const video = hero.querySelector<HTMLVideoElement>('[data-story-video]');
  const retry = hero.querySelector<HTMLButtonElement>('[data-video-retry]')!;
  const captions = [...hero.querySelectorAll<HTMLElement>('[data-caption]')];
  const segments = [...hero.querySelectorAll('[data-segment]')];
  const progress = hero.querySelector('[role="progressbar"]')!;
  const count = captions.length;
  const duration = Number(hero.dataset.duration);
  const frameRate = Number(hero.dataset.frameRate) || 24;
  const clips = JSON.parse(hero.dataset.clips || '[]') as string[];
  const ios = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  let ready = false;
  let failed = false;
  let active = false;
  let chapter = -1;
  let wantedTime = 0;
  let generation = 0;
  let chapterTimer = 0;
  let lastSeekAt = -Infinity;
  let nextSeekAt = 0;
  hero.dataset.mode = ios ? 'chapters' : 'scrub';

  const pause = () => {
    ++generation;
    window.clearTimeout(chapterTimer);
    video?.pause();
  };
  const source = () => clips[chapter] || video?.dataset.src || '';
  const chapterEnd = () => !video ? 0 : clips[chapter] ? video.duration : Math.min(video.duration, (chapter + 1) * duration / count);
  const playChapter = async () => {
    if (!video || failed || !active || document.hidden || chapter < 0) return;
    const request = ++generation;
    window.clearTimeout(chapterTimer);
    if (video.getAttribute('src') !== source()) {
      ready = false;
      video.src = source();
      video.load();
      return; // loadeddata resumes the current chapter; old play promises stay invalid.
    }
    if (!ready) return;
    try {
      const start = clips[chapter] ? 0 : chapter * duration / count;
      video.currentTime = Math.min(start + .01, Math.max(0, video.duration - .04));
      await video.play();
      if (request !== generation || signal.aborted) return;
      if (!active || document.hidden) { video.pause(); return; }
      retry.hidden = true;
      chapterTimer = window.setTimeout(() => {
        if (request === generation) video.pause();
      }, Math.max(0, chapterEnd() - video.currentTime - .04) * 1000);
    } catch {
      if (request === generation && active && !signal.aborted) retry.hidden = false;
    }
  };
  const syncVisibility = () => {
    if (!active || document.hidden) pause();
    else if (ios) void playChapter();
  };
  const update = (position: number, visible: boolean) => {
    const sequence = Math.min(1, position / .82);
    const next = Math.min(count - 1, Math.floor(sequence * count));
    const changed = next !== chapter;
    const wasActive = active;
    active = visible && position < .84;
    wantedTime = sequence * duration;
    captions.forEach((caption, index) => {
      const value = String(index !== next || !active);
      if (caption.getAttribute('aria-hidden') !== value) caption.setAttribute('aria-hidden', value);
    });
    if (changed) {
      chapter = next;
      progress.setAttribute('aria-valuenow', String(chapter + 1));
      segments.forEach((segment, index) => segment.classList.toggle('is-active', index <= chapter));
    }
    if (!active && wasActive) pause();
    if (active && ios && (changed || !wasActive)) void playChapter();
    if (!active && !retry.hidden) retry.hidden = true;
    else if (active && failed && retry.hidden) retry.hidden = false;
  };
  // Called by the driver's existing GSAP ticker: no second RAF or ticker listener.
  const tick = (now = performance.now()) => {
    if (!video || ios || !ready || failed || !active || document.hidden || video.seeking) return;
    // The current film is 24 fps: decoding more seeks cannot produce more frames.
    if (now < nextSeekAt || now - lastSeekAt < 1000 / frameRate) return;
    const target = Math.min(Math.floor(wantedTime * frameRate) / frameRate, Math.max(0, video.duration - .04));
    if (Math.abs(video.currentTime - target) <= 1 / 30) return;
    lastSeekAt = now;
    try { video.currentTime = target; } catch { /* Metadata can change during source recovery. */ }
  };
  if (video) {
    video.muted = true;
    // Give the browser a presentation frame after decoding before another seek.
    video.addEventListener('seeked', () => { nextSeekAt = performance.now() + 1000 / frameRate; }, { signal });
    video.addEventListener('loadeddata', () => {
      if (signal.aborted) return;
      ready = true; failed = false;
      video.style.opacity = '1';
      retry.hidden = true;
      if (ios) void playChapter();
    }, { signal });
    video.addEventListener('error', () => {
      failed = true; ready = false; pause();
      video.style.opacity = '0';
      retry.hidden = !active;
    }, { signal });
    video.addEventListener('timeupdate', () => {
      if (ios && active && chapter >= 0 && video.currentTime >= chapterEnd() - .06) video.pause();
    }, { signal });
    retry.addEventListener('click', () => {
      if (failed) {
        failed = false; ready = false; retry.hidden = true;
        video.src = source(); video.load();
      } else if (ios) void playChapter();
      else tick();
    }, { signal });
    video.preload = 'auto';
    video.src = video.dataset.src!;
    video.load();
  }
  document.addEventListener('visibilitychange', syncVisibility, { signal });
  update(0, true);
  return {
    update, tick, pause,
    dispose() {
      active = false; pause();
      video?.removeAttribute('src'); video?.load();
      video?.style.removeProperty('opacity');
      delete hero.dataset.mode;
      captions.forEach(caption => caption.removeAttribute('aria-hidden'));
      retry.hidden = true;
    },
  };
}
