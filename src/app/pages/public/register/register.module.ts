import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * Modules
 */
import { RegisterRoutingModule } from './register-routing.module';
import { ClientBootstrapModule } from '@app/modules/client-bootstrap.module';
import { SharedModule } from '@app/shared/shared.module';

/**
 * Components
 */
import { RegisterComponent } from './register.component';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterRoutingModule,
    ClientBootstrapModule,
    SharedModule,
  ]
})
export class RegisterModule { }
