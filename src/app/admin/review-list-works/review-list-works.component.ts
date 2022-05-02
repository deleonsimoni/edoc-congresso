import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';
import { MatDialog } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { ReviewService } from 'src/app/services/review.service';
import { DownloadFileService } from 'src/app/services/download-file.service';
import { ModalReviewAdminComponent } from '../modals/modal-review-admin/modal-review-admin.component';
import { ModalReviewReviewerComponent } from '../modals/modal-review-reviewer/modal-review-reviewer.component';

@Component({
  selector: 'app-review-list-works',
  templateUrl: './review-list-works.component.html',
  styleUrls: ['./review-list-works.component.scss']
})
export class ReviewListWorksComponent implements OnInit {

  public works = [];
  public user;
  public workSelect;
  public status;
  public allWorks = [];
  public carregando = false;

  constructor(
    private dialog: MatDialog,
    private adminService: AdminService,
    private downloadService: DownloadFileService,
    private reviewService: ReviewService,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.retrieveUser();
  }

  retrieveUser() {
    this.user = this.authService.getDecodedAccessToken(this.authService.getToken());
    if (this.user.reviewer) {
      this.loadData();
    }
  }

  loadData() {
    this.carregando = true;
    this.reviewService.retrieveAllWorks()
      .subscribe(res => {
        this.carregando = false;
        if (res.temErro) {
          this.toastr.error('Erro', res);
        } else {
          this.carregando = false;
          this.allWorks = res;
          this.works = this.allWorks
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

  public openReviewForm(work) {

    const dialogRef = this.dialog.open(ModalReviewReviewerComponent, {
      data: { work: work }
    });

    dialogRef.afterClosed().subscribe(() => this.loadData());

  }

}
