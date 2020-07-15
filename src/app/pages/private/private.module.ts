import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/*Modules*/
import {SharedModule} from '@shared/shared.module';

/*Routes*/
import { PrivateRoutingModule } from './private-routing.module';

/*Components*/
import { PrivateComponent } from './private.component';

@NgModule({
  declarations: [
    PrivateComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    SharedModule
  ]
})
export class PrivateModule { }
