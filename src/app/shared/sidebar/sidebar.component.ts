import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];

  public usuario: Usuario;


  constructor(private sidebarService: SidebarService, private uServ: UsuarioService) {

    this.menuItems = sidebarService.menu;
    // console.log(this.menuItems);

    this.usuario = uServ.usuario;

  }


  ngOnInit(): void {
  }


}
