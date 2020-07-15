import { Pipe, PipeTransform } from '@angular/core';

/**
 * Validate if image data is available, otherwise return `defaultText` value
 */
@Pipe({
  name: 'defaultText'
})
export class DefaultTextPipe implements PipeTransform {

  /* Default text value */
  private defaultText = '-';

  /**
   * Manage of input values
   * @param: value: Value to transform
   * @return String value existing or default text
   */
  transform(value: string): string {
    return this.isAvailable(value) ? value : this.defaultText;
  }

  /**
   * Validate if text data is available
   * @param value: String value to check
   * @return Boolean of validation
   */
  private isAvailable(value) {
    return value !== '' && value !== undefined && value != null;
  }

}
