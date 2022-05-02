import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ModalInscricaoComponent } from '../modal-inscricao/modal-inscricao.component';
import { ModalEixoComponent } from '../modal-eixo/modal-eixo.component';
import { ModalProgramacaoComponent } from '../modal-programacao/modal-programacao.component';
import { ModalNormasComponent } from '../modal-normas/modal-normas.component';
import { ModalTermoComponent } from '../modal-normas/modal-termo.component';
import { ModalApoiadoresComponent } from '../modal-apoiadores/modal-apoiadores.component';
import { ModalNormasRodaConversaComponent } from '../modal-normas/modal-mediador-conversa.component';
import { ModalNormasPainelComponent } from '../modal-normas/modal-expositor-painel.component';
import { ModalNormasMinicursoComponent } from '../modal-normas/modal-mediador-minu-curso.component';
import { ModalNormasPosterComponent } from '../modal-normas/modal-expositor-poster.component';
import { DownloadFileService } from '../services/download-file.service';
import { ToastrService } from 'ngx-toastr';
import { NoticiasService } from '../services/noticias.service';
import { ModalSessoesEspeciaisComponent } from '../modal-sessoes-especiais/modal-sessoes-especiais.component';
import { ModalSimposioComponent } from '../modal-simposio/modal-simposio.component';
import { ModalHospedagemComponent } from '../modal-hospedagem/modal-hospedagem.component';
import { ModalAlimentacaoComponent } from '../modal-alimentacao/modal-alimentacao.component';
import { ModalTransporteComponent } from '../modal-transporte/modal-transporte.component';
import { ModalTurismoComponent } from '../modal-turismo/modal-turismo.component';
import { ModalConferencistasComponent } from '../modal-conferencistas/modal-conferencistas.component';
import { PROGRAMACOES } from '../declarations';
import { ModalEncerramentoComponent } from '../modal-encerramento/modal-encerramento.component';
import { ModalAberturaComponent } from '../modal-abertura/modal-abertura.component';
import { AnaisService } from '../services/anais.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  subscriptionType: string;
  subscriptionValue: number;
  carregando = false;
  noticias = [];
  anais = [];

  configuracaoCarrossel = {
    nav: true,
    slideBy: 2,
    margin: 14,
    responsive: {
      '0': { items: 1, margin: 5 },
      '940': { items: 3, margin: 5 }
    }
  };

  instituicoes = [
    'Universidade Federal de Uberlândia - UFU',
    /* 'Universidade Federal do Estado do Rio de Janeiro – UNIRIO',
     'Universidade Federal Fluminense – UFF',
     'Universidade Federal Rural do Rio de Janeiro – UFRRJ',
     'Universidade do Estado do Rio de Janeiro – UERJ',
     'Universidade Estácio de Sá – UNESA',
     'Universidade Católica de Petrópolis – UCP',
     'Pontifícia Universidade Católica do Rio de Janeiro – PUC-Rio',
     'Instituto Benjamim Constant – IBC',
     'Instituto Nacional de Educação de Surdos – INES',
     'Instituto Superior de Educação do Rio de Janeiro – ISERJ'*/
  ];

  coordenacoesGerais = [
    'Camila Lima Coimbra - UFU',
    'Roberto Valdés Puentes - UFU'
  ];

  imagensApoiadores = [
    './assets/img/parceiros/ufrj2.png'

  ];

  imagensParcerias = [
    './assets/img/parcerias/CAPES.png'
  ];

  comites = [
    'Andrea Villela Mafra da Silva – ISERJ'

  ];

  secretarias = [
    'Silvana Mesquita – PUC-Rio'

  ];

  /*  gruposDeTrabalho = [
      {
        nome: 'Apoio aos preletores',
        equipe: [
          'Patricia Bastos de Azevedo – UFRRJ (coord.)'
  
  
        ]
      },
      {
        nome: 'Atividades culturais',
        equipe: [
          'Sandra Maciel – UFF (coord.)'
        ]
      },
      {
        nome: 'Feira de Livros',
        equipe: [
          'Adriana Patricio Delgado – UFRJ (coord.)'
  
  
        ]
      },
      {
        nome: 'Gestão financeira',
        equipe: [
          'Giseli Barreto da Cruz – UFRJ (coord.)'
  
        ]
      },
      {
        nome: 'Inclusão & acessibilidade',
        equipe: [
          'Bianca Della Libera – IBC (coord.)'
        ]
      },
      {
        nome: 'Local & infraestrutura',
        equipe: [
          'Claudia de Oliveira Fernandes – UNIRIO (coord.)'
  
        ]
      },
      {
        nome: 'Material do congressista',
        equipe: [
          'Vania Finholdt Angelo Leite – FFP/UERJ (coord.)'
  
        ]
      },
      {
        nome: 'Programação',
        equipe: [
          'Luís Paulo Borges – EB/CAp UERJ (coord.)'
  
        ]
      },
      {
        nome: 'Publicações',
        equipe: [
          'Claudia de Oliveira Fernandes (UNIRIO)'
  
        ]
      },
      {
        nome: 'Relação com as redes de ensino',
        equipe: [
          'Claudia Miranda – UNIRIO (coord.)'
  
        ]
      },
      {
        nome: 'Serviço de monitoria e recepção',
        equipe: [
          'Cecília Silvano Batalha – EB/FME-Niterói (coord.)'
  
        ]
      },
      {
        nome: 'Imagem, Comunicação & Tecnologia',
        equipe: [
          'Mônica Vasconcellos – UFF (coord.)'
  
        ]
      },
      {
        nome: 'Secretaria Executiva',
        equipe: [
          'Silvana Mesquita – PUC-Rio (coord.)'
  
        ]
      },
    ];*/

  eixos = [
    {
      titulo: 'Eixo 1',
      tema: 'A Didática como campo epistemológico e disciplinar',
      /*  temaCurto: 'com Formação docente',*/
      descricao: `Epistemologia da Didática. Objeto epistêmico da Didática. A produção do conhecimento 
      no campo da didática. Articulação entre o ensinar e o aprender. Teoria Didática e bases 
      para propostas pedagógicas. Didática e Epistemologia da prática e/ou práxis. 
      Fundamentos e perspectivas da didática. `,
      coordenacao: [

        'Marilza Vanessa Rosa Suanno - UFG',
        'Sandra Valéria Limonta Rosa - UFG'

      ],
      coordenacaogeral: ` Lenilda Rêgo Albuquerque De Faria - UFAC`
      ,
      pareceristas: []
    },
    {
      titulo: 'Eixo 2',
      tema: 'A Didática e os Saberes docentes estruturantes na formação de professores',
      /* temaCurto: 'com Currículo e Avaliação',*/
      descricao: `Relação da Didática com os saberes docentes estruturantes na formação de professores. 
      Saberes pedagógicos e didáticos relacionados ao processo de ensino-aprendizagem; 
      Planejamento, sequência didática e avaliação; Concepções de formação de professores; 
      Concepções de profissionalização docente; Formação inicial e continuada de professores; 
      Estágio Supervisionado na formação de professores; Metodologias e mediações didáticas
      na formação de professores; Pesquisa-ação; pesquisa colaborativa; narrativas na 
      formação de professores; Parceria entre universidade e a escola na formação de 
      professores.`,
      coordenacao: [

        'Maria de Fátima Barbosa Abdalla – Unisantos',
        'Martha Maria Prata-Linhares - UFTM',
        'Silvana Soares de Araujo Mesquita - PUC-Rio'
      ],
      coordenacaogeral: ` Vânia Finholdt Ângelo Leite – UERJ`
      ,
      pareceristas: []
    },
    {
      titulo: 'Eixo 3',
      tema: `A Didática e as tecnologias da informação e comunicação no currículo e práticas 
      de ensino`,
      /*temaCurto: `em Direitos Humanos, Interculturalidade e Religiões`,*/
      descricao: `A Didática, as práticas de ensino e a Mediação Tecnológica. Tecnologias Digitais e
      Mediação Pedagógica. Cultura Digital e Escola. Jogos Digitais, Tecnologias e Educação. 
      As Plataformas Digitais e os Ambientes Virtuais de Aprendizagem (AVA). Ensino 
      Remoto Emergencial (ERE).`,
      coordenacao: [

        'Daniela da Costa Britto Pereira Lima  - UFG',
        'Giovana Cristina Zen - UFBA',
        'Gyzely Suely Lima - IFTM'
      ],
      coordenacaogeral: ` Priscila Rezende Moreira - UEMG`
      ,
      pareceristas: []
    },
    {
      titulo: 'Eixo 4',
      tema: `A Didática e Práticas de Ensino na perspectiva da Educação como Direito Constitucional e os desafios políticos da atualidade 
       `,
      /*temaCurto: `entre Novas epistemologias, Diferença, Biodiversidade, Democracia e Inclusão`,*/
      descricao: `A Educação na Constituição Brasileira e na Legislação Educacional. Educação Básica:
      Objetivos, princípios e diretrizes curriculares. A educação no contexto das 
      transformações da sociedade contemporânea. Políticas regressivas e ataques aos direitos
      educacionais. A Didática e as Práticas de Ensino e o contexto político contemporâneo. As 
      reformas políticas e o papel da Didática e das Práticas de Ensino no debate 
      contemporâneo. Os projetos de regulação da educação escolar (BNCC, Escola sem 
      Partido, Reforma do Ensino Médio). Planejamento e gestão da educação. Gestão 
      Pedagógica e Democrática da Escola. Políticas de Avaliação da Educação Básica.`,
      coordenacao: [

        'Andréia Nunes Militão - UEMS/UFGD',
        'Suzana dos Santos Gomes - UFMG',
        'Jussara Bueno de Queiroz Paschoalino - UFRJ',
        'Claudia Tavares do Amaral - UFCAT'

      ],
      coordenacaogeral: ` Robson Luiz de França - UFU`
      ,
      pareceristas: []
    },
    {
      titulo: 'Eixo 5',
      tema: `A Didática e as Práticas de ensino nas políticas de formação de Pedagogos(as) 
       `,
      /* temaCurto: `entre Educação, Comunicação e Tecnologia`,*/
      descricao: `Didática e Práticas de Ensino nas diretrizes do CNE; Implementação, resistência, 
      permanência de políticas de formação de Pedagogos(as); PIBID, Residência Pedagógica 
      e outros programas de formação.`,
      coordenacao: [

        'Andréa Silva Gino - UEMG',
        'Vilma Aparecida de Souza - UFU',
        'Kátia Silene da Silva - UFCAT'

      ],

      coordenacaogeral: ` José Leonardo Leonardo Rolim de Lima Severo  - UFPB`
      ,
      pareceristas: []
    },
    {
      titulo: 'Eixo 6',
      tema: `A Didática e as Práticas de Ensino nos cursos de Licenciatura: entre tensionamentos e perspectivas 
      `,
      /*  temaCurto: `entre Infâncias, Juventudes e Vida Adulta`,*/
      descricao: `Didática e Práticas de Ensino na Formação de Professores. Reformulação da proposta 
      curricular na Licenciatura e a concepção de didática instrumental na formação do 
      licenciando. Tensões e Desafios: Formação e prática real. Ações formativas envolvendo 
      a Didática. Os conhecimentos do campo da Didática.  Reforma do Ensino Médio e a 
      relação com a didática e com as Práticas de Ensino.`,
      coordenacao: [

        'Fabrício Oliveira da Silva - UEFS',
        'Elcimar Simão Martins - UNILAB',
        'Thiago Henrique Barnabé Corrêa - UFTM',
        'Juliana Cordeiro Soares Branco - UEMG'

      ],
      coordenacaogeral: ` Ademilson de Sousa Soares – UFMG`
      ,
      pareceristas: []
    },
    {
      titulo: 'Eixo 7',
      tema: `A Didática, Práticas de Ensino - Infâncias, Juventudes e Vida Adulta 
      `,
      /*temaCurto: `entre Infâncias, Juventudes e Vida Adulta`,*/
      descricao: `Didática e Práticas de Ensino na Educação Infantil, Ensino Fundamental, EJA em 
      ambientes não escolares. Concepções de educação, infância, juventude e vida adulta, 
      tendo como parâmetro os direitos humanos. O pedagogo, a didática, as práticas de ensino 
      e sua relação com crianças e adolescentes em situação de vulnerabilidade.`,
      coordenacao: [

        'Altina Abadia da Silva - UFCAT',
        'Janaína Cassiano da Silva - UFCAT',
        'Adelson Afonso da Silva França Júnior - UEMG',
        'Marco Antônio Franco do Amaral - IFTM'

      ],
      coordenacaogeral: ` Fernanda Duarte Araújo Silva - UFU`
      ,
      pareceristas: []
    },
    {
      titulo: 'Eixo 8',
      tema: `A Didática, Práticas de Ensino, Educação das Relações Étnico-raciais, Diversidade e Inclusão Escolar 
      `,
      /*temaCurto: `entre Infâncias, Juventudes e Vida Adulta`,*/
      descricao: `Diferenças culturais no cotidiano escolar; Articulação entre diferença e desigualdades no 
      processo de ensino e aprendizagem; Inclusão escolar e Educação Especial. Didática e 
      AEE. Educação antirracista. Movimentos sociais e os processos de ensino e 
      aprendizagem; perspectivas relacionadas a gênero, sexualidade, raça, etnias, classe social 
      e outros.`,
      coordenacao: [

        'Valéria Peres Asnis - UFU',
        'Priscila Alvarenga Cardoso - UFU',
        'Lázara Cristina Silva - UFU',
        'Maria Marta Lopes Flores - UFCAT'

      ],
      coordenacaogeral: ` Dulcéria Tartuci - UFCAT`
      ,
      pareceristas: []
    },
    {
      titulo: 'Eixo 9',
      tema: `A Didática da Educação Superior 
     `,
      /*temaCurto: `entre Infâncias, Juventudes e Vida Adulta`,*/
      descricao: `Formação do professor Universitário. Saberes da docência universitária. Pedagogia 
      Universitária. Didática e questões curriculares na docência Universitária. Formação dos 
      formadores de professores. Assessoria Pedagógica na Universidade.`,
      coordenacao: [

        'Vânia Maria Vieira - UNIUBE',
        'Maria de Lourdes Ribeiro Gaspar - IFTM',
        'Talamira Taíta Rodrigues de Brito - UESB'

      ],
      coordenacaogeral: ` Vanessa Bueno Campos - UFU`
      ,
      pareceristas: []
    }
  ];

  programacoes = PROGRAMACOES;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private download: DownloadFileService,
    private noticiasService: NoticiasService,
    private anaisService: AnaisService,
    private toastr: ToastrService,

  ) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          const element = document.querySelector('#' + tree.fragment);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
          }
        }
      }
    });

  }

  ngOnInit() {

    this.listarNoticias();

  }


  public listarNoticias() {
    this.noticiasService.listar()
      .subscribe((res: any) => {
        this.noticias = res;

        this.noticias.forEach(element => {
          element.description = this.urlify(element.description);
        });

      }, err => {
        this.toastr.error('Ocorreu um erro ao listar noticias', 'Atenção: ');
      });

    this.anaisService.listar()
      .subscribe((res: any) => {
        this.anais = res;
      }, err => {
        this.toastr.error('Ocorreu um erro ao listar anais', 'Atenção: ');
      });
  }

  urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url) {
      return '<a target="_blank" href="' + url + '">' + url + '</a>';
    })
  }

  downloadTemplate(nameFile) {
    const vm = this;

    function sucessoDownload() {
      vm.carregando = false;
    }

    function falhaDownload(err) {
      if (err.status === 401) {
        vm.toastr.error('Você precisa estar logado para fazer o download', 'Atenção: ');
      } else {
        vm.toastr.error('Erro ao relizar download. Tente novamente mais tarde', 'Erro: ');
      }
      console.log(err);
      vm.carregando = false;
    }

    this.carregando = true;
    this.download.getFile(nameFile, sucessoDownload, falhaDownload);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalInscricaoComponent, {
      // width: '250px',
      data: { subscriptionType: this.subscriptionType, subscriptionValue: this.subscriptionValue }
    });

    dialogRef.afterClosed().subscribe();
  }

  public openDialogEixo(eixo) {
    const dialogRef = this.dialog.open(ModalEixoComponent, {
      data: { item: eixo }
    });
  }


  public openDialogProgramacao(programacao) {
    switch (programacao.titulo) {
      case 'Sessões especiais':
        this.dialog.open(ModalSessoesEspeciaisComponent, {
          data: { item: programacao }
        });
        break;

      case 'Simpósios':
        this.dialog.open(ModalSimposioComponent, {
          data: { item: programacao }
        });
        break;

      case 'Conferencistas':
        this.dialog.open(ModalConferencistasComponent);
        break;

      case 'Encerramento':
        this.dialog.open(ModalEncerramentoComponent, {
          data: { item: programacao }
        });
        break;

      case 'Abertura':
        this.dialog.open(ModalAberturaComponent, {
          data: { item: programacao }
        });
        break;

      default:
        this.dialog.open(ModalProgramacaoComponent, {
          data: { item: programacao }
        });
        break;
    }
  }

  public openDialogHospedagem() {
    const dialogRef = this.dialog.open(ModalHospedagemComponent);
  }

  public openDialogAlimentacao() {
    const dialogRef = this.dialog.open(ModalAlimentacaoComponent);
  }

  public openDialogTransporte() {
    const dialogRef = this.dialog.open(ModalTransporteComponent);
  }

  public openDialogTurismo() {
    const dialogRef = this.dialog.open(ModalTurismoComponent);
  }

  public openDialogNormas() {
    const dialogRef = this.dialog.open(ModalNormasComponent, {
      data: {},
      height: '550vh'
    });
  }

  public openDialogTermo() {
    const dialogRef = this.dialog.open(ModalTermoComponent, {
      data: {},
      height: '550vh'
    });
  }

  public openDialogMinicurso() {
    const dialogRef = this.dialog.open(ModalNormasMinicursoComponent, {
      data: {},
      height: '550vh'
    });
  }

  public openDialogPainel() {
    const dialogRef = this.dialog.open(ModalNormasPainelComponent, {
      data: {},
      height: '550vh'
    });
  }

  public openDialogRoda() {
    const dialogRef = this.dialog.open(ModalNormasRodaConversaComponent, {
      data: {},
      height: '550vh'
    });
  }

  public openDialogPoster() {
    const dialogRef = this.dialog.open(ModalNormasPosterComponent, {
      data: {},
      height: '550vh'
    });
  }

  public openDialogApoiadores(apoiadores, imagens) {
    const dialogRef = this.dialog.open(ModalApoiadoresComponent, {
      data: { item: apoiadores, imagensApoiadores: imagens },
      height: '550vh'
    });
  }
}
