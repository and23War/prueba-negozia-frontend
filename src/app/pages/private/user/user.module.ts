import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/*Modules*/
import { SharedModule } from '@shared/shared.module';
import { ClientBootstrapModule } from '@module/client-bootstrap.module';
import { PipesModule } from '@pipe/pipes.module';

/* Guards */

/*Routes*/
import { UserRoutingModule } from './user-routing.module';

/* components */
import { UserComponent } from './user.component';
import { UserManagerModalComponent } from './user-manager-modal/user-manager-modal.component';

@NgModule({
  declarations: [
    UserComponent,
    UserManagerModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ClientBootstrapModule,
    PipesModule,
    UserRoutingModule
  ],
  entryComponents: [
    UserManagerModalComponent
  ]
})
export class UserModule { }
