import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, UrlSegment, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ManagePathsService {

  constructor() { }

  /**
  * Get Path from current route
  * @param activatedRouteSnapshot: ActivatedRouteSnapshot object
  * @param removeSegments: Number of segments to remove from current route
  */
  getPath(activatedRouteSnapshot: ActivatedRouteSnapshot, removeSegments: number = 0) {
    let urlSegments: Array<UrlSegment> = [];
    activatedRouteSnapshot.pathFromRoot.forEach(routerState => {
        urlSegments = urlSegments.concat(routerState.url);
    });

    const url = urlSegments.map(urlSegment => {
        return urlSegment.path;
    });

    while (removeSegments > 0) {
      url.splice(url.length - 1, 1);
      removeSegments--;
    }

    return url.join('/');
  }

}
