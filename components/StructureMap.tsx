// Mind-map of the product's information architecture (matches the reference sketch).
// Central node is a placeholder for the mascot/icon.

const ORANGE = "#C2772F";
const INK = "#3d3a37";

type Node = { x: number; y: number; w: number; h: number; label: string };

const NODES: Record<string, Node> = {
  primeira: { x: 30, y: 70, w: 200, h: 40, label: "Primeira Atividade" },
  missao: { x: 30, y: 125, w: 200, h: 40, label: "Missão Diária" },
  todas: { x: 30, y: 180, w: 200, h: 40, label: "Todas as atividades" },
  medalhas: { x: 30, y: 235, w: 200, h: 40, label: "Medalhas" },
  home: { x: 280, y: 153, w: 150, h: 44, label: "Home" },
  editar: { x: 30, y: 378, w: 200, h: 40, label: "Editar Perfil" },
  fontes: { x: 30, y: 433, w: 200, h: 40, label: "Fontes" },
  perfil: { x: 280, y: 393, w: 150, h: 44, label: "Perfil" },
  cadastro: { x: 450, y: 40, w: 150, h: 44, label: "Cadastro" },
  onboarding: { x: 445, y: 115, w: 160, h: 44, label: "OnBoarding" },
  jornada: { x: 640, y: 208, w: 150, h: 44, label: "Jornada" },
  progresso: { x: 850, y: 208, w: 150, h: 44, label: "Progresso" },
  gerar: { x: 845, y: 135, w: 160, h: 44, label: "Gerar Relatório" },
  gerenciar: { x: 838, y: 295, w: 184, h: 44, label: "Gerenciar Atividades" },
};

// Central mascot placeholder.
const MASCOT = { x: 470, y: 175, w: 110, h: 110 };
const MC = { x: MASCOT.x + MASCOT.w / 2, y: MASCOT.y + MASCOT.h / 2 }; // center

const cx = (n: Node) => n.x + n.w / 2;
const cy = (n: Node) => n.y + n.h / 2;

// Orthogonal "elbow" connector: straight horizontal/vertical segments with
// rounded corners — horizontal first, then vertical, then horizontal.
const elbow = (x1: number, y1: number, x2: number, y2: number) => {
  if (Math.abs(y1 - y2) < 1 || Math.abs(x1 - x2) < 1)
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  const mx = (x1 + x2) / 2;
  const sx1 = Math.sign(mx - x1);
  const dy = Math.sign(y2 - y1);
  const sx2 = Math.sign(x2 - mx);
  const r = Math.min(14, Math.abs(mx - x1), Math.abs(x2 - mx), Math.abs(y2 - y1) / 2);
  return `M ${x1} ${y1} L ${mx - sx1 * r} ${y1} Q ${mx} ${y1} ${mx} ${y1 + dy * r} L ${mx} ${y2 - dy * r} Q ${mx} ${y2} ${mx + sx2 * r} ${y2} L ${x2} ${y2}`;
};

const EDGES: string[] = [
  // Home ← its screens (child right edge → Home left edge)
  ...["primeira", "missao", "todas", "medalhas"].map((k) =>
    elbow(NODES[k].x + NODES[k].w, cy(NODES[k]), NODES.home.x, cy(NODES.home)),
  ),
  // Perfil ← its screens
  ...["editar", "fontes"].map((k) =>
    elbow(NODES[k].x + NODES[k].w, cy(NODES[k]), NODES.perfil.x, cy(NODES.perfil)),
  ),
  // Center ← Home / Perfil
  elbow(NODES.home.x + NODES.home.w, cy(NODES.home), MASCOT.x, MC.y - 22),
  elbow(NODES.perfil.x + NODES.perfil.w, cy(NODES.perfil), MASCOT.x, MC.y + 22),
  // OnBoarding → Cadastro (up)
  elbow(cx(NODES.onboarding), NODES.onboarding.y, cx(NODES.cadastro), NODES.cadastro.y + NODES.cadastro.h),
  // Center → OnBoarding (up)
  elbow(MC.x, MASCOT.y, cx(NODES.onboarding), NODES.onboarding.y + NODES.onboarding.h),
  // Center → Jornada → Progresso
  elbow(MASCOT.x + MASCOT.w, MC.y, NODES.jornada.x, cy(NODES.jornada)),
  elbow(NODES.jornada.x + NODES.jornada.w, cy(NODES.jornada), NODES.progresso.x, cy(NODES.progresso)),
  // Progresso → Gerar Relatório (up)
  elbow(cx(NODES.progresso), NODES.progresso.y, cx(NODES.gerar), NODES.gerar.y + NODES.gerar.h),
  // Jornada → Gerenciar Atividades (down)
  elbow(NODES.jornada.x + NODES.jornada.w, cy(NODES.jornada), NODES.gerenciar.x, cy(NODES.gerenciar)),
];

export function StructureMap() {
  return (
    <div className="overflow-x-auto">
      <svg
        viewBox="0 0 1040 490"
        className="mx-auto h-auto w-full min-w-[720px]"
        role="img"
        aria-label="Arquitetura do produto: núcleos Prática (Home) e Jornada"
      >
        {/* connectors */}
        <g fill="none" stroke={ORANGE} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          {EDGES.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>

        {/* Lino app icon (mascot) */}
        <svg
          x={MASCOT.x}
          y={MASCOT.y}
          width={MASCOT.w}
          height={MASCOT.h}
          viewBox="0 0 114 114"
          aria-label="Ícone do app Lino"
        >
          <rect width="113.868" height="113.868" rx="21.3502" fill="#EEAD41" />
          <path d="M71.4231 0H41.2913C21.8763 0 6.11335 15.763 6.11335 35.1779V93.0587C6.11335 104.545 15.4359 113.868 26.9226 113.868H87.0404C98.5271 113.868 107.85 104.545 107.85 93.0587V36.4161C107.85 16.3144 91.5352 0 71.4335 0H71.4231Z" fill="#EEAD41" />
          <path d="M81.8192 57.7223C73.0274 57.7223 65.9002 50.5951 65.9002 41.8033C65.9002 33.0115 73.0274 25.8843 81.8192 25.8843C90.6111 25.8843 97.7383 33.0115 97.7383 41.8033C97.7383 50.5951 90.6111 57.7223 81.8192 57.7223Z" fill="#E0943B" />
          <path d="M33.743 57.7223C24.9512 57.7223 17.824 50.5951 17.824 41.8033C17.824 33.0115 24.9512 25.8843 33.743 25.8843C42.5349 25.8843 49.6621 33.0115 49.6621 41.8033C49.6621 50.5951 42.5349 57.7223 33.743 57.7223Z" fill="#E0943B" />
          <path d="M96.1192 70.9818C92.9932 70.9818 90.4591 68.4477 90.4591 65.3217C90.4591 62.1957 92.9932 59.6616 96.1192 59.6616C99.2452 59.6616 101.779 62.1957 101.779 65.3217C101.779 68.4477 99.2452 70.9818 96.1192 70.9818Z" fill="#FFD9A1" />
          <path d="M18.3008 70.9818C15.1748 70.9818 12.6407 68.4477 12.6407 65.3217C12.6407 62.1957 15.1748 59.6616 18.3008 59.6616C21.4268 59.6616 23.9609 62.1957 23.9609 65.3217C23.9609 68.4477 21.4268 70.9818 18.3008 70.9818Z" fill="#FFD9A1" />
          <path d="M36.1844 57.7223C27.3926 57.7223 20.2654 50.5951 20.2654 41.8033C20.2654 33.0115 27.3926 25.8843 36.1844 25.8843C44.9763 25.8843 52.1035 33.0115 52.1035 41.8033C52.1035 50.5951 44.9763 57.7223 36.1844 57.7223Z" fill="white" />
          <path d="M37.2828 51.6834C31.887 51.6834 27.5129 47.3092 27.5129 41.9135C27.5129 36.5177 31.887 32.1436 37.2828 32.1436C42.6786 32.1436 47.0527 36.5177 47.0527 41.9135C47.0527 47.3092 42.6786 51.6834 37.2828 51.6834Z" fill="#7F5619" />
          <path d="M79.9208 57.7223C71.1289 57.7223 64.0017 50.5951 64.0017 41.8033C64.0017 33.0115 71.1289 25.8843 79.9208 25.8843C88.7126 25.8843 95.8398 33.0115 95.8398 41.8033C95.8398 50.5951 88.7126 57.7223 79.9208 57.7223Z" fill="white" />
          <path d="M81.0992 51.6834C75.7034 51.6834 71.3293 47.3092 71.3293 41.9135C71.3293 36.5177 75.7034 32.1436 81.0992 32.1436C86.495 32.1436 90.8691 36.5177 90.8691 41.9135C90.8691 47.3092 86.495 51.6834 81.0992 51.6834Z" fill="#7F5619" />
          <path d="M78.0229 78.9497L81.888 90.5848C83.7139 96.1025 80.7285 102.073 75.2108 103.899C69.6931 105.725 63.7222 102.74 61.8963 97.2221L58.0312 85.5869" fill="#E0665B" />
          <path d="M29.5854 79.6284C46.9382 87.7316 67.6229 87.8782 84.9623 79.6683C87.2814 78.5621 85.2556 75.1236 82.9498 76.2164C67.0098 83.76 47.5646 83.6267 31.6112 76.1765C29.2922 75.0836 27.2531 78.5355 29.5854 79.6284Z" fill="#7F5619" />
          <ellipse cx="35.0772" cy="38.1422" rx="5.47762" ry="5.47761" fill="white" />
          <ellipse cx="78.8956" cy="38.1422" rx="5.47762" ry="5.47761" fill="white" />
        </svg>

        {/* pills */}
        {Object.entries(NODES).map(([k, n]) => (
          <g key={k}>
            <rect
              x={n.x}
              y={n.y}
              width={n.w}
              height={n.h}
              rx={n.h / 2}
              fill="#ffffff"
              stroke={ORANGE}
              strokeWidth={2}
            />
            <text
              x={cx(n)}
              y={cy(n)}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={16}
              fill={INK}
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
