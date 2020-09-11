import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy{

  public intervalSubs: Subscription;

  constructor() {

    // this.retornaObservable().pipe(
    //   retry(2)
    // ).subscribe(
    //   (valor) => {console.log('subs:', valor)},
    //   (error) =>  {console.warn('Error', error)},
    //   () => console.info('Observable completado')
    // );

    this.intervalSubs = this.retonraIntervalo().subscribe( console.log );


  }// end constructor()


  retonraIntervalo(): Observable<number> {

    return interval(200)
            .pipe(
              // take(10),
              map( valor => valor + 1 ), // 0 => 1
              filter( valor => ( valor % 2 === 0) ? true : false )
            );

  }// end retornaIntervalo()

  retornaObservable() {
    let i = -1;

    return new Observable<number>( (observer) => {

      const intervalo = setInterval( () => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }// end if()

        if (i === 2){
          observer.error('i llego al valor de 2');
        }// end if()

      }, 1000); // end setIntervalo()

    }); // end observable

  }// end retornaObservable()

  ngOnDestroy() {
    this.intervalSubs.unsubscribe();
  } // end ngOnDestroy()

}// end class
