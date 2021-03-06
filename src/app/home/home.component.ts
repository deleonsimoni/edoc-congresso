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
    'Universidade Federal do Estado do Rio de Janeiro ??? UNIRIO',
    'Universidade Federal Fluminense ??? UFF',
    'Universidade do Estado do Rio de Janeiro ??? UERJ',
    'Pontif??cia Universidade Cat??lica do Rio de Janeiro ??? PUC-Rio'

  ];

  coordenacoesGerais = [
    'Edm??a Santos - UFRRJ'
  ];

  imagensApoiadores = [
    './assets/img/parceiros/ufrj2.png'

  ];

  imagensParcerias = [
    './assets/img/parcerias/CAPES.png'
  ];

  comites = [
    'Andrea Villela Mafra da Silva ??? ISERJ'

  ];

  secretarias = [
    'Silvana Mesquita ??? PUC-Rio'

  ];

  /*  gruposDeTrabalho = [
      {
        nome: 'Apoio aos preletores',
        equipe: [
          'Patricia Bastos de Azevedo ??? UFRRJ (coord.)'
  
  
        ]
      },
      {
        nome: 'Atividades culturais',
        equipe: [
          'Sandra Maciel ??? UFF (coord.)'
        ]
      },
      {
        nome: 'Feira de Livros',
        equipe: [
          'Adriana Patricio Delgado ??? UFRJ (coord.)'
  
  
        ]
      },
      {
        nome: 'Gest??o financeira',
        equipe: [
          'Giseli Barreto da Cruz ??? UFRJ (coord.)'
  
        ]
      },
      {
        nome: 'Inclus??o & acessibilidade',
        equipe: [
          'Bianca Della Libera ??? IBC (coord.)'
        ]
      },
      {
        nome: 'Local & infraestrutura',
        equipe: [
          'Claudia de Oliveira Fernandes ??? UNIRIO (coord.)'
  
        ]
      },
      {
        nome: 'Material do congressista',
        equipe: [
          'Vania Finholdt Angelo Leite ??? FFP/UERJ (coord.)'
  
        ]
      },
      {
        nome: 'Programa????o',
        equipe: [
          'Lu??s Paulo Borges ??? EB/CAp UERJ (coord.)'
  
        ]
      },
      {
        nome: 'Publica????es',
        equipe: [
          'Claudia de Oliveira Fernandes (UNIRIO)'
  
        ]
      },
      {
        nome: 'Rela????o com as redes de ensino',
        equipe: [
          'Claudia Miranda ??? UNIRIO (coord.)'
  
        ]
      },
      {
        nome: 'Servi??o de monitoria e recep????o',
        equipe: [
          'Cec??lia Silvano Batalha ??? EB/FME-Niter??i (coord.)'
  
        ]
      },
      {
        nome: 'Imagem, Comunica????o & Tecnologia',
        equipe: [
          'M??nica Vasconcellos ??? UFF (coord.)'
  
        ]
      },
      {
        nome: 'Secretaria Executiva',
        equipe: [
          'Silvana Mesquita ??? PUC-Rio (coord.)'
  
        ]
      },
    ];*/

  eixos = [
    {
      titulo: 'Eixo 1',
      tema: 'Educa????o Online',
      /*  temaCurto: 'com Forma????o docente',*/
      /* descricao: `Epistemologia da Did??tica. Objeto epist??mico da Did??tica. A produ????o do conhecimento 
       no campo da did??tica. Articula????o entre o ensinar e o aprender. Teoria Did??tica e bases 
       para propostas pedag??gicas. Did??tica e Epistemologia da pr??tica e/ou pr??xis. 
       Fundamentos e perspectivas da did??tica. `,*/
      coordenacao: [

        'Edm??a Santos',
        'Tatiana Rossini',
        'Mayra Ribeiro'

      ],
      /*coordenacaogeral: ` Lenilda R??go Albuquerque De Faria - UFAC`
      ,*/
      pareceristas: []
    },
    {
      titulo: 'Eixo 2',
      tema: 'Fen??menos da Cibercultura',
      /* temaCurto: 'com Curr??culo e Avalia????o',*/
      /*descricao: `Rela????o da Did??tica com os saberes docentes estruturantes na forma????o de professores. 
      Saberes pedag??gicos e did??ticos relacionados ao processo de ensino-aprendizagem; 
      Planejamento, sequ??ncia did??tica e avalia????o; Concep????es de forma????o de professores; 
      Concep????es de profissionaliza????o docente; Forma????o inicial e continuada de professores; 
      Est??gio Supervisionado na forma????o de professores; Metodologias e media????es did??ticas
      na forma????o de professores; Pesquisa-a????o; pesquisa colaborativa; narrativas na 
      forma????o de professores; Parceria entre universidade e a escola na forma????o de 
      professores.`,*/
      coordenacao: [
        'Rosemary dos Santos',
        'Miriam Amaral'

      ],
      /* coordenacaogeral: ` V??nia Finholdt ??ngelo Leite ??? UERJ`
       ,*/
      pareceristas: []
    },
    {
      titulo: 'Eixo 3',
      tema: `Hiperartesanias docentes e Hiperescritas de si 
      `,
      /*temaCurto: `em Direitos Humanos, Interculturalidade e Religi??es`,*/
      /* descricao: `A Did??tica, as pr??ticas de ensino e a Media????o Tecnol??gica. Tecnologias Digitais e
       Media????o Pedag??gica. Cultura Digital e Escola. Jogos Digitais, Tecnologias e Educa????o. 
       As Plataformas Digitais e os Ambientes Virtuais de Aprendizagem (AVA). Ensino 
       Remoto Emergencial (ERE).`,*/
      coordenacao: [

        'Leonardo Nolasco',
        'Tania Luc??a Maddalena'
      ],
      /*coordenacaogeral: ` Priscila Rezende Moreira - UEMG`
      ,*/
      pareceristas: []
    },
    {
      titulo: 'Eixo 4',
      tema: `Escola B??sica 
       `,
      /*temaCurto: `entre Novas epistemologias, Diferen??a, Biodiversidade, Democracia e Inclus??o`,*/
      /* descricao: `A Educa????o na Constitui????o Brasileira e na Legisla????o Educacional. Educa????o B??sica:
       Objetivos, princ??pios e diretrizes curriculares. A educa????o no contexto das 
       transforma????es da sociedade contempor??nea. Pol??ticas regressivas e ataques aos direitos
       educacionais. A Did??tica e as Pr??ticas de Ensino e o contexto pol??tico contempor??neo. As 
       reformas pol??ticas e o papel da Did??tica e das Pr??ticas de Ensino no debate 
       contempor??neo. Os projetos de regula????o da educa????o escolar (BNCC, Escola sem 
       Partido, Reforma do Ensino M??dio). Planejamento e gest??o da educa????o. Gest??o 
       Pedag??gica e Democr??tica da Escola. Pol??ticas de Avalia????o da Educa????o B??sica.`,*/
      coordenacao: [

        'Andrea da Paix??o Fernandes',
        'Cl??udia Hernandez Barreiros Sonco'

      ],
      /*coordenacaogeral: ` Robson Luiz de Fran??a - UFU`
      ,*/
      pareceristas: []
    },
    {
      titulo: 'Eixo 5',
      tema: `Redes Educativas 
       `,
      /* temaCurto: `entre Educa????o, Comunica????o e Tecnologia`,*/
      /* descricao: `Did??tica e Pr??ticas de Ensino nas diretrizes do CNE; Implementa????o, resist??ncia, 
       perman??ncia de pol??ticas de forma????o de Pedagogos(as); PIBID, Resid??ncia Pedag??gica 
       e outros programas de forma????o.`,*/
      coordenacao: [

        'Nilda Alves',
        'Marcelo Bairral'

      ],

      /*coordenacaogeral: ` Jos?? Leonardo Leonardo Rolim de Lima Severo  - UFPB`
      ,*/
      pareceristas: []
    },
    {
      titulo: 'Eixo 6',
      tema: `Ativismos Online e redes sociais
       `,
      /* temaCurto: `entre Educa????o, Comunica????o e Tecnologia`,*/
      /* descricao: `Did??tica e Pr??ticas de Ensino nas diretrizes do CNE; Implementa????o, resist??ncia, 
       perman??ncia de pol??ticas de forma????o de Pedagogos(as); PIBID, Resid??ncia Pedag??gica 
       e outros programas de forma????o.`,*/
      coordenacao: [

        'Dilton Couto',
        'Luciana Velloso'

      ],

      /*coordenacaogeral: ` Jos?? Leonardo Leonardo Rolim de Lima Severo  - UFPB`
      ,*/
      pareceristas: []
    }
  ]
    ;

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
        this.toastr.error('Ocorreu um erro ao listar noticias', 'Aten????o: ');
      });

    this.anaisService.listar()
      .subscribe((res: any) => {
        this.anais = res;
      }, err => {
        this.toastr.error('Ocorreu um erro ao listar anais', 'Aten????o: ');
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
        vm.toastr.error('Voc?? precisa estar logado para fazer o download', 'Aten????o: ');
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
      case 'Sess??es especiais':
        this.dialog.open(ModalSessoesEspeciaisComponent, {
          data: { item: programacao }
        });
        break;

      case 'Simp??sios':
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
}
