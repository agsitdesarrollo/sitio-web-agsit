import Matter from 'matter-js';
import { useEffect, useRef } from 'react';
import type { ClientLogo } from '../../data/about';

type ClientLogoBody = {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  angle: number;
  plugin: {
    clientLogo?: {
      label: string;
      image: HTMLImageElement;
      w: number;
      h: number;
      fill: string;
      color: string;
    };
  };
};

function drawRoundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const radius = Math.min(r, w / 2, h / 2);

  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.arcTo(x + w, y, x + w, y + radius, radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.arcTo(x + w, y + h, x + w - radius, y + h, radius);
  ctx.lineTo(x + radius, y + h);
  ctx.arcTo(x, y + h, x, y + h - radius, radius);
  ctx.lineTo(x, y + radius);
  ctx.arcTo(x, y, x + radius, y, radius);
  ctx.closePath();
}

function ClientsPhysicsCanvas({ items }: { items: ClientLogo[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.closest<HTMLElement>('.js-about-clients-stage');

    if (!canvas || !host) {
      return undefined;
    }

    const engine = Matter.Engine.create();
    const runner = Matter.Runner.create();
    const colors = [
      { fill: '#ffffff', color: '#253f6c' },
      { fill: '#f8fbfd', color: '#253f6c' },
      { fill: '#ffffff', color: '#287ca1' },
      { fill: '#f4f7fa', color: '#414042' },
    ];

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let lastImpulseAt = 0;
    let resizeFrame = 0;
    let bodies: ClientLogoBody[] = [];

    const images = items.map((item) => {
      const image = new Image();
      image.decoding = 'async';
      image.src = item.src;
      return image;
    });

    engine.gravity.x = 0;
    engine.gravity.y = 1.45;

    const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

    const getLogoSize = (image: HTMLImageElement) => {
      const isMobile = width < 520;
      const isTablet = width < 900;
      const baseH = isMobile
        ? clamp(height * 0.15, 48, 64)
        : isTablet
          ? clamp(height * 0.15, 56, 76)
          : clamp(height * 0.18, 66, 88);
      const minW = isMobile ? 74 : isTablet ? 88 : 104;
      const maxW = isMobile ? 130 : isTablet ? 156 : 178;
      const ratio = image.complete && image.naturalWidth > 0 ? image.naturalWidth / image.naturalHeight : 1.65;
      const w = clamp(baseH * ratio + baseH * 0.58, minW, maxW);

      return { w, h: baseH };
    };

    const createWalls = () => {
      const wallOptions = {
        isStatic: true,
        restitution: 0.58,
        friction: 0.06,
        render: { visible: false },
      };
      const thickness = 72;

      return [
        Matter.Bodies.rectangle(width / 2, height + thickness / 2, width * 3, thickness, wallOptions),
        Matter.Bodies.rectangle(width / 2, -thickness / 2, width * 3, thickness, wallOptions),
        Matter.Bodies.rectangle(-thickness / 2, height / 2, thickness, height * 3, wallOptions),
        Matter.Bodies.rectangle(width + thickness / 2, height / 2, thickness, height * 3, wallOptions),
      ];
    };

    const resetWorld = () => {
      Matter.Composite.clear(engine.world, false);

      const sizes = images.map(getLogoSize);
      const averageW = sizes.reduce((total, size) => total + size.w, 0) / Math.max(sizes.length, 1);
      const averageH = sizes.reduce((total, size) => total + size.h, 0) / Math.max(sizes.length, 1);
      const gap = width < 520 ? 10 : width < 900 ? 13 : 16;
      const cols = clamp(Math.floor(width / (averageW + gap)), width < 520 ? 2 : 3, width < 520 ? 3 : width < 900 ? 4 : 5);
      const rows = Math.ceil(items.length / cols);
      const stackHeight = rows * (averageH + gap);
      const startY = clamp(height - stackHeight - gap * 2, gap, height * 0.56);
      const cellW = (width - gap * 2) / cols;

      bodies = items.map((item, index) => {
        const color = colors[index % colors.length];
        const col = index % cols;
        const row = Math.floor(index / cols);
        const size = sizes[index];
        const jitterX = ((index * 37) % 21) - 10;
        const jitterY = ((index * 19) % 15) - 7;
        const x = clamp(gap + cellW * col + cellW / 2 + jitterX, size.w / 2 + 8, width - size.w / 2 - 8);
        const y = clamp(startY + row * (averageH + gap) + size.h / 2 + jitterY, size.h / 2 + 8, height - size.h / 2 - 8);
        const body = Matter.Bodies.rectangle(x, y, size.w, size.h, {
          chamfer: { radius: Math.min(16, size.h * 0.24) },
          restitution: 0.58,
          friction: 0.045,
          frictionAir: 0.014,
          density: 0.002,
          inertia: Infinity,
          frictionAngular: 1,
        }) as ClientLogoBody;

        body.plugin = body.plugin ?? {};
        body.plugin.clientLogo = {
          label: item.label,
          image: images[index],
          w: size.w,
          h: size.h,
          fill: color.fill,
          color: color.color,
        };

        Matter.Body.setVelocity(body, {
          x: ((index % 5) - 2) * 0.22,
          y: ((index % 3) - 1) * 0.16,
        });

        return body;
      });

      Matter.Composite.add(engine.world, [...createWalls(), ...bodies]);
    };

    const pushBlocks = (impulse: number) => {
      const strength = clamp(impulse, -92, 92);
      const direction = strength >= 0 ? 1 : -1;

      bodies.forEach((body, index) => {
        const wave = ((index % 5) - 2) * 0.22;
        const nextX = clamp(body.velocity.x - strength * 0.055 - direction * (0.5 + (index % 4) * 0.15) + wave, -16, 16);
        const nextY = clamp(body.velocity.y - Math.abs(strength) * 0.035 - 0.9 - Math.abs(wave), -15, 14);

        Matter.Body.setVelocity(body, { x: nextX, y: nextY });
      });
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(320, host.clientWidth || rect.width);
      height = Math.max(320, host.clientHeight || rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.getContext('2d')?.setTransform(dpr, 0, 0, dpr, 0, 0);
      resetWorld();
    };

    const scheduleResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(resize);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    images.forEach((image) => {
      if (image.complete) {
        image.decode?.().then(scheduleResize).catch(() => undefined);
        return;
      }

      image.addEventListener('load', scheduleResize);
      image.addEventListener('error', scheduleResize);
    });

    const triggerDrop = (event: Event) => {
      const detail = (event as CustomEvent<{ impulse?: number }>).detail;
      pushBlocks(detail?.impulse ?? scrollVelocity);
    };

    host.addEventListener('agsit-clients-drop', triggerDrop);
    Matter.Runner.run(runner, engine);

    const render = () => {
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        frame = requestAnimationFrame(render);
        return;
      }

      const nextScrollY = window.scrollY;
      scrollVelocity = scrollVelocity * 0.82 + (nextScrollY - lastScrollY) * 0.18;
      lastScrollY = nextScrollY;

      if (Math.abs(scrollVelocity) > 3.5 && performance.now() - lastImpulseAt > 130) {
        pushBlocks(scrollVelocity);
        lastImpulseAt = performance.now();
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      bodies.forEach((body) => {
        const logo = body.plugin.clientLogo;

        if (!logo) {
          return;
        }

        ctx.save();
        ctx.translate(body.position.x, body.position.y);
        ctx.rotate(body.angle);
        ctx.shadowColor = 'rgba(37, 63, 108, 0.14)';
        ctx.shadowBlur = 24;
        ctx.shadowOffsetY = 16;
        drawRoundedRect(ctx, -logo.w / 2, -logo.h / 2, logo.w, logo.h, Math.min(16, logo.h * 0.24));
        ctx.fillStyle = logo.fill;
        ctx.fill();
        ctx.strokeStyle = 'rgba(37, 63, 108, 0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.shadowColor = 'transparent';

        if (logo.image.complete && logo.image.naturalWidth > 0) {
          const padX = logo.w * 0.11;
          const padY = logo.h * 0.16;
          const fitW = logo.w - padX * 2;
          const fitH = logo.h - padY * 2;
          const ratio = Math.min(fitW / logo.image.naturalWidth, fitH / logo.image.naturalHeight);
          const drawW = logo.image.naturalWidth * ratio;
          const drawH = logo.image.naturalHeight * ratio;

          ctx.drawImage(logo.image, -drawW / 2, -drawH / 2, drawW, drawH);
        } else {
          ctx.fillStyle = logo.color;
          ctx.font = '800 18px Inter, Segoe UI, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(logo.label, 0, 0);
        }

        ctx.restore();
      });

      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(resizeFrame);
      Matter.Runner.stop(runner);
      Matter.Composite.clear(engine.world, false);
      Matter.Engine.clear(engine);
      observer.disconnect();
      host.removeEventListener('agsit-clients-drop', triggerDrop);
      images.forEach((image) => {
        image.removeEventListener('load', scheduleResize);
        image.removeEventListener('error', scheduleResize);
      });
    };
  }, [items]);

  return <canvas className="about-clients-canvas" ref={canvasRef} aria-hidden="true" />;
}

export default ClientsPhysicsCanvas;
