import { environment } from '../environments/environment';

export class AppSettings {
  /**
   * Get enviroment of api
   */
  public static get URL_API() {
    return environment.backendUrl;
  }

  /**
   * Get prefix of company
   */
  public static get PREFIX() {
    return environment.prefix;
  }
}
