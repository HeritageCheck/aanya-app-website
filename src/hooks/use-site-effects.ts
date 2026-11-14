import { useEffect } from "react";

/**
 * Progressive-enhancement effects for the single-page site.
 * Everything is skipped when the user prefers reduced motion, and the page
 * stays fully readable if this never runs.
 */
export function useSiteEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: Array<() => void> = [];

    // Scroll progress, header state, hero parallax (one rAF-throttled listener)
    const hero = document.querySelector<HTMLElement>(".monument-image");
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        root.style.setProperty("--scroll-progress", String(max > 0 ? y / max : 0));
        root.toggleAttribute("data-scrolled", y > 24);
        if (hero && !reduce) {
          const rect = hero.getBoundingClientRect();
          if (rect.bottom > 0 && rect.top < window.innerHeight) {
            hero.style.setProperty("--parallax", `${(rect.top * -0.08).toFixed(1)}px`);
          }
        }
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    cleanups.push(() => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    });

    if (reduce) {
      return () => cleanups.forEach((fn) => fn());
    }

    // Reveal on scroll
    root.setAttribute("data-fx", "on");
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    items.forEach((el) => io.observe(el));
    cleanups.push(() => {
      io.disconnect();
      root.removeAttribute("data-fx");
    });

    if (fine) {
      // Cursor glow
      const onMove = (e: PointerEvent) => {
        root.style.setProperty("--mx", `${e.clientX}px`);
        root.style.setProperty("--my", `${e.clientY}px`);
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      cleanups.push(() => window.removeEventListener("pointermove", onMove));

      // Magnetic buttons
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
          const dy = (e.clientY - (r.top + r.height / 2)) * 0.32;
          el.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
        };
        const leave = () => (el.style.transform = "");
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });

      // 3D tilt
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          el.style.setProperty("--rx", `${(-py * 8).toFixed(2)}deg`);
          el.style.setProperty("--ry", `${(px * 10).toFixed(2)}deg`);
          el.style.setProperty("--gx", `${((px + 0.5) * 100).toFixed(0)}%`);
          el.style.setProperty("--gy", `${((py + 0.5) * 100).toFixed(0)}%`);
        };
        const leave = () => {
          el.style.setProperty("--rx", "0deg");
          el.style.setProperty("--ry", "0deg");
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);
}
