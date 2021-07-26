import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Data, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/internal/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnDestroy {
  title!: string;
  titleSubs$!: Subscription;

  constructor(private router: Router) {
    this.titleSubs$ = this.getRouterPathArgs()
      .subscribe(({ title }) => {
        this.title = title;
        document.title = `AdminPro - ${this.title}`;
      });
  }

  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }

  getRouterPathArgs(): Observable<Data> {
    return this.router.events.pipe(
      filter((event): event is ActivationEnd => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
}
