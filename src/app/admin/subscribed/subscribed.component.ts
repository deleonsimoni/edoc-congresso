import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DownloadFileService } from 'src/app/services/download-file.service';
import { AdminService } from '../admin.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver'
import { PageEvent } from '@angular/material';
import { CategoryPaymentPipe } from 'src/app/pipes/category-payment.pipe';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-subscribed',
  templateUrl: './subscribed.component.html',
  styleUrls: ['./subscribed.component.scss']
})
export class SubscribedComponent implements OnInit {

  public user: any = {};
  public users = [];
  public works = [];
  public allUsers = [];
  public infos = false;
  public carregandoTrabalhos = false;
  public status: string;
  public carregando = false;
  public userSelect: number;
  public metrics: {};
  public gerandoRelatorio = false;
  public page;
  public pager: any = {};
  public search: any = {};
  public pageEvent: any;
  public textSearch;
  public filterCategory = new CategoryPaymentPipe();

  constructor(
    private authService: AuthService,
    private downloadService: DownloadFileService,
    private adminService: AdminService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.retrieveUser();
  }

  private retrieveUser() {
    this.user = this.authService.getDecodedAccessToken(this.authService.getToken());

    if (this.user && !this.user.icAdmin) {
      this.retrieveWorks(this.user.coordinator || this.user.reviewer)
        .subscribe(res => {
          //console.log(res);
        });
    } else {
      this.retrieveAdminData(null);
    }

  }

  private retrieveWorks(id): Observable<any> {
    return this.adminService.retrieveAllWorks(id)
      .pipe(
        map(res => res)
      );
  }

  public retrieveAdminData(event) {

    let user: any = {};

    if (this.textSearch && !this.textSearch.includes("@")) {
      let documentSearch = this.textSearch.replace(/[\W_]+/g, '');
      if (documentSearch.length < 4) {
        this.toastr.warning('Digite mais caracteres para efetuar a busca', 'Atenção');
      } else {
        this.search = { 'document': { $regex: documentSearch + '$' } };
      }

    } else if (this.textSearch) {
      this.search = { 'email': this.textSearch.trim() };

    }

    if (this.status) {
      switch (Number(this.status)) {
        case 0:
          this.search = { 'payment': { $eq: null } };
          break;
        case 1:
          this.search = {
            'payment': { $ne: null }, 'payment.icPaid': false, 'payment.icValid': { $eq: null }, '$or': [{ 'payment.pathS3': { $ne: null } }, { 'payment.pathReceiptPayment': { $ne: null } }]
          }
          break;
        case 2:
          //this.search = { 'payment.pathS3': { $ne: null }, 'payment.icPaid': false };
          this.search = { 'payment': { $ne: null }, '$and': [{ 'payment.pathReceiptPayment': { $ne: '' } }, { 'payment.pathReceiptPayment': { $ne: null } }], 'payment.icValid': true, 'payment.icPaid': false }
          break;
        case 3:
          this.search = { 'pcdId': { $ne: null } };
          break;
        case 4:
          this.search = { 'works.0': { $exists: true } };
          break;
        case 6:
          this.search = { 'payment.icPaid': true };
          break;
        case 7:
          this.search = { 'payment.icPaid': { $exists: false } };
          break;
        case 5:
          this.search = {};
          break;
      }
    }

    this.adminService.retrieveUsers(event && event.pageIndex + 1 || 1, encodeURIComponent(JSON.stringify(this.search)))
      .subscribe((res: any) => {
        this.users = res.usersFound;
        this.pager = res.pager;
      });
  }

  public receiverSelectedUser(user) {
    if (this.userSelect === user._id) {
      this.userSelect = null;
    } else {
      this.userSelect = user._id;
      if (user.works) {
        this.userWorks(user.works);
      }
    }
  }

  public clearEmail() {
    delete this.textSearch;
  }

  public clearStatus() {
    delete this.status;
    if (!this.textSearch) delete this.textSearch

  }

  public retrieveMetrics() {
    this.adminService.recoverMetrics()
      .subscribe(metrics => this.metrics = metrics, err => console.log(err));
  }

  public userWorks(userWorksId) {
    this.works = [];
    this.carregandoTrabalhos = true;

    if (userWorksId) {
      userWorksId.forEach(workId => {
        this.adminService.retrieveUserWorks(workId)
          .subscribe((res: any) => {
            this.carregandoTrabalhos = false;
            this.works.push(res);
          }, err => {
            this.carregandoTrabalhos = false;
            console.log(err);
          });
      });
    }

  }

  public download(nameFile) {
    const vm = this;
    function sucessoDownload() {
      vm.carregando = false;
    }
    function falhaDownload(err) {
      this.toastr.error('Erro ao relizar download.', 'Erro: ');
      vm.carregando = false;
    }
    this.carregando = true;
    this.downloadService.getFile(nameFile, sucessoDownload, falhaDownload);
  }

  public searchUser() {
    if (this.search !== undefined && this.search !== '') {
      this.users = this.allUsers.filter(user => (user.document.match(this.search) || user.fullname.toLowerCase().match(this.search)));
    } else {
      this.users = this.allUsers;
    }
  }

  public filtrarStatus() {

    switch (Number(this.status)) {
      case 0:
        this.users = this.allUsers.filter(user => !user.payment);
        break;
      case 1:
        this.users = this.allUsers.filter(user => user.payment && (user.payment.pathS3 || user.payment.pathReceiptPayment)
          && (!user.payment.icValid || user.payment.icValid === false)
          && user.payment.icPaid === false);
        break;
      case 2:
        this.users = this.allUsers.filter(user => user.payment && user.payment.pathReceiptPayment
          && user.payment.icValid === true
          && user.payment.icPaid === false);
        break;
      case 3:
        this.users = this.allUsers.filter(user => user.isPCD);
        break;
      case 4:
        this.users = this.allUsers.filter(user => user.works.length > 0);
        break;
      case 5:
        this.users = this.allUsers.filter(user => user.payment && user.payment.icPaid === true);
        break;
      default:
        this.users = this.allUsers;
        break;
    }
  }

  public gerarRelatorio() {
    this.gerandoRelatorio = true;

    this.adminService.generateReport()
      .subscribe((res: any) => {

        let fileName = '';

        res = res.map(obj => ({ ...obj, categoryId: obj.payment.categoryId }))

        res = res.reduce(function (rv, x) {
          (rv[x['categoryId']] = rv[x['categoryId']] || []).push(x);
          return rv;
        }, {});

        for (var key in res) {
          switch (Number(key)) {
            case 1:
              fileName = 'Estudantes de curso Normal/EM.csv'
              break;
            case 2:
              fileName = 'Estudantes de Graduação.csv'
              break;
            case 3:
              fileName = 'Estudantes de Pós-Graduação.csv'
              break;
            case 4:
              fileName = 'Profissionais da Educação Básica.csv'
              break;
            case 5:
              fileName = 'Profissionais da Educação Superior.csv'
              break;

            default:
              break;
          }

          this.exportUserToCSV(res[Number(key)], fileName);


        }

        this.gerandoRelatorio = false;

      });
  }

  public exportUserToCSV(data, fileName) {
    try {

      const dataExport: any = data.map(user => {
        return {
          nome: user.fullname,
          email: user.email,
          documento: user.document,
          estrangeiro: user.icForeign ? 'S' : 'N'
          /*     categoria: this.filterCategory.transform(user.categoryId)*/
        }
      });


      const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
      const header = Object.keys(dataExport[0]);
      let csv = dataExport.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(';'));
      csv.unshift(header.join(';'));
      let csvArray = csv.join('\r\n');

      var a = document.createElement('a');
      var blob = new Blob([csvArray], { type: 'text/csv' }),
        url = window.URL.createObjectURL(blob);

      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
      this.gerandoRelatorio = false;
    } catch (error) {

      this.gerandoRelatorio = false;

    }


  }


  public updateUser(event) {
    if (event === true) {
      this.retrieveUser();
    }
  }

}
