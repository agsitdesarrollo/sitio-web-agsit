import gsap from 'gsap';

/** Index along the manifesto: -1 before the scenes, 0–2 the scenes, 3 after them. */
export type SceneIndex = -1 | 0 | 1 | 2 | 3;
type Rig = { anims: gsap.core.Animation[] };
const SHIFT = 12;
// Where each visitor starts, as a fraction of the stage measured from its center.
const STARTS = [[-.47,-.34],[.47,-.4],[-.47,.14],[.47,.22],[-.24,-.5],[.22,.5],[-.47,.46],[.47,-.04],[.02,-.5]];

/** HTML/SVG interface scenes driven by GSAP; only transform, opacity and SVG strokes animate. */
export function createManifestoScenes(stage: HTMLElement) {
  const scenes = [...stage.querySelectorAll<HTMLElement>('[data-scene]')];
  const all = <T extends Element>(root: Element, selector: string) => [...root.querySelectorAll<T>(selector)];
  const one = <T extends Element>(root: Element, selector: string) => root.querySelector<T>(selector)!;
  let rigs: Rig[] = [];
  let context: gsap.Context | undefined;
  let current: SceneIndex = -1;
  let running = true;
  let built = '';

  const buildAttract = (el: HTMLElement, width: number, height: number): Rig => {
    const box = one<HTMLElement>(el, '[data-a-box]'), card = one<HTMLElement>(el, '[data-a-card]'), reach = one(el, '[data-a-reach]');
    const people = all<HTMLElement>(el, '[data-a-person]');
    const target = card.offsetTop + card.offsetHeight / 2, boxHeight = box.offsetHeight;
    const tl = gsap.timeline({ paused: true, repeat: -1 });
    tl.set(reach, { scaleX: 0 }, 0).set(card, { scale: 1 }, 0);
    people.forEach((person, index) => {
      const [nx, ny] = STARTS[index % STARTS.length];
      const at = .2 + index * .38;
      tl.set(person, { x: nx * width, y: boxHeight / 2 + ny * height, opacity: 0, scale: 1 }, 0)
        .to(person, { opacity: 1, duration: .3, ease: 'power1.out' }, at)
        .to(person, { x: 0, duration: 1.5, ease: 'power2.inOut' }, at)
        .to(person, { y: target, duration: 1.5, ease: 'power3.out' }, at)
        .to(person, { scale: .25, opacity: 0, duration: .3, ease: 'power2.in' }, at + 1.2)
        .to(reach, { scaleX: .85 * (index + 1) / people.length, duration: .36, ease: 'power2.out' }, at + 1.25)
        .to(card, { scale: 1.014, duration: .16, ease: 'power2.out', yoyo: true, repeat: 1 }, at + 1.3);
    });
    tl.to(reach, { scaleX: 0, duration: 1, ease: 'power2.inOut' }, 5)
      .to({}, { duration: .001 }, 5.999);
    const float = gsap.fromTo(card, { y: 3 }, { y: -3, duration: 2.2, ease: 'sine.inOut', yoyo: true, repeat: -1, paused: true });
    return { anims: [tl, float] };
  };

  const buildFollow = (el: HTMLElement): Rig => {
    const fills = all(el, '[data-f-fill]'), checks = all(el, '[data-f-check]'), on = all(el, '[data-f-on]'), conns = all(el, '[data-f-conn]');
    const typing = one(el, '[data-f-typing]'), dots = all(typing, 'i'), steps = one(el, '[data-f-steps]');
    const reset = (position: number, tl: gsap.core.Timeline) => tl.set(fills, { scale: 0 }, position).set(checks, { strokeDashoffset: 1 }, position)
      .set(on, { opacity: 0 }, position).set(conns, { scaleY: 0 }, position).set(typing, { opacity: 0 }, position).set(dots, { y: 0 }, position);
    const tl = gsap.timeline({ paused: true, repeat: -1 });
    reset(0, tl).set(steps, { opacity: 1 }, 0);
    const done = (index: number, at: number) => tl.to(fills[index], { scale: 1, duration: .3, ease: 'power2.out' }, at)
      .to(checks[index], { strokeDashoffset: 0, duration: .35, ease: 'power2.out' }, at + .12)
      .to(on[index], { opacity: 1, duration: .3, ease: 'power1.out' }, at + .1);
    done(0, .5);
    tl.to(conns[0], { scaleY: 1, duration: .6, ease: 'power2.inOut' }, .95)
      .to(typing, { opacity: 1, duration: .2 }, 1.65)
      .to(dots, { y: -3, duration: .28, ease: 'sine.inOut', yoyo: true, repeat: 3, stagger: .12 }, 1.7)
      .to(typing, { opacity: 0, duration: .2 }, 2.95);
    done(1, 3.1);
    tl.to(conns[1], { scaleY: 1, duration: .6, ease: 'power2.inOut' }, 3.6);
    done(2, 4.3);
    tl.to(steps, { opacity: 0, duration: .5, ease: 'power1.in' }, 6.1);
    reset(6.6, tl).to(steps, { opacity: 1, duration: .4, ease: 'power1.out' }, 6.6);
    const live = gsap.to(one(el, '[data-f-live]'), { opacity: .35, scale: .8, duration: 1, ease: 'sine.inOut', yoyo: true, repeat: -1, paused: true });
    return { anims: [tl, live] };
  };

  const buildGrow = (el: HTMLElement): Rig => {
    const line = one(el, '[data-g-line]'), area = one(el, '[data-g-area]'), dot = one(el, '[data-g-dot]'), halo = one(el, '[data-g-halo]');
    const bar = one(el, '[data-g-bar]'), body = one(el, '[data-g-body]');
    const tl = gsap.timeline({ paused: true, repeat: -1 });
    tl.set(line, { strokeDashoffset: 1 }, 0).set(area, { opacity: 0 }, 0).set(dot, { scale: 0, opacity: 0 }, 0)
      .set(halo, { scale: 1, opacity: 0 }, 0).set(bar, { scaleX: 0 }, 0).set(body, { opacity: 1 }, 0)
      .to(line, { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut' }, .3)
      .to(bar, { scaleX: .72, duration: 2.2, ease: 'power2.inOut' }, .6)
      .to(area, { opacity: 1, duration: 1.2, ease: 'power1.out' }, 2.1)
      .to(dot, { scale: 1, opacity: 1, duration: .35, ease: 'power2.out' }, 2.4)
      .fromTo(halo, { scale: 1, opacity: .45 }, { scale: 2.6, opacity: 0, duration: 1.1, ease: 'power2.out', repeat: 2, immediateRender: false }, 2.6)
      .to(body, { opacity: 0, duration: .5, ease: 'power1.in' }, 5.45)
      .to({}, { duration: .001 }, 5.999);
    return { anims: [tl] };
  };

  const hide = (index: number) => { gsap.killTweensOf(scenes[index]); gsap.set(scenes[index], { autoAlpha: 0, y: 0 }); rigs[index]?.anims.forEach(anim => anim.pause()); };
  const play = (index: number) => rigs[index]?.anims.forEach(anim => { anim.restart(); if (!running) anim.pause(); });
  const build = () => {
    const width = stage.clientWidth, height = stage.clientHeight;
    context?.revert();
    context = gsap.context(() => { rigs = [buildAttract(scenes[0], width, height), buildFollow(scenes[1]), buildGrow(scenes[2])]; }, stage);
    built = `${width}x${height}`;
  };
  const show = (index: SceneIndex, previous: SceneIndex) => {
    const direction = index > previous ? 1 : -1;
    scenes.forEach((scene, i) => {
      if (i === index) {
        gsap.killTweensOf(scene);
        gsap.fromTo(scene, { autoAlpha: 0, y: SHIFT * direction }, { autoAlpha: 1, y: 0, duration: .6, ease: 'power2.out' });
        play(i);
      } else if (i === previous) {
        rigs[i]?.anims.forEach(anim => anim.pause());
        gsap.killTweensOf(scene);
        gsap.to(scene, { autoAlpha: 0, y: -SHIFT * direction, duration: .6, ease: 'power2.in' });
      } else hide(i);
    });
  };
  build();
  scenes.forEach((_, i) => hide(i));

  let resizeTimer = 0;
  const observer = new ResizeObserver(() => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (`${stage.clientWidth}x${stage.clientHeight}` === built) return;
      build();
      scenes.forEach((_, i) => { if (i !== current) hide(i); });
      if (current >= 0 && current <= 2) play(current);
    }, 160);
  });
  observer.observe(stage);

  return {
    /** The visible scene is always a function of the stop; `run` pauses cycles without hiding anything. */
    update(index: SceneIndex, run: boolean) {
      if (index !== current) { const previous = current; current = index; show(index, previous); }
      if (run !== running) {
        running = run;
        if (current >= 0 && current <= 2) rigs[current].anims.forEach(anim => anim.paused(!run));
      }
    },
    dispose() {
      window.clearTimeout(resizeTimer); observer.disconnect(); context?.revert();
      gsap.killTweensOf(scenes); gsap.set(scenes, { clearProps: 'all' });
    },
  };
}
