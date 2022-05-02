import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { UploadService } from '../services/upload.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent implements OnInit {

  public paymentForm: FormGroup;
  public idCategoria: number;
  public valorTotal: string;
  public carregando = true;
  public enviando = false;

  public categorias = [
    { id: 1, name: 'Estudantes de Graduação e pós-graduação com comprovação', price: '40,00' },
    { id: 2, name: 'Professores e demais profissionais da Educação Básica	', price: '80,00' },
    { id: 3, name: 'Docentes de Educação Superior', price: '120,00' }
  ];

  private filesPDF: FileList;
  public user: any;

  constructor(
    private builder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private toastr: ToastrService,
    private uploadService: UploadService

  ) {

    this.paymentForm = this.builder.group({
      categoryId: [null]
    });

    this.user = this.authService.getDecodedAccessToken(this.authService.getToken());

  }

  ngOnInit() {
    this.authService.refresh().subscribe((res: any) => {
      this.user = res.user;
      this.carregando = false;
    });
  }


  public showUpload() {
    return this.paymentForm.value.categoryId && (this.paymentForm.value.categoryId < 5);
  }

  public retrieveCategories(id) {
    return this.categorias.filter(element => element.id === id)[0];
  }

}
