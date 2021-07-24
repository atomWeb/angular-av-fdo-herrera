import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component {
  constructor() {}

  graph1Title: string = 'Sales';
  graph2Title: string = 'Buys';
  graph3Title: string = 'Titulo3';
  graph4Title: string = 'Titulo4';

  graph1ChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  graph2ChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  // graph3ChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  graph4ChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];

  graph1Data = [[350, 450, 100]];
  graph2Data = [[540, 45, 130]];
  graph3Data = [[305, 405, 90]];
  graph4Data = [[350, 450, 80]];

}
