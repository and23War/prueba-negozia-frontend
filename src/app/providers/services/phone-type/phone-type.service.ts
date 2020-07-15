import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { AppSettings } from '@app/app-settings';
import { IResponse } from '@interface/IResponse';

@Injectable({
  providedIn: 'root',
})
export class PhoneTypeService {
  constructor(private http: HttpClient) {}

  /**
   * Get all `PhoneType` records
   */
  getAll(): Promise<IResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params: HttpParams = new HttpParams();
    const options = { headers: headers, params: params };

    return this.http
      .get(AppSettings.URL_API + '/phoneType', options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Extract data of response
   * @param res: Response object
   */
  private extractData(res: HttpResponse<any>) {
    const response = res;
    return response || {};
  }

  /**
   * Handle error of response
   * @param error: Error object
   */
  private handleError(error: any) {
    console.error('Ha ocurrido un error', error);
    return Promise.reject(error);
  }
}
