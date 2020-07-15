import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

/*Modules*/
import { ClientBootstrapModule } from '@module/client-bootstrap.module';
import { PipesModule } from '@pipe/pipes.module';

/*Components*/
import {ReactiveRedirectComponent} from './reactive-redirect/reactive-redirect.component';
import {CardComponent} from './card/card.component';
import {SimpleLoaderComponent} from './simple-loader/simple-loader.component';
import {ReactiveFormComponent} from './reactive-form/reactive-form.component';
import {SimplePopupComponent} from './simple-popup/simple-popup.component';
import { ControlMessageInputComponent } from './control-message-input/control-message-input.component';
import { PrivateHeaderComponent } from './private-header/private-header.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { ModalLayoutComponent } from './modal-layout/modal-layout.component';

@NgModule({
  declarations: [
    ReactiveRedirectComponent,
    CardComponent,
    SimpleLoaderComponent,
    ReactiveFormComponent,
    SimplePopupComponent,
    ControlMessageInputComponent,
    PrivateHeaderComponent,
    ConfirmModalComponent,
    ModalLayoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClientBootstrapModule,
    PipesModule,
    RouterModule
  ],
  exports: [
    ReactiveRedirectComponent,
    CardComponent,
    SimpleLoaderComponent,
    ReactiveFormComponent,
    SimplePopupComponent,
    ControlMessageInputComponent,
    PrivateHeaderComponent,
    ModalLayoutComponent,
    ConfirmModalComponent
  ],
  entryComponents: [
    ModalLayoutComponent,
    ConfirmModalComponent
  ]
})
export class SharedModule { }
