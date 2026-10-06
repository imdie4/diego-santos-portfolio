// Image-and-text case studies (provisional branch): same header and overview
// as the Lino case, then the sections of the old Framer portfolio, in its
// original order. Text in Portuguese only (the language switch is hidden).
//
// Inline **bold** is supported in any text. Images without `src` render as a
// numbered slot ("Imagem N") until the real file is added.

export type CaseImage = { src?: string; alt: string; width?: number; height?: number };

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "img"; image: CaseImage };

export type SimpleSection = {
  id: string;
  /** one-word label for the side index */
  toc: string;
  title: string;
  blocks: ContentBlock[];
};

export type SimpleCaseData = {
  slug: string;
  accent: string;
  subtitle: string;
  meta: { label: string; value: string }[];
  cover: CaseImage;
  overview: {
    problem: string[];
    solution: string;
    /** label lines are split with "\n" */
    impact: { value: string; label: string }[];
    /** the image the old page showed right after Problema/Solução (optional) */
    image?: CaseImage;
  };
  sections: SimpleSection[];
};

const p = (text: string): ContentBlock => ({ type: "p", text });
const list = (...items: string[]): ContentBlock => ({ type: "list", items });
const img = (alt: string, src?: string): ContentBlock => ({ type: "img", image: { alt, src } });

const ET = "/img/cases/ecotrack";
/** EcoTrack images: all exported at 1880×960. */
const et = (file: string, alt: string): ContentBlock => ({
  type: "img",
  image: { src: `${ET}/${file}`, alt, width: 1880, height: 960 },
});

export const ecotrack: SimpleCaseData = {
  slug: "ecotrack",
  accent: "#4F9A3E",
  subtitle:
    "App iOS que ajuda micro e pequenas empresas a monitorar, comparar e otimizar água, energia e resíduos, ligando sustentabilidade a decisão financeira.",
  meta: [
    { label: "Papel", value: "Product Designer" },
    { label: "Duração", value: "8 semanas" },
    { label: "Cliente", value: "Apple Developer Academy" },
    { label: "Categoria", value: "UX/UI Mobile" },
  ],
  cover: { src: "/img/projects/ecotrack.png", alt: "Telas do EcoTrack", width: 1600, height: 800 },
  overview: {
    problem: [
      "Micro e pequenas empresas gerenciam seus recursos sem nenhuma referência de comparação e não conseguem conectar sustentabilidade a decisões financeiras concretas.",
    ],
    solution:
      "Um app iOS que transforma dado ambiental em decisão estratégica, reunindo monitoramento, comparação com empresas similares e certificações em um só lugar.",
    impact: [
      { value: "70%", label: "nunca tinham visto\nseus dados assim" },
      { value: "75%", label: "quiseram\nacompanhar metas" },
    ],
  },
  sections: [
    {
      id: "sec-processo",
      toc: "Processo",
      title: "Processo de Design",
      blocks: [
        p("Conduzi o projeto em 8 semanas, com Challenge Based Learning e Design Thinking: descoberta, definição e prototipação. Antes de abrir qualquer interface, validei o problema com usuários e dados secundários, para resolver uma dor real, não uma suposição."),
        et("processo-cbl.png", "Cronograma de 8 semanas com Challenge Based Learning: Engage, Investigate e Act"),
      ],
    },
    {
      id: "sec-descobertas",
      toc: "Descobertas",
      title: "Descobertas que Guiaram o Produto",
      blocks: [
        p("Entrevistei 12 microempreendedores de setores variados. 67% nunca compararam seus gastos com empresas do mesmo porte, e 75% não sabiam como uma certificação ambiental poderia impactar o negócio. Três padrões se repetiram: falta de referência para avaliar gastos, dado difícil de interpretar e certificações pouco usadas por falta de clareza sobre o retorno. Deles saíram os três pilares do produto: comparação, clareza e orientação prática."),
        et("pesquisa-entrevistas.png", "Pesquisa com 12 micro e pequenos empresários: 67% nunca compararam gastos e 75% não sabiam o impacto da certificação"),
        et("mapa-falas-sentimentos.png", "Falas, sentimentos e oportunidades em registro, comparação, metas e certificados"),
      ],
    },
    {
      id: "sec-perfil",
      toc: "Perfil",
      title: "Perfil e Comportamento do Usuário",
      blocks: [
        p("Criei o Carlos Henrique, 36 anos, dono de uma padaria de bairro, que cuida sozinho de finanças e operação e vive atento a custo. Como ele tem pouco tempo, decidi evitar dashboards analíticos e priorizar comparações diretas e indicadores simples. O mapa de empatia mostrou o padrão que o produto precisava quebrar: sustentabilidade era vista como obrigação operacional, não como diferencial competitivo."),
        et("persona-carlos-henrique.webp", "Persona Carlos Henrique, 36 anos, dono de uma padaria de bairro"),
      ],
    },
    {
      id: "sec-arquitetura",
      toc: "Arquitetura",
      title: "Arquitetura de Fluxo",
      blocks: [
        p("Organizei o produto em três seções: Home, para monitorar e comparar, Certificados, para transformar certificação em progresso mensurável, e Metas, para ligar cada recurso a uma ação com retorno financeiro estimado. A conexão entre as três foi a decisão central: monitorar sem comparar não gera urgência, comparar sem próximo passo não gera ação, e agir sem ver o retorno não sustenta o comportamento."),
        et("arquitetura-fluxo.png", "Arquitetura de fluxo com Home, Certificados e Metas"),
      ],
    },
    {
      id: "sec-validacao",
      toc: "Validação",
      title: "Validação Estrutural",
      blocks: [
        p("Estruturei a solução em wireframe com quatro frentes: registro simplificado, comparação com similares, metas com impacto financeiro e acompanhamento de certificações. Priorizei comparação em vez de dashboards complexos, porque o empresário precisava saber rápido se estava acima ou abaixo da média. Descartei recomendações automatizadas, por dependerem de dados estruturados que pequenas empresas geralmente não têm."),
        et("wireframes.webp", "Wireframes das telas de Home, Certificados e Energia"),
      ],
    },
    {
      id: "sec-visual",
      toc: "Visual",
      title: "Diretrizes Visuais",
      blocks: [
        p("Escolhi a SF Pro pela leitura analítica limpa, adequada a um contexto de gestão. Cada recurso tem uma cor fixa (azul para água, amarelo para energia, laranja para resíduos), para o empresário identificar o contexto antes de ler qualquer texto. O verde ancora a marca e a navegação, e o azul escuro marca certificações, transmitindo autoridade."),
        et("tipografia-sf-pro.png", "Tipografia SF Pro e escala tipográfica"),
        et("cores-icones.png", "Paleta de cores e ícones"),
        et("componentes.png", "Componentes da interface"),
      ],
    },
    {
      id: "sec-prototipo",
      toc: "Protótipo",
      title: "Protótipo de Alta Fidelidade",
      blocks: [
        p("Cada tela responde a um dos pilares. Na Home, o dado virou contexto: consumo, custo e comparação com empresas do mesmo porte. Em Certificados, a certificação virou progresso mensurável, com percentual, pendências e benefício financeiro. Em Metas, a intenção virou ação, com investimento inicial e economia estimada."),
        et("prototipo-home-certificados-metas.png", "Protótipo das telas Home, Certificados e Metas"),
        et("prototipo-recursos.png", "Protótipo das telas de Resíduos, Água e Energia"),
      ],
    },
    {
      id: "sec-teste",
      toc: "Teste",
      title: "Teste Exploratório",
      blocks: [
        p("Testei o protótipo com 10 empresários, amostra pequena que indica direção mais do que conclusão. 70% nunca tinham visto seus dados contextualizados daquela forma, 60% disseram que o benchmarking influenciaria decisões futuras de redução de custo e 75% quiseram acompanhar metas depois de ver a projeção financeira. A conversa mudou de \"preciso ser mais sustentável\" para \"posso reduzir custos e ganhar vantagem competitiva\"."),
        p("Durante os testes, percebi que as certificações eram pouco exploradas. Reposicionei a seção destacando os benefícios práticos e financeiros, e o engajamento com ela subiu nas sessões seguintes."),
        et("teste-exploratorio.webp", "Resultados do teste com o protótipo interativo: 60%, 75% e 70%"),
      ],
    },
    {
      id: "sec-aprendizados",
      toc: "Aprendizados",
      title: "O que o EcoTrack me ensinou?",
      blocks: [
        list(
          "**Framing é uma decisão de design.** Chamar o app de \"ferramenta de gestão\" em vez de \"app de sustentabilidade\" mudou a receptividade nas entrevistas. Posicionamento define quem abre o produto e por quê.",
          "**Empresários valorizam resultado.** Só quando coloquei comparação setorial e projeção de economia na mesma tela o dado passou a gerar decisão.",
          "**Certificações se tornaram uma feature essencial.** Apareceram como dor secundária na pesquisa e viraram a feature de maior engajamento nos testes. Com mais tempo de discovery, teria investigado esse tema antes de fechar a arquitetura.",
        ),
        et("aprendizados.webp", "Os três aprendizados do EcoTrack"),
      ],
    },
  ],
};

const CJ = "/img/cases/chega-junto";
/** Chega Junto images: all exported at 1880×960. */
const cj = (file: string, alt: string): ContentBlock => ({
  type: "img",
  image: { src: `${CJ}/${file}`, alt, width: 1880, height: 960 },
});

export const chegaJunto: SimpleCaseData = {
  slug: "chega-junto",
  accent: "#4B2FC7",
  subtitle:
    "Uma trilha de empregabilidade que aproxima o SEBRAE/PE da comunidade Caranguejo Tabaiares e liga capacitação a vagas reais.",
  meta: [
    { label: "Papel", value: "Product Designer" },
    { label: "Duração", value: "8 semanas" },
    { label: "Cliente", value: "SEBRAE/PE" },
    { label: "Categoria", value: "UX/UI" },
  ],
  cover: { src: "/img/projects/chega-junto.png", alt: "Telas do Chega Junto", width: 1600, height: 800 },
  overview: {
    problem: [
      "O desafio de ESG pedia ações sociais estruturadas. Mas 80% dos moradores da comunidade ao lado nunca se sentiram à vontade para entrar na instituição.",
    ],
    solution:
      "A Trilha de Apoio à Empregabilidade: formação estruturada e uma plataforma digital que conecta aprendizado, acompanhamento e vagas, tornando o progresso visível.",
    impact: [
      { value: "3º", label: "lugar no\ndesafio ESG" },
      { value: "87%", label: "participariam\nda trilha" },
    ],
  },
  sections: [
    {
      id: "sec-processo",
      toc: "Processo",
      title: "Processo de Design",
      blocks: [
        p("Conduzi o projeto em 8 semanas, com Double Diamond. Primeiro abri o entendimento do problema com pesquisa interna e entrevistas, depois convergi para uma solução viável dentro das restrições do SEBRAE. Cada fase terminou com uma entrega validada."),
        cj("processo-double-diamond.png", "Cronograma de 8 semanas no Double Diamond: Discovery, Define, Develop e Delivery"),
      ],
    },
    {
      id: "sec-desafio",
      toc: "Desafio",
      title: "Entendendo o desafio",
      blocks: [
        p("O desafio era dos estagiários: integrar a instituição ao entorno, dentro de ESG. Escolhi a Comunidade Caranguejo Tabaiares, vizinha imediata do SEBRAE. O diagnóstico interno mostrou ações sociais pontuais e nenhuma iniciativa estruturada de aproximação: havia infraestrutura e conteúdo, mas nenhum canal até quem morava ao lado."),
        cj("desafio-diagnostico.png", "Desafio ESG escolhido, diagnóstico interno e entrevistas no SEBRAE"),
      ],
    },
    {
      id: "sec-comunidade",
      toc: "Pesquisa",
      title: "Ouvindo a Comunidade",
      blocks: [
        p("Entrevistei 10 pequenos empreendedores, 12 moradores e 6 funcionários. A barreira não era de acesso, era de percepção. A frase mais repetida: \"A gente passa na frente do SEBRAE, mas parece que não é um lugar feito pra gente.\" Isso apontou três direções: um programa com identidade própria, separada da marca institucional, pertencimento desde o primeiro contato e capacitação ligada a oportunidade concreta."),
        cj("pesquisa-comunidade.png", "Entrevistados na Comunidade Caranguejo Tabaiares e principais números da pesquisa"),
      ],
    },
    {
      id: "sec-publico",
      toc: "Persona",
      title: "Definição de Público e Comportamento",
      blocks: [
        p("Criei o José Carlos, 25 anos, vendedor informal de lanches, que acha que o SEBRAE é só para empresários formalizados. Ele não tem problema de motivação, tem de pertencimento. Por isso decidi que o programa precisava ir até ele, não esperar que ele chegasse."),
        cj("persona-jose-carlos.webp", "Persona José Carlos, 25 anos, com objetivos e dores"),
      ],
    },
    {
      id: "sec-trilha",
      toc: "Trilha",
      title: "Concepção da Trilha de Apoio à Empregabilidade",
      blocks: [
        p("Defini três condições: ser gratuita, usar conteúdo que o SEBRAE já tinha e gerar pertencimento ao longo do tempo. O resultado foi um programa de 2 meses com cursos, palestras e oficinas, exclusivo para moradores, com certificado e conexão com vagas parceiras. Reaproveitar o conteúdo foi a decisão que tornou a proposta viável: o design criou uma jornada nova, não conteúdo novo."),
        cj("trilha-solucao.webp", "Solução desenvolvida e os cursos da Trilha de Apoio à Empregabilidade"),
      ],
    },
    {
      id: "sec-entrada",
      toc: "Entrada",
      title: "Landing Page: fluxo de entrada e engajamento",
      blocks: [
        p("O maior risco era a inscrição: uma página institucional demais reproduziria a barreira. Estruturei a página para reduzir o atrito aos poucos, com CTA imediato, benefícios antes de qualquer detalhe, depoimentos para credibilidade e um segundo CTA no fim."),
        cj("fluxo-landing-page.png", "Fluxo da landing page: header, benefícios, detalhes da trilha, depoimentos e detalhes do projeto"),
      ],
    },
    {
      id: "sec-fluxo",
      toc: "Fluxo",
      title: "Fluxo da experiência do participante",
      blocks: [
        p("A plataforma tem dois núcleos: Encontros, para o aprendizado, e Vagas, para o objetivo final. Separei de propósito, porque misturar os dois confundiria o objetivo de cada acesso."),
        cj("arquitetura-plataforma.png", "Arquitetura da plataforma, com os núcleos Encontros e Vagas"),
      ],
    },
    {
      id: "sec-wireframes",
      toc: "Wireframes",
      title: "Wireframing",
      blocks: [
        p("Na primeira versão da home, o próximo encontro e as vagas disputavam atenção. Priorizei o encontro no topo, já que sem completar a trilha o participante não chega ao banco de talentos."),
        cj("wireframes.png", "Wireframes da landing page e da plataforma"),
      ],
    },
    {
      id: "sec-style",
      toc: "Visual",
      title: "Style Guide",
      blocks: [
        p("Trabalhei dentro da marca do SEBRAE, com a tipografia Campuni e a paleta existente. Usei o azul mais saturado para estrutura e ações primárias, e o rosa mais saturado para engajamento. O desafio era decidir bem dentro de um espaço menor, não criar um sistema."),
        cj("style-guide-tipografia.png", "Tipografia Campuni e escala tipográfica"),
        cj("style-guide-cores-componentes.png", "Paleta de cores e componentes da interface"),
      ],
    },
    {
      id: "sec-landing",
      toc: "Landing",
      title: "Protótipo: Landing Page",
      blocks: [
        p("Tom direto e acolhedor. O nome \"Chega Junto\" já comunica pertencimento antes de qualquer texto, e os benefícios aparecem logo depois do hero."),
        cj("prototipo-landing-page.webp", "Protótipo da landing page do Chega Junto"),
      ],
    },
    {
      id: "sec-aluno",
      toc: "Plataforma",
      title: "Protótipo: Área do Aluno",
      blocks: [
        p("A home mostra o próximo encontro, as faltas com alerta visual e o progresso na trilha. Ao concluir, o certificado fica disponível e o banco de vagas é desbloqueado, ligando aprendizado a oportunidade de forma sequencial."),
        cj("prototipo-area-do-aluno.webp", "Protótipo da área do aluno: home de Encontros e banco de Vagas"),
      ],
    },
    {
      id: "sec-resultados",
      toc: "Resultados",
      title: "Resultados e validação",
      blocks: [
        p("A proposta ficou em 3º lugar entre todas as equipes. Antes da apresentação, testei o protótipo com 12 moradores, amostra pequena que indica direção mais do que conclusão: 87% participariam da trilha se fosse gratuita, 75% disseram que o nome e o visual geravam sensação de pertencimento e 80% acharam a plataforma fácil de usar desde a primeira interação. O achado mais relevante foi o nome: \"Chega Junto\" teve reação positiva imediata em todas as sessões, associado a acolhimento antes de qualquer descrição."),
        cj("resultados.webp", "3º lugar no desafio ESG e resultados do teste exploratório"),
      ],
    },
    {
      id: "sec-aprendizados",
      toc: "Aprendizados",
      title: "Aprendizados que \"chegaram junto\"",
      blocks: [
        list(
          "**Design de serviço é tão importante quanto UI:** o produto digital é o meio, não o fim.",
          "**Restrições são uma habilidade, não uma limitação:** exigem priorizar em vez de explorar.",
          "**Pertencimento não se resolve com funcionalidade.** Antes de projetar qualquer tela, precisei projetar a percepção que o programa causaria.",
        ),
        cj("aprendizados.webp", "Os três aprendizados do projeto"),
      ],
    },
  ],
};

const LI = "/img/cases/lino";
/** Lino images: all exported at 1880×960. */
const li = (file: string, alt: string): ContentBlock => ({
  type: "img",
  image: { src: `${LI}/${file}`, alt, width: 1880, height: 960 },
});

export const lino: SimpleCaseData = {
  slug: "lino",
  accent: "#3366E4",
  subtitle:
    "Redesenho gamificado reduziu o abandono do treino fonoaudiológico, elevando a conclusão em 42%.",
  meta: [
    { label: "Papel", value: "Product Designer" },
    { label: "Duração", value: "6 semanas" },
    { label: "Cliente", value: "Apple Developer Academy" },
    { label: "Categoria", value: "UX/UI Mobile" },
  ],
  cover: { src: "/img/projects/lino.png", alt: "Telas do Lino", width: 1600, height: 800 },
  overview: {
    problem: [
      "A terapia fonoaudiológica infantil depende de repetição constante. As crianças se desmotivam com ela, e pais e terapeutas não conseguem acompanhar o progresso fora do consultório.",
    ],
    solution:
      "Um app gamificado que torna a terapia mais envolvente para a criança e acompanhável para pais e terapeutas.",
    impact: [
      { value: "+42%", label: "de atividades\nconcluídas" },
      { value: "+38%", label: "de frequência\nsemanal" },
    ],
  },
  sections: [
    {
      id: "sec-processo",
      toc: "Processo",
      title: "Processo de Design",
      blocks: [
        p("Conduzi o projeto de forma iterativa, em descoberta, definição, ideação e prototipação. Como líder de design, priorizei validar o comportamento dos usuários antes de aprofundar a interface, para não investir em solução visual que não resolvesse o problema central."),
        li("processo-cbl.png", "Cronograma do projeto com Challenge Based Learning: Engage, Investigate e Act"),
      ],
    },
    {
      id: "sec-pesquisa",
      toc: "Pesquisa",
      title: "Causas e oportunidades",
      blocks: [
        p("Entrevistei 8 crianças, 15 responsáveis e 10 fonoaudiólogos na Comunidade Beira Rio, na Várzea, e encontrei três dores conectadas: a repetição cansa e derruba o engajamento, os responsáveis não enxergam a evolução e os terapeutas perdem visibilidade da prática em casa. Ao cruzar as três, percebi que o problema não era falta de exercício, era a forma como a repetição era vivida. A decisão central foi transformar repetição em progresso percebido, atuando no momento de maior abandono."),
        li("pesquisa-campo.png", "Pesquisa na Comunidade Beira Rio / Várzea: entrevistados, números e falas"),
        li("falas-fonoaudiologos.png", "Falas de fonoaudiólogos sobre a rotina de exercícios"),
      ],
    },
    {
      id: "sec-publico",
      toc: "Persona",
      title: "Definição de Público e Comportamento",
      blocks: [
        p("Modelei dois perfis. A criança responde a estímulo, recompensa e variação. O responsável busca clareza e segurança para saber se a prática funciona. Ao mapear a jornada, vi que a quebra de engajamento acontece durante a repetição, então priorizei esse momento em vez de expandir para funcionalidades paralelas."),
        li("personas-mapa-empatia.png", "Personas Ana Paula Oliveira e Lucas Oliveira, com mapa de empatia"),
        li("jornada.png", "Jornada da prática: descoberta, prática, progresso e avaliação"),
      ],
    },
    {
      id: "sec-arquitetura",
      toc: "Arquitetura",
      title: "Arquitetura da Solução",
      blocks: [
        p("Dividi o produto em dois núcleos: Home, com atividades, missão diária e medalhas para a criança, e Jornada, com progresso, relatório e gestão de atividades para o responsável. Foi uma decisão consciente para separar ação de acompanhamento, reduzir a carga cognitiva e permitir evoluir o produto sem aumentar a complexidade."),
        li("arquitetura.png", "Arquitetura do Lino, com os núcleos Home e Jornada"),
      ],
    },
    {
      id: "sec-wireframes",
      toc: "Wireframes",
      title: "Wireframing",
      blocks: [
        p("Usei wireframes para validar estrutura e fluxo antes da interface final. Dois problemas apareceram: o feedback de recompensa precisava ser imediato dentro da atividade, não no fim, e o dashboard da Jornada tinha informação demais. Simplifiquei para os dois indicadores mais acionáveis."),
        li("wireframes.webp", "Wireframes das telas de Home, Medalhas, Missão Diária e atividade"),
      ],
    },
    {
      id: "sec-visual",
      toc: "Visual",
      title: "Sistema visual",
      blocks: [
        p("Escolhi a SF Pro Rounded pela leveza e consistência com as HIG da Apple. Defini quatro cores com papel fixo: azul para atividades e acompanhamento, laranja para conquistas, rosa para a missão diária e verde para as áreas de suporte. A criança deveria identificar o contexto pela cor antes de ler qualquer texto."),
        li("tipografia-sf-pro-rounded.png", "Tipografia SF Pro Rounded e escala tipográfica"),
        li("cores-icones.png", "Paleta de cores e ícones"),
        li("componentes.png", "Componentes da interface"),
      ],
    },
    {
      id: "sec-prototipo",
      toc: "Protótipo",
      title: "Protótipo de Alta Fidelidade",
      blocks: [
        p("Cada tela responde a uma oportunidade da pesquisa. Na Home, missão diária, streak semanal e medalhas tornam a repetição progresso visível. Em Atividades, pontuação em tempo real, instrução ilustrada e palavras reais com imagem e áudio de referência transformam o exercício em jogo. O feedback aparece só nos acertos: se a criança erra, a atividade segue sem interrupção e o resultado completo vem no final. Na Jornada, relatório exportável, calendário de prática com os dias treinados, média de acertos e histórico transformam o acompanhamento informal em dado estruturado."),
        li("prototipo-home-missao-medalhas.webp", "Protótipo das telas de Missão Diária, Home e Medalhas"),
        li("prototipo-jornada-progresso.webp", "Protótipo das telas de Jornada e Progresso"),
      ],
    },
    {
      id: "sec-resultados",
      toc: "Resultados",
      title: "Resultados e Validação",
      blocks: [
        p("Testei por 3 semanas com 6 crianças, 5 responsáveis e 3 fonoaudiólogas, amostra pequena que indica direção mais do que conclusão. Observei as mesmas crianças com o método tradicional e depois com o Lino, nas mesmas condições em casa. A conclusão de atividades subiu 42%, a frequência semanal 38% e o tempo médio de engajamento por sessão 31%, e 87% dos responsáveis relataram maior clareza sobre o progresso."),
        p("O principal aprendizado foi o mecanismo por trás dos números: ver pontos e estrelas acumulando em tempo real reduzia a resistência à repetição. Aprender a articular um fonema não tem feedback imediato, e o design precisava criar esse feedback."),
        li("resultados.png", "Resultados do teste de 3 semanas: +42%, +38%, 87% e +31%"),
      ],
    },
    {
      id: "sec-aprendizados",
      toc: "Aprendizados",
      title: "Aprendizados que o Lino me trouxe",
      blocks: [
        list(
          "**Teste com crianças precisa vir mais cedo no processo.** Validei wireframes com adultos e só vi o problema no protótipo final: adultos subestimam a impaciência infantil com fluxos longos.",
          "**Separar os fluxos foi a decisão mais impactante.** Só foi possível porque as personas foram mapeadas a fundo antes de qualquer decisão de arquitetura.",
          "**Teste de retenção era importante para as métricas.** Os testes mediram engajamento dentro da sessão, não retenção, então D1 e D7 seriam as métricas prioritárias. Também priorizaria um alerta proativo ao responsável, que hoje só percebe uma falta de prática ao abrir a Jornada por conta própria.",
        ),
        li("aprendizados.png", "Os três aprendizados do Lino"),
      ],
    },
  ],
};

export const simpleCases: Record<string, SimpleCaseData> = {
  lino,
  ecotrack,
  "chega-junto": chegaJunto,
};
