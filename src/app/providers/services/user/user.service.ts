import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { AppSettings } from '@app/app-settings';
import { LocalStorageService } from 'ngx-webstorage';

/* Models */
import { User } from '@model/User';
import { IResponse } from '@app/interfaces/IResponse';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  /**
   * Get token value
   */
  get token(): string {
    return this.localStorageService.retrieve('token');
  }

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

  /**
   * Get all `PhoneType` records
   */
  getAll(): Promise<IResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let params: HttpParams = new HttpParams();
    const options = { headers: headers, params: params };

    return this.http
      .get(AppSettings.URL_API + '/private/user', options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Update `User` record
   * @param user: `User` record
   */
  update(user: User): Promise<object> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };

    const body = user;

    return this.http
      .put(AppSettings.URL_API + '/private/user/' + user._id, body, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Get `User` record by identifier
   * @param userId: Identifier `User` record
   * @param user: User object
   * @param populates: Array of populate values
   */
  getById(userId: string, user: object = {}, populates: Array<string> = []): Promise<object> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let params: HttpParams = new HttpParams();
    params = params.set('user', JSON.stringify(user));
    params = params.set('populates', populates.join(','));
    const options = { headers: headers, params: params };

    return this.http
      .get(AppSettings.URL_API + '/private/user/' + userId, options)
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
