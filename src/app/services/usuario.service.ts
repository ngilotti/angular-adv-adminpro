// Librerias de angular
import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

// Serv de desarrollo
import { environment } from '../../environments/environment';

// Interfaces
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-fomr.interface';
import { PerfilForm } from '../interfaces/perfil-fomr.interface';

// Modelos
import { Usuario } from '../models/usuario.model';



declare const gapi: any;
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZ: NgZone) {

    this.googleInit();
  }// end constructor



  get token(): string {
    return localStorage.getItem('token') || '';
  } // end get token


  get uid(): string {
    return this.usuario.uid || '';
  }



  googleInit() {

    return new Promise(resolve => {

      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '575192611056-rtv97pmo19npf3dk2ptkev7hrbn8mf5e.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
      });

      resolve();
    });

  } // end googleInit



  validarToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {

        const { nombre, apellido, dni, email, google, u_id, role, img = '' } = resp.usuario;

        this.usuario = new Usuario(nombre, apellido, dni, email, '', img, google, role, u_id);
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError(error => of(false))
    );

  } // end validarToken()



  crearUsuario( formData: RegisterForm) {

    console.log('Registrando usuario');

    return this.http.post(`${base_url}/usuarios`, formData)
                .pipe(
                  tap((resp: any) => {
                    localStorage.setItem('token', resp.token);
                  })
                );

  } // end crearUsuario



  actualizarPerfil(data: { nombre: string, apellido: string, email: string, dni: number, role: string}) {

    data = {
      ...data,
      role: this.usuario.role
    };

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    });

  } // end actualizarPerfil



  login( formData: LoginForm) {

    console.log('Logeando usuario');

    return this.http.post(`${base_url}/login`, formData)
                .pipe(
                  tap((resp: any) => {
                    localStorage.setItem('token', resp.token);
                  })
                );

  } // end login



  loginGoogle( token ) {

    return this.http.post(`${base_url}/login/google`, { token })
                .pipe(
                  tap((resp: any) => {
                    localStorage.setItem('token', resp.token);
                  })
                );

  } // end login



  logout() {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {

      this.ngZ.run(() => {
        this.router.navigateByUrl('/login');
      });
    });

  } // end logout

}
