import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnDestroy {
  intervalSubscription!: Subscription;

  constructor() {
    // this.returnAnObservable()
    //   .pipe(retry(1))
    //   .subscribe(
    //     (value) => console.log('Subs: ', value),
    //     (error) => console.warn('Subs: ', error),
    //     () => console.info('Observable terminado') // Este es el complete()
    //   );
    this.intervalSubscription = this.returnAnInterval().subscribe(console.log); // Esto es lo mismo .subscribe(value => console.log(value))
  }
  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }

  returnAnInterval(): Observable<number> {
    return interval(500).pipe(
      // take(10), // imprime de 2 - 10
      map((value) => value + 1),
      filter((value) => value % 2 === 0),
      take(10) // imprime de 2 - 20
    );
  }

  returnAnObservable(): Observable<number> {
    let i = -1;
    return new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 2) {
          console.log('Error debe dispararse, i igual a 2');
          observer.error('i llego al valor de 2');
        }
      }, 1000);
    });
  }
}
