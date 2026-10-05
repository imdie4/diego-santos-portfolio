import Link from "next/link";

export function FigmaBadge() {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#0D99FF]">
      <svg viewBox="0 0 74 74" className="h-4 w-4" fill="none" aria-hidden>
        <path
          d="M50.1132 65.7787L65.2802 50.6118C65.8068 50.0852 66.0352 49.331 65.8894 48.6005L63.5596 36.9548C63.0594 34.4542 61.8997 32.1328 60.2005 30.2312C58.5013 28.3297 56.3245 26.9171 53.8957 26.1399L23.1843 16.3117C22.1587 15.9834 21.0624 15.9439 20.0158 16.1976C18.9692 16.4513 18.0127 16.9883 17.2512 17.7498C16.4897 18.5113 15.9527 19.4678 15.699 20.5144C15.4453 21.561 15.4848 22.6572 15.8132 23.6829L25.6413 54.3943C26.4183 56.8231 27.8307 59 29.7321 60.6994C31.6336 62.3987 33.9548 63.5586 36.4554 64.059L48.1028 66.3871C48.8325 66.5337 49.5874 66.3045 50.1132 65.7787Z"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.2512 17.7504L39.1591 39.6582M37.9255 44.2622C36.9759 40.7173 40.2191 37.4741 43.7631 38.4246C47.3079 39.3742 48.4943 43.8047 45.8999 46.3991C43.3047 48.9943 38.8751 47.807 37.9255 44.2622Z"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

// One fixed color per category, so a tag looks the same on every card.
const TAG_COLOR: Record<string, string> = {
  Mobile: "bg-blue-50 text-blue-700",
  Web: "bg-violet-50 text-violet-700",
  "UX/UI": "bg-rose-50 text-rose-700",
  "Product Design": "bg-emerald-50 text-emerald-700",
  "Service Design": "bg-amber-50 text-amber-700",
};

interface ProjectCardProps {
  cover: string;
  color: string;
  title: string;
  href?: string;
  tags?: string[];
}

/** The project card used on the home grid and in "other projects". */
export function ProjectCard({ cover, color, title, href, tags }: ProjectCardProps) {
  const inner = (
    <>
      <div
        className="card-cover h-72 bg-cover bg-center"
        style={{ backgroundColor: color, backgroundImage: `url(${cover})` }}
      />
      <div className="flex items-start gap-3 p-5">
        <FigmaBadge />
        <div className="min-w-0">
          <h3 className="text-lg font-medium leading-7 line-clamp-2">{title}</h3>
          {tags && tags.length > 0 && (
            <ul className="mt-2.5 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className={`card-tag rounded-md px-2 py-0.5 text-xs font-medium ${
                    TAG_COLOR[tag] ?? "bg-neutral-100 text-neutral-600"
                  }`}
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
  const cls =
    "group block overflow-hidden rounded-2xl bg-white shadow-panel transition-shadow hover:ring-2 hover:ring-figma-selection";

  return href ? (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <article className={cls}>{inner}</article>
  );
}
