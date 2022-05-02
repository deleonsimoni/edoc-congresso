import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from "../admin.service";

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  public groupId;
  public description;
  public title;
  public carregando = false;
  private files: FileList;


  public groups = [
    { id: 1, name: "Secretaria" },
    { id: 2, name: "Todos participantes com inscrição paga" },
    { id: 3, name: "Todos autores de trabalho aceitos" },
    { id: 4, name: "Todos inscritos em minicurso" },

  ]

  public editorStyle = { 'height': '500px' };

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
  }

  sendEmail() {
    if (this.description && this.groupId && this.title) {

      this.carregando = true;
      this.adminService.sendEmail({ groupId: this.groupId, description: this.description, files: this.files, title: this.title }).subscribe((res) => {
        this.carregando = false;
        if (res.temErro) {
          this.toastr.error("Erro", res);
        } else {
          this.toastr.success("Os emails estão sendo enviados", 'Sucesso');
        }
      }, (err) => {
        this.carregando = false;
        if (err.status == 413) {
          this.toastr.error("Limite de email excedido", 'Atenção');
        } else {
          this.toastr.error("Servidor momentaneamente inoperante", 'Atenção');
        }
      });

    } else {
      this.carregando = false;
      this.toastr.warning("Preencha corretamente todos os campos", 'Atenção');
    }
  }

  public setFile(files: FileList): void {
    this.files = files;
  }

  public changeGroup(): void {

  }

  public getFileName(): string {
    const fileName = this.files ? this.files[0].name : 'Escolha o arquivo para anexar ao email';
    return fileName;
  }


}
