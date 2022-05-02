import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss']
})
export class WorksComponent implements OnInit, OnDestroy {

  public works = [];
  public workSelect: string;
  private worksUnsub$ = new Subject();
  private user: any;

  constructor(
    private authService: AuthService,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.retrieveUser();
  }

  private retrieveUser() {

    this.user = this.authService.getDecodedAccessToken(this.authService.getToken());
    const id = this.user.coordinator ? this.user.coordinator : this.user._id;
    this.listWorks(id);

  }

  ngOnDestroy() {
    this.worksUnsub$.next();
    this.worksUnsub$.complete();
  }

  private listWorks(id) {
    this.adminService.retrieveAllWorks(id)
      .pipe(
        takeUntil(this.worksUnsub$)
      )
      .subscribe(works => {
        this.works = works;
      });
  }

  public receiverSelectedWork(work) {
    if (this.workSelect === work._id) {
      this.workSelect = null;
    } else {
      this.workSelect = work._id;
    }
  }
}
