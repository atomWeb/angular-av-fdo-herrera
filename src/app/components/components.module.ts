import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { AdderComponent } from './adder/adder.component';
import { FormsModule } from '@angular/forms';
import { DonutComponent } from './donut/donut.component';



@NgModule({
  declarations: [
    AdderComponent,
    DonutComponent
  ],
  exports:[
    AdderComponent,
    DonutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }
