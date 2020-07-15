import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ManageGlobalCreationsService {

  /* Target creation */
  targetCreation: Subject<string> = new Subject<string>();

  /* New project */
  newProject: Subject<object> = new Subject<object>();

  /* New resource */
  newResource: Subject<object> = new Subject<object>();

  /* New unit price */
  newUnitPrice: Subject<object> = new Subject<object>();

  constructor() { }

  /**
  * Trigger creation
  * @param slug: Slug of class
  */
  triggerCreation(_class: string) {
    this.targetCreation.next(_class);
  }

  /**
  * Senc new creation
  * @param slug: Slug `GlobalCreations` record
  * @param newRecord: New record
  */
  sentNewCreation(slug: string, newRecord: object) {
    newRecord = Object.assign({}, newRecord);
    switch (slug) {
      case 'create-resource':
        this.newResource.next(newRecord);
        break;
      case 'create-unit-price':
        this.newUnitPrice.next(newRecord);
        break;
      case 'create-project':
        this.newProject.next(newRecord);
        break;
    }
  }

}
