import { Component, OnInit, Input, Output } from "@angular/core";
import { DownloadFileService } from "src/app/services/download-file.service";
import { MatDialogRef, MatDialog } from "@angular/material";
import { ModalReviewAdminComponent } from "../../admin/modals/modal-review-admin/modal-review-admin.component";
import { ModalReviewReviewerComponent } from "../../admin/modals/modal-review-reviewer/modal-review-reviewer.component";
import { ToastrService } from "ngx-toastr";
import { UploadService } from "src/app/services/upload.service";
import { ReviewService } from "src/app/services/review.service";

@Component({
  selector: "app-work-data",
  templateUrl: "./work-data.component.html",
  styleUrls: ["./work-data.component.scss"],
})
export class WorkDataComponent implements OnInit {
  @Input() work: any;

  @Input() user: any;

  public carregando;
  private filesDOC: FileList;
  private filesPDF: FileList;

  private filesDOCRecurso: FileList;
  private filesPDFRecurso: FileList;
  public reply: String;

  private justificativaRecurso;
  /*public justificativaRecursoAdmin = "";*/
  constructor(
    private downloadService: DownloadFileService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private uploadService: UploadService,
    private reviewService: ReviewService
  ) { }

  ngOnInit() { }

  public download(nameFile) {
    const vm = this;
    function sucessoDownload() {
      vm.carregando = false;
    }
    function falhaDownload(err) {
      this.toastr.error("Erro ao relizar download.", "Erro: ");
      vm.carregando = false;
    }
    this.carregando = true;
    this.downloadService.getFile(nameFile, sucessoDownload, falhaDownload);
  }

  public getFileNameDOC(): string {
    const fileName = this.filesDOC ? this.filesDOC[0].name : "Alterar DOC";
    return fileName;
  }

  public getFileNameDOCRecurso(): string {
    const fileName = this.filesDOCRecurso
      ? this.filesDOCRecurso[0].name
      : "Alterar DOC";
    return fileName;
  }

  public getFileNamePDF(): string {
    const fileName = this.filesPDF ? this.filesPDF[0].name : "Alterar PDF";
    return fileName;
  }

  public getFileNamePDFRecurso(): string {
    const fileName = this.filesPDFRecurso
      ? this.filesPDFRecurso[0].name
      : "Alterar PDF";
    return fileName;
  }

  public setFileNameDOC(files: FileList): void {
    this.filesDOC = files;
  }

  public setFileNameDOCRecurso(files: FileList): void {
    this.filesDOCRecurso = files;
  }

  public setFileNamePDF(files: FileList): void {
    this.filesPDF = files;
  }

  public setFileNamePDFRecurso(files: FileList): void {
    this.filesPDFRecurso = files;
  }

  public alterarArquivos() {
    if (!this.filesDOC && !this.filesPDF) {
      this.toastr.error("Selecione novos arquivos.", "Atenção: ");
      return;
    }

    this.carregando = true;

    this.uploadService
      .alterUserWorkFile(
        this.filesDOC ? this.filesDOC[0] : null,
        this.filesPDF ? this.filesPDF[0] : null,
        "trabalhos",
        this.work._id
      )
      .subscribe(
        (res) => {
          this.carregando = false;

          if (res && res.temErro) {
            this.toastr.error(res.mensagem, "Erro: ");
          } else {
            this.toastr.success(
              "Trabalho alterado com sucesso. Atualize a página para verificar",
              "Sucesso"
            );
            this.work = res;
            this.filesDOC = null;
            this.filesPDF = null;
          }
        },
        (err) => {
          this.carregando = false;
          this.toastr.error("Servidor momentaneamente inoperante.", "Erro: ");
        }
      );
  }

  public aplicarRecurso() {
    if (!this.justificativaRecurso) {
      this.toastr.error(
        "Para solicitar o recurso indique a justificativa.",
        "Atenção: "
      );
      return;
    }

    this.carregando = true;

    this.reviewService
      .aplicarRecurso(
        { justificativaRecurso: this.justificativaRecurso },
        this.work._id
      )
      .subscribe(
        (res: any) => {
          this.carregando = false;
          this.work = res;
          this.toastr.success("Recurso enviado com sucesso", "Sucesso");
        },
        (err) => {
          this.carregando = false;
          this.toastr.error("Ocorreu um erro enviar o recurso", "Atenção:");
        }
      );
  }

  public negarRecurso() {
    this.carregando = true;

    this.reviewService
      .negarRecurso(this.work._id, this.work.recurso.reply)
      .subscribe(
        (res: any) => {
          this.carregando = false;
          this.work = res;
          this.toastr.success("Recurso negado com sucesso", "Sucesso");
        },
        (err) => {
          this.carregando = false;
          this.toastr.error("Ocorreu um erro ao negar o recurso", "Atenção:");
        }
      );
  }

  public aceitarRecurso() {
    this.carregando = true;

    this.reviewService
      .aceitarRecurso(this.work._id, this.work.recurso.reply)
      .subscribe(
        (res: any) => {
          this.carregando = false;
          this.work = res;
          this.toastr.success("Recurso aceito com sucesso", "Sucesso");
        },
        (err) => {
          this.carregando = false;
          this.toastr.error("Ocorreu um erro ao aceitar o recurso", "Atenção:");
        }
      );
  }

  /* public aplicarRecursoAdmin() {
     if (!this.justificativaRecurso) {
       this.toastr.error(
         "Para solicitar o recurso indique a justificativa.",
         "Atenção: "
       );
       return;
     }
 
     this.carregando = true;
 
     this.reviewService
       .aplicarRecursoAdmin(
         { justificativaRecurso: this.justificativaRecurso },
         this.work._id
       )
       .subscribe(
         (res: any) => {
           this.carregando = false;
           this.work = res;
           this.toastr.success("Recurso enviado com sucesso", "Sucesso");
         },
         (err) => {
           this.carregando = false;
           this.toastr.error("Ocorreu um erro enviar o recurso", "Atenção:");
         }
       );
   }
 
   /* public negarRecursoAdmin() {
      this.carregando = true;
  
      this.reviewService
        .negarRecursoAdmin(this.work._id, this.work.recursoAdmin.reply)
        .subscribe(
          (res: any) => {
            this.carregando = false;
            this.work = res;
            this.toastr.success("Recurso negado com sucesso", "Sucesso");
          },
          (err) => {
            this.carregando = false;
            this.toastr.error("Ocorreu um erro ao negar o recurso", "Atenção:");
          }
        );
    }
  
    public aceitarRecursoAdmin() {
      this.carregando = true;
  
      this.reviewService
        .aceitarRecursoAdmin(this.work._id, this.work.recursoAdmin.reply)
        .subscribe(
          (res: any) => {
            this.carregando = false;
            this.work = res;
            this.toastr.success("Recurso aceito com sucesso", "Sucesso");
          },
          (err) => {
            this.carregando = false;
            this.toastr.error("Ocorreu um erro ao aceitar o recurso", "Atenção:");
          }
        );
    }*/

  /*public addReviewer(work) {
    const dialogRef = this.dialog.open(ModalReviewAdminComponent, {
      data: { work: work },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        work.reviewAdmin = result.reviewAdmin;
      }
    });
  }*/

  public addReviewerCoordinator(work) {
    const dialogRef = this.dialog.open(ModalReviewReviewerComponent, {
      data: { work: work },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        work.reviewReviewer = result.reviewReviewer;
      }
    });
  }
}
