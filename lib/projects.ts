export interface ProjectMeta {
  slug: string;
  cover: string;
  color: string;
  href?: string; // case study page, when it exists
  tags?: string[]; // case categories, shown under the title
}

/** Order matches `projects.items` in the i18n dictionary. */
export const projects: ProjectMeta[] = [
  { slug: "lino", cover: "/img/projects/lino.png", color: "#2F62E8", href: "/cases/lino", tags: ["Mobile", "UX/UI", "Product Design"] },
  { slug: "chega-junto", cover: "/img/projects/chega-junto.png", color: "#4B2FC7", tags: ["Web", "UX/UI", "Service Design"] },
  { slug: "ecotrack", cover: "/img/projects/ecotrack.png", color: "#8FB63C", href: "/cases/ecotrack", tags: ["Mobile", "UX/UI", "Product Design"] },
];
