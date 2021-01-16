import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[] = [
    {
      title: 'Principal',
      icon: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '' },
        {  titulo: 'Grafica', url: 'grafica1' },
        { titulo: 'Progres', url: 'progress' },
        { titulo: 'Promesas', url: 'promesas' },
        { titulo: 'rxjs', url: 'rxjs' }
      ]
    },
    {
      title: 'Mantenimiento',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: 'usuarios' },
        { titulo: 'Medicos', url: 'medicos' },
        { titulo: 'Hospitales', url: 'hospitales' },
      ]
    }
  ];

  constructor() { }
}
