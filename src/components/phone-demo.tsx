import { useEffect, useRef, useState } from "react";

import camera from "@/assets/app/camera.jpg";
import history from "@/assets/app/history.jpg";
import home from "@/assets/app/home.jpg";
import map from "@/assets/app/map.jpg";
import report from "@/assets/app/report.jpg";
import "@/phone-demo.css";

const screens = { home, camera, report, history, map } as const;
type ScreenKey = keyof typeof screens;

const steps: Array<{
  screen: ScreenKey;
  label: string;
  title: string;
  text: string;
  duration: number;
}> = [
  {
    screen: "home",
    label: "01",
    title: "Open Stambh",
    text: "Tap Scan from anywhere in the app to start.",
    duration: 3200,
  },
  {
    screen: "camera",
    label: "02",
    title: "Point at a monument",
    text: "Frame the monument, or pick a photo from your gallery.",
    duration: 3000,
  },
  {
    screen: "camera",
    label: "03",
    title: "Let it take a look",
    text: "Stambh identifies the site from a curated list across Delhi NCR.",
    duration: 2800,
  },
  {
    screen: "report",
    label: "04",
    title: "Read the Condition Report",
    text: "An AI-generated estimate of visible condition, with a reference photo to compare against.",
    duration: 4200,
  },
  {
    screen: "history",
    label: "05",
    title: "Keep every scan",
    text: "Your scans are saved to a timeline you can revisit.",
    duration: 3200,
  },
  {
    screen: "map",
    label: "06",
    title: "Explore the map",
    text: "Find heritage sites near you across Delhi NCR.",
    duration: 3200,
  },
];

export function PhoneDemo() {
  const [step, setStep] = useState(0);
  const [inView, setInView] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [paused, setPaused] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    if (mq.matches) setStep(3);
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || !inView || paused) return;
    const id = window.setTimeout(
      () => setStep((s) => (s + 1) % steps.length),
      steps[step]?.duration ?? 3000,
    );
    return () => window.clearTimeout(id);
  }, [step, inView, reduce, paused]);

  const current = steps[step] ?? steps[0]!;

  return (
    <section id="demo" className="demo-section" aria-labelledby="demo-title">
      <div
        className="demo-inner"
        ref={root}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="demo-copy">
          <p className="eyebrow">
            <span className="eyebrow-rule" />
            See it in action
          </p>
          <h2 id="demo-title">
            From a photo to <em>a closer look.</em>
          </h2>
          <ol className="demo-steps">
            {steps.map((s, i) => (
              <li key={s.label}>
                <button
                  type="button"
                  className="demo-step"
                  aria-current={i === step ? "step" : undefined}
                  onClick={() => setStep(i)}
                >
                  <span className="demo-step-num">{s.label}</span>
                  <span className="demo-step-body">
                    <strong>{s.title}</strong>
                    <span>{s.text}</span>
                  </span>
                  <span
                    className="demo-step-bar"
                    aria-hidden="true"
                    style={{ "--dur": `${s.duration}ms` } as React.CSSProperties}
                  />
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="demo-stage" data-step={step}>
          <div className="demo-glow" aria-hidden="true" />
          <div className="phone" role="img" aria-label={`Stambh app: ${current.title}`}>
            <span className="phone-notch" aria-hidden="true" />
            <div className="phone-screen">
              {(Object.keys(screens) as ScreenKey[]).map((key) => (
                <img
                  key={key}
                  src={screens[key]}
                  alt=""
                  width={590}
                  height={1280}
                  loading="lazy"
                  className={`screen-img${current.screen === key ? " is-active" : ""}`}
                />
              ))}

              {/* tap ripples */}
              {step === 0 && <span key="t0" className="tap" style={{ left: "50%", top: "92%" }} />}
              {step === 1 && <span key="t1" className="tap" style={{ left: "50%", top: "91%" }} />}

              {/* scanning layer */}
              <div className={`scan-layer${step === 2 ? " is-on" : ""}`} aria-hidden="true">
                <span className="scan-flash" key={`f${step === 2}`} />
                <span className="scan-frame" />
                <span className="scan-line" />
                <span className="scan-chip">Identifying monument…</span>
              </div>

              {/* result highlight */}
              <span className={`score-ring${step === 3 ? " is-on" : ""}`} aria-hidden="true" />
            </div>
          </div>

          <span className={`float-chip chip-a${step === 3 ? " is-on" : ""}`} aria-hidden="true">
            88% condition
          </span>
          <span className={`float-chip chip-b${step === 3 ? " is-on" : ""}`} aria-hidden="true">
            Reference photo
          </span>
        </div>
      </div>
    </section>
  );
}
