import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';


/* Services */
// import { FormManagerService } from '../../../providers/utils/form-manager/form-manager.service';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.sass'],
  providers: [/*FormManagerService*/]
})
export class ReactiveFormComponent implements OnInit {

  @Input() config: any = {};

  @Input()
  set locked(value: true) {
    this.formLoader = {formLoader: value, form: 'form'};
    this.isLocked = value;
  }

  @Input() persistDisabledList: Array<string> = [];

  isLocked = false;

  @Input() validate = true;

  @Output() eventLoaded: EventEmitter<any> = new EventEmitter<any>();
  @Output() eventAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() eventChange: EventEmitter<any> = new EventEmitter<any>();

  internalConfig: any = {loaded: false, formLoader: false, title: 'Formulario', fields: [], data: {}, buttonCancel: {}, buttonAction: {}};

  form: FormGroup;
  record: any = {};
  constructor(private notificationsService: NotificationsService,
        public fb: FormBuilder,
      /*private formManagerService: FormManagerService*/) { }

  ngOnInit() {
    this.buildForm();
  }

  set formLoader(data) {
    this.config.formLoader = data.formLoader;
    if (!this[data.form]) {
      return;
    }

    for (const k in this[data.form].controls) {
      if (this.persistDisabledList.indexOf(k) !== -1) {
        this[data.form].controls[k].disable();
      } else if (data.formLoader) {
        this[data.form].controls[k].disable();
      } else {
        this[data.form].controls[k].enable();
      }
    }
  }

  onSubmit() {
    if (this.validate) {
      this.formLoader = {formLoader: true, form: 'form'};
    }

    this.prepareRecord();
    this.eventAction.emit({slug: 'validated-form', data: this.record});
  }

  getRecord(): any {
    this.prepareRecord();
    return this.record;
  }

  cancel() {
    this.cleanForm();
    this.eventAction.emit({slug: 'cancel-form', data: undefined});
  }

  postSubmit(saved) {
    this.formLoader = {formLoader: false, form: 'form'};
    if (saved) {
      this.cleanForm();
    }
  }

  startNewRecord() {
    this.cleanForm();
  }

  startEditRecord(data: any) {
    this.formLoader = {formLoader: false, form: 'form'};
    this.setDataRecord(data);
    this.setForm();
  }

  private buildForm(): void {
    this.config = Object.assign({}, this.internalConfig, this.config);
    const group = {};
    this.config.fields.forEach(f => {
      const control = [];
      control.push({value: this.record[f.field], disabled: this.config.formLoader});
      control.push(this.buildValidators(f.validators));
      group[f.field] = control;
    });
    this.form = this.fb.group(group);
    setTimeout(() => {
      this.eventLoaded.emit({form: this.form});
    }, 0);
  }

  private buildValidators(validators: any) {
    const compose = [];
    for (const k in validators) {
      if (validators.hasOwnProperty(k)) {
        this.setValidor(compose, k, validators[k]);
      }
    }
    return compose;
  }

  private setValidor(compose, key, value) {
    switch (key) {
      case 'required':
        compose.push(Validators.required);
        break;
      case 'email':
        compose.push(Validators.email);
        break;
      case 'maxLength':
        compose.push(Validators.maxLength(value));
        break;
      case 'maxLength':
        compose.push(Validators.minLength(value));
        break;
      case 'pattern':
        compose.push(Validators.pattern(value));
        break;
    }
  }

  private setDataRecord(data): void {
    this.config.fields.forEach(f => {
      this.record[f.field] = data[f.field];
    });
  }

  private prepareRecord() {
    this.config.fields.forEach(f => {
      this.record[f.field] = this.form.get(f.field).value;
    });
  }

  private setForm() {
    this.config.fields.forEach(f => {
      this.form.controls[f.field].setValue(this.getValueByType(f.type, this.record[f.field]));
    });
  }

  private getValueByType(type, value) {
    let response;
    switch (type) {
      case 'checkbox':
        response = parseInt(value, 10);
        break;
      default:
        response =  value;
        break;
    }
    return response;
  }

  cleanForm() {
    this.form.reset();
  }

  changeAttachedOptions(event, field) {
    const targetField = this.config.fields.find(f => f.field === field.attach.target);
    if (targetField) {
      const options = targetField.options.data.filter(item => item[targetField.options.fieldAttached] === event.target.value);
      targetField.options.attachedData = options;
      const whiteOption = {};
      whiteOption[targetField.options.value] = '';
      whiteOption[targetField.options.show] = '';
      targetField.options.attachedData = [whiteOption].concat(options);
      this.form.controls[targetField.field].setValue('');
      if (targetField.attach && targetField.attach.target) {
        this.changeAttachedOptions({target: {value: ''} }, targetField);
      }
    } else {
      targetField.options.attachedData = [];
    }
  }

  onChange(event, field, attach?) {
    if (attach) {
      this.changeAttachedOptions(event, field);
    }
    event['fieldRule'] = field;
    this.eventChange.emit(event);
  }

}
