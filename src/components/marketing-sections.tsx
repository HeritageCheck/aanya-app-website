import { useState } from "react";
import { ArrowUpRight, BookOpen, Camera, FileText, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import cameraScreen from "@/assets/app/camera.jpg";
import mapScreen from "@/assets/app/map.jpg";
import reportScreen from "@/assets/app/report.jpg";
import "@/marketing.css";

const featurePreviews = [
  {
    icon: Camera,
    number: "01",
    title: "Scan a monument",
    teaser: "Point your camera. Start a new story.",
    screen: cameraScreen,
    alt: "Stambh camera view with the India Gate in frame",
    description:
      "Photograph a site or choose a photo from your gallery. Stambh identifies monuments from its curated Delhi NCR list and estimates what’s visible.",
    note: "An AI-generated estimate from a single photo.",
  },
  {
    icon: MapPin,
    number: "02",
    title: "Find what’s nearby",
    teaser: "A map full of places to discover.",
    screen: mapScreen,
    alt: "Stambh heritage map showing sites across Delhi NCR",
    description:
      "Explore heritage places across Delhi NCR, then follow each site’s history and public-source links at your own pace.",
    note: "Discover sites, stories, and their sources.",
  },
  {
    icon: FileText,
    number: "03",
    title: "Keep what you discover",
    teaser: "Save scans. Revisit the details.",
    screen: reportScreen,
    alt: "Stambh Condition Report for India Gate with a photo comparison",
    description:
      "Save monuments and scans to your history, and export a Condition Report as a PDF to revisit later.",
    note: "A report to revisit—not an official inspection.",
  },
];

export function FeaturesSection() {
  const [activePreview, setActivePreview] = useState<(typeof featurePreviews)[number] | null>(null);

  return (
    <section id="features" className="mk-section features-section" aria-labelledby="features-title">
      <div className="mk-heading" data-reveal>
        <p className="eyebrow"><span className="eyebrow-rule" />A little more to discover</p>
        <h2 id="features-title">Delhi’s stories,<br /><em>closer at hand.</em></h2>
        <p className="mk-lede">See what’s inside Stambh.</p>
      </div>

      <Dialog
        open={activePreview !== null}
        onOpenChange={(open) => {
          if (!open) setActivePreview(null);
        }}
      >
        <div className="feature-grid">
          {featurePreviews.map(({ icon: Icon, number, title, teaser, ...preview }, index) => (
            <DialogTrigger asChild key={number}>
              <Button
                type="button"
                variant="ghost"
                className="feature-card"
                data-reveal
                style={{ "--i": index } as React.CSSProperties}
                aria-label={`Preview: ${title}`}
                onClick={() => setActivePreview({ icon: Icon, number, title, teaser, ...preview })}
              >
                <span className="feature-card-top">
                  <span className="feature-card-number">{number}</span>
                  <Icon aria-hidden="true" />
                </span>
                <span className="feature-card-title">{title}</span>
                <span className="feature-card-teaser">{teaser}</span>
                <span className="feature-card-action">See inside <ArrowUpRight aria-hidden="true" /></span>
              </Button>
            </DialogTrigger>
          ))}
        </div>

        {activePreview && (
          <DialogContent className="preview-dialog max-h-[calc(100dvh-32px)] w-[min(820px,calc(100vw-32px))] max-w-none gap-0 overflow-y-auto border-border bg-card p-0 sm:rounded-sm">
            <div className="feature-preview-layout">
              <div className="feature-preview-image">
                <img src={activePreview.screen} alt={activePreview.alt} width={590} height={1280} />
              </div>
              <div className="feature-preview-copy">
                <span className="feature-preview-kicker">STAMBH / {activePreview.number}</span>
                <DialogHeader className="feature-preview-heading">
                  <DialogTitle>{activePreview.title}</DialogTitle>
                  <DialogDescription>{activePreview.description}</DialogDescription>
                </DialogHeader>
                <p className="feature-preview-note">
                  <BookOpen aria-hidden="true" /> {activePreview.note}
                </p>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
