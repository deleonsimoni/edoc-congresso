import { Component, OnInit, ViewChild, Renderer2 } from "@angular/core";
import $ from "jquery";
import { BreakpointObserver } from "@angular/cdk/layout";
import { AccordionComponent } from "ngx-bootstrap/accordion";
import { AccordionPanelComponent } from "ngx-bootstrap/accordion";
import { AuthService } from "./services/auth.service";
import { ShareDataService } from "./services/share-data.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { trigger, style, animate, transition } from "@angular/animations";
import { ModalConferencistasComponent } from "./modal-conferencistas/modal-conferencistas.component";
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [
    trigger("fade", [
      transition("void => *", [
        style({ opacity: 0 }),
        animate(3000, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  @ViewChild("accordion", { static: false }) accordion: AccordionPanelComponent;

  title = "endipe";
  isMobile: boolean;
  public isAuth = false;
  public user: any;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private share: ShareDataService,
    private toastr: ToastrService,
    private rota: Router,
    private renderer: Renderer2,
    private auth: AuthService,
    private dialog: MatDialog
  ) {
    this.breakpointObserver.observe(["(max-width: 992px)"]).subscribe((res) => {
      this.isMobile = res.matches;
    });
  }

  ngOnInit() {
    const token = this.authService.getToken();
    if (token) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }

    this.user = this.auth.getDecodedAccessToken(this.auth.getToken());
    this.verifyUser();
    let refrescou = JSON.parse(localStorage.getItem("refrescou"));
    if (!refrescou) {
      localStorage.setItem("refrescou", "1");
      window.location.reload(true);
    }

    /*
        setTimeout(() => {
          const splashScreen: HTMLElement = document.getElementById('custom-overlay');
          const menu: HTMLElement = document.getElementById('menu');
    
          if (splashScreen) {
            menu.removeAttribute("style");
            splashScreen.remove();
          }
        }, 4000);
    */
  }

  verifyUser() {
    this.share.shareData.subscribe((data) => {
      if (data) {
        this.isAuth = true;
      }
    });
  }

  public openConferencistasModal() {
    this.dialog.open(ModalConferencistasComponent);
  }

  logout() {
    this.authService.logout();
    this.isAuth = false;
    this.toastr.success("Esperamos que você volte logo.", "Sucesso");
    this.rota.navigate(["/home"]);
  }

  public verifyAcess() {
    if (this.user && (this.user.icAdmin || this.user.coordinator || this.user.reviewer || this.user.icEditor)) {
      return true;
    } else {
      return false;
    }
  }

  get userName(): string {
    return this.user && this.user.fullname
      ? this.user.fullname.split(" ")[0]
      : "";
  }

  expandMenu(event, classe) {
    if (event.keyCode === 40 || event.keyCode === 32 || event.keyCode === 13) {
      var element = document.getElementsByClassName(classe)[0];
      const hasClass = element.classList.contains('hover');
      if (hasClass) {
        this.renderer.removeClass(element, 'hover');
        this.renderer.setStyle(element, 'display', 'none');

      } else {
        this.renderer.addClass(element, 'hover');
        this.renderer.setStyle(element, 'display', 'block');

      }
    }
  }




}
