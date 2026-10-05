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
    /** the image the old page showed right after Problema/Solução */
    image: CaseImage;
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

export const chegaJunto: SimpleCaseData = {
  slug: "chega-junto",
  accent: "#4B2FC7",
  subtitle:
    "Chega Junto Tabaiares é uma solução criada para aproximar o SEBRAE/PE da comunidade Caranguejo Tabaiares, estruturando uma jornada de capacitação conectada a oportunidades reais de trabalho. O projeto conquistou 3º lugar em desafio interno de ESG do Sebrae.",
  meta: [
    { label: "Papel", value: "Product Designer" },
    { label: "Duração", value: "2 meses" },
    { label: "Cliente", value: "SEBRAE/PE" },
    { label: "Categoria", value: "UX/UI" },
  ],
  cover: { src: "/img/projects/chega-junto.png", alt: "Telas do Chega Junto", width: 1600, height: 800 },
  overview: {
    problem: [
      "O desafio de ESG do SEBRAE exigia ações sociais estruturadas, mas 80% dos moradores da Comunidade Caranguejo Tabaiares nunca se sentiram à vontade para entrar na instituição que ficava ao lado de suas casas.",
    ],
    solution:
      "Criação da Trilha de Apoio à Empregabilidade, combinando formação estruturada com uma plataforma digital que conecta aprendizado, acompanhamento e acesso a vagas, reduzindo barreiras e tornando o progresso visível.",
    impact: [
      { value: "3º", label: "lugar no desafio ESG do SEBRAE/PE" },
      { value: "87%", label: "dos moradores testados participariam da trilha" },
    ],
    image: { alt: "Visão geral da solução" },
  },
  sections: [
    {
      id: "sec-processo",
      toc: "Processo",
      title: "Processo de Design",
      blocks: [
        p("Conduzi o projeto ao longo de 8 semanas seguindo o Double Diamond, estruturando o processo em duas fases distintas: primeiro expandir o entendimento do problema por meio de pesquisa interna e entrevistas com a comunidade, depois convergir para uma solução viável dentro das restrições institucionais do SEBRAE."),
        p("Cada fase produziu uma entrega validada antes de avançar."),
        img("Processo de design (Double Diamond)"),
      ],
    },
    {
      id: "sec-desafio",
      toc: "Desafio",
      title: "Entendendo o desafio",
      blocks: [
        p("O projeto nasceu de um desafio de ESG proposto pelo SEBRAE/PE para estagiários: identificar oportunidades de integração entre a instituição e a comunidade do entorno dentro da estratégia de Environment, Social and Governance. Após analisar o cenário interno, escolhi trabalhar com a integração da Comunidade Caranguejo Tabaiares, uma comunidade de baixa renda localizada no entorno imediato do SEBRAE/PE em Recife."),
        p("O diagnóstico interno revelou dois problemas centrais: as ações sociais existentes eram pontuais e sem continuidade, e não havia nenhuma iniciativa estruturada de aproximação com os moradores. O SEBRAE tinha infraestrutura e conteúdo, mas nenhum canal que conectasse isso à comunidade ao lado."),
        img("Diagnóstico interno"),
      ],
    },
    {
      id: "sec-comunidade",
      toc: "Pesquisa",
      title: "Ouvindo a Comunidade",
      blocks: [
        p("Fui a campo na Comunidade Caranguejo Tabaiares e conduzi entrevistas com 10 pequenos empreendedores, 12 moradores e 6 funcionários do SEBRAE/PE. Os dados revelaram uma barreira que não era de acesso físico, era de percepção."),
        p("A frase que mais se repetiu nas entrevistas foi: \"A gente passa na frente do SEBRAE, mas parece que não é um lugar feito pra gente.\" Essa percepção definiu o problema central e apontou três oportunidades claras:"),
        list(
          "**Reduzir a barreira percebida:** criar um programa com identidade própria, separada da marca institucional do SEBRAE.",
          "**Gerar pertencimento desde o primeiro contato:** nome, comunicação e tom precisavam sinalizar que o programa era feito para aquela comunidade especificamente.",
          "**Conectar capacitação a oportunidade concreta:** engajamento sustentado só se mantém quando o participante vê para onde o aprendizado leva.",
        ),
        p("Essas três oportunidades nortearam todas as decisões seguintes de produto e comunicação."),
        img("Pesquisa com a comunidade"),
      ],
    },
    {
      id: "sec-publico",
      toc: "Persona",
      title: "Definição de Público e Comportamento",
      blocks: [
        p("Construí a persona do José Carlos, 25 anos, morador da Caranguejo Tabaiares, estudante e vendedor informal de lanches. Ele quer melhorar a renda da família e encontrar oportunidades de trabalho, mas acredita que o SEBRAE é exclusivo para empresários formalizados e não se sente à vontade para buscar ajuda lá."),
        p("José Carlos não tem problema de motivação. Ele tem problema de pertencimento. Essa distinção foi central para as decisões de produto: o programa precisava ir até ele, não esperar que ele chegasse até o SEBRAE."),
        img("Persona José Carlos"),
      ],
    },
    {
      id: "sec-trilha",
      toc: "Trilha",
      title: "Concepção da Trilha de Apoio à Empregabilidade",
      blocks: [
        p("Com base nos dados de pesquisa, defini que a solução precisava atender três condições simultaneamente:"),
        list(
          "Ser gratuita;",
          "Usar conteúdo já existente no SEBRAE para viabilizar o custo;",
          "Criar uma estrutura de acompanhamento que gerasse pertencimento ao longo do tempo, não apenas um evento pontual.",
        ),
        p("A resposta foi a Trilha de Apoio à Empregabilidade Chega Junto: um programa de 2 meses com encontros regulares de cursos, palestras e oficinas, exclusivo para moradores da Caranguejo Tabaiares, com certificação ao final e conexão direta com vagas de empresas parceiras do SEBRAE. Duas turmas por ano."),
        p("A decisão de usar produtos já existentes no SEBRAE foi estratégica e reduziu o custo de implementação e tornou a proposta viável institucionalmente. O design não criou conteúdo novo; criou uma jornada nova para conteúdo que já existia."),
        img("Trilha de Apoio à Empregabilidade"),
      ],
    },
    {
      id: "sec-entrada",
      toc: "Entrada",
      title: "Landing Page: fluxo de entrada e engajamento",
      blocks: [
        p("O maior risco do programa era a inscrição: se a landing page parecesse burocrática ou institucional demais, reproduziria exatamente a barreira que a pesquisa identificou."),
        p("Estruturei o fluxo para reduzir esse atrito progressivamente:"),
        list(
          "O header apresenta o programa com um CTA imediato para quem já quer se inscrever;",
          "Seguido pelos três benefícios principais que contextualizam o valor antes de qualquer detalhe;",
          "A trilha é apresentada em seguida;",
          "Os depoimentos aparecem para construir credibilidade;",
          "Um segundo CTA fecha a página, garantindo que o usuário tenha sempre uma saída clara independente de onde parou de ler.",
        ),
        img("Fluxo da landing page"),
      ],
    },
    {
      id: "sec-fluxo",
      toc: "Fluxo",
      title: "Fluxo da experiência do participante",
      blocks: [
        p("Após a inscrição, projetei a plataforma interna em dois núcleos com propósitos distintos."),
        list(
          "**Encontros** centraliza a jornada de aprendizado: próximo encontro com data, horário e material para download, informação de faltas com alerta visual, trilha completa e perfil comportamental.",
          "**Vagas** ativa o objetivo final do programa: banco de talentos com pesquisa, lista de vagas parceiras, vagas já aplicadas e canal de dúvidas.",
        ),
        p("A separação foi intencional. Misturar aprendizado e busca de emprego na mesma navegação criaria confusão sobre o objetivo de cada sessão de uso."),
        img("Fluxo da plataforma"),
      ],
    },
    {
      id: "sec-wireframes",
      toc: "Wireframes",
      title: "Wireframing",
      blocks: [
        p("Antes do refinamento visual, validei hierarquia e fluxo nas duas superfícies principais: landing page e plataforma interna."),
        p("O ajuste mais crítico foi na home da plataforma: na primeira versão, o próximo encontro e as vagas competiam pela atenção visual. Ao reorganizar, priorizei claramente o encontro na parte superior, porque sem completar a trilha o participante não acessa o banco de talentos."),
        img("Wireframes da landing page"),
        img("Wireframes da plataforma"),
      ],
    },
    {
      id: "sec-style",
      toc: "Visual",
      title: "Style Guide",
      blocks: [
        p("Trabalhei dentro da identidade visual institucional do SEBRAE, usando a tipografia Campuni e a paleta já estabelecida."),
        p("Dentro dessas restrições, priorizei o azul mais saturado como cor estrutural: navegação, ações primárias e elementos de destaque. E o rosa mais saturado para elementos de engajamento, criando contraste suficiente para guiar a atenção sem sair da marca."),
        p("Trabalhar dentro de uma identidade existente foi um exercício muito importante: o desafio não era criar um sistema, mas tomar as melhores decisões dentro das restrições impostas."),
        img("Style guide"),
      ],
    },
    {
      id: "sec-landing",
      toc: "Landing",
      title: "Protótipo: Landing Page",
      blocks: [
        p("A landing page traduz a estratégia de redução de barreira em experiência visual."),
        p("O tom é direto e acolhedor: \"Chega Junto\" como nome do programa já comunica pertencimento antes de qualquer texto explicativo."),
        p("Os três benefícios principais aparecem em destaque logo após o hero, e os depoimentos de participantes constroem credibilidade antes do usuário chegar ao CTA."),
        img("Protótipo da landing page"),
      ],
    },
    {
      id: "sec-aluno",
      toc: "Plataforma",
      title: "Protótipo: Área do Aluno",
      blocks: [
        p("A plataforma acompanha o participante do primeiro ao último encontro."),
        p("A home exibe sempre o próximo encontro com todas as informações necessárias para comparecer, o contador de faltas com alerta visual e o progresso na trilha."),
        p("Ao concluir, o certificado fica disponível para download e o acesso ao banco de vagas é desbloqueado, conectando aprendizado a oportunidade de forma sequencial e clara."),
        img("Protótipo da área do aluno"),
      ],
    },
    {
      id: "sec-resultados",
      toc: "Resultados",
      title: "Resultados e validação",
      blocks: [
        p("A proposta foi apresentada no desafio ESG do SEBRAE/PE e conquistou 3º lugar entre todas as equipes participantes. Validação externa que confirmou a viabilidade e relevância da solução dentro do contexto institucional."),
        p("Para avaliar a proposta antes da apresentação, conduzi testes com 8 moradores da comunidade usando o protótipo interativo. Os resultados indicaram forte receptividade ao formato e ao posicionamento do programa:"),
        list(
          "**87%** afirmaram que participariam da trilha se ela fosse oferecida gratuitamente;",
          "**75%** disseram que o nome e a comunicação visual os faziam sentir que o programa era \"para eles\";",
          "**90%** consideraram a plataforma fácil de usar na primeira interação, sem nenhuma instrução prévia.",
        ),
        p("O achado mais relevante foi sobre o nome: \"Chega Junto\" teve reação positiva imediata em todas as sessões de teste. Os participantes associaram o nome a acolhimento antes mesmo de ler qualquer descrição do programa."),
        img("Resultados"),
      ],
    },
    {
      id: "sec-aprendizados",
      toc: "Aprendizados",
      title: "Aprendizados que \"chegaram junto\"",
      blocks: [
        list(
          "**Design de serviço é tão importante quanto design de interface.** A maior contribuição desse projeto não foi a landing page ou a plataforma. Foi a estrutura da trilha em si. Aprendi que em projetos de impacto social, o produto digital é o meio, não o fim.",
          "**Restrição de identidade visual é uma habilidade, não uma limitação.** Trabalhar dentro da marca do SEBRAE sem poder criar do zero me forçou a tomar decisões mais precisas dentro de um espaço menor. Em vez de explorar, precisei priorizar, e isso exigiu mais raciocínio, não menos.",
          "**Pertencimento não se resolve com funcionalidade.** A pesquisa mostrou que a barreira não era falta de acesso, era falta de identificação. Isso mudou completamente a abordagem: antes de projetar qualquer tela, precisei projetar a percepção que o programa causaria. Foi a decisão mais importante do projeto e a que menos aparece nas telas.",
        ),
      ],
    },
  ],
};

export const simpleCases: Record<string, SimpleCaseData> = {
  ecotrack,
  "chega-junto": chegaJunto,
};
