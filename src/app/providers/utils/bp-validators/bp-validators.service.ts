import { Injectable, ElementRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Injectable()
export class BpValidatorsService {

  constructor() { }

  /**
  * Check extension file
  * @param exts: Extension list
  */
   static fileExt(exts: Array<string> ) {
    return (control: FormControl) => {
      return control.value ? (BpValidatorsService.validateExt(exts, control.value) ? null : { fileExt: true }) : null;
    };
  }

  /**
  * Validate extension file
  * @param exts: Extension list
  * @param value: Value to check
  */
  static validateExt(exts: Array<string>, value: string) {
    if (exts.length === 0) {
      return true;
    }

    const pieces = value.split('.');
    return exts.indexOf(pieces[pieces.length - 1]) !== -1;
  }

  /**
  * Checl max size of file
  * @param size: Max size
  * @param element: Element object
  */
  static fileMaxSize(size: number, element ) {
    return (control: FormControl) => {
      return control.value ? (BpValidatorsService.valideMaxSize(element, size) ? null : { fileMaxSize: true }) : null;
    };
  }

  /**
  * Validate extension file
  * @param input: Input object
  * @param megabytes: Megabytes value to check
  */
  static 	valideMaxSize(input: any, megabytes: number) {
    const size = input.files[0].size;
    return (size / 1000000) < megabytes;
  }

}
