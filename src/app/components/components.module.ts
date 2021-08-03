import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { AdderComponent } from './adder/adder.component';
import { FormsModule } from '@angular/forms';
import { DonutComponent } from './donut/donut.component';
import { ModalImagesComponent } from './modal-images/modal-images.component';



@NgModule({
  declarations: [
    AdderComponent,
    DonutComponent,
    ModalImagesComponent
  ],
  exports:[
    AdderComponent,
    DonutComponent,
    ModalImagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }
