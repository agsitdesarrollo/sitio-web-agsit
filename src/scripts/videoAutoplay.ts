// iOS only honors muted-inline autoplay when `muted`/`playsInline` are set as JS
// properties at play time (the HTML attributes are not enough once `src` is
// assigned dynamically), and it blocks every autoplay under Low Power Mode until
// a user gesture happens. This helper hardens a video for autoplay, retries once
// media data arrives, and keeps a pending list that is flushed on the first
// gesture anywhere on the page.

const pendingVideos = new Set<HTMLVideoElement>();
let gestureUnlockInstalled = false;

const tryPlay = (video: HTMLVideoElement) => {
  const promise = video.play();

  if (promise) {
    promise
      .then(() => {
        pendingVideos.delete(video);
      })
      .catch(() => {
        pendingVideos.add(video);
      });
  }
};

const flushPendingVideos = () => {
  pendingVideos.forEach((video) => {
    if (video.isConnected && video.paused) {
      tryPlay(video);
    } else {
      pendingVideos.delete(video);
    }
  });
};

const installGestureUnlock = () => {
  if (gestureUnlockInstalled) {
    return;
  }

  gestureUnlockInstalled = true;
  const unlock = () => {
    flushPendingVideos();

    if (pendingVideos.size === 0) {
      window.removeEventListener('touchend', unlock);
      window.removeEventListener('pointerdown', unlock);
      gestureUnlockInstalled = false;
    }
  };

  window.addEventListener('touchend', unlock, { passive: true });
  window.addEventListener('pointerdown', unlock, { passive: true });
};

export function ensureVideoAutoplay(video: HTMLVideoElement): void {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');

  installGestureUnlock();
  tryPlay(video);

  if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
    video.addEventListener(
      'loadeddata',
      () => {
        if (video.paused) {
          tryPlay(video);
        }
      },
      { once: true },
    );
  }
}
