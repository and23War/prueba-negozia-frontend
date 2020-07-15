import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

/**
*Services
*/
import {ReactiveRedirectService} from '@util/reactive-redirect/reactive-redirect.service';

@Component({
  selector: 'app-reactive-redirect',
  templateUrl: './reactive-redirect.component.html',
  styleUrls: ['./reactive-redirect.component.sass'],
})
export class ReactiveRedirectComponent implements OnInit, OnDestroy {

  /** Local configuration component **/
  localConfig: any = {loaded: false, title: ''};

  /**
  * Navigation subscription
  */
  navigationSubscription;

  /**
  * Target route
  */
  targetRouteSubscription;

  /**
  * Current route
  */
  currentRoute = '';

  constructor(private router: Router, private reactiveRedirectService: ReactiveRedirectService) { }

  /**
  *  Run when component loads
  */
  ngOnInit() {
    this.impartialCalls();
    this.partialCalls()
      .then(() => {
        this.localConfig.loaded = true;
      });
  }

  /**
  * Run when component is destroy
  */
  ngOnDestroy() {
    this.endListenRoutes();
  }

  /**
  * Impartial events
  */
  private impartialCalls() {
    this.initListenRoutes();
  }

  /**
  * Partials events
  */
  private partialCalls(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      resolve(true);
    });
  }

  /**
  * Start listen change route
  */
  private initListenRoutes() {
    this.targetRouteSubscription = this.reactiveRedirectService.targetRoute.subscribe(newRoute => {
      this.currentRoute = newRoute;
    });

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd && e.url.search('reactive-redirect') !== -1) {
        this.router.navigate([this.currentRoute]);
      }
    });
  }

  /**
  * Destroy listening route
  */
  private endListenRoutes() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }

    if (this.targetRouteSubscription) {
      this.targetRouteSubscription.unsubscribe();
    }
  }
}
