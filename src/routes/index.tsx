import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Compass, MapPin, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FeaturesSection } from "@/components/marketing-sections";
import { useSiteEffects } from "@/hooks/use-site-effects";
import appIcon from "@/assets/app-icon.png";
import humayunTomb from "@/assets/humayun-tomb.jpg";
import "@/effects.css";

const playStoreUrl = "https://play.google.com/store/apps/details?id=com.stambh.aanya&pcampaignid=web_share";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Stambh — See Delhi's heritage differently" },
      {
        name: "description",
        content:
          "Explore Delhi NCR's heritage with Stambh. Discover monuments, learn their stories, and get AI-generated estimates of visible condition from a photo.",
      },
      { property: "og:title", content: "Stambh — See Delhi's heritage differently" },
      {
        property: "og:description",
        content: "A field companion for discovering Delhi NCR's heritage monuments.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#f6efe2" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MobileApplication",
          name: "Stambh",
          operatingSystem: "ANDROID",
          applicationCategory: "TravelApplication",
          description:
            "Discover Delhi NCR's heritage monuments, read their stories, and get AI-generated estimates of visible condition from a photo.",
          downloadUrl: playStoreUrl,
        }),
      },
    ],
  }),
});

function HomePage() {
  useSiteEffects();

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="scroll-progress" aria-hidden="true" />
      <div className="cursor-glow" aria-hidden="true" />
      <header className="site-header">
        <a aria-label="Stambh home" className="wordmark" href="#home">
          <img src={appIcon} alt="" className="app-icon app-icon-logo" aria-hidden="true" width={64} height={64} />
          <span>STAMBH</span>
        </a>
        <nav aria-label="Main navigation" className="site-nav">
          <a href="#features">Inside the app</a>
          <a href="#approach">Our approach</a>
          <Button asChild size="sm" className="nav-download">
            <a href={playStoreUrl} target="_blank" rel="noreferrer">
              Get the app <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        </nav>
      </header>

      <section id="home" className="intro-section">
        <div className="intro-copy">
          <p className="eyebrow"><span className="eyebrow-rule" />A field companion for Delhi’s heritage</p>
          <h1 className="hero-title">
            <span className="line"><span>The city keeps its stories.</span></span>{" "}
            <span className="line"><em><span>Look a little closer.</span></em></span>
          </h1>
          <div className="intro-bottom">
            <p className="intro-description">
              Find a monument. Discover its story. See the familiar in a new light.
            </p>
            <Button asChild size="lg" className="download-button" data-magnetic>
              <a href={playStoreUrl} target="_blank" rel="noreferrer">
                <img src={appIcon} alt="" className="app-icon" aria-hidden="true" width={64} height={64} />
                Get Stambh on Google Play <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <a className="hero-secondary" href="#features">
              <Compass aria-hidden="true" /> Take a closer look <ArrowDownRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <figure className="monument-figure">
          <img
            className="monument-image"
            src={humayunTomb}
            alt="The red sandstone façade and white dome of Humayun’s Tomb in Delhi"
            width={1600}
            height={1200}
            fetchPriority="high"
          />
          <figcaption className="image-caption">
            <span><MapPin aria-hidden="true" /> Nizamuddin, Delhi</span>
            <span>Humayun’s Tomb <span className="caption-year">· 16th century</span></span>
          </figcaption>
        </figure>
      </section>

      <FeaturesSection />

      <section id="approach" className="approach-section">
        <div className="approach-heading" data-reveal>
          <ShieldCheck aria-hidden="true" />
          <div>
            <p className="eyebrow"><span className="eyebrow-rule" />Independent by design</p>
            <h2>Curious, with care.</h2>
          </div>
        </div>
        <p className="approach-disclaimer" data-reveal>
          Stambh is not affiliated with or endorsed by the ASI or any government body. Its photo-based AI condition estimates are not official assessments or professional inspections.
        </p>
      </section>

      <section className="closing-section">
        <div className="closing-copy" data-reveal>
          <img src={appIcon} alt="" className="closing-icon" aria-hidden="true" width={96} height={96} />
          <p className="eyebrow">Delhi NCR, seen anew</p>
          <h2>Take the long way.<br /><em>Bring a little context.</em></h2>
          <Button asChild size="lg" className="closing-button" data-magnetic>
            <a href={playStoreUrl} target="_blank" rel="noreferrer">
              Find Stambh on Google Play <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        </div>
        <div className="closing-stamp" aria-hidden="true">
          <span>DELHI · NCR</span>
          <span className="stamp-symbol">✳</span>
          <span>PAST / PRESENT</span>
        </div>
      </section>

      <footer className="site-footer">
        <a aria-label="Stambh home" className="footer-wordmark" href="#home">
          <img src={appIcon} alt="" className="app-icon app-icon-logo" aria-hidden="true" width={64} height={64} />
          STAMBH<span>.</span>
        </a>
        <p>A companion to the places that outlast us.</p>
      </footer>
    </main>
  );
}