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
    impact: { value: string; label: string }[];
    /** the image the old page showed right after Problema/Solução (optional) */
    image?: CaseImage;
  };
  sections: SimpleSection[];
};

const p = (text: string): ContentBlock => ({ type: "p", text });
const list = (...items: string[]): ContentBlock => ({ type: "list", items });
const img = (alt: string, src?: string): ContentBlock => ({ type: "img", image: { alt, src } });

export const ecotrack: SimpleCaseData = {
  slug: "ecotrack",
  accent: "#4F9A3E",
  subtitle:
    "Validado com 60% de aprovação entre empresários testados, o EcoTrack é um aplicativo que ajuda micro, pequenas e médias empresas (MPMEs) a monitorar, comparar e otimizar o uso de recursos como água, energia e resíduos, conectando sustentabilidade a impacto financeiro e decisões estratégicas.",
  meta: [
    { label: "Papel", value: "Product Designer" },
    { label: "Duração", value: "8 semanas" },
    { label: "Cliente", value: "Apple Developer Academy" },
    { label: "Categoria", value: "UX/UI Mobile" },
  ],
  cover: { src: "/img/projects/ecotrack.png", alt: "Telas do EcoTrack", width: 1600, height: 800 },
  overview: {
    problem: [
      "MPMEs gerenciam recursos sem visibilidade comparativa e não conseguem conectar sustentabilidade a decisões financeiras concretas.",
    ],
    solution:
      "App iOS que transforma dados ambientais em decisões estratégicas, conectando monitoramento, benchmarking e certificações em um único lugar.",
    impact: [
      { value: "60%", label: "de aprovação entre os empresários testados" },
      { value: "10", label: "empresários testaram o protótipo" },
    ],
    image: { alt: "Visão geral da solução" },
  },
  sections: [
    {
      id: "sec-processo",
      toc: "Processo",
      title: "Processo de Design",
      blocks: [
        p("O projeto foi conduzido utilizando Challenge Based Learning e Design Thinking, estruturando o processo em descoberta, definição e prototipação."),
        p("Na fase inicial, priorizei validar o problema com usuários e dados secundários antes de explorar soluções. Evitei partir direto para interface para garantir que o produto resolvesse uma dor real, e não uma suposição."),
        img("Processo de design"),
      ],
    },
    {
      id: "sec-descobertas",
      toc: "Descobertas",
      title: "Descobertas que Guiaram o Produto",
      blocks: [
        p("A pesquisa revelou três padrões consistentes:"),
        list(
          "Empresários não possuem referência para avaliar seus gastos",
          "Dados estão disponíveis, mas são difíceis de interpretar",
          "Certificações são pouco utilizadas por falta de clareza sobre retorno",
        ),
        p("A partir disso, defini três pilares para o produto: comparação, clareza e orientação prática."),
        p("Esses pilares direcionaram todas as decisões seguintes de produto."),
        img("Descobertas da pesquisa"),
        img("Pilares do produto"),
      ],
    },
    {
      id: "sec-perfil",
      toc: "Perfil",
      title: "Perfil e Comportamento do Usuário",
      blocks: [
        p("Modelei o usuário como um microempreendedor que acumula funções operacionais e financeiras, com pouco tempo disponível e alta sensibilidade a custos."),
        p("Esse entendimento me levou a evitar dashboards analíticos e relatórios detalhados, priorizando comparações diretas e indicadores simples para reduzir o tempo de interpretação e facilitar decisões rápidas."),
        p("O mapa de empatia revelou o padrão central que o produto precisava quebrar: sustentabilidade era percebida como obrigação operacional, não como diferencial competitivo."),
        img("Persona e mapa de empatia"),
      ],
    },
    {
      id: "sec-arquitetura",
      toc: "Arquitetura",
      title: "Arquitetura de Fluxo",
      blocks: [
        p("Organizei o produto em três seções com papéis distintos e complementares: Home para monitoramento e comparação dos recursos, Certificados para transformar certificações em progresso mensurável e Metas para conectar cada recurso a ações com retorno financeiro estimado."),
        p("A conexão entre as três foi uma decisão central. Monitorar sem comparar não gera urgência, comparar sem próximo passo não gera ação, e agir sem visibilidade de retorno não sustenta o comportamento."),
        img("Arquitetura de fluxo"),
      ],
    },
    {
      id: "sec-validacao",
      toc: "Validação",
      title: "Validação Estrutural",
      blocks: [
        p("Estruturei a solução em quatro frentes principais:"),
        list(
          "Registro simplificado de consumo",
          "Comparação com empresas similares",
          "Metas com impacto financeiro estimado",
          "Acompanhamento de certificações",
        ),
        p("Optei por priorizar comparação em vez de dashboards complexos porque os usuários demonstraram necessidade de entender rapidamente se estavam acima ou abaixo da média, e não de analisar grandes volumes de dados. Essa decisão reduziu a complexidade da interface e tornou a tomada de decisão mais imediata."),
        p("Também considerei automatizar recomendações mais avançadas, mas descartei essa abordagem neste momento por depender de dados que pequenas empresas geralmente não possuem de forma estruturada."),
        img("Wireframes — parte 1"),
        img("Wireframes — parte 2"),
        img("Wireframes — parte 3"),
      ],
    },
    {
      id: "sec-visual",
      toc: "Visual",
      title: "Diretrizes Visuais",
      blocks: [
        p("Optei pela SF Pro pela leitura analítica limpa, adequada ao contexto de gestão empresarial. Defini cores com papéis fixos por recurso:"),
        list("Azul para água;", "Amarelo para energia;", "Laranja para resíduos."),
        p("O empresário identifica o contexto antes de ler qualquer texto."),
        p("Verde claro e escuro ancoram a identidade da marca, estruturando a navegação e as ações primárias; azul escuro marca o universo de certificações, transmitindo autoridade e confiança."),
        img("Tipografia e cores"),
        img("Componentes da interface"),
      ],
    },
    {
      id: "sec-prototipo",
      toc: "Protótipo",
      title: "Protótipo de Alta Fidelidade",
      blocks: [
        p("Cada tela responde diretamente a um dos três pilares definidos na pesquisa."),
        list(
          "**Home: o dado virou contexto.** Centraliza os três recursos com consumo mensal, custo e análise comparativa com empresas do mesmo porte. O empresário entende em segundos se está acima ou abaixo da média do setor.",
          "**Certificados: a certificação abstrata virou progresso mensurável.** O empresário vê quais certificações são acessíveis para seu porte, o percentual de conclusão, as ações pendentes e os benefícios financeiros do selo. Dentro do próprio app, sem precisar pesquisar fora.",
          "**Metas: a intenção sustentável virou ação com retorno estimado.** Cada meta conecta um recurso a uma ação concreta com investimento inicial e projeção de economia a longo prazo, separando metas ativas de concluídas.",
        ),
        img("Telas em alta fidelidade"),
      ],
    },
    {
      id: "sec-teste",
      toc: "Teste",
      title: "Teste Exploratório",
      blocks: [
        p("Conduzi testes com 10 empresários de micro e pequenas empresas usando o protótipo interativo. O achado mais relevante foi comportamental: apresentar consumo com contexto comparativo e projeção financeira mudou o enquadramento da conversa, de \"preciso ser mais sustentável\" para \"posso reduzir custos e ganhar vantagem competitiva\"."),
        list(
          "A comparação com empresas semelhantes aumentou a confiança na tomada de decisão;",
          "A visualização de impacto financeiro tornou as ações sustentáveis mais relevantes;",
          "Muitos usuários nunca haviam tido acesso a seus dados contextualizados dessa forma.",
        ),
        p("Durante os testes, percebi que certificações eram pouco exploradas. Reposicionei a seção destacando benefícios práticos e financeiros. O engajamento com essa parte aumentou nas sessões seguintes."),
        img("Teste exploratório"),
      ],
    },
    {
      id: "sec-aprendizados",
      toc: "Aprendizados",
      title: "O que o EcoTrack me ensinou?",
      blocks: [
        list(
          "**Framing é uma decisão de design.** Nas entrevistas, chamar o EcoTrack de \"ferramenta de gestão\" em vez de \"app de sustentabilidade\" mudou completamente a receptividade. Aprendi que posicionamento não é só marketing, ele define quem abre o produto e por quê.",
          "**Dado sem consequência não move empresário.** A versão inicial mostrava consumo isolado. Só quando adicionei comparação setorial e projeção de economia na mesma tela é que o dado passou a gerar decisão. Para público de negócios, contexto e próximo passo precisam estar sempre juntos.",
          "**Certificações eram o diferencial que subestimei.** Na pesquisa apareceram como dor secundária. Nos testes, foram a feature que mais gerou engajamento. Com mais tempo de discovery, teria investigado esse tema com mais profundidade antes de definir a arquitetura.",
        ),
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
    { label: "Duração", value: "2 meses" },
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
      { value: "3º", label: "lugar no desafio ESG do SEBRAE/PE" },
      { value: "87%", label: "dos moradores testados participariam da trilha" },
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
        p("A proposta ficou em 3º lugar entre todas as equipes. Antes da apresentação, testei o protótipo com 8 moradores, amostra pequena que indica direção mais do que conclusão: 87% participariam da trilha se fosse gratuita, 75% sentiram que o programa era \"para eles\" e 90% acharam a plataforma fácil sem instrução. O achado mais relevante foi o nome: \"Chega Junto\" teve reação positiva imediata em todas as sessões, associado a acolhimento antes de qualquer descrição."),
        cj("resultados.webp", "3º lugar no desafio ESG e resultados do teste exploratório"),
      ],
    },
    {
      id: "sec-aprendizados",
      toc: "Aprendizados",
      title: "Aprendizados que \"chegaram junto\"",
      blocks: [
        list(
          "**Design de serviço pesa tanto quanto design de interface:** o produto digital é o meio, não o fim.",
          "**Restrição de marca é habilidade, não limitação:** exige priorizar em vez de explorar.",
          "**Pertencimento não se resolve com funcionalidade.** Antes de projetar qualquer tela, precisei projetar a percepção que o programa causaria.",
        ),
        cj("aprendizados.webp", "Os três aprendizados do projeto"),
      ],
    },
  ],
};

export const simpleCases: Record<string, SimpleCaseData> = {
  ecotrack,
  "chega-junto": chegaJunto,
};
