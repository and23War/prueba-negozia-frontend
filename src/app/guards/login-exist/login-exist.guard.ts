import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

/*Utils*/
import { StorageService } from '@util/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginExistGuard implements CanActivate {

  constructor(private storage: StorageService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.evaluateLogInExist(next);
  }

  private async evaluateLogInExist(route: ActivatedRouteSnapshot) {
    const token = this.storage.getToken();
    const loginExist = token != null;
    const response = true;

    switch (route.data.caseLoginExist) {
      case 1:
        if (!loginExist) {
          this.goToLogIn();
        }
        break;
      case 2:
        if (loginExist) {
          this.goToHome();
        }
        break;
      default:
        break;
    }
      return await response;
  }

  goToLogIn() {
    this.router.navigate(['login']);
  }

  goToHome() {
    this.router.navigate(['']);
  }

}
