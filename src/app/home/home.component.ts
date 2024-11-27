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
import { ModalNormasFruicaoComponent } from '../modal-normas/modal-fruicao.component';
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
import { ScheduleService } from '../services/schedule.service';
import { AuthService } from '../services/auth.service';

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
  intro = 1;
  user;
  isPresencial: boolean = true;
  animationActive: boolean = false;

  public toggleList() {
    this.isPresencial = !this.isPresencial;
    this.animationActive = true; // Ativa a classe de animação
  }
  
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
    'Universidade Federal Rural do Rio de Janeiro - UFRRJ',
    'Universidade Federal do Estado do Rio de Janeiro – UNIRIO',
    'Universidade Federal Fluminense – UFF',
    'Universidade do Estado do Rio de Janeiro – UERJ',
    'Pontifícia Universidade Católica do Rio de Janeiro – PUC-Rio'

  ];

  coordenacoesGerais = [
    'Edméa Santos - UFRRJ'
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
      tema: 'Educação Online',
      /*  temaCurto: 'com Formação docente',*/
      /* descricao: `Epistemologia da Didática. Objeto epistêmico da Didática. A produção do conhecimento 
       no campo da didática. Articulação entre o ensinar e o aprender. Teoria Didática e bases 
       para propostas pedagógicas. Didática e Epistemologia da prática e/ou práxis. 
       Fundamentos e perspectivas da didática. `,*/
      coordenacao: [

        'Edméa Santos',
        'Tatiana Rossini',
        'Mayra Ribeiro'

      ],
      /*coordenacaogeral: ` Lenilda Rêgo Albuquerque De Faria - UFAC`
      ,*/
      pareceristas: []
    },
    {
      titulo: 'Eixo 2',
      tema: 'Fenômenos da Cibercultura',
      /* temaCurto: 'com Currículo e Avaliação',*/
      /*descricao: `Relação da Didática com os saberes docentes estruturantes na formação de professores. 
      Saberes pedagógicos e didáticos relacionados ao processo de ensino-aprendizagem; 
      Planejamento, sequência didática e avaliação; Concepções de formação de professores; 
      Concepções de profissionalização docente; Formação inicial e continuada de professores; 
      Estágio Supervisionado na formação de professores; Metodologias e mediações didáticas
      na formação de professores; Pesquisa-ação; pesquisa colaborativa; narrativas na 
      formação de professores; Parceria entre universidade e a escola na formação de 
      professores.`,*/
      coordenacao: [
        'Rosemary dos Santos',
        'Miriam Amaral'

      ],
      /* coordenacaogeral: ` Vânia Finholdt Ângelo Leite – UERJ`
       ,*/
      pareceristas: []
    },
    {
      titulo: 'Eixo 3',
      tema: `Hiperartesanias docentes e Hiperescritas de si 
      `,
      /*temaCurto: `em Direitos Humanos, Interculturalidade e Religiões`,*/
      /* descricao: `A Didática, as práticas de ensino e a Mediação Tecnológica. Tecnologias Digitais e
       Mediação Pedagógica. Cultura Digital e Escola. Jogos Digitais, Tecnologias e Educação. 
       As Plataformas Digitais e os Ambientes Virtuais de Aprendizagem (AVA). Ensino 
       Remoto Emergencial (ERE).`,*/
      coordenacao: [

        'Leonardo Nolasco',
        'Tania Lucía Maddalena'
      ],
      /*coordenacaogeral: ` Priscila Rezende Moreira - UEMG`
      ,*/
      pareceristas: []
    },
    {
      titulo: 'Eixo 4',
      tema: `Escola Básica 
       `,
      /*temaCurto: `entre Novas epistemologias, Diferença, Biodiversidade, Democracia e Inclusão`,*/
      /* descricao: `A Educação na Constituição Brasileira e na Legislação Educacional. Educação Básica:
       Objetivos, princípios e diretrizes curriculares. A educação no contexto das 
       transformações da sociedade contemporânea. Políticas regressivas e ataques aos direitos
       educacionais. A Didática e as Práticas de Ensino e o contexto político contemporâneo. As 
       reformas políticas e o papel da Didática e das Práticas de Ensino no debate 
       contemporâneo. Os projetos de regulação da educação escolar (BNCC, Escola sem 
       Partido, Reforma do Ensino Médio). Planejamento e gestão da educação. Gestão 
       Pedagógica e Democrática da Escola. Políticas de Avaliação da Educação Básica.`,*/
      coordenacao: [

        'Andrea da Paixão Fernandes',
        'Cláudia Hernandez Barreiros Sonco'

      ],
      /*coordenacaogeral: ` Robson Luiz de França - UFU`
      ,*/
      pareceristas: []
    },
    {
      titulo: 'Eixo 5',
      tema: `Redes Educativas 
       `,
      /* temaCurto: `entre Educação, Comunicação e Tecnologia`,*/
      /* descricao: `Didática e Práticas de Ensino nas diretrizes do CNE; Implementação, resistência, 
       permanência de políticas de formação de Pedagogos(as); PIBID, Residência Pedagógica 
       e outros programas de formação.`,*/
      coordenacao: [

        'Nilda Alves',
        'Marcelo Bairral'

      ],

      /*coordenacaogeral: ` José Leonardo Leonardo Rolim de Lima Severo  - UFPB`
      ,*/
      pareceristas: []
    },
    {
      titulo: 'Eixo 6',
      tema: `Ativismos Online e redes sociais
       `,
      /* temaCurto: `entre Educação, Comunicação e Tecnologia`,*/
      /* descricao: `Didática e Práticas de Ensino nas diretrizes do CNE; Implementação, resistência, 
       permanência de políticas de formação de Pedagogos(as); PIBID, Residência Pedagógica 
       e outros programas de formação.`,*/
      coordenacao: [

        'Dilton Couto',
        'Luciana Velloso'

      ],

      /*coordenacaogeral: ` José Leonardo Leonardo Rolim de Lima Severo  - UFPB`
      ,*/
      pareceristas: []
    }
  ]
    ;
  public imagesUrl;


  //programacoes = PROGRAMACOES;
  works;
  worksPresencial;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private download: DownloadFileService,
    private noticiasService: NoticiasService,
    private anaisService: AnaisService,
    private toastr: ToastrService,
    private scheduleService: ScheduleService,
    private authService: AuthService

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

    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // Os meses no JavaScript são baseados em 0

    // Define `isPresencial` como true se for 10/12
    if (day === 10 && month === 12) {
      this.isPresencial = true;
    }
    
    this.imagesUrl = [{path: './assets/img/c1.jpeg'},{path: './assets/img/c2.jpeg'}, {path: './assets/img/c3.jpeg'}, {path: './assets/img/c4.jpeg'}, {path: './assets/img/c5.jpeg'} ];

    this.authService.refresh().subscribe((res: any) => {
      this.user = res.user;
    });
    this.listarWorks();

  }


  public listarWorks() {

    this.scheduleService.retrieveSchedules(13, null).subscribe((data) => {
      this.works = data.filter((item: any) => item.presencial2024 == false || !item.presencial2024);
      this.worksPresencial = data.filter((item: any) => item.presencial2024 === true);

    });
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

  public openDialogFruicao() {
    const dialogRef = this.dialog.open(ModalNormasFruicaoComponent, {
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






  public isSubscribe(scheduleSelect) {
    if (this.user && this.user._id && scheduleSelect.hasOwnProperty('subscribers')) {
      return scheduleSelect.subscribers.some(el => el.userId == this.user._id);
    }

    return false;
  }

  public signUp(type, scheduleFull) {
    this.carregando = true;
      this.scheduleService.enrollScheduleEdoc2024(scheduleFull._id)
        .subscribe((res: any) => {
          this.carregando = false;
          if (res.msg) {
            this.toastr.error(res.msg, 'Atenção');
          } else {
            this.listarWorks();
            this.toastr.success('Inscrição realizada com sucesso', 'Sucesso');
          }
        }, err => {
          this.toastr.success('Servidor momentaneamente inoperante', 'Erro');
          this.carregando = false;
        });
   
  }

  public cancelSignUp(type, scheduleFull) {
    this.carregando = true;
  
    this.scheduleService.cancelEnrollScheduleEdoc2024(scheduleFull._id)
      .subscribe(res => {
        this.toastr.success('Cancelamento de inscrição realizada com sucesso', 'Sucesso');
        this.carregando = false;
        this.listarWorks();

      }, err => {
        this.toastr.success('Servidor momentaneamente inoperante', 'Erro');
        this.carregando = false;
      });
  }

}
