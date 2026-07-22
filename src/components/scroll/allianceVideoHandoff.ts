export type AllianceVideoHandoffState =
  | 'alliance-rest'
  | 'alliance-centering'
  | 'alliance-zoom'
  | 'waiting-video-frame'
  | 'moving-to-video'
  | 'video-fullscreen'
  | 'video-framed'
  | 'returning-alliance';

type HandoffSnapshot = {
  state: AllianceVideoHandoffState;
  viewportHeight: number | null;
};

const getViewportHeight = () => {
  const root = document.documentElement;
  const rootStyles = getComputedStyle(root);
  const isShortLandscape = window.matchMedia(
    '(pointer: coarse) and (orientation: landscape) and (max-width: 932px) and (max-height: 520px)',
  ).matches;
  const viewportVariable = isShortLandscape ? '--app-vh' : '--app-stable-vh';
  const measured = Number.parseFloat(rootStyles.getPropertyValue(viewportVariable));

  return Number.isFinite(measured) && measured > 0
    ? Math.round(measured)
    : Math.round(window.visualViewport?.height || window.innerHeight);
};

class AllianceVideoHandoff {
  private state: AllianceVideoHandoffState = 'alliance-rest';
  private viewportHeight: number | null = null;
  private videoFramePromise: Promise<boolean> | null = null;
  private firstVideoFrameDecoded = false;
  private videoFullscreenAt = 0;

  get snapshot(): HandoffSnapshot {
    return { state: this.state, viewportHeight: this.viewportHeight };
  }

  get isActive() {
    return !['alliance-rest', 'alliance-centering', 'video-framed'].includes(this.state);
  }

  get isFullscreenLocked() {
    return ['waiting-video-frame', 'moving-to-video', 'video-fullscreen', 'returning-alliance'].includes(this.state);
  }

  get hasDecodedVideoFrame() {
    return this.firstVideoFrameDecoded;
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

  beginAllianceZoom() {
    if (this.isActive && this.state !== 'alliance-centering') return false;

    this.viewportHeight = getViewportHeight();
    document.documentElement.style.setProperty('--handoff-vh', `${this.viewportHeight}px`);
    window.dispatchEvent(new CustomEvent('agsit:handoff-viewport-lock', { detail: this.snapshot }));
    this.setState('alliance-zoom');
    return true;
  }

  async waitForVideoFrame(video: HTMLVideoElement) {
    this.setState('waiting-video-frame');

    if (this.firstVideoFrameDecoded) {
      return true;
    }

    if (!this.videoFramePromise) {
      this.videoFramePromise = new Promise<boolean>((resolve) => {
        let waitSettled = false;

        const markReady = () => {
          if (this.firstVideoFrameDecoded) return;
          this.firstVideoFrameDecoded = true;
          if (!waitSettled) {
            waitSettled = true;
            resolve(true);
          }
        };

        const releaseWait = () => {
          if (waitSettled) return;
          waitSettled = true;
          resolve(false);
        };

        const requestFrame = () => {
          if ('requestVideoFrameCallback' in video) {
            video.requestVideoFrameCallback(() => markReady());
          } else {
            // loadeddata guarantees current media data. One paint frame gives
            // engines without requestVideoFrameCallback a chance to composite it.
            requestAnimationFrame(markReady);
          }
        };

        if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
          requestFrame();
        } else {
          video.addEventListener('loadeddata', requestFrame, { once: true });
          video.addEventListener('canplay', requestFrame, { once: true });
        }

        // El velo puede ceder tras el timeout para no bloquear la página, pero
        // un timeout NO equivale a un frame decodificado. Los callbacks de video
        // permanecen activos y marcan el frame si llega después en iOS.
        video.addEventListener('error', releaseWait, { once: true });
        window.setTimeout(releaseWait, 2000);
      });
    }

    const decoded = await this.videoFramePromise;
    return decoded || this.firstVideoFrameDecoded;
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
    this.releaseViewport();
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

  finishReturn() {
    this.setState('alliance-centering');
    this.releaseViewport();
  }

  reset() {
    this.setState('alliance-rest');
    this.releaseViewport();
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
