import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReactiveRedirectService {

  /**
  * Targer route
  */
  targetRoute: Subject<string> = new Subject<string>();

  constructor(private router: Router) {
  }

  /**
  * Change route
  * @param route: Route value
  */
  changeRoute(route: string) {
    this.targetRoute.next(route);
  }

}
