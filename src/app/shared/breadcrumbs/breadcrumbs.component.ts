import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{

  public titulo: string = '';
  public tituloSubs$: Subscription;

  constructor( private router: Router, private route: ActivatedRoute) {

    this.tituloSubs$ = this.getDataRuta().subscribe( ({title}) => {
                                                        this.titulo = title;
                                                        document.title = `AdminPro - ${title}`;
                                                      });
  }

  getDataRuta() {

    return this.router.events.pipe(
      filter( event => event instanceof ActivationEnd),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
      map( (event: ActivationEnd) => event.snapshot.data),
    );

  } // end getDataRuta()

  ngOnDestroy() {
    this.tituloSubs$.unsubscribe();
  } // end onDestroy()

} // end class
