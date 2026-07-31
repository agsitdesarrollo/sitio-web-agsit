import gsap from 'gsap';

type GlyphTexture = {
  canvas: HTMLCanvasElement;
  size: number;
};

type GlyphRenderItem = {
  kind: 'glyph';
  character: string;
  x: number;
  y: number;
  z: number;
  opacity: number;
  index: number;
  copyIndex: number;
};

type BrandRenderItem = {
  kind: 'brand';
  x: number;
  y: number;
  z: number;
  opacity: number;
};

type RenderItem = GlyphRenderItem | BrandRenderItem;

export type DigitalMarketingOrbitApi = {
  collapse: () => Promise<void>;
  expand: () => Promise<void>;
  setCollapsed: (collapsed: boolean) => void;
};

export type DigitalMarketingOrbitSection = HTMLElement & {
  dmOrbitApi?: DigitalMarketingOrbitApi;
};

const DEFAULT_TEXT = 'MARKETING DIGITAL';
const FONT_STACK = '"Inter", "Segoe UI", Tahoma, sans-serif';
const FONT_SIZE = 42;
const FONT_WEIGHT = 400;
const LETTER_SPACING = 32.53;
const BASE_WIDTH = 1000;
const SPEED = -0.008;
const STAGGER = 0.16;
const RADIUS = 144;
const DEPTH_RADIUS = RADIUS * 1.5;
const FOCAL_LENGTH = 600;
const ECHO_COUNT = 7;
const ECHO_GAP = 0.64;
const LOGO_SIZE = 140;
const LOGO_SOURCE = '/assets/Logo-removebg-preview.png';
const GLYPH_RENDER_SIZE = Math.round(FONT_SIZE * 1.5);
const GLYPH_TEXTURE_SIZE = Math.ceil(GLYPH_RENDER_SIZE * 1.5);

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const createGlyphTextures = (text: string): Map<string, GlyphTexture> => {
  const textures = new Map<string, GlyphTexture>();

  [...new Set(text)].forEach((character) => {
    const texture = document.createElement('canvas');
    texture.width = GLYPH_TEXTURE_SIZE;
    texture.height = GLYPH_TEXTURE_SIZE;

    const textureContext = texture.getContext('2d');
    if (!textureContext) return;

    textureContext.clearRect(0, 0, GLYPH_TEXTURE_SIZE, GLYPH_TEXTURE_SIZE);
    textureContext.fillStyle = '#FFFFFF';
    textureContext.font = `${FONT_WEIGHT} ${GLYPH_RENDER_SIZE}px ${FONT_STACK}`;
    textureContext.textAlign = 'center';
    textureContext.textBaseline = 'middle';
    textureContext.fillText(character, GLYPH_TEXTURE_SIZE / 2, GLYPH_TEXTURE_SIZE / 2);

    textures.set(character, {
      canvas: texture,
      size: GLYPH_TEXTURE_SIZE,
    });
  });

  return textures;
};


export const setupDigitalMarketingOrbitHero = () => {
  document.querySelectorAll<HTMLElement>('.js-dm-v2-orbit-hero').forEach((section) => {
    if (section.dataset.orbitReady === 'true') return;

    const canvas = section.querySelector<HTMLCanvasElement>('.js-dm-v2-orbit-canvas');
    const handoffLabel = section.querySelector<HTMLElement>(
      '.js-dm-v2-orbit-handoff-label',
    );
    const context = canvas?.getContext('2d');
    if (!canvas || !context || !handoffLabel) return;

    section.dataset.orbitReady = 'true';

    const text = section.dataset.orbitText?.trim() || DEFAULT_TEXT;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let glyphTextures = createGlyphTextures(text);
    const brandImage = new Image();
    brandImage.decoding = 'async';
    brandImage.src = LOGO_SOURCE;
    let width = 1;
    let height = 1;
    let phase = 0;
    let visible = true;
    let destroyed = false;
    let frameId = 0;
    let targetCenterX = 0;
    let targetCenterY = 0;
    let targetFontSize = 12;
    let targetAdvance = 10;
    const state = {
      morphProgress: section.dataset.orbitState === 'collapsed' ? 1 : 0,
    };
    let morphTween: gsap.core.Tween | null = null;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const canvasRect = canvas.getBoundingClientRect();
      const labelRect = handoffLabel.getBoundingClientRect();
      const labelStyles = getComputedStyle(handoffLabel);
      const measuredFontSize = Number.parseFloat(labelStyles.fontSize);

      targetCenterX = labelRect.left + labelRect.width / 2 - canvasRect.left;
      targetCenterY = labelRect.top + labelRect.height / 2 - canvasRect.top;
      targetFontSize = Number.isFinite(measuredFontSize) ? measuredFontSize : 12;
      targetAdvance =
        text.length > 1
          ? labelRect.width / (text.length - 1)
          : targetFontSize;
    };

    const appendTextCopy = (
      items: RenderItem[],
      phaseOffset: number,
      copyIndex: number,
    ) => {
      [...text].forEach((character, index) => {
        const angle = phase + phaseOffset + index * STAGGER;

        items.push({
          kind: 'glyph',
          character,
          x: DEPTH_RADIUS * Math.sin(angle),
          y:
            index * LETTER_SPACING * 0.5 -
            text.length * LETTER_SPACING * 0.25 +
            Math.sin(phase * 2 + index * 0.2) * 20,
          z: DEPTH_RADIUS * Math.cos(angle),
          opacity: 1,
          index,
          copyIndex,
        });
      });
    };

    const buildRenderItems = (): RenderItem[] => {
      const items: RenderItem[] = [];

      for (let echoIndex = ECHO_COUNT; echoIndex >= 1; echoIndex -= 1) {
        appendTextCopy(items, echoIndex * ECHO_GAP, echoIndex);
      }

      appendTextCopy(items, 0, 0);
      items.push({
        kind: 'brand',
        x: 0,
        y: 0,
        z: 0,
        opacity: 1,
      });

      return items.sort((itemA, itemB) => itemA.z - itemB.z);
    };

    const drawGlyph = (
      item: GlyphRenderItem,
      screenX: number,
      screenY: number,
      autoScale: number,
      depthOpacity: number,
      targetFontSize: number,
      targetAdvance: number,
    ) => {
      const texture = glyphTextures.get(item.character);
      if (!texture) return;

      const orbitScale = autoScale * (FONT_SIZE / texture.size);
      const targetScale = targetFontSize / texture.size;
      const targetX =
        targetCenterX + (item.index - (text.length - 1) / 2) * targetAdvance;
      const targetY = targetCenterY;
      const progress = state.morphProgress;
      const handoffProgress = clamp((progress - 0.68) / 0.32, 0, 1);
      const glyphScale = gsap.utils.interpolate(orbitScale, targetScale, progress);
      const opacity =
        item.copyIndex === 0
          ? gsap.utils.interpolate(depthOpacity, 1, progress) * (1 - handoffProgress)
          : depthOpacity * (1 - progress);

      context.save();
      context.globalAlpha = item.opacity * opacity;
      context.translate(
        gsap.utils.interpolate(screenX, targetX, progress),
        gsap.utils.interpolate(screenY, targetY, progress),
      );
      context.scale(glyphScale, glyphScale);
      context.drawImage(texture.canvas, -texture.size / 2, -texture.size / 2);
      context.restore();
    };

    const drawBrand = (
      item: BrandRenderItem,
      screenX: number,
      screenY: number,
      autoScale: number,
    ) => {
      if (!brandImage.complete || !brandImage.naturalWidth || !brandImage.naturalHeight) return;

      const logoAspect = brandImage.naturalWidth / brandImage.naturalHeight;
      const drawWidth = LOGO_SIZE * autoScale;
      const drawHeight = (LOGO_SIZE / logoAspect) * autoScale;

      context.save();
      context.globalAlpha = item.opacity * (1 - state.morphProgress);
      context.drawImage(
        brandImage,
        screenX - drawWidth / 2,
        screenY - drawHeight / 2,
        drawWidth,
        drawHeight,
      );
      context.restore();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      handoffLabel.style.opacity = `${clamp((state.morphProgress - 0.68) / 0.32, 0, 1)}`;

      const widthScale = width / BASE_WIDTH;
      const compactLandscape = width > height && height < 600;
      const heightScale = height / (compactLandscape ? 620 : 500);
      const mobilePortraitMinimum =
        width <= 600 && height >= width ? clamp(width / 520, 0.62, 0.82) : 0;
      const sceneScale = Math.min(
        Math.max(widthScale, mobilePortraitMinimum),
        Math.max(0.48, heightScale),
      );
      buildRenderItems().forEach((item) => {
        const distance = Math.max(10, FOCAL_LENGTH - item.z);
        const perspective = FOCAL_LENGTH / distance;
        const autoScale = sceneScale * perspective;
        const screenX = width / 2 + item.x * autoScale;
        const screenY = height / 2 + item.y * autoScale;
        const normalizedDepth = (item.z + DEPTH_RADIUS) / (DEPTH_RADIUS * 2);
        const depthOpacity = clamp(0.15 + normalizedDepth * 0.85, 0, 1);

        if (item.kind === 'glyph') {
          drawGlyph(
            item,
            screenX,
            screenY,
            autoScale,
            depthOpacity,
            targetFontSize,
            targetAdvance,
          );
        } else {
          drawBrand(item, screenX, screenY, autoScale);
        }
      });
    };

    const render = () => {
      if (destroyed) return;

      if (!reduceMotion) phase += SPEED * (1 - state.morphProgress);
      if (visible) draw();
      frameId = window.requestAnimationFrame(render);
    };

    const setCollapsed = (collapsed: boolean) => {
      morphTween?.kill();
      morphTween = null;
      state.morphProgress = collapsed ? 1 : 0;
      section.dataset.orbitState = collapsed ? 'collapsed' : 'expanded';
      draw();
    };

    const animateMorph = (collapsed: boolean) =>
      new Promise<void>((resolve) => {
        morphTween?.kill();

        if (reduceMotion) {
          setCollapsed(collapsed);
          resolve();
          return;
        }

        section.dataset.orbitState = collapsed ? 'collapsing' : 'expanding';
        morphTween = gsap.to(state, {
          morphProgress: collapsed ? 1 : 0,
          duration: collapsed ? 0.78 : 0.86,
          ease: 'power3.inOut',
          overwrite: 'auto',
          onUpdate: draw,
          onComplete: () => {
            morphTween = null;
            section.dataset.orbitState = collapsed ? 'collapsed' : 'expanded';
            resolve();
          },
        });
      });

    (section as DigitalMarketingOrbitSection).dmOrbitApi = {
      collapse: () => animateMorph(true),
      expand: () => animateMorph(false),
      setCollapsed,
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );

    resizeObserver.observe(canvas);
    visibilityObserver.observe(section);
    resize();
    draw();
    frameId = window.requestAnimationFrame(render);
    brandImage.addEventListener('load', draw, { once: true });

    document.fonts?.ready.then(() => {
      if (destroyed) return;
      glyphTextures = createGlyphTextures(text);
      draw();
    });

    const destroy = () => {
      destroyed = true;
      morphTween?.kill();
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      delete (section as DigitalMarketingOrbitSection).dmOrbitApi;
    };

    window.addEventListener('pagehide', destroy, { once: true });
  });
};
