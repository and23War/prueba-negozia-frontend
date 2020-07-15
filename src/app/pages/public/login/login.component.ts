import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

/* Services */
import { AuthService } from '@service/auth/auth.service';

/* Util */
import { StorageService } from '@util/storage/storage.service';

/* Models */
import { User } from '@model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  providers: [AuthService, StorageService],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User = {};

  constructor(
    private usersService: AuthService,
    private storageService: StorageService,
    private router: Router,
    public fb: FormBuilder,
    private notificationsService: NotificationsService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.checkSessionExpired();
    this.buildLoginForm();
  }

  buildLoginForm(): void {
    this.loginForm = this.fb.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    let email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    email = email.toLowerCase();
    this.loginFromAPI(email, password);
  }

  checkSessionExpired() {
    if (
      this.activatedRoute.snapshot.params['token-exp'] &&
      this.activatedRoute.snapshot.params['token-exp'] === 'true' &&
      this.storageService.getSkyMsg()
    ) {
      this.notificationsService.warn(this.storageService.getSkyMsg(), 'Debes volver a iniciar sesión');
      this.storageService.removeItem('skyMsg');
    }
  }

  private loginFromAPI($email: string, $password): Promise<any> {
    return this.usersService
      .login($email, $password)
      .then((response) => {
        this.storageService.setToken(response.data.token);
        this.storageService.setEmail(response.data.user.email);
        this.storageService.setFirstName(response.data.user.firstName);
        this.storageService.setLastName(response.data.user.lastName);
        this.notificationsService.success('Bienvenido', `${response.data.user.firstName} ${response.data.user.lastName}`);
        this.goToDashboard();
      })
      .catch((error) => {
        console.log(error);
        this.evaluateError(error);
      });
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
      case 'user-invalid-password':
        this.notificationsService.error('Contraseña incorrecta.');
        break;
      case 'user-not-found':
        this.notificationsService.error('El correo es incorrecto.');
        break;
      default:
        this.notificationsService.error('Ups!', 'Ha ocurrido un error, intentalo de nuevo más tarde.');
        break;
    }
  }

  goToDashboard() {
    this.router.navigate(['/user']);
  }
}
