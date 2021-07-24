import { Component, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: [],
})
export class DonutComponent {

  constructor() {}

  @Input()
  title: string = ""

  // Doughnut
  @Input('labels')
  public doughnutChartLabels: Label[] = [
    'Label1',
    'Lable2',
    'Label3',
  ];

  @Input('data')
  public doughnutChartData: MultiDataSet = [[350, 450, 100]];

  public doughnutChartType: ChartType = 'doughnut';
  public colors: Color[] = [
    { backgroundColor: ['#6857e6', '#009fee', '#f02059'] },
  ];

}
