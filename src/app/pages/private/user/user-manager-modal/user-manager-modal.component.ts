import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

/**
 * Modules
 */
import { NotificationsService } from 'angular2-notifications';

/* Form control */
import { controlField } from './form';

/**
 * Models
 */
import { PhoneType } from '@model/PhoneType';
import { User } from '@model/User';

/**
 * Interfaces
 */
import { IControlField } from '@interface/IControlField';

/**
 * API
 */
import { UserService } from '@app/providers/services/user/user.service';

/**
 * Components
 */
import { ModalLayoutComponent } from '@app/shared/modal-layout/modal-layout.component';

@Component({
  selector: 'app-user-manager-modal',
  templateUrl: './user-manager-modal.component.html',
  styleUrls: ['./user-manager-modal.component.scss'],
})
export class UserManagerModalComponent {
  @Input() user: User = {};
  @Input() phoneTypeList: PhoneType[] = [];

  controlField: IControlField = controlField;

  form: FormGroup;

  /* Modal layout reference */
  @ViewChild('modalLayout') modalLayout: ModalLayoutComponent;

  @Output() responseEvent: EventEmitter<any> = new EventEmitter<any>();

  loader = false;

  constructor(protected fb: FormBuilder, private userService: UserService, private notificationsService: NotificationsService) {}

  ngOnInit() {
    this.buildForm();
    this.prepareForm();
  }

  /**
   * Evaluate status of response web services
   * @param error: Error of response
   */
  private evaluateError(error) {
    console.log(error);
    if (!error) {
      return false;
    }
    const body = error.error;
    switch (body.slug) {
      case 'user-not-found':
        this.notificationsService.error('El usuario no se encuenta en los registros.');
        break;
      default:
        this.notificationsService.error('Ups!', 'Ha ocurrido un error, intentalo de nuevo más tarde.');
        break;
    }
  }

  /**
   * Close modal component
   * @param response: Response of close modal
   */
  closeModal(response: any = null): void {
    this.modalLayout.closeModal();
    this.responseEvent.emit(response);
  }

  /**
   * Build reactive form
   */
  protected buildForm(): void {
    this.form = this.fb.group(this.controlField.fields);
  }

  /**
   * Change enable form
   * @param value: value
   */
  protected changeStateForm(value: boolean): void {
    if (!value) {
      this.loader = value;
      this.form.enable();
      this.afterEnable();
    } else {
      this.loader = value;
      this.form.disable();
      this.afterDisable();
    }
  }

  /**
   * After enable state form
   */
  protected afterEnable(): void {}

  /**
   * After disable state form
   */
  protected afterDisable(): void {}

  /**
   * Prepare target record
   */
  protected prepareRecord(): any {
    const record: any = this.form.value;
    return record;
  }

  protected prepareForm() {
    if (this.user._id) {
      this.form.controls.firstName.patchValue(this.user.firstName);
      this.form.controls.lastName.patchValue(this.user.lastName);
      this.form.controls.email.patchValue(this.user.email);
      this.form.controls.email.disable({ onlySelf: true });
      this.form.controls.sex.patchValue(this.user.sex);
      this.form.controls.phone.patchValue(this.user.phone);
      this.form.controls.phoneTypeId.patchValue(this.user.phoneTypeId);
    }
  }

  /**
   * Submit event of form
   */
  async onSubmit() {
    if (this.form.valid) {
      this.changeStateForm(true);
      try {
        const user = this.prepareRecord();
        await this.userService.update(Object.assign(user, { _id: this.user._id }));
        this.notificationsService.success('Felicidades', `Usuario actualizado con éxito.`);
        this.closeModal(true);
      } catch (error) {
        this.changeStateForm(false);
        this.evaluateError(error);
        console.warn('Error@UserManagerModalComponent@onSubmit:', error);
      }
    }
  }

  /**
   * Clean email value
   * @param event: Event object
   */
  cleanEmail(event: object): void {
    const email = this.form.get('email').value;
    this.form.controls.email.setValue(email ? email.toLocaleLowerCase() : null);
  }
}
