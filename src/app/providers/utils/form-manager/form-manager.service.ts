import { Injectable } from '@angular/core';


@Injectable()
export class FormManagerService {

  constructor() {  }

  /**
  * Change input file value by blob
  * @param formGroup: Form group object
  * @param key: Key value
  * @param event: Event object
  */
  onFileChangeBlob(formGroup, key, event) {
      const reader = new FileReader();

      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);

        reader.onload = () => {
          this.patchValue(formGroup, key, reader.result);

          // need to run CD since file load runs outside of zone
          // cd.markForCheck();
        };
      } else {
        this.patchValue(formGroup, key, null);
      }
  }

  /**
  * Patch value on form group
  * @param formGroup: Form group object
  * @param key: Key value
  * @param value: Value to patch
  */
  patchValue(formGroup, key, value) {
    const structure = {};
    structure[key] =  value;
    formGroup.patchValue(structure);
  }

  /**
  * Prepare files in form data
  * @param key: Key value
  * @param target: Target input object
  * @param formdata: Formdata object
  */
  prepareFiles(key: string, target: any, formdata: FormData): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      for (let i = 0; i < target.files.length; ++i) {
        formdata.append(key + '[' + i + ']', target.files[i]);
      }
      resolve(true);
    });
  }

  /**
  * Show entries of formdata
  * @param formdata: Formdata object
  */
  viewEntries(formdata) {
    return Array.from(formdata.entries());
  }

}
