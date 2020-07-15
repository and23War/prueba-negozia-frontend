import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Guards
 */
import { LoginExistGuard } from '@app/guards/login-exist/login-exist.guard';

/**
 * Components
 */
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginExistGuard], data: { caseLoginExist: 2}
  },
  {
    path: 'register',
    loadChildren: './register/register.module#RegisterModule',
    canActivate: [LoginExistGuard], data: { caseLoginExist: 2}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
