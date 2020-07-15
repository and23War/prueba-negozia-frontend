import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '@app/app-settings';

/**
 * Utils
 */
import { StorageService } from '@app/providers/utils/storage/storage.service';
import { IHeaders } from '@app/interfaces/IHeaders';

@Injectable({
  providedIn: 'root',
})
export class HeadersInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headerList: IHeaders = {};
    this.preparePublicHeaderList(headerList);
    this.preparePrivateHeaderList(headerList);
    this.prepareMethodHeaderList(request.method, headerList);

    const newRequest = request.clone({
      headers: new HttpHeaders(headerList),
    });
    return next.handle(newRequest);
  }

  /**
   * Prepare public header list
   * @param headerList: Header list
   */
  private preparePublicHeaderList(headerList: IHeaders): void {
    headerList[`${AppSettings.PREFIX}Client-Date`] = new Date().toString();
  }

  /**
   * Prepare private header list
   * @param headerList: Header list
   */
  private preparePrivateHeaderList(headerList: IHeaders): void {
    const token = this.storageService.getToken();
    if (token) {
      headerList[`${AppSettings.PREFIX}Authorization`] = token;
    }
  }

  /**
   * Prepare post/put/patch header list
   * @param method: Method of Request
   * @param headerList: Header list
   */
  private prepareMethodHeaderList(method: string, headerList: IHeaders): void {
    switch (method) {
      case 'POST':
        headerList['Content-Type'] = 'application/json';
        break;
      case 'PUT':
        headerList['Content-Type'] = 'application/json';
        break;
    }
  }
}
