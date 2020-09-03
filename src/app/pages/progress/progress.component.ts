import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [ './progress.component.css' ]
})
export class ProgressComponent {

  progreso1: number = 25;
  progreso2: number = 35;

  getPorsentaje1() {
    return `${this.progreso1}%`;
  }
  getPorsentaje2() {
    return `${this.progreso2}%`;
  }


}
