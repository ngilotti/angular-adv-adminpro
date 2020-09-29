import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public usuario: Usuario;


  constructor(private uServ: UsuarioService) {
    this.usuario = uServ.usuario;
  } // end constructor



   logout() {
    this.uServ.logout();
  } // end logout

} // end Class
