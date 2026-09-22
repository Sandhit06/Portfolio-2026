import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/** Every animation and listener has a matching cleanup for React and motion preferences. */
export function setupMotion(root: HTMLElement) {
  const media = gsap.matchMedia();
  const originalScrollBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = "auto";
  const lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
    anchors: { offset: -32 },
    syncTouch: false,
  });
  lenis.on("scroll", ScrollTrigger.update);
  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  const ctx = gsap.context(() => {
    const scene = root.querySelector<HTMLElement>(".hero-scene");
    if (scene) {
      // Pin the existing hero briefly. Its reel grows over the typography, then
      // returns to normal page flow. The scrub reverses naturally on scroll-up.
      scene.classList.add("reel-enhanced");
      const reel = gsap.timeline({
        scrollTrigger: {
          id: "expanding-showreel",
          trigger: scene,
          start: "top top",
          end: () => `+=${Math.max(560, window.innerHeight * 0.95)}`,
          pin: true,
          anticipatePin: 1,
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });
      reel
        .fromTo(
          ".showreel-frame",
          { scale: 0.18, y: 110, rotation: -4 },
          {
            scale: 1,
            y: 0,
            rotation: 0,
            duration: 0.84,
            ease: "power2.inOut",
          },
          0,
        )
        .fromTo(
          ".showreel-frame",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.12, ease: "power1.out" },
          0,
        )
        .to(
          ".hero-middle, .hero-caption, .hero-foot",
          { opacity: 0, y: -32, duration: 0.38, ease: "power1.out" },
          0,
        )
        .to(
          ".hero-title",
          { opacity: 0.07, y: -45, duration: 0.5, ease: "power1.out" },
          0.05,
        )
        .fromTo(
          ".showreel-caption",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.18 },
          0.72,
        )
        .to({}, { duration: 0.1 });
    }
    gsap.from(".hero-line > span", {
      yPercent: 115,
      duration: 1.25,
      stagger: 0.12,
      ease: "power4.out",
      clearProps: "transform",
    });
    gsap.from(".intro-item", {
      opacity: 0,
      y: 16,
      duration: 0.9,
      stagger: 0.1,
      delay: 0.2,
      ease: "power2.out",
      clearProps: "opacity,transform",
    });
    gsap.from(".dock", {
      y: 85,
      opacity: 0,
      duration: 0.8,
      delay: 0.45,
      ease: "power3.out",
      clearProps: "opacity",
    });
    gsap.to(".scroll-progress", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.15,
      },
    });

    // Duplicated glyphs roll down inside clipped rows. Scrubbing reverses the
    // same motion on scroll-up; the leading T starts the second line's wave.
    const stackLetters = gsap.utils.toArray<HTMLElement>(".stack-letter");
    const stackOrder = [6, 0, 7, 1, 8, 2, 9, 3, 10, 4, 11, 5, 12, 13, 14];
    gsap.to(
      stackOrder.map((index) => stackLetters[index]),
      {
        yPercent: 100,
        duration: 0.6,
        stagger: 0.13,
        ease: "power2.inOut",
        scrollTrigger: {
          id: "rolling-tech-stack",
          trigger: ".stack-heading-stage",
          start: "top 78%",
          // More scroll travel makes the roll slower without changing page speed.
          end: "center 20%",
          scrub: 1.05,
          invalidateOnRefresh: true,
        },
      },
    );

    gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
      gsap.from(element, {
        y: 36,
        opacity: 0.1,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: element, start: "top 92%", once: true },
        clearProps: "opacity,transform",
      });
    });
    gsap.from(".reveal-words", {
      opacity: 0.3,
      y: 14,
      ease: "none",
      scrollTrigger: {
        trigger: ".reveal-words",
        start: "top 88%",
        end: "bottom 55%",
        scrub: 0.4,
      },
      clearProps: "opacity,transform",
    });
    gsap.utils.toArray<HTMLElement>(".project-visual").forEach((element) => {
      gsap.from(element, {
        y: 50,
        scale: 0.965,
        opacity: 0.4,
        duration: 1.05,
        ease: "power3.out",
        scrollTrigger: { trigger: element, start: "top 92%", once: true },
        clearProps: "opacity,transform",
      });
    });
    gsap.utils.toArray<HTMLElement>(".data-bars i").forEach((bar, index) => {
      gsap.from(bar, {
        scaleY: 0.1,
        transformOrigin: "bottom",
        duration: 0.8,
        delay: index * 0.065,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".query-answer",
          start: "top 90%",
          once: true,
        },
      });
    });
    const marquee = gsap.to(".marquee-track", {
      xPercent: -50,
      duration: 32,
      repeat: -1,
      ease: "none",
    });
    ScrollTrigger.create({
      trigger: ".marquee",
      start: "top bottom",
      end: "bottom top",
      onToggle: ({ isActive }) => (isActive ? marquee.play() : marquee.pause()),
    });

    media.add("(min-width: 701px) and (pointer: fine)", () => {
      const handlers: Array<() => void> = [];
      const object = root.querySelector<HTMLElement>(".hero-object img");
      const hero = root.querySelector<HTMLElement>(".hero");
      if (object && hero) {
        const float = gsap.to(object, {
          y: -12,
          rotation: 4,
          duration: 3.7,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
        ScrollTrigger.create({
          trigger: hero,
          start: "top bottom",
          end: "bottom top",
          onToggle: ({ isActive }) => (isActive ? float.play() : float.pause()),
        });
      }
      root.querySelectorAll<HTMLElement>(".magnetic").forEach((element) => {
        const xTo = gsap.quickTo(element, "x", {
          duration: 0.45,
          ease: "power3.out",
        });
        const yTo = gsap.quickTo(element, "y", {
          duration: 0.45,
          ease: "power3.out",
        });
        const move = (event: PointerEvent) => {
          const box = element.getBoundingClientRect();
          xTo((event.clientX - box.left - box.width / 2) * 0.18);
          yTo((event.clientY - box.top - box.height / 2) * 0.18);
        };
        const leave = () => {
          xTo(0);
          yTo(0);
        };
        element.addEventListener("pointermove", move);
        element.addEventListener("pointerleave", leave);
        handlers.push(() => {
          element.removeEventListener("pointermove", move);
          element.removeEventListener("pointerleave", leave);
        });
      });
      return () => handlers.forEach((remove) => remove());
    });
  }, root);
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener("load", refresh);
  let live = true;
  document.fonts.ready.then(() => {
    if (live) ScrollTrigger.refresh();
  });
  return () => {
    live = false;
    window.removeEventListener("load", refresh);
    media.revert();
    ctx.revert();
    root.querySelector(".hero-scene")?.classList.remove("reel-enhanced");
    gsap.ticker.remove(tick);
    lenis.destroy();
    document.documentElement.style.scrollBehavior = originalScrollBehavior;
  };
}
