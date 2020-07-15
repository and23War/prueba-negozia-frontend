import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

/**
 * Modules
 */
import { NotificationsService } from 'angular2-notifications';

/* Form control */
import { controlField } from './form';

/**
 * Utils
 */
import { StorageService } from '@app/providers/utils/storage/storage.service';

/**
 * API
 */
import { AuthService } from '@app/providers/services/auth/auth.service';

/**
 * Interfaces
 */
import { IControlField } from '@interface/IControlField';

/**
 * Models
 */
import { User } from '@model/User';
import { IResponse } from '@app/interfaces/IResponse';

/**
 * Service
 */
import { PhoneTypeService } from '@service/phone-type/phone-type.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  controlField: IControlField = controlField;

  user: User = {};

  loader = false;

  phoneTypeList = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationsService: NotificationsService,
    private storageService: StorageService,
    private router: Router,
    private phoneTypeService: PhoneTypeService,
  ) {}

  ngOnInit() {
    this.prepareListItems();
    this.buildForm();
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
      case 'invalid-email':
        this.notificationsService.error('El correo ingresado no es valido.');
        break;
      case 'user-email-exist':
        this.notificationsService.error('El correo ya se encuentra registado en la plataforma.');
        break;
      default:
        this.notificationsService.error('Ups!', 'Ha ocurrido un error, intentalo de nuevo más tarde.');
        break;
    }
  }

  /**
   * Build login form
   */
  private buildForm() {
    this.form = this.fb.group(this.controlField.fields);
  }

  /**
   * Change form loader value
   * @param value: Loader value
   */
  private changeFormLoader(value: boolean) {
    this.loader = value;
    if (value) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  prepareListItems() {
    this.getAllPhoneTypeFromAPI().catch((error) => this.evaluateError(error));
  }

  /**
   * Get all `PhoneType` record from API
   */
  private async getAllPhoneTypeFromAPI() {
    try {
      const response = await this.phoneTypeService.getAll();
      this.phoneTypeList = response['data'].phoneTypeList;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Submit event of form
   */
  async onSubmit() {
    if (this.form.valid) {
      this.changeFormLoader(true);
      this.user.firstName = this.form.get('firstName').value;
      this.user.lastName = this.form.get('lastName').value;
      this.user.sex = this.form.get('sex').value;
      this.user.phoneTypeId = this.form.get('phoneTypeId').value;
      this.user.phone = this.form.get('phone').value;
      this.user.email = this.form.get('email').value.toLowerCase();
      this.user.password = this.form.get('password').value;
      try {
        const response = await this.authService.register(this.user);
        this.storageService.setToken(response.data.jwt);
        this.storageService.setEmail(response.data.user.email);
        this.storageService.setFirstName(response.data.user.firstName);
        this.storageService.setLastName(response.data.user.lastName);
        this.router.navigate(['/']);
        this.notificationsService.success('Cuenta creada', 'Por favor inicia sesión.');
        this.changeFormLoader(false);
      } catch (error) {
        this.changeFormLoader(false);
        console.warn('Error@RegisterComponent@onSubmit:', error);
        switch (error.slug) {
          case 'user-required':
            this.notificationsService.error('Datos incompletos.');
            break;
          case 'email-in-use':
            this.notificationsService.error('Correo electrónico no disponible.');
            break;
          default:
            this.notificationsService.error('Lo sentimos', 'No pudimos registrar tu cuenta.');
            break;
        }
      }
    }
  }

  /**
   * Set values in Storage
   */
  generateStorage(response: IResponse) {
    this.storageService.setToken(response.data.jwt);
    this.storageService.setFirstName(response.data.user.firstName);
    this.storageService.setLastName(response.data.user.lastName);
    this.storageService.setEmail(response.data.user.email);
  }
}
