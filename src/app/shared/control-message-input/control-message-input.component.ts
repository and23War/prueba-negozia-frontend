import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-control-message-input',
  templateUrl: './control-message-input.component.html',
  styleUrls: ['./control-message-input.component.sass'],
  providers: []
})
export class ControlMessageInputComponent implements OnInit {

  @Input() control: FormControl;
  @Input() configMessages = {};

  constructor() { }

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return this.getValidatorErrorMessage(propertyName, this.configMessages, this.control.errors[propertyName]);
      }
    }
    return null;
  }

  ngOnInit() {

  }

  private getValidatorErrorMessage(validatorName: string, configMessages: any,  validatorValue?: any) {
      return configMessages[validatorName];
  }

}
