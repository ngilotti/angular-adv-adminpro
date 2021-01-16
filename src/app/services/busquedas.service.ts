// Librerias de angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Librerias de terceros
import { map } from 'rxjs/operators';

// Servidor de desarrollo
import { environment } from '../../environments/environment';

// Modelos
import { Usuario } from '../models/usuario.model';



const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})


export class BusquedasService {

  constructor( private http: HttpClient) { }




  get token(): string {
    return localStorage.getItem('token') || '';
  } // end get token



  get headers() {
    return {
      headers: {
      'x-token': this.token
      }
    };
  } // get headers



  private transformarUsuarios(resultados: any[]): Usuario[] {

    return resultados.map(
      user => new Usuario(user.nombre, user.apellido, user.dni, user.email, '', user.img, user.google, user.role, user.uid)
    );

  } // end transformarUsuarios


  buscar ( tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string) {

    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers )
            .pipe(
              map( (resp: any) => {
                switch (tipo) {
                  case 'usuarios':
                    return this.transformarUsuarios(resp.resultados);

                  default:
                    return [];
                }
              })
            );
  }

} // end services
