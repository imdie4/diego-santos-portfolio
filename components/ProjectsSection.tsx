"use client";

import { type CSSProperties } from "react";
import { useLang } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { HoverComment } from "./Sticker";
import { useReveal } from "./useReveal";

export function ProjectsSection() {
  const { t } = useLang();
  const p = t.projects;

  // Each element reveals once, the first time it is well inside the viewport.
  const ref = useReveal<HTMLElement>(".proj-head, .proj-card");

  return (
    <section
      ref={ref}
      id="projetos"
      className="projects-reveal scroll-mt-28 bg-white py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="proj-head text-3xl font-bold tracking-tight">{p.heading}</h2>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {p.items.map((title, i) => (
            // Each card lands like a frame placed on a Figma canvas:
            // rises in, its cover settles, and a selection outline blinks off.
            // keyed by index so switching language keeps the revealed node
            <div
              key={i}
              className="proj-card relative"
              style={{ "--delay": `${(i % 2) * 140}ms` } as CSSProperties}
            >
              {/* hovering types a comment, like the hero stickers */}
              <HoverComment comment={p.comments[i]} className="block">
                <ProjectCard
                  title={title}
                  cover={projects[i]?.cover}
                  tags={projects[i]?.tags}
                  color={projects[i]?.color}
                  href={projects[i]?.href}
                />
              </HoverComment>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
