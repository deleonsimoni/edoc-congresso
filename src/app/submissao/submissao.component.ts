import { Component, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { UploadService } from '../services/upload.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { EventEmitter } from 'events';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

@Component({
  selector: 'app-submissao',
  templateUrl: './submissao.component.html',
  styleUrls: ['./submissao.component.scss']
})
export class SubmissaoComponent implements OnInit {

  @Input() receberDados = new Observable();
  @Output() enviarDados = new EventEmitter();

  public user: any;
  public carregando = true;
  public enviando = false;
  public sub: Subject<any>;
  public reviewers = [];
  public works = [];
  public workSelect;
  public submissionForm: FormGroup;
  public authors = new Array();
  public showAdd = true;
  public modalidadesUsuario: any[] = [];
  public modalidades = [
    { id: 4, name: 'Mediador de oficina' },
    { id: 5, name: 'Expositor de painel de pesquisa' },
    { id: 6, name: 'Moderador de exposição e fruições artístico-literárias' },
    /* { id: 7, name: 'Coordenador de grupo' },*/
    { id: 8, name: 'Conferencista' }
  ];
  public workOptions = [

    { id: 2, name: 'Painel' },
    { id: 3, name: 'Oficina' },
    { id: 4, name: 'Exposição' },
    { id: 5, name: 'Conferência' }
    /* { id: 6, name: 'Grupo de trabalho' }*/


  ];
  public eixos = [
    { id: 1, name: 'Eixo 1: Educação online' },
    { id: 2, name: 'Eixo 2: Fenômenos da Cibercultura' },
    { id: 3, name: 'Eixo 3: Artesaninas Docentes' },
    { id: 4, name: 'Eixo 4: Escola Básica' },
    { id: 5, name: 'Eixo 5: Redes Educativas' },
    { id: 6, name: 'Eixo 6: Ativismos Online' }

  ];
  private filesDOC: FileList;
  private filesPDF: FileList;


  constructor(
    private builder: FormBuilder,
    private uploadService: UploadService,
    private toastr: ToastrService,
    private authService: AuthService,
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient

  ) {
    this.receberDados.subscribe();
  }

  ngOnInit() {
    this.createForm();

    const vm = this;
    this.authService.refresh().subscribe((res: any) => {
      this.user = res.user;
      this.modalidadesUsuario = this.modalidades;

      this.carregando = false;
    });


    this.submissionForm.get('modalityId').valueChanges.subscribe(res => {
      this.showAdd = true;
      const control = this.submissionForm.get('authors') as FormArray;
      for (let i = control.length - 1; i >= 0; i--) {
        if (i === 0) {
          (this.submissionForm.get('authors') as FormArray).at(0).patchValue({ email: '' });
        } else {
          control.removeAt(i);
        }
      }
    });

    this.carregarTrabalhosUsuario()

  }


  private carregarTrabalhosUsuario() {
    this.carregando = true;
    this.http.get(`${this.baseUrl}/user/worksReviewer/`).subscribe((res: any) => {
      this.works = res.works;
      this.carregando = false;
    }, err => {
      console.log(err);
      this.carregando = false;
    });
  }

  private createForm(): void {

    this.submissionForm = this.builder.group({
      axisId: [null, [Validators.required]],
      modalityId: [null, [Validators.required]],
      typeWork: [null],
      usuarioPrincipal: [null],
      title: [null, [Validators.required]],
      authors: this.builder.array([
        this.createFields()
      ])
    });

    this.submissionForm.controls.authors.valueChanges.subscribe(res => {

      if (this.submissionForm.value.modalityId === '5' && res.length >= 12) {
        this.showAdd = false;
      } else if (this.submissionForm.value.modalityId !== '5' && res.length >= 4) {
        this.showAdd = false;
      } else {
        this.showAdd = true;
      }

    });

  }

  public upload() {

    const usuarioLogado = this.authService.getUserLogado();

    if (!this.filesPDF) {
      this.toastr.error('É necessário selecionar o arquivo PDF', 'Atenção');
      return;
    } if (!this.filesDOC) {
      // tslint:disable-next-line: align
      this.toastr.error('É necessário selecionar o arquivo DOC', 'Atenção');
      return;
    } if (this.filesPDF[0].type.indexOf('pdf') === -1) {
      this.toastr.error('O arquivo Upload PDF precisa ser um PDF.', 'Atenção');
      //fileInput.value = '';
      return;
      // tslint:disable-next-line: align
    } /*if (this.filesDOC[0].type.indexOf('doc') === -1
      && this.filesDOC[0].type.indexOf('docx') === -1
      && this.filesDOC[0].type.indexOf('msword') === -1) {
      this.toastr.error('O arquivo Upload DOC precisa ser um DOC.', 'Atenção');
      return;
      // tslint:disable-next-line: align
    }*/ if (this.filesPDF[0].size > 2500 * 1027) {
      this.toastr.error('O arquivo PDF deve possuir no máximo 2MB', 'Atenção');
      return;
    } if (this.filesDOC[0].size > 2500 * 1027) {
      // tslint:disable-next-line: align
      this.toastr.error('O arquivo DOC deve possuir no máximo 2MB', 'Atenção');
      return;
      // tslint:disable-next-line: align
    } if (!this.submissionForm.value.axisId) {
      this.toastr.error('Selecione um eixo.', 'Atenção');
      return;
    } if (!this.submissionForm.value.modalityId) {
      // tslint:disable-next-line: align
      this.toastr.error('Selecione uma modalidade.', 'Atenção');
      return;
    } if (!this.submissionForm.value.title) {
      // tslint:disable-next-line: align
      this.toastr.error('Selecione o titulo do trabalho.', 'Atenção');
      return;
    } if (this.submissionForm.value.authors && !this.submissionForm.value.authors[0].email) {
      // tslint:disable-next-line: align
      this.toastr.error('Indique ao menos um autor do trabalho.', 'Atenção');
      return;
    } else {
      this.enviando = true;

      this.submissionForm.value.usuarioPrincipal = usuarioLogado.email;
      this.submissionForm.value.arquivoPDF = this.filesPDF[0];
      this.uploadService.uploadFile(this.filesDOC[0], this.filesPDF[0], 'trabalhos', this.user.document, this.submissionForm.value)
        .subscribe(res => {
          this.carregando = false;
          this.enviando = false;

          if (res && res.temErro) {
            this.toastr.error(res.mensagem, 'Erro: ');
          } else {
            this.carregando = true;
            this.authService.refresh().subscribe((res: any) => {
              this.user = res.user;
              this.carregando = false;
            });

            this.toastr.success('Trabalho submetido com sucesso.', 'Sucesso');
            this.submissionForm.reset();
            this.filesDOC = null;
            this.filesPDF = null;
          }
        }, err => {
          this.enviando = false;
          this.toastr.error('Servidor momentaneamente inoperante.', 'Erro: ');
        });


    }
  }


  public uploadAdmin() {

    const usuarioLogado = this.authService.getUserLogado();

    if (!this.filesPDF) {
      this.toastr.error('É necessário selecionar o arquivo PDF', 'Atenção');
      return;
    } if (!this.filesDOC) {
      // tslint:disable-next-line: align
      this.toastr.error('É necessário selecionar o arquivo DOC', 'Atenção');
      return;
    } if (this.filesPDF[0].type.indexOf('pdf') === -1) {
      this.toastr.error('O arquivo Upload PDF precisa ser um PDF.', 'Atenção');
      //fileInput.value = '';
      return;
      // tslint:disable-next-line: align
    } /*if (this.filesDOC[0].type.indexOf('doc') === -1
      && this.filesDOC[0].type.indexOf('docx') === -1
      && this.filesDOC[0].type.indexOf('msword') === -1) {
      this.toastr.error('O arquivo Upload DOC precisa ser um DOC.', 'Atenção');
      return;
      // tslint:disable-next-line: align
    }*/ if (this.filesPDF[0].size > 2500 * 1027) {
      this.toastr.error('O arquivo PDF deve possuir no máximo 2MB', 'Atenção');
      return;
    } if (this.filesDOC[0].size > 2500 * 1027) {
      // tslint:disable-next-line: align
      this.toastr.error('O arquivo DOC deve possuir no máximo 2MB', 'Atenção');
      return;
      // tslint:disable-next-line: align
    } if (!this.submissionForm.value.axisId) {
      this.toastr.error('Selecione um eixo.', 'Atenção');
      return;
    } if (!this.submissionForm.value.modalityId) {
      // tslint:disable-next-line: align
      this.toastr.error('Selecione uma modalidade.', 'Atenção');
      return;
    } if (!this.submissionForm.value.title) {
      // tslint:disable-next-line: align
      this.toastr.error('Selecione o titulo do trabalho.', 'Atenção');
      return;
    } if (this.submissionForm.value.authors && !this.submissionForm.value.authors[0].email) {
      // tslint:disable-next-line: align
      this.toastr.error('Indique ao menos um autor do trabalho.', 'Atenção');
      return;
    } else {
      this.enviando = true;

      this.submissionForm.value.usuarioPrincipal = usuarioLogado.email;
      this.submissionForm.value.arquivoPDF = this.filesPDF[0];
      this.uploadService.submitWorkAdmin(this.filesDOC[0], this.filesPDF[0], 'trabalhos', this.user.document, this.submissionForm.value)
        .subscribe(res => {
          this.carregando = false;
          this.enviando = false;

          if (res && res.temErro) {
            this.toastr.error(res.mensagem, 'Erro: ');
          } else {
            this.carregando = true;
            this.authService.refresh().subscribe((res: any) => {
              this.user = res.user;
              this.carregando = false;
            });

            this.toastr.success('Trabalho submetido com sucesso.', 'Sucesso');
            this.submissionForm.reset();
            this.filesDOC = null;
            this.filesPDF = null;
          }
        }, err => {
          this.enviando = false;
          this.toastr.error('Servidor momentaneamente inoperante.', 'Erro: ');
        });


    }
  }

  public getFileNameDOC(): string {
    const fileName = this.filesDOC ? this.filesDOC[0].name : 'DOC/DOCX Sem Identificação';
    return fileName;
  }

  public getFileNamePDF(): string {
    const fileName = this.filesPDF ? this.filesPDF[0].name : 'PDF Com Identificação';
    return fileName;
  }

  public setFileNameDOC(files: FileList): void {
    this.filesDOC = files;
  }

  public setFileNamePDF(files: FileList): void {
    this.filesPDF = files;
  }

  private createFields() {
    return this.builder.group({
      email: [null]
    });
  }

  public addAuthors() {
    const authors = this.submissionForm.get('authors') as FormArray;
    if (this.submissionForm.value.modalityId === '5' && authors.controls.length < 12) {
      authors.push(this.createFields());
    } else if (this.submissionForm.value.modalityId !== '5' && authors.controls.length < 4) {
      authors.push(this.createFields());
    }
  }


  public receiverSelectedWork(work) {
    if (this.workSelect === work._id) {
      this.workSelect = null;
    } else {
      this.workSelect = work._id;
    }
  }


}
