import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-loader',
  templateUrl: './simple-loader.component.html',
  styleUrls: ['./simple-loader.component.sass']
})
export class SimpleLoaderComponent implements OnInit {

  /** Local configuration component **/
  localConfig: any = { loaded: false, title: '' };

  constructor() { }

  /************************** START MAIN **************************/

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
  * Impartial events
  */
  private impartialCalls() {}

  /**
  * Partials events
  */
  private partialCalls(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      resolve(true);
    });
  }

  /**
  *  Evaluate status of response web services
  * @param error: Error of response
  */
  private evaluateError(error) {
    console.log(error);
  }

  /************************** END MAIN **************************/

  /************************** START INIT COMPONENT **************************/

  /************************** END INIT COMPONENT **************************/

  /************************** START ACTIONS LOGIC **************************/

  /************************** END ACTIONS LOGIC **************************/

  /************************** START COMMUNICATION DUCTS **************************/

  /************************** END COMMUNICATION DUCTS **************************/

}
