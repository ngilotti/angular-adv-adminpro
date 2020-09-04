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
        {
          titulo: 'Main', url: ''
        },
        {
          titulo: 'Progres', url: 'progress'
        },
        {
          titulo: 'Grafica', url: 'grafica1'
        }
      ]
    }
  ];

  constructor() { }
}
