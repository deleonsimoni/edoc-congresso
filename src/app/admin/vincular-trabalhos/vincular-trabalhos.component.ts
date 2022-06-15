import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AdminService } from "../admin.service";
import { MatDialog } from "@angular/material";
import { AuthService } from "src/app/services/auth.service";
import { TypeWorkPipe } from "src/app/pipes/type-work.pipe";
import { AxisPipe } from "src/app/pipes/axis.pipe";
import { TypeWorkRelatorioPipe } from "src/app/pipes/type-work-relatorio.pipe";

@Component({
  selector: "app-vincular-trabalhos",
  templateUrl: "./vincular-trabalhos.component.html",
  styleUrls: ["./vincular-trabalhos.component.scss"],
})
export class VincularTrabalhosComponent implements OnInit {
  public eixos = [
    { id: 1, name: "Eixo 1: Educação Online" },
    { id: 2, name: "Eixo 2: Fenômenos da Cibercultura" },
    { id: 3, name: "Eixo 3: Artesanias Docentes" },
    { id: 4, name: "Eixo 4: Escola Básica" },
    { id: 5, name: "Eixo 5: Redes Educativas" },
    { id: 6, name: "Eixo 6: Ativismo Online" },
  ];
  public axisId = null;
  public works = [];
  public reviewers = [];
  public user;
  public workSelect;
  public nameWork;
  public status;
  public carregando = false;
  public allWorks = [];
  public modalidadeFilter = 0;
  public pager: any = {};

  gerandoRelatorio = false;
  public axisPipe = new AxisPipe();
  public TypeWorkRelatorioPipe = new TypeWorkRelatorioPipe();

  constructor(
    private dialog: MatDialog,
    private adminService: AdminService,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.retrieveUser();
  }

  retrieveUser() {
    this.user = this.authService.getDecodedAccessToken(
      this.authService.getToken()
    );
    if (this.user.reviewer && this.user.reviewer.icCoordinator) {
      this.axisId = this.user.reviewer.icModalityId;
      this.loadData();
    }
  }

  /*public filtrarStatus() {
    this.modalidadeFilter = 0;
    if (this.user.icAdmin) {
      this.filtraStatusAdmin();
    } else {
      this.filtraStatusCoordenador();
    }
  }*/

  public filtrarStatus() {
    this.modalidadeFilter = 0;
    if (this.user.icCoordinator) {

      this.filtraStatusCoordenador();
    }
  }

  filtrarModalidade() {
    switch (Number(this.modalidadeFilter)) {
      case 0:
        if (this.status) {
          this.works = this.works;
        } else {
          this.works = this.allWorks;
        }
        break;
      case 3:
        this.works = this.works.filter((work) => work.modalityId == 6);
        break;
      case 4:
        this.works = this.works.filter((work) => work.modalityId == 4);
        break;
      case 5:
        this.works = this.works.filter((work) => work.modalityId == 5);
        break;
      case 8:
        this.works = this.works.filter((work) => work.modalityId == 8);
        break;
    }
  }

  /* filtraStatusAdmin() {
     switch (Number(this.status)) {
       case 0:
         this.works = this.allWorks;
         break;
       case 1:
         this.works = this.allWorks.filter((work) => !work.reviewAdmin);
         break;
       case 2:
         this.works = this.allWorks.filter(
           (work) => work.reviewAdmin && work.reviewAdmin.review.icAllow == "Nao"
         );
         break;
       case 3:
         this.works = this.allWorks.filter(
           (work) => work.reviewAdmin && work.reviewAdmin.review.icAllow == "Sim"
         );
         break;
       case 4:
         this.works = this.allWorks.filter(
           (work) => work.recurso && work.recurso.icAllow == "Sim"
         );
         break;
       case 5:
         //this.works = this.allWorks.filter(work => work.recurso && (work.recurso.justify || work.recursoAdmin?.justify) && !work.recurso.icAllow);
         this.works = this.allWorks.filter(
           (work) =>
             work.recurso && (work.recurso.justify || work.recursoAdmin.justify)
         );
 
         break;
       case 6:
         //this.works = this.allWorks.filter(work => work.recurso && (work.recurso.justify || work.recursoAdmin?.justify) && !work.recurso.icAllow);
         this.works = this.allWorks.filter(
           (work) => work.recursoAdmin && work.recursoAdmin.justify
         );
 
         break;
     }
   }*/

  filtraStatusCoordenador() {
    switch (Number(this.status)) {
      case 0:
        this.works = this.allWorks;
        break;
      case 1:
        this.works = this.allWorks.filter((work) => !work.reviewReviewer);
        break;
      case 2:
        this.works = this.allWorks.filter(
          (work) =>
            work.reviewReviewer && work.reviewReviewer.review.icAllow == "Nao"
        );
        break;
      case 3:
        this.works = this.allWorks.filter(
          (work) =>
            work.reviewReviewer && work.reviewReviewer.review.icAllow == "Sim"
        );
        break;
      case 4:
        this.works = this.allWorks.filter(
          (work) => work.recurso && work.recurso.icAllow == "Sim"
        );
        break;
      case 5:
        this.works = this.allWorks.filter(
          (work) =>
            work.recurso && work.recurso.justify && !work.recurso.icAllow
        );
        break;
      case 6:
        this.works = this.allWorks.filter(
          (work) =>
            work.recursoAdmin &&
            work.recursoAdmin.justify &&
            !work.recursoAdmin.icAllow
        );
        break;
    }
  }

  loadData() {
    this.loadWorksPaginate(1);

    // LISTAR PARECERISTAS
    this.adminService.retrieveReviewers(this.axisId).subscribe((res) => {
      if (res.temErro) {
        this.toastr.error("Erro", res);
      } else {
        this.reviewers = res.reviewers;
      }
    });
  }

  loadWorksPaginate(event) {
    this.carregando = true;
    this.adminService
      .retrieveAllWorksPaginated(
        this.axisId,
        this.modalidadeFilter,
        this.status,
        this.nameWork,
        (event && event.pageIndex + 1) || 1
      )
      .subscribe((res) => {
        if (!res.worksFound) {
          this.carregando = false;
          this.toastr.error(
            "Atenção",
            "Nenhum trabalho encontrado com estes filtros"
          );
        } else {
          this.works = res.worksFound;
          this.pager = res.pager;
          this.carregando = false;
        }
      });
  }

  loadWorks() {
    this.carregando = true;
    this.adminService.retrieveAllWorks(this.axisId).subscribe((res) => {
      if (res.temErro) {
        this.carregando = false;
        this.toastr.error("Erro", res);
      } else {
        this.allWorks = res;
        this.works = this.allWorks;
        this.carregando = false;
        this.modalidadeFilter = 0;
        this.status = 0;
      }
    });
  }

  public receiverSelectedWork(work) {
    if (this.workSelect === work._id) {
      this.workSelect = null;
    } else {
      this.workSelect = work._id;
    }
  }

  gerarRelatorio(isParecerPositivo) {
    this.gerandoRelatorio = true;
    let worksRel;
    let filename;

    if (isParecerPositivo) {
      worksRel = this.works.filter(
        (element) =>
          element.reviewReviewer &&
          element.reviewReviewer.review.icAllow == "Sim"
      );
      filename =
        this.axisPipe.transform(this.axisId) + " - Parecer Positivo.csv";
    } else {
      worksRel = this.works.filter(
        (element) =>
          element.reviewReviewer &&
          element.reviewReviewer.review.icAllow == "Nao"
      );
      filename =
        this.axisPipe.transform(this.axisId) + " - Parecer Negativo.csv";
    }

    this.exportUserToCSV(worksRel, filename, isParecerPositivo);
  }

  public exportUserToCSV(data, fileName, isParecerPositivo) {
    try {
      let emails;

      const dataExport: any = data.map((work) => {
        emails = [];
        work.authors.forEach((element) => {
          emails += element.userEmail + "/";
        });

        return {
          Eixo: this.axisPipe.transform(work.axisId),
          Modalidade: this.TypeWorkRelatorioPipe.transform(work.modalityId),
          Titulo: work.title,
          Autores: emails,
          ParecerPositivo: isParecerPositivo ? "Sim" : "Não",
        };
      });

      const replacer = (key, value) => (value === null ? "" : value); // specify how you want to handle null values here
      const header = Object.keys(dataExport[0]);
      let csv = dataExport.map((row) =>
        header
          .map((fieldName) => JSON.stringify(row[fieldName], replacer))
          .join(";")
      );
      csv.unshift(header.join(";"));
      let csvArray = csv.join("\r\n");

      var a = document.createElement("a");
      var blob = new Blob(["\ufeff" + csvArray], {
        type: "text/csv; charset=utf-8",
      }),
        url = window.URL.createObjectURL(blob);

      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
      this.gerandoRelatorio = false;
    } catch (error) {
      console.error(error);
      this.gerandoRelatorio = false;
    }
  }
}
