import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Camera,
  Check,
  Compass,
  FileText,
  MapPin,
  Play,
  ScanLine,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  AudienceSection,
  FaqSection,
  FeaturesSection,
  GallerySection,
  StickyDownload,
} from "@/components/marketing-sections";
import { PhoneDemo } from "@/components/phone-demo";
import { useSiteEffects } from "@/hooks/use-site-effects";
import playQr from "@/assets/play-qr.svg";
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
          "Explore Delhi NCR's heritage with Stambh. Discover monuments, learn their stories, and get AI-generated estimates of their visible condition from a photo.",
      },
      { property: "og:title", content: "Stambh — See Delhi's heritage differently" },
      {
        property: "og:description",
        content:
          "A companion for discovering Delhi NCR's heritage monuments and noticing how they look today.",
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
            "Discover Delhi NCR's heritage monuments, read their stories and get AI-generated estimates of their visible condition from a photo.",
          downloadUrl: playStoreUrl,
        }),
      },
    ],
  }),
});

const discoveries = [
  {
    number: "01",
    icon: Camera,
    title: "Look closer",
    description:
      "Photograph a monument or choose one from your gallery. Stambh identifies sites from a curated list across Delhi NCR.",
  },
  {
    number: "02",
    icon: ScanLine,
    title: "Notice what’s there",
    description:
      "Get an AI-generated estimate of visible details, from cracks and weathering to greenery and graffiti.",
  },
  {
    number: "03",
    icon: BookOpen,
    title: "Follow the story",
    description:
      "Explore a monument’s history and protection status, with links to the public sources behind the information.",
  },
];

const marqueeItems = [
  "Humayun’s Tomb",
  "Qutub Minar",
  "Red Fort",
  "Purana Qila",
  "Safdarjung’s Tomb",
  "Jantar Mantar",
  "Agrasen ki Baoli",
  "Lodhi Garden",
];

const reportNotes = [
  "An AI-generated visible-condition estimate",
  "Public heritage sources linked by site",
  "An exportable Condition Report (PDF)",
];

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
          <a href="#how-it-works">The app</a>
          <a href="#features">Features</a>
          <a href="#approach">Our approach</a>
          <a href="#faq">FAQ</a>
          <Button asChild size="sm" className="nav-download">
            <a href={playStoreUrl} target="_blank" rel="noreferrer">
              <img src={appIcon} alt="" className="app-icon" aria-hidden="true" width={64} height={64} /> Get the app <ArrowUpRight aria-hidden="true" />
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
              Find the monuments around you. Learn what they’ve lived through. Notice how they look today.
            </p>
            <Button asChild size="lg" className="download-button" data-magnetic>
              <a href={playStoreUrl} target="_blank" rel="noreferrer">
                <img src={appIcon} alt="" className="app-icon" aria-hidden="true" width={64} height={64} /> Get Stambh on Google Play <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <a className="hero-secondary" href="#demo">
              <Play aria-hidden="true" /> See how it works
            </a>
            <ul className="trust-chips" aria-label="Why people trust Stambh">
              <li><ShieldCheck aria-hidden="true" /> Independent</li>
              <li><BookOpen aria-hidden="true" /> Public sources linked</li>
              <li><MapPin aria-hidden="true" /> Delhi NCR</li>
            </ul>
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

        <div className="monument-marquee" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((n) => (
              <div className="marquee-group" key={n}>
                {marqueeItems.map((item) => (
                  <span key={`${n}-${item}`}>{item}<i>✳</i></span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="intro-meta" aria-label="About the app">
          <span><Compass aria-hidden="true" /> Made for wandering</span>
          <span><ScanLine aria-hidden="true" /> Heritage, in the present tense</span>
          <a href="#how-it-works">A closer look <ArrowDownRight aria-hidden="true" /></a>
        </div>
      </section>

      <section id="how-it-works" className="discovery-section">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow"><span className="eyebrow-rule" />A city made of many times</p>
            <h2>Every monument has more <em>to tell.</em></h2>
          </div>
          <p className="section-intro">
            Find heritage sites nearby, follow their stories, and save monuments, scans, and your own stories for the next visit.
          </p>
        </div>

        <div className="discovery-grid">
          {discoveries.map(({ number, icon: Icon, title, description }, index) => (
            <article className="discovery-item" key={number} data-reveal style={{ "--i": index } as React.CSSProperties}>
              <div className="discovery-topline">
                <span className="discovery-number">{number}</span>
                <Icon aria-hidden="true" className="discovery-icon" />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <PhoneDemo />

      <FeaturesSection />

      <GallerySection />

      <AudienceSection />

      <section className="report-section" aria-labelledby="report-title">
        <div className="report-copy" data-reveal>
          <p className="eyebrow"><span className="eyebrow-rule" />An observation, not a verdict</p>
          <h2 id="report-title">One photo.<br />A new way to <em>pay attention.</em></h2>
            <p className="report-description">
            Stambh can estimate visible details in a monument photo, gather them into a Condition Report, and export the report as a PDF. Come back to your saved scans whenever you like.
          </p>
          <Button asChild variant="outline" className="report-link">
            <a href={playStoreUrl} target="_blank" rel="noreferrer">
              <img src={appIcon} alt="" className="app-icon" aria-hidden="true" width={64} height={64} /> Explore the app <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        </div>
        <div className="report-sheet" data-reveal data-tilt aria-label="A sample of the information a Stambh report can include">
          <div className="sheet-heading">
            <div>
              <span className="sheet-kicker">STAMBH / FIELD NOTE</span>
              <h3>A closer look</h3>
            </div>
            <FileText aria-hidden="true" />
          </div>
          <p className="sheet-monument"><MapPin aria-hidden="true" /> A monument in Delhi NCR</p>
          <div className="sheet-rule" />
          <ul className="sheet-notes">
            {reportNotes.map((note) => (
              <li key={note}><Check aria-hidden="true" /><span>{note}</span></li>
            ))}
          </ul>
          <div className="sheet-foot">
            <span>AI-GENERATED ESTIMATE</span>
            <span>Made to revisit <ArrowUpRight aria-hidden="true" /></span>
          </div>
        </div>
      </section>

      <section id="approach" className="approach-section">
        <div className="approach-heading" data-reveal>
          <p className="eyebrow"><span className="eyebrow-rule" />Grounded in what’s known</p>
          <h2>Curious by nature.<br /><em>Careful by design.</em></h2>
        </div>
        <div className="approach-details">
          <article className="approach-item" data-reveal>
            <ShieldCheck aria-hidden="true" />
            <div>
              <h3>Independent, always</h3>
              <p>Stambh is not affiliated with, endorsed by, or a representative of the Archaeological Survey of India or any government body.</p>
            </div>
          </article>
          <article className="approach-item" data-reveal>
            <BookOpen aria-hidden="true" />
            <div>
              <h3>Sources you can follow</h3>
              <p>Heritage and protection information links back to public sources, including the ASI and UNESCO.</p>
            </div>
          </article>
          <article className="approach-item" data-reveal>
            <ScanLine aria-hidden="true" />
            <div>
              <h3>An estimate, not an inspection</h3>
              <p>Photo-based AI estimates describe visible condition only. They aren’t an official assessment or a substitute for professional inspection.</p>
            </div>
          </article>
        </div>
      </section>

      <FaqSection />

      <section className="closing-section">
        <div className="closing-copy" data-reveal>
          <img src={appIcon} alt="" className="closing-icon" aria-hidden="true" width={96} height={96} />
          <p className="eyebrow">Delhi NCR, seen anew</p>
          <h2>Take the long way.<br /><em>Bring a little context.</em></h2>
          <Button asChild size="lg" className="closing-button" data-magnetic>
            <a href={playStoreUrl} target="_blank" rel="noreferrer">
              <img src={appIcon} alt="" className="app-icon" aria-hidden="true" width={64} height={64} /> Find Stambh on Google Play <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        </div>
        <div className="closing-qr">
          <img src={playQr} alt="QR code that opens Stambh on Google Play" width={140} height={140} />
          <span>Scan to get Stambh on your phone</span>
        </div>
        <div className="closing-stamp" aria-hidden="true">
          <span>DELHI · NCR</span>
          <span className="stamp-symbol">✳</span>
          <span>PAST / PRESENT</span>
        </div>
      </section>

      <footer className="site-footer">
        <a aria-label="Stambh home" className="footer-wordmark" href="#home"><img src={appIcon} alt="" className="app-icon app-icon-logo" aria-hidden="true" width={64} height={64} />STAMBH<span>.</span></a>
        <p>A companion to the places that outlast us. An Iron Pillar Project initiative.</p>
        <a className="footer-play-link" href={playStoreUrl} target="_blank" rel="noreferrer">
          <img src={appIcon} alt="" className="app-icon" aria-hidden="true" width={64} height={64} /> Google Play <ArrowUpRight aria-hidden="true" />
        </a>
      </footer>
      <StickyDownload />
    </main>
  );
}