import { Pipe, PipeTransform } from '@angular/core';

/**
* Generate number pages by count
*/
@Pipe({
  name: 'numPages'
})
export class NumPagesPipe implements PipeTransform {

  /**
  * Manage of input values
  * @param count: Amount of records
  * @param limir: Limit by page
  * @return Number page values
  */
  transform(count: number, limit: number): Array<number> {
    return new Array(Math.ceil(count / limit));
  }

}
