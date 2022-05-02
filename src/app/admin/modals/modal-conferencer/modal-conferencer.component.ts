import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConferencistaService } from 'src/app/services/conferencista.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-modal-conferencer',
  templateUrl: './modal-conferencer.component.html',
  styleUrls: ['./modal-conferencer.component.scss']
})
export class ModalConferencerComponent implements OnInit {

  public conferencerForm: FormGroup;
  public carregando = false;
  private imagemConferencer: FileList;
  @ViewChild('imageRender', { static: false }) imageRender: ElementRef;


  constructor(
    private dialog: MatDialogRef<ModalConferencerComponent>,
    private builder: FormBuilder,
    private conferencistaService: ConferencistaService,
    private uploadService: UploadService,

    private toastr: ToastrService
  ) {

    this.conferencerForm = this.builder.group({
      fullname: [null, [Validators.required]],
      email: [null],
      description: [null, [Validators.required]],
      imagePathS3: [null]
    });

  }

  ngOnInit() {
  }

  public registerConferencista() {
    this.carregando = true;
    if (this.conferencerForm.valid && this.imagemConferencer) {
      this.uploadService.submeterConferencista(this.imagemConferencer[0], this.conferencerForm.value)
        .subscribe((res: any) => {
          if (res.temErro) {
            this.toastr.error('Ocorreu um erro ao cadastrar', 'Atenção: ');
          } else {
            this.toastr.success('Conferencista cadastrado com sucesso', 'Sucesso');
            this.close();
          }

        }, err => {
          this.toastr.error('Ocorreu um erro ao cadastrar', 'Atenção: ');
        });
    } else {
      this.toastr.error('Preencha todos os campos', 'Atenção: ');

    }
  }

  public loadImage() {
    let element: HTMLElement = document.getElementById('imageConferencer') as HTMLElement;
    element.click();
  }

  public setImage(files: FileList): void {
    this.imagemConferencer = files;

    const reader = new FileReader();
    reader.readAsDataURL(this.imagemConferencer[0]); // Read file as data url
    reader.onloadend = (e) => { // function call once readAsDataUrl is completed
      this.imageRender.nativeElement.src = e.target['result']; // Set image in element
    };
  }

  public close() {
    this.dialog.close();
  }
}
