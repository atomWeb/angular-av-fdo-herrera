import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-adder',
  templateUrl: './adder.component.html',
  styles: [],
})
export class AdderComponent implements OnInit {
  ngOnInit(): void {
    this.adderBtnClass = `btn ${this.adderBtnClass}`;
  }

  @Input() // Para crear un alias: @Input('valor')
  progress: number = 50;

  @Input()
  adderBtnClass: string = 'btn-primary';

  @Output()
  outputValue: EventEmitter<number> = new EventEmitter();

  // get getProgress(): string {
  //   return `${this.progress}%`;
  // }
  setProgressValue(value: number): void {
    if (this.progress >= 100 && value >= 0) {
      this.outputValue.emit(100);
      this.progress = 100;
      return;
    }
    if (this.progress <= 0 && value < 0) {
      this.outputValue.emit(0);
      this.progress = 0;
      return;
    }

    this.progress = this.progress + value;
    this.outputValue.emit(this.progress);
  }

  onChange(newValue: number): void {
    if (newValue >= 100) {
      this.progress = 100;
    } else if (newValue <= 0) {
      this.progress = 0;
    } else {
      this.progress = newValue;
    }
    this.outputValue.emit(this.progress);
  }
}
