import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

/* Services */
import { StorageService } from '@util/storage/storage.service';

export class Service {

  constructor() {

  }

  /**
  * Validate token on error triggered
  * @param error: Erro object
  * @param router: Router object
  * @param storageService: Storage service
  */
  private static validateToken(error: any, router: Router, storageService: StorageService) {
    const bodyError = JSON.parse(error._body);
    if (error.status === 401 && bodyError.error === 1) {
      Service.closeSession(router, storageService, bodyError.msg);
    }
  }

  /**
  * Close user session
  * @param error: Erro object
  * @param router: Router object
  * @param storageService: Storage service
  */
  private static closeSession(router: Router, storageService: StorageService, msg: string) {
    const response = storageService.cleanStorage();
    storageService.setSkyMsg(msg);
    if (response) {
      router.navigate(['login', {'token-exp': true}]);
    }
  }

  /**
  * Extract data response
  * @param res: Response object
  */
  protected extractData(res: any) {
    const response = res.json();
    return  response || { };
  }

  /**
  * Handle or error
  * @param error: Erro object
  * @param router: Router object
  * @param storageService: Storage service
  */
  protected handleError(error: any, router: Router, storageService: StorageService) {
    console.error('Ha ocurrido un error', error);
    Service.validateToken(error, router, storageService);
    return Promise.reject(error.message || error);
  }

}
