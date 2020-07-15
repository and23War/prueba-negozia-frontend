import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageUpSideNavService {

  /* Target section actions */
  targetSectionAction: Subject<string> = new Subject<string>();

  /* Change enable section actions */
  enableSectionAction: Subject<object> = new Subject<object>();

  constructor() { }


  /**
  * Trigger action on current section
  * @param slug: Slug of `SectionActions` record
  */
  triggerAction(slug: string) {
    this.targetSectionAction.next(slug);
  }

  /**
  * Change enable value of target `SectionActions` record
  * @param slug: Slug of `SectionActions` record
  * @param status: New value to isEnabled field of `SectionActions` record
  */
  changeEnableSectionAction(slug: string, status: boolean) {
    this.enableSectionAction.next({slug: slug, status: status});
  }



}
