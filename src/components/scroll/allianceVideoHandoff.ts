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
  const dynamic = Number.parseFloat(getComputedStyle(root).getPropertyValue('--app-vh'));

  return Number.isFinite(dynamic) && dynamic > 0
    ? Math.round(dynamic)
    : Math.round(window.visualViewport?.height || window.innerHeight);
};

class AllianceVideoHandoff {
  private state: AllianceVideoHandoffState = 'alliance-rest';
  private viewportHeight: number | null = null;
  private videoFramePromise: Promise<void> | null = null;
  private firstVideoFrameDecoded = false;

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

    if (!this.videoFramePromise) {
      this.videoFramePromise = new Promise<void>((resolve) => {
        const markReady = () => {
          if (this.firstVideoFrameDecoded) return;
          this.firstVideoFrameDecoded = true;
          resolve();
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

        // El estado 'waiting-video-frame' mantiene el velo negro y bloquea el
        // regreso. Si el video falla o tarda (mp4 pesado en red lenta), la
        // secuencia debe continuar igual: el marco mostrará el fondo oscuro
        // del panel hasta que el frame llegue, pero la página nunca se atora.
        video.addEventListener('error', markReady, { once: true });
        window.setTimeout(markReady, 2000);
      });
    }

    await this.videoFramePromise;
  }

  beginMoveToVideo() {
    this.setState('moving-to-video');
  }

  arriveVideoFullscreen() {
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
