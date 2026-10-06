"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { Sticker } from "@/components/Sticker";
import { EditableText } from "@/components/EditableText";
import { ProjectsSection } from "@/components/ProjectsSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { BehanceLogo, ClaudeLogo, FigmaLogo, LinkedInLogo } from "@/components/logos";

export default function HomePage() {
  const { t } = useLang();

  // Hero stickers: content, comment and (on wide screens) position.
  const stickers = [
    {
      name: "behance",
      delay: 450,
      comment: t.hero.stickers.behance,
      href: "https://www.behance.net/imdi_e",
      pos: "left-[7%] top-[12%]",
      node: <BehanceLogo />,
    },
    {
      name: "linkedin",
      delay: 690,
      comment: t.hero.stickers.linkedin,
      href: "https://www.linkedin.com/in/diegoferrsantos",
      pos: "right-[7%] top-[56%]",
      node: <LinkedInLogo />,
    },
    {
      name: "figma",
      delay: 770,
      comment: t.hero.stickers.figma,
      pos: "left-[20%] top-[74%]",
      node: <FigmaLogo />,
    },
    {
      name: "claude",
      delay: 930,
      comment: t.hero.stickers.claude,
      pos: "right-[22%] top-[74%]",
      node: <ClaudeLogo />,
    },
    {
      name: "apple-park.jpg",
      delay: 530,
      comment: t.hero.stickers.applePark,
      pos: "right-[3%] top-[10%]",
      node: (
        <div
          className="aspect-[3/4] w-44 bg-no-repeat shadow-lg"
          style={{
            backgroundImage: "url(/img/rainbow.jpeg)",
            backgroundSize: "148%",
            backgroundPosition: "50% 32%",
          }}
        />
      ),
    },
    {
      name: "wwdc25.jpg",
      delay: 610,
      comment: t.hero.stickers.wwdc,
      pos: "left-[5%] top-[44%]",
      node: (
        <div
          className="aspect-[3/4] w-36 bg-no-repeat shadow-lg"
          style={{
            backgroundImage: "url(/img/wwdc-badge.jpeg)",
            backgroundSize: "235%",
            backgroundPosition: "48% 60%",
          }}
        />
      ),
    },
    {
      name: "swift-winner.jpg",
      delay: 850,
      comment: t.hero.stickers.swift,
      pos: "left-[41%] top-[70%]",
      node: (
        <div className="w-40 shadow-lg">
          <Image
            src="/img/swift-winner.jpeg"
            alt="Swift Student Challenge Winner"
            width={160}
            height={160}
            draggable={false}
            className="h-auto w-full"
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <section
        id="inicio"
        className="relative z-0 min-h-[calc(100vh-8rem)] scroll-mt-32 px-6 has-[[data-edit-open]]:z-20"
      >
        {/* Figma-style grid background (decorative, no interaction).
            Extends up by the header offset (pt-32) so it also sits behind the
            fixed header, avoiding a seam at the top of the hero. */}
        <div
          aria-hidden
          className="canvas-grid hero-fade pointer-events-none absolute bottom-0 left-1/2 top-[-8rem] -z-10 w-screen -translate-x-1/2"
        />

        <div className="mx-auto flex max-w-4xl flex-col items-center pt-20 text-center">
          <EditableText
            as="h1"
            name={t.hero.layers.title}
            rootClassName="hero-rise max-w-4xl [--delay:100ms]"
            className="text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            {t.hero.title}
          </EditableText>
          <EditableText
            as="p"
            name={t.hero.layers.subtitle}
            rootClassName="hero-rise mt-10 max-w-3xl [--delay:250ms]"
            className="text-pretty text-lg text-neutral-700"
          >
            {t.hero.subtitle}
          </EditableText>
        </div>

        {/* Wide screens (≥1280px): stickers scattered around the text and
            draggable. Narrower: the same stickers in a row under the text,
            so they never cover it. */}
        {stickers.map((st) => (
          <Sticker
            key={st.name}
            name={st.name}
            delay={st.delay}
            comment={st.comment}
            href={st.href}
            className={`hidden xl:block ${st.pos}`}
          >
            {st.node}
          </Sticker>
        ))}

        <ul className="hero-rise mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-5 pb-16 [--delay:400ms] xl:hidden">
          {stickers.map((st) => (
            <li key={st.name} style={{ zoom: 0.55 }}>
              {st.href ? (
                <a href={st.href} target="_blank" rel="noreferrer" aria-label={st.name}>
                  {st.node}
                </a>
              ) : (
                st.node
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Stacked above the hero (z-0) so a sticker dragged out of it slides
          under the white sections instead of over them. While a text panel is open the
          hero rises above them (z-20) so the panel is never covered. */}
      <div className="relative z-10">
        <ProjectsSection />

        <AboutSection />

        <ContactSection />
      </div>
    </>
  );
}
