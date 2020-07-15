import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
* Transform html to show
*/
@Pipe({
  name: 'transformHtml'
})
export class TransformHtmlPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {

  }
  /**
  * Manage of input values
  * @param html: Value html
  * @return Transformed html
  */
  transform(html: string): any {
    return this.domSanitizer.bypassSecurityTrustHtml(html);
  }

}
