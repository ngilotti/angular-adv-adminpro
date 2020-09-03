import { Component } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public labelGraf1: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  public dataGraf = [ [250, 250, 1000, 400, 500, 150, 80]
  ];

}
