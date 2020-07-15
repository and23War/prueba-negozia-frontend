import { NgModule } from '@angular/core';

/* Modules */
import { BsDropdownModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap';
import { ProgressbarModule } from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap';
import { TimepickerModule } from 'ngx-bootstrap';


@NgModule({
  imports: [BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    CollapseModule.forRoot(),
    TimepickerModule.forRoot()],
  exports: [BsDropdownModule, BsDatepickerModule, TooltipModule, ModalModule, ProgressbarModule, CollapseModule, TimepickerModule],
  providers: [BsDropdownModule, BsDatepickerModule, TooltipModule, ModalModule, ProgressbarModule, CollapseModule, TimepickerModule]
})
export class ClientBootstrapModule { }
