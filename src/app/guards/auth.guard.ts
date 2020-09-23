// Librerias de Angular
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { tap } from 'rxjs/operators';

// Services
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private uServ: UsuarioService,
              private router: Router) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      return this.uServ.validarToken()
      .pipe(
        tap( isAuth => {

          if (!isAuth) {
            this.router.navigateByUrl('/login');
          }

        })
      );

  } // end canActivate

}
