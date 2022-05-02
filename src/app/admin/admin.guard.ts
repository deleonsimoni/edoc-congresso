import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    /*
        const url = state.url.split('/')[2];
        const user = this.authService.getDecodedAccessToken(this.authService.getToken());
    
        if (user) {
    
          if (user.icAdmin) {
            if (url === 'trabalhos') {
              this.router.navigate(['admin/inscritos']);
              return false;
            }
    
            return true;
          } else if (user.coordinator || user.reviewer) {
            if (url === 'inscritos' || url === 'noticias' || url === 'coordenadores') {
              this.router.navigate(['admin/trabalhos']);
              return false;
            }
    
            return true;
          } else {
            this.router.navigate(['home']);
            return true;
          }
    
        }
    
        this.router.navigate(['home']);*/
    return true;
  }

}
