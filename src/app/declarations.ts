export const MODALITIES = [
  { id: 1, name: "Convidado de sessão especial" },
  { id: 3, name: "Pôster" },
  { id: 4, name: "Minicurso" },
  { id: 5, name: "Painel" },
  { id: 6, name: "Simposista" },
  { id: 7, name: "Ouvinte" },
];

export const CATEGORY_PAYMENT = [
  { id: 1, name: "Estudantes de Graduação e pós-graduação com comprovação" },
  { id: 2, name: "Professores e demais profissionais da Educação Básica" },
  { id: 3, name: "Docentes de Educação Superior" },
];

export const AXIS = [
  { id: 1, name: "Eixo 1: A Didática como campo epistemológico e disciplinar" },
  { id: 2, name: "Eixo 2: A Didática e os Saberes docentes estruturantes na formação de professores" },
  { id: 3, name: "Eixo 3: A Didática e as tecnologias da informação e comunicação no currículo e práticas de ensino" },
  { id: 4, name: "Eixo 4: A Didática e Práticas de Ensino na perspectiva da Educação como Direito Constitucional e os desafios políticos da atualidade" },
  { id: 5, name: "Eixo 5: A Didática e as Práticas de ensino nas políticas de formação de Pedagogos(as)" },
  { id: 6, name: "Eixo 6: A Didática e as Práticas de Ensino nos cursos de Licenciatura: entre tensionamentos e perspectivas" },
  { id: 7, name: "Eixo 7: A Didática, Práticas de Ensino - Infâncias, Juventudes e Vida Adulta" },
  { id: 8, name: "Eixo 8: A Didática, Práticas de Ensino, Educação das Relações Étnico-raciais, Diversidade e Inclusão Escolar" },
  { id: 9, name: "Eixo 9: A Didática da Educação Superior" },
];

export const WORK_OPTIONS = [
  { id: 1, name: "Pôster" },
  { id: 2, name: "Painel" },
  { id: 3, name: "Minicurso" },
  ,
];

export const SCHEDULE_TYPE = [
  { id: 1, name: "Abertura" },
  { id: 7, name: "Atividade Cultural" },
  { id: 12, name: "Encerramento" },
  { id: 9, name: "Lançamento de Livros" },
  { id: 4, name: "Minicurso" },
  { id: 5, name: "Painel" },
  { id: 3, name: "Pôster" },
  { id: 11, name: "Conexão Entrevista" },
  { id: 10, name: "Sessões Especiais" },
  { id: 8, name: "Simpósio" },
];

export const THEME_SIMPOSIO = [
  {
    id: 1,
    name:
      "I - DIDÁTICA(S) ENTRE DIÁLOGOS, INSURGÊNCIAS E POLÍTICAS: TENSÕES E PERSPECTIVAS NA RELAÇÃO COM FORMAÇÃO DOCENTE",
  },
  {
    id: 2,
    name:
      "II - DIDÁTICA(S) ENTRE DIÁLOGOS, INSURGÊNCIAS E POLÍTICAS: TENSÕES E PERSPECTIVAS NA RELAÇÃO COM CURRICULO E AVALIAÇÃO",
  },
  {
    id: 3,
    name:
      "III - DIDÁTICA(S) ENTRE DIÁLOGOS, INSURGÊNCIAS E POLÍTICAS: TENSÕES E PERSPECTIVAS NA RELAÇÃO EM DIREITOS HUMANOS, INTRERCULTURALIDADE E RELIGIÕES",
  },
  {
    id: 4,
    name:
      "IV - DIDÁTICA(S) ENTRE DIÁLOGOS, INSURGÊNCIAS E POLÍTICAS: TENSÕES E PERSPECTIVAS NA RELAÇÃO ENTRE NOVAS EPISTEMOLOGIAS, BIODIVERSIDADE, DIFERENÇA, DEMOCRACIA E INCLUSÃO",
  },
  {
    id: 5,
    name:
      "V - DIDÁTICA(S) ENTRE DIÁLOGOS, INSURGÊNCIAS E POLÍTICAS: TENSÕES E PERSPECTIVAS NA RELAÇÃO ENTRE EDUCAÇÃO, COMUNICAÇÃO E TECNOLOGIAS",
  },
  {
    id: 6,
    name:
      "VI- DIDÁTICA(S) ENTRE DIÁLOGOS, INSURGÊNCIAS E POLÍTICAS: TENSÕES E PERSPECTIVAS NA RELAÇÃO ENTRE INFÂNCIAS, JUVENTUDES E VIDA E ADULTA",
  },
  { id: 7, name: "VII- SIMPÓSIOS INTEGRADORES" },
];

export const PROGRAMACOES = [
  {
    titulo: "Abertura",
    data: "14/7",
    horario: "16:00-21:00",
    local: "Vivo Rio",
    endereco:
      "Av. Infante Dom Henrique, 85 - Aterro do Flamengo, Rio de Janeiro – Ao lado do Museu de Arte Moderna e do Aeroporto Santos Dumont.",
    sessao: [
      {
        horario: "16:00",
        titulos: ["Chegada, acolhimento e acomodação", "Abertura Oficial"],
      },
      {
        horario: "18:00",
        titulos: ["Mesa de Abertura"],
        tema: "FAZERES-SABERES PEDAGÓGICOS: diálogos, insurgências e políticas",
        coordenadores: ["Abraham Madgenzo (UAHC-Chile)", "Nilma Lino Gomes (UFMG)", "Mediadora: Vera Candau (PUC-Rio)"],
      },
      {
        horario: "20:00",
        titulos: ["Show de Abertura"],
        coordenadores: ["Companhia Folclórica do Rio - UFRJ"],
      },
    ],
  },
  {
    titulo: "Atividades Culturais",
    horarios: [],
  },
  // {
  //     titulo: 'Minicursos',
  //     horarios: []
  // },
  // {
  //     titulo: 'Rodas de Conversa',
  //     horarios: []
  // },
  {
    titulo: "Simpósios",
    simposios: [
      {
        tema: "I- DIDÁTICA(S) ENTRE DIÁLOGOS, INSURGÊNCIAS E POLÍTICAS: TENSÕES E PERSPECTIVAS NA RELAÇÃO COM ",
        tipo: "FORMAÇÃO DOCENTE",
        palestras: [
          {
            classificacao: "SIMPÓSIO A",
            tema: "Didática, Prática de Ensino e políticas de formação docente: projetos, dilemas e (re)invenções",
            coordenadores: [
              "Luiz Fernandes Dourado(UFG)",
              "Dalila Andrade Oliveira(UFMG)",
              "Carmen Teresa Gabriel(UFRJ)",
              "Coord.Magali Silvestre(UNIFESP)",
            ],
            horario: "",
            local: "",
          },
          {
            classificacao: "SIMPÓSIO B",
            tema: "Movimentos insurgentes na formação docente: propostas, resistências e (re)existências",
            coordenadores: [
              "Patricia Cristina Albieri de Almeida (FCC)",
              "Elizeu Clementino de Souza (UNEB)",
              "Luiz Fernandes de Oliveira (UFRRJ)",
              "Coord. Nilson de Souza Cardoso (UECE/FORPIBID)",
            ],
            horario: "",
            local: "",
          },
          {
            classificacao: "SIMPÓSIO C",
            tema: "Estágio, PIBID e Residência Pedagógica: convergências ou disputas por práticas de formação?",
            coordenadores: [
              "Flavia Medeiros Sarti (UNESP)",
              "Isabel Maria Sabino (UECE)",
              "Andrea Rosana Fetzner (UNIRIO)",
              "Coord. Cristina Spolidoro Freund (CPII)",
            ],
            horario: "",
            local: "",
          },
          {
            classificacao: "SIMPÓSIO D",
            tema:
              "Prática de Ensino e suas implicações para a inserção profissional docente: desafios ao desenvolvimento profissional",
            coordenadores: [
              "Maria do Céu Roldão (UCPorto/PT)",
              "Marli André (PUC-SP)",
              "Morgana Rezende (SME-Rio)",
              "Coord. Maria das Graças Nascimento (UFRJ)",
            ],
            horario: "",
            local: "",
          },
        ],
      },
      {
        tema: "II - DIDÁTICA(S) ENTRE DIÁLOGOS, INSURGÊNCIAS E POLÍTICAS: TENSÕES E PERSPECTIVAS NA RELAÇÃO COM ",
        tipo: "CURRÍCULO E AVALIAÇÃO",
        palestras: [
          {
            classificacao: "SIMPÓSIO A",
            tema: "Políticas de Currículo e Avaliação para a Educação Básica: quais caminhos?",
            coordenadores: [
              "Sandra Zakia (USP)",
              "Alice Casimiro Lopes (UERJ)",
              "Alicia Bonamino (PUC-Rio)",
              "Coord. Lenilda Faria (UFAcre)",
            ],
            horario: "",
            local: "",
          },
          {
            classificacao: "SIMPÓSIO B",
            tema: "Por uma relação outra entre Didática, Currículo, Avaliação e qualidade da Educação Básica",
            coordenadores: [
              "Luiz Carlos de Freitas(UNICAMP)",
              "Marcia Serra Ferreira(UFRJ)",
              "Claudia Fernandes(UNIRIO)",
              "Coord.Suzana dos Santos Gomes(UFMG)",
            ],
            horario: "",
            local: "",
          },
          {
            classificacao: "SIMPÓSIO C",
            tema: "Diálogos entre Didática, Currículo e Avaliação no cotidiano escolar: perspectivas insurgentes",
            coordenadores: [
              "Guilherme Alcantara (UFMG)",
              "Walkiria Rigolon (SEE/SP)",
              "Maria Teresa Esteban (UFF)",
              "Coord. Tatiana Fagundes (SME-Rio / FME-Niterói)",
            ],
            horario: "",
            local: "",
          },
          {
            classificacao: "SIMPÓSIO D",
            tema: "Didática e Docência no Ensino Superior: reinvenções curriculares e avaliativas",
            coordenadores: [
              "Maria Isabel de Almeida (USP)",
              "Gustavo Fischman (Arizona State University)",
              "Sandra Regina Soares (UNEB)",
              "Coord. Marcia Maria e Silva (UFF)",
            ],
            horario: "",
            local: "",
          },
        ],
      },
      {
        tema: "III- DIDÁTICA(S) ENTRE DIÁLOGOS, INSURGÊNCIAS E POLÍTICAS: TENSÕES E PERSPECTIVAS NA RELAÇÃO EM ",
        tipo: "DIREITOS HUMANOS, INTRERCULTURALIDADE E RELIGIÕES",
        palestras: [
          {
            classificacao: "SIMPÓSIO A",
            tema:
              "Os desafios das pautas da educação em/para os direitos humanos nas salas de aula da educação básica e do ensino superior",
            coordenadores: [
              "Aída Maria Monteiro Silva (UFPE)",
              "Paulo Cesar Carbonari (IFIBE)",
              "Daniela Azini Henrique (SME-Rio)",
              "Coord. Daniela Valentim (UERJ)",
            ],
            horario: "",
            local: "",
          },
          {
            classificacao: "SIMPÓSIO B",
            tema:
              "As culturas religiosas e a laicidade das escolas públicas: possibilidades e desafios às práticas de ensino",
            coordenadores: [
              "Andréia Martins(UFPI)",
              "Roseli Fischemann(USP)",
              "Maristela Gomes de Souza Guedes(UERJ)",
              "Coord.Pedro Pinheiro Teixeira(PUC - Rio)",
            ],
            horario: "",
            local: "",
          },
          {
            classificacao: "SIMPÓSIO C",
            tema:
              "Interculturalidade e perspectivas insurgentes: diálogos entre universidade, escola e movimentos sociais",
            coordenadores: [
              "Reinaldo Matias Fleuri(UFSC)",
              "Andréa Borges de Medeiros(SME / JF)",
              "Susana Sacavino(Novamerica)",
              "Coord.Ana Ivenicki(UFRJ)",
            ],
            horario: "",
            local: "",
          },
          {
            classificacao: "SIMPÓSIO D",
            tema: "Racismo, Antirracismo e Educação: desafios ao campo da Didática e da Prática de Ensino",
            coordenadores: [
              "Lia Vainer Schucman(UFSC)",
              "Givânia Silva(UnB / CONAQ)",
              "Roberto Carlos da Silva Borges(CEFET / RJ)",
              "Coord.Claudia Miranda(UNIRIO)",
            ],
            horario: "",
            local: "",
          },
        ],
      },
      {
        tema: "IV- DIDÁTICA(S) ENTRE DIÁLOGOS, INSURGÊNCIAS E POLÍTICAS: TENSÕES E PERSPECTIVAS NA RELAÇÃO ENTRE ",
        tipo: "NOVAS EPISTEMOLOGIAS, BIODIVERSIDADE, DIFERENÇA, DEMOCRACIA E INCLUSÃO",
        palestras: [
          {
            classificacao: "SIMPÓSIO A",
            tema: "Educação, diferença e insurgências: práticas educativas emancipatórias",
            coordenadores: [
              "Rita (Potiguara) Gomes do Nascimento (SEDUC-CE)",
              "Márcio Caetano (FURGS)",
              "Elizabeth Macedo (UERJ)",
              "Coord. Talita Vidal (UERJ)",
            ],
            horario: "",
            local: "",
          },
          {
            classificacao: "SIMPÓSIO B",
            tema: "Conhecimento e Democracia: relação emancipatória e prática participativa em contextos educacionais",
            coordenadores: [
              "Salomão Barros Ximenes (UFABC)",
              "Renato Noguera (UFRRJ)",
              "Inês Barbosa de Oliveira (UNESA)",
              "Coord. Laurizete Ferragut Passos (PUC/SP)",
            ],
            horario: "",
            local: "",
          },
          {
            classificacao: "SIMPÓSIO C",
            tema:
              "Biodiversidade em novas epistemologias: perspectivas insurgentes em educação para o/no cuidado de todas as formas de vida",
            coordenadores: [
              "Marco Antônio Leandro Barzano (UEFS)",
              "Cleonice Puggian (FEBF/UERJ)",
              "Lea Tiriba (UNIRIO)",
              "Coord. Lia Maria Teixeira de Oliveira (UFRRJ)",
            ],
            horario: "",
            local: "",
          },
          {
            classificacao: "SIMPÓSIO D",
            tema:
              "Didática, Educação inclusiva e Prática de Ensino insurgente: respeito às diversidades e enfrentamento das desigualdades",
            coordenadores: [
              "Eder Pires Camargo (UNESP)",
              "Márcia Denise Pletsc (UFRRJ)",
              "Tiago Ribeiro (INES)",
              "Coord. Fabio Garcia Bernardo (IBC)",
            ],
            horario: "",
            local: "",
          },
        ],
      },
      {
        tema: "V- DIDÁTICA(S) ENTRE DIÁLOGOS, INSURGÊNCIAS E POLÍTICAS: TENSÕES E PERSPECTIVAS NA RELAÇÃO ENTRE ",
        tipo: "EDUCAÇÃO, COMUNICAÇÃO E TECNOLOGIAS",
        palestras: [
          {
            classificacao: "SIMPÓSIO A",
            tema: "Educação na, com a para a cibercultura",
            coordenadores: [
              "Tania Hetkowski (UNEB)",
              "Ivana Bentes Oliveira (UFRJ)",
              "Edméa Santos (UFRRJ)",
              "Coord. Maria José Flores (UFMG)",
            ],
            horario: "",
            local: "",
          },
          {
            classificacao: "SIMPÓSIO B",
            tema: "Didática e Culturas visuais: formação e práticas educativas",
            coordenadores: [
              "Gilka Girardello (UFSC)",
              "Marta Guedes (SME-Rio)",
              "Adriana Hoffman (UNIRIO)",
              "Coord. Francine de Paula Martins (UFLA)",
            ],
            horario: "",
            local: "",
          },
          {
            classificacao: "SIMPÓSIO C",
            tema: "Didática online na pedagogia universitária: saberes didáticos em mobilidade",
            coordenadores: [
              "Katia Morosov Alonso (UFMT)",
              "Lucila Maria Pesce de Oliveira (UNIFESP)",
              "Rosalia Maria Duarte (PUC-Rio)",
              "Coord. Rosemary dos Santos (UERJ)",
            ],
            horario: "",
            local: "",
          },
          {
            classificacao: "SIMPÓSIO D",
            tema: "Didática e conhecimento: entre o livro didático, as mídias e as fakenews",
            coordenadores: [
              "Rosa Maria Bueno Fischer (UFRS)",
              "Vani Kenski (USP)",
              "Ana Maria Monteiro (UFRJ)",
              "Coord. Andréa Vilella Mafra da Silva (ISERJ)",
            ],
            horario: "",
            local: "",
          },
        ],
      },
      {
        tema: "VI- DIDÁTICA(S) ENTRE DIÁLOGOS, INSURGÊNCIAS E POLÍTICAS: TENSÕES E PERSPECTIVAS NA RELAÇÃO ENTRE ",
        tipo: "INFÂNCIAS, JUVENTUDES E VIDA E ADULTA",
        palestras: [
          {
            classificacao: "SIMPÓSIO A",
            tema: "Didática e Prática de Ensino com as infâncias e suas possibilidades de insurgências",
            coordenadores: [
              "Maria Cristina Soares de Gouvea (UFMG)",
              "Cristiane Oliveira (CPII)",
              "Patricia Corsino (UFRJ)",
              "Coord. Paula Almeida de Castro (UEPB)",
            ],
            horario: "",
            local: "",
          },
          {
            classificacao: "SIMPÓSIO B",
            tema: "A alfabetização e seus métodos nas políticas nacionais recentes: avanços ou retrocessos?",
            coordenadores: [
              "Cecília Goulart (UFF)",
              "Rosaura Soligo (Instituto ABAPORU)",
              "Ana Paula Venâncio (ISERJ)",
              "Coord. Lisete Jaehn (UFF)",
            ],
            horario: "",
            local: "",
          },
          {
            classificacao: "SIMPÓSIO C",
            tema: "Didática e Prática de Ensino com as juventudes e suas possibilidades de insurgências",
            coordenadores: [
              "Marília Spósito (USP)",
              "Luis Antonio Groppo (UNIFAL-MG)",
              "Paulo Carrano (UFF)",
              "Coord. Luis Paulo Borges (CAp-UERJ)",
            ],
            horario: "",
            local: "",
          },
          {
            classificacao: "SIMPÓSIO D",
            tema: "Educação ao longo da vida: formas de insurgências cotidianas",
            coordenadores: [
              "Ivanilde Apoluceno de Oliveira (UEPA)",
              "Ricardo Henriques (Instituto Unibanco)",
              "Cyntia Kelly Menezes da Silva Burguinhão (SME-Rio- PEJA)",
              "Coord. Sandra Sales (UFRRJ)",
            ],
            horario: "",
            local: "",
          },
        ],
      },
      {
        tema: "VII- SIMPÓSIOS INTEGRADORES",
        tipo: "",
        palestras: [
          {
            classificacao: "SIMPÓSIO A",
            tema: "Educação e Poder: Pedagogias emancipadoras e a insurgência da escola democrática",
            coordenadores: [
              "Maria Amélia Santoro Franco (UNISANTOS)",
              "Umberto Andrade Pinto (UNIFESP)",
              "Maria Inês Marcondes (PUC-Rio)",
              "Coord. Maria Luiza Susseking (UNIRIO)",
            ],
            horario: "",
            local: "",
          },
          {
            classificacao: "SIMPÓSIO B",
            tema: "Questões epistemológicas do campo da Didática",
            coordenadores: [
              "José Carlos Libâneo (UFG)",
              "Danilo Romeu Streck (UNISINOS)",
              "Evandro Ghedin (UFam)",
              "Coord. Walcea Barreto (UFF)",
            ],
            horario: "",
            local: "",
          },
          {
            classificacao: "SIMPÓSIO C",
            tema: "Artes, movimento e transgressão: insurgências formativas na escola e na universidade",
            coordenadores: [
              "Márcia Strazacappa (UNICAMP)",
              "Lucia Vignoli (INES)",
              "Monique Andries Nogueira (UFRJ)",
              "Coord. Maria de Fátima Abdala (UNISANTOS)",
            ],
            horario: "",
            local: "",
          },
          {
            classificacao: "SIMPÓSIO D",
            tema:
              "Didática e Prática de Ensino na Base Nacional Comum para a Formação Inicial e Continuada de Professores da Educação Básica",
            coordenadores: [
              "Cristina D’Ávila (ANDIPE)",
              "Rita Frangela (ABdC)",
              "Lucília Augusto Lino (ANFOPE)",
              "Coord. Thiago Ranniery (UFRJ)",
            ],
            horario: "",
            local: "",
          },
        ],
      },
    ],
  },
  // {
  //     titulo: 'Painéis',
  //     horarios: []
  // },
  // {
  //     titulo: 'Pôsteres',
  //     horarios: []
  // },
  {
    titulo: "Sessões especiais",
    sessoes: [
      {
        data: "15/7",
        horario: "18:00-20:00",
        palestras: [
          {
            tema: "A reinvenção do campo da Didática no Brasil",
            coordenadores: [
              "Vera Candau (PUC-Rio)",
              "Aída Monteiro (UFPE)",
              "Leda Sheibe (UFSC)",
              "Mediação: Vania Leite (UERJ/FFP)",
            ],
            local: "",
          },
          {
            tema: "Didática, Escola e a luta democrática",
            coordenadores: [
              "José Carlos Libâneo(UFG)",
              "Selma Garrido Pimenta(USP)",
              "Lilian Anna Wachowicz / Pura Martins / Joana Romanowisk(PUC / PR)",
              "Mediação: Silvana Mesquita(PUC - Rio)",
            ],
            local: "",
          },
          {
            tema: "Didática, Currículo e Formação de Professores: relações históricas e emancipadoras – Uma conversa",
            coordenadores: [
              "Ilma Passos Alencastro Veiga (UnB)",
              "Nilda Alves (UERJ)",
              "Menga Lüdke (PUC-Rio)",
              "Mediação: Helena Fontoura (UERJ/FFP)",
            ],
            local: "",
          },
        ],
      },
      {
        data: "16/7",
        horario: "18:00-20:00",
        palestras: [
          {
            tema: "Didática, Formação e Trabalho Docente: relações com o Conhecimento",
            coordenadores: [
              "Maria Isabel da Cunha (UNISINOS)",
              "Julio Diniz-Pereira / Lucíola Santos / Angela Dalben (UFMG)",
              "Alda Marin (PUC/SP)",
              "Mediação: Mônica Vasconcellos (UFF)",
            ],
            local: "",
          },
          {
            tema: "Didática e Prática de Ensino: desafios políticos da atualidade",
            coordenadores: [
              "Maria do Socorro Lucena (UECE)",
              "Silas Borges Monteiro (UFMT)",
              "Cristina D’Avila (UFBA)",
              "Mediação: Priscila Rodrigues (UFRJ)",
            ],
            local: "",
          },
          {
            tema:
              "Didática, Currículo e Formação de Professores: relações históricas e emancipadoras – Outra conversa ",
            coordenadores: [
              "Maria Rita Neto Sales Oliveira (CEFET/MG)",
              "Antonio Flavio Moreira (UCP)",
              "Bernardete Gatti (FFC)",
              "Mediação: Isabel Alice Lelis (PUC-Rio)",
            ],
            local: "",
          },
        ],
      },
    ],
  },
  {
    titulo: "Lançamentos de Livros",
    horarios: [],
  },
  {
    titulo: "Reuniões de Entidades e de Redes",
    horarios: [],
  },
  {
    titulo: "Conferencistas",
    horarios: [],
  },
  {
    titulo: "Encerramento",
    data: "17/7",
    horario: "15:30-19:00",
    local: "",
    sessao: [
      {
        horario: "15:30",
        titulos: [
          "Conferência de Encerramento",
          "Apresentação cultural",
          "Escolha do local de sede do XXI ENDIPE 2022",
        ],
        coordenadores: ["Antònio Nóvoa (ULisboa/PT – UFRJ)"],
      },
    ],
  },
];
