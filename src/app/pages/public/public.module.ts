import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/*Modules*/
import {SharedModule} from '@shared/shared.module';
import { PipesModule } from '@pipe/pipes.module';

/*Routes*/
import { PublicRoutingModule } from './public-routing.module';

/*Components*/
import {LoginComponent} from './login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PublicRoutingModule,
    SharedModule
  ]
})
export class PublicModule { }
