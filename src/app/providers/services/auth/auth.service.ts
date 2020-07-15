import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppSettings } from '@app/app-settings';

/* Models */
import { User } from '@model/User';

/**
 * Interfaces
 */
import { IResponse } from '@app/interfaces/IResponse';

/**
 * Utils
 */
import { StorageService } from '@app/providers/utils/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Get token value
   */
  get token(): string {
    return this.storageService.getToken();
  }

  constructor(private http: HttpClient, private storageService: StorageService, private router: Router) {}

  /**
   * Get all `Resources` records
   * @param email: Email of `Sections` relationship
   * @param password: Password of `Sections` relationship
   */
  login(email: string, password: string): Promise<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };

    const body = { email, password };

    return this.http
      .post(AppSettings.URL_API + '/auth/login', body, options)
      .toPromise()
      .then(this.extractData)
      .catch((error) => this.handleError(error));
  }

  /**
   * Register auth user
   * @param user: `User` record
   */
  async register(user: User): Promise<IResponse> {
    try {
      const body = { user };
      const response: IResponse = await this.http.post(AppSettings.URL_API + '/auth/register', body).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Log out session
   */
  logout(): void {
    const response = this.storageService.cleanStorage();
    if (response) {
      this.router.navigate(['login']);
    }
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
