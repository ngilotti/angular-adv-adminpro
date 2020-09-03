import { Component, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

  @Input('title') tituloGraf: string = "Sin titulo";
  @Input('labels') doughnutChartLabels: Label[] = ['label 1', 'label 2', 'label 3'];
  @Input('data') doughnutChartData: MultiDataSet = [[ 350, 350, 350] ];

// Doughnut

public doughnutChartType: ChartType = 'doughnut';

// arreglo de colores para cada grafica
public colors: Color[] = [
  { backgroundColor: ['#008000', '#009FEE', '#6857E6', '#FF00FF', '#525152', '#FC4300', '#800000'] }
];
}
