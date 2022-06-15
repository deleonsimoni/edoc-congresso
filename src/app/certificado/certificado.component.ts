import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { CertificadoService } from "./certificado.service";

import html2canvas from "html2canvas";
import { AuthService } from "../services/auth.service";
import * as jsPDF from "jspdf";
import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";

@Component({
  selector: "app-certificado",
  templateUrl: "./certificado.component.html",
  styleUrls: ["./certificado.component.scss"],
})
export class CertificadoComponent implements OnInit {
  constructor(
    private authService: AuthService,
    @Inject("BASE_API_URL") private baseUrl: string,
    private http: HttpClient
  ) { }

  user: any;
  carregando = false;
  nome: any;
  gt: any;
  textoTemplate: any;
  works: any;
  inscricoes: any;
  coringa = "";
  exibirGT = false;
  certificados = [];
  templateAutomatico = { target: { value: "" } };

  ngOnInit() {
    this.carregando = true;
    this.authService.refresh().subscribe((res: any) => {
      this.user = res.user;

      this.nome = this.user.fullname;

      if (!this.user.icAdmin) {
        if (this.user.payment && this.user.payment.icPaid) {
          this.templateAutomatico.target.value = 'PARTICIPAÇÃO GERAL';
          this.preencherTemplate(this.templateAutomatico, null, null);
        }
        if (this.user.works && this.user.works.length > 0) {
          this.carregarTrabalhosUsuario();
        }
        if (this.user.cursosInscritos && this.user.cursosInscritos.length > 0) {
          this.carregarInscricoes();
        }
      } else {
        this.carregando = false;
      }
      this.carregando = false;
    });
  }

  private gerarCertificadosTrabalhos() {
    this.works.forEach((work) => {
      //MiniCurso
      if (
        work.modalityId == 4 && (((work.reviewAdmin && work.reviewAdmin.review.icAllow == "Sim") &&
          (work.reviewReviewer && work.reviewReviewer.review && work.reviewReviewer.review.icAllow != "Nao")) ||
          (work.recurso && work.recurso.icAllow == "Sim"))
      ) {
        this.templateAutomatico.target.value = "MEDIAÇÃO DE MINICURSO";
        this.preencherTemplate(this.templateAutomatico, work.title, "04");
      } else if (
        work.modalityId == 5 && (((work.reviewAdmin && work.reviewAdmin.review.icAllow == "Sim") &&
          (work.reviewReviewer && work.reviewReviewer.review && work.reviewReviewer.review.icAllow != "Nao")) ||
          (work.recurso && work.recurso.icAllow == "Sim"))
      ) {
        this.templateAutomatico.target.value = "MEDIAÇÃO DE PAINEL";
        this.preencherTemplate(this.templateAutomatico, work.title, "05");
      } else if (
        work.modalityId == 3 && (((work.reviewAdmin && work.reviewAdmin.review.icAllow == "Sim") &&
          (work.reviewReviewer && work.reviewReviewer.review && work.reviewReviewer.review.icAllow != "Nao")) ||
          (work.recurso && work.recurso.icAllow == "Sim"))
      ) {
        this.templateAutomatico.target.value = "PÔSTER";
        this.preencherTemplate(this.templateAutomatico, work.title, "03");
      }
    });
  }

  private gerarCertificadosInscricoes() {
    let control = 0;
    this.inscricoes.forEach((work) => {
      if (this.user.cursosInscritos[control].icModalityId == 4) {
        this.templateAutomatico.target.value = "PARTICIPAÇÃO DE MINICURSO";
        let horas = 4;
        this.preencherTemplate(this.templateAutomatico, work.workTitle, horas);
      } else if (this.user.cursosInscritos[control].icModalityId == 5) {
        this.templateAutomatico.target.value = "PARTICIPAÇÃO DE PAINEL";
        this.preencherTemplate(this.templateAutomatico, work.workTitle, null);
      }
      control++;
    });
  }

  private carregarTrabalhosUsuario() {
    this.carregando = true;
    this.http.get(`${this.baseUrl}/user/worksReviewer/`).subscribe(
      (res: any) => {
        this.works = res.works;
        this.gerarCertificadosTrabalhos();
        this.carregando = false;
      },
      (err) => {
        console.log(err);
        this.carregando = false;
      }
    );
  }

  private carregarInscricoes() {
    this.carregando = true;
    this.http
      .get(`${this.baseUrl}/user/getWorksIncricoes?inscricoes=` + JSON.stringify(this.user.cursosInscritos))
      .subscribe(
        (res: any) => {
          this.inscricoes = res.works;
          this.gerarCertificadosInscricoes();
          this.carregando = false;
        },
        (err) => {
          console.log(err);
          this.carregando = false;
        }
      );
  }

  public captureScreen(index) {
    this.carregando = true;

    let data = document.getElementById("certificado" + index);

    html2canvas(data).then((canvas) => {
      let imgWidth = 300;
      let imgHeight = 190;

      const contentDataURL = canvas.toDataURL("image/png");
      let pdf = new jsPDF("l", "mm", "a4"); // A4 size page of PDF
      var position = 0;
      this.carregando = false;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save("Certificado Endipe.pdf"); // Generated PDF
    });
  }

  preencherTemplate(templateSelecionado, complementoUm, complementoDois) {
    if (this.user.icAdmin) {
      this.certificados = [];
    }

    this.exibirGT = false;
    this.coringa = "";
    this.textoTemplate = this.templates.filter((element) => element.name == templateSelecionado.target.value)[0].value;
    if (templateSelecionado.target.value == "GRUPO DE PESQUISA") {
      this.coringa = " participou do grupo de pesquisa ";
      this.exibirGT = true;
    } else if (templateSelecionado.target.value == "PRESTAÇÃO DE SERVIÇO") {
      this.coringa = " atuou como prestadora de serviço na área de ";
      this.exibirGT = true;
    } else if (templateSelecionado.target.value == "MONITORIA") {
      this.coringa =
        " atuou como monitora, perfazendo um total de ______ horas de trabalho de pré-produção, produção e pós produção ";
      this.exibirGT = true;
    } else if (templateSelecionado.target.value == "COORDENAÇÃO DE ATIVIDADE") {
      this.coringa = "coordenou ";
      this.exibirGT = true;
    } else if (templateSelecionado.target.value == "CONFERÊNCIA") {
      this.coringa = " realizou a conferência ";
      this.exibirGT = true;
    } else if (templateSelecionado.target.value == "MEDIAÇÃO DE OFICINA") {
      this.coringa =
        " desenvolveu a Oficina " +
        (complementoUm || "______________") +
        " com carga horária de " +
        (complementoDois || "_______ ") +
        " horas";
      this.exibirGT = true;
    } else if (templateSelecionado.target.value == "PARTICIPAÇÃO DE OFICINA") {
      this.coringa =
        " participou da Oficina " +
        (complementoUm || "______________") +
        " com carga horária de " +
        (complementoDois || "_______ ") +
        " horas";
      this.exibirGT = true;
    } else if (templateSelecionado.target.value == "MODERAÇÃO DE EXPOSIÇÃO E FRUIÇÕES ARTÍSTICO-LITERÁRIAS") {
      this.coringa = " fez a mediação da Roda de Conversa " + (complementoUm || "______________");
      this.exibirGT = true;

    } else if (templateSelecionado.target.value == "PARTICIPAÇÃO DE PAINEL") {
      this.coringa = " participou do Painel " + complementoUm || "______________" + " ";
      this.exibirGT = true;
    } else if (templateSelecionado.target.value == "MEDIAÇÃO DE PAINEL") {
      this.coringa = " apresentou o Painel intitulado " + (complementoUm || "______________");
      this.exibirGT = true;
    }

    this.certificados.push({ nome: this.nome, coringa: this.coringa, textoTemplate: this.textoTemplate });
  }

  templates = [

    {
      name: "GRUPO DE PESQUISA",
      value:
        "participou do Grupo de Pesquisa do IV Encontro Internacional Docência e Cibercultura – IV E-DOC – RIO 2022 – uma promoção interinstitucional coordenada pela Universidade Federal do Rio de Janeiro e pela Universidade Federal do Estado do Rio de Janeiro, no período de 25 de julho a 29 de julho de 2022, com carga horária total de 180 horas.",
    },
    {
      name: "MODERAÇÃO DE EXPOSIÇÃO E FRUIÇÕES ARTÍSTICO-LITERÁRIAS",
      value:
        "do IV Encontro Internacional Docência e Cibercultura – IV E-DOC – RIO 2022 – uma promoção interinstitucional coordenada pela Universidade Federal do Rio de Janeiro e pela Universidade Federal do Estado do Rio de Janeiro, no período de 25 de julho a 29 de julho de 2022, com carga horária total de 180 horas.",
    },

    {
      name: "COORDENAÇÃO GERAL",
      value:
        "coordenou o IV Encontro Internacional Docência e Cibercultura – IV E-DOC – RIO 2022 – uma promoção interinstitucional coordenada pela Universidade Federal do Rio de Janeiro e pela Universidade Federal do Estado do Rio de Janeiro, no período de 25 de julho a 29 de julho de 2022, com carga horária total de 180 horas.",
    },

    {
      name: "MEDIAÇÃO DE OFICINA",
      value:
        "no IV Encontro Internacional Docência e Cibercultura – IV E-DOC – RIO 2022 – uma promoção interinstitucional coordenada pela Universidade Federal Rural do Rio de Janeiro e pela Universidade Federal do Estado do Rio de Janeiro, no período de 25 de julho a 29 de julho de 2022.",
    },
    {
      name: "MEDIAÇÃO DE PAINEL",
      value:
        "no IV Encontro Internacional Docência e Cibercultura – IV E-DOC – RIO 2022 – uma promoção interinstitucional coordenada pela Universidade Federal do Rio de Janeiro e pela Universidade Federal do Estado do Rio de Janeiro, no período de 25 de julho a 29 de julho de 2022, com carga horária total de 180 horas.",
    },

    {
      name: "MONITORIA",
      value:
        "no IV Encontro Internacional Docência e Cibercultura – IV E-DOC – RIO 2022 – uma promoção interinstitucional coordenada pela Universidade Federal Rural do Rio de Janeiro, no período de 25 de julho a 29 de julho de 2022.",
    },


    {
      name: "PARECERISTA",
      value:
        "participou na condição de parecerista do IV Encontro Internacional Docência e Cibercultura – IV E-DOC – RIO 2022 – uma promoção interinstitucional coordenada pela Universidade Federal do Rio de Janeiro e pela Universidade Federal do Estado do Rio de Janeiro, no período de 29 de outubro a 12 de novembro de 2020, com carga horária total de 180 horas.",
    },

    {
      name: "PARTICIPAÇÃO DE OFICINA",
      value:
        "no IV Encontro Internacional Docência e Cibercultura – IV E-DOC – RIO 2022 – uma promoção interinstitucional coordenada pela Universidade Federal do Rio de Janeiro e pela Universidade Federal do Estado do Rio de Janeiro, no período de 29 de outubro a 12 de novembro de 2020.",
    },
    {
      name: "PARTICIPAÇÃO DE PAINEL",
      value:
        "no IV Encontro Internacional Docência e Cibercultura – IV E-DOC – RIO 2022 – uma promoção interinstitucional coordenada pela Universidade Federal do Rio de Janeiro e pela Universidade Federal do Estado do Rio de Janeiro, no período de 29 de outubro a 12 de novembro de 2020.",
    },

    {
      name: "PARTICIPAÇÃO GERAL",
      value:
        "participou do IV Encontro Internacional Docência e Cibercultura – IV E-DOC – RIO 2022 – uma promoção interinstitucional coordenada pela Universidade Federal do Rio de Janeiro e pela Universidade Federal do Estado do Rio de Janeiro, no período de 29 de outubro a 12 de novembro de 2020, com carga horária total de 180 horas.",
    },

    {
      name: "PRESTAÇÃO DE SERVIÇO",
      value:
        "para fins de realização do IV Encontro Internacional Docência e Cibercultura – IV E-DOC – RIO 2022 – uma promoção interinstitucional coordenada pela Universidade Federal do Rio de Janeiro e pela Universidade Federal do Estado do Rio de Janeiro, no período de 29 de outubro a 12 de novembro de 2020, com carga horária total de 180 horas.",
    },

    {
      name: "CONFERÊNCIA",
      value:
        "no IV Encontro Internacional Docência e Cibercultura – IV E-DOC – RIO 2022 – uma promoção interinstitucional coordenada pela Universidade Federal do Rio de Janeiro e pela Universidade Federal do Estado do Rio de Janeiro, no período de 29 de outubro a 12 de novembro de 2020.",
    },
  ];
}
