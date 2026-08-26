export type AllianceVideoHandoffState =
  | 'alliance-rest'
  | 'alliance-centering'
  | 'alliance-zoom'
  | 'waiting-video-frame'
  | 'moving-to-video'
  | 'video-fullscreen'
  | 'video-framed'
  | 'contact'
  | 'returning-alliance';

type HandoffSnapshot = {
  state: AllianceVideoHandoffState;
  viewportHeight: number | null;
  headerLocked: boolean;
};

const getViewportHeight = () => {
  const root = document.documentElement;
  const rootStyles = getComputedStyle(root);
  const measured = Number.parseFloat(rootStyles.getPropertyValue('--app-stable-vh'));

  return Number.isFinite(measured) && measured > 0
    ? Math.round(measured)
    : Math.round(window.visualViewport?.height || window.innerHeight);
};

class AllianceVideoHandoff {
  private state: AllianceVideoHandoffState = 'alliance-rest';
  private viewportHeight: number | null = null;
  private videoFullscreenAt = 0;
  private headerLocked = false;

  get snapshot(): HandoffSnapshot {
    return {
      state: this.state,
      viewportHeight: this.viewportHeight,
      headerLocked: this.headerLocked,
    };
  }

  get isActive() {
    return !['alliance-rest', 'alliance-centering', 'contact'].includes(this.state);
  }

  get isFullscreenLocked() {
    return ['waiting-video-frame', 'moving-to-video', 'video-fullscreen', 'returning-alliance'].includes(this.state);
  }

  get isHeaderLocked() {
    return this.headerLocked;
  }

  get isVideoFullscreenSettled() {
    return this.state === 'video-fullscreen' && performance.now() - this.videoFullscreenAt >= 450;
  }

  getViewportHeight() {
    return this.viewportHeight ?? getViewportHeight();
  }

  setState(next: AllianceVideoHandoffState) {
    if (next === this.state) return;
    this.state = next;
    document.documentElement.dataset.scrollHandoff = next;
    window.dispatchEvent(new CustomEvent('agsit:handoff-state', { detail: this.snapshot }));
  }

  beginAllianceZoom(lockHeader = true) {
    if (this.isActive && this.state !== 'alliance-centering') return false;

    if (lockHeader) {
      this.setHeaderLock(true);
    }
    this.viewportHeight = getViewportHeight();
    document.documentElement.style.setProperty('--handoff-vh', `${this.viewportHeight}px`);
    window.dispatchEvent(new CustomEvent('agsit:handoff-viewport-lock', { detail: this.snapshot }));
    this.setState('alliance-zoom');
    return true;
  }

  async waitForVideoFrame(video: HTMLVideoElement) {
    this.setState('waiting-video-frame');
    const minimumMediaTime = Math.max(0.32, video.currentTime + 0.08);

    return new Promise<boolean>((resolve) => {
      let settled = false;
      let animationFrame = 0;
      let videoFrame = 0;
      let timeout = 0;

      const cleanup = () => {
        cancelAnimationFrame(animationFrame);
        if (videoFrame && typeof video.cancelVideoFrameCallback === 'function') {
          video.cancelVideoFrameCallback(videoFrame);
        }
        window.clearTimeout(timeout);
        video.removeEventListener('playing', inspectCurrentTime);
        video.removeEventListener('timeupdate', inspectCurrentTime);
        video.removeEventListener('loadeddata', inspectCurrentTime);
        video.removeEventListener('canplay', inspectCurrentTime);
        video.removeEventListener('error', releaseWait);
      };

      const finish = (didAdvance: boolean) => {
        if (settled) return;
        settled = true;
        cleanup();
        resolve(didAdvance);
      };

      const isPresentedAndAdvancing = (mediaTime: number) =>
        !video.paused
        && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA
        && mediaTime >= minimumMediaTime;

      const inspectCurrentTime = () => {
        if (isPresentedAndAdvancing(video.currentTime)) finish(true);
      };

      const releaseWait = () => finish(false);

      const requestPresentedFrame = () => {
        if (settled) return;

        if (typeof video.requestVideoFrameCallback === 'function') {
          videoFrame = video.requestVideoFrameCallback((_now, metadata) => {
            if (isPresentedAndAdvancing(metadata.mediaTime)) finish(true);
            else requestPresentedFrame();
          });
          return;
        }

        animationFrame = requestAnimationFrame(() => {
          inspectCurrentTime();
          requestPresentedFrame();
        });
      };

      video.addEventListener('playing', inspectCurrentTime);
      video.addEventListener('timeupdate', inspectCurrentTime);
      video.addEventListener('loadeddata', inspectCurrentTime);
      video.addEventListener('canplay', inspectCurrentTime);
      video.addEventListener('error', releaseWait, { once: true });
      requestPresentedFrame();

      // La precarga debería resolver antes. El límite evita bloquear toda la
      // navegación si el sistema operativo rechaza definitivamente el medio.
      timeout = window.setTimeout(releaseWait, 2800);
    });
  }

  beginMoveToVideo() {
    this.setState('moving-to-video');
  }

  arriveVideoFullscreen() {
    this.videoFullscreenAt = performance.now();
    this.setState('video-fullscreen');
  }

  beginVideoFrame() {
    if (this.state !== 'video-fullscreen') return;
    this.setState('video-framed');
  }

  resumeVideoExperience() {
    this.setHeaderLock(true);
    this.viewportHeight = getViewportHeight();
    document.documentElement.style.setProperty('--handoff-vh', `${this.viewportHeight}px`);
    window.dispatchEvent(new CustomEvent('agsit:handoff-viewport-lock', { detail: this.snapshot }));
    this.setState('video-framed');
  }

  refreshViewportHeight() {
    if (!this.viewportHeight) return;
    this.viewportHeight = getViewportHeight();
    document.documentElement.style.setProperty('--handoff-vh', `${this.viewportHeight}px`);
  }

  arriveContact() {
    this.setState('contact');
    this.releaseViewport();
    this.releaseHeaderLock();
  }

  beginReturn() {
    if (this.state === 'returning-alliance') return false;
    if (!this.viewportHeight) {
      this.viewportHeight = getViewportHeight();
      document.documentElement.style.setProperty('--handoff-vh', `${this.viewportHeight}px`);
      window.dispatchEvent(new CustomEvent('agsit:handoff-viewport-lock', { detail: this.snapshot }));
    }
    this.setState('returning-alliance');
    return true;
  }

  prepareReturnViewport() {
    if (this.state !== 'returning-alliance') return;

    // El lienzo fijo todavía cubre toda la pantalla. Liberar aquí la altura
    // congelada permite que una rotación o un cambio pendiente del navegador
    // recalcule el documento antes de revelar de nuevo Alianzas.
    this.releaseViewport();
  }

  finishReturn() {
    this.setState('alliance-centering');
    this.resetStoryVideo();
    this.releaseViewport();
  }

  releaseHeaderLock() {
    this.setHeaderLock(false);
  }

  reset() {
    this.setState('alliance-rest');
    window.dispatchEvent(new CustomEvent('agsit:alliance-video-canvas-reset'));
    this.resetStoryVideo();
    this.releaseViewport();
    this.releaseHeaderLock();
  }

  private resetStoryVideo() {
    const video = document.querySelector<HTMLVideoElement>(
      '.js-video-handoff-host video, .js-video-story-frame video',
    );
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  }

  private setHeaderLock(isLocked: boolean) {
    if (this.headerLocked === isLocked) return;
    this.headerLocked = isLocked;

    if (isLocked) {
      document.documentElement.dataset.scrollHandoffHeaderLock = 'hidden';
    } else {
      delete document.documentElement.dataset.scrollHandoffHeaderLock;
    }

    window.dispatchEvent(
      new CustomEvent('agsit:handoff-header-lock', { detail: { isLocked } }),
    );
  }

  private releaseViewport() {
    if (!this.viewportHeight) return;
    this.viewportHeight = null;
    document.documentElement.style.removeProperty('--handoff-vh');
    window.dispatchEvent(new CustomEvent('agsit:handoff-viewport-unlock'));
  }
}

let handoff: AllianceVideoHandoff | undefined;

export const getAllianceVideoHandoff = () => {
  handoff ??= new AllianceVideoHandoff();
  return handoff;
};
