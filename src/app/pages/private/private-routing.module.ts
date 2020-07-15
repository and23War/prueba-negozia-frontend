import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Components
 */
import { PrivateComponent } from './private.component';

/**
 * Guards
 */
import { LoginExistGuard } from '@app/guards/login-exist/login-exist.guard';

const routes: Routes = [
{
    path: '',
    component: PrivateComponent, children: [
      { path: 'user', canActivate: [LoginExistGuard], data: { caseLoginExist: 1 } , loadChildren: './user/user.module#UserModule' },
    ]
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
