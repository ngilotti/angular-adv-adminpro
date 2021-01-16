// Modulos de Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Modulos de terceros
import { ChartsModule } from 'ng2-charts';

// Components
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonaComponent } from './dona/dona.component';
import { ModalImgComponent } from './modal-img/modal-img.component';

@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    ModalImgComponent
  ],
  exports: [
    IncrementadorComponent,
    DonaComponent,
    ModalImgComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }
