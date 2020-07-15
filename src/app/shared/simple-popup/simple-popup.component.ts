import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';

/* Modules */
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-simple-popup',
  templateUrl: './simple-popup.component.html',
  styleUrls: ['./simple-popup.component.sass']
})
export class SimplePopupComponent implements OnInit, OnDestroy {

  /** Local configuration component **/
  localConfig: any = { loaded: false, title: '' };

  /** Loaders  of component **/
  containerLoaders: any = {actions: false};

  /* Modal */
  @ViewChild('modal') modal: ModalDirective;

  /** Inputs of component **/
  @Input() title: string;
  @Input() description: string;

  /* Background color of modal */
  @Input() bg = '';
  @Input() cancelBtn: {color: string, text: string } = {color: 'light', text: 'Cancelar'};
  @Input() acceptBtn: {color: string, text: string } = {color: 'primary', text: 'Aceptar'};

  /*Wait response*/
  @Input() waitResponse = true;

  /** Outputs of component **/
  @Output() callResponse: EventEmitter<any> = new EventEmitter<any>();

  /* Temporal data object */
  temporalData: any = {};

  constructor() { }

  /**
  *  Run when component loads
  */
  ngOnInit() {
    this.impartialCalls();
    this.partialCalls()
      .then(() => {
        this.localConfig.loaded = true;
      });
  }

  /**
  * Run when component is destroy
  */
  ngOnDestroy() {
  }

  /**
  * Impartial events
  */
  private impartialCalls() {}

  /**
  * Partials events
  */
  private partialCalls(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      return resolve(true);
    });
  }

  /**
  * Open modal
  * @param data: Temporal data Object
  */
  openModal(data: any = {}) {
    this.temporalData = Object.assign({}, data);
    this.containerLoaders.actions = false;
    this.modal.config.backdrop = true;
    this.modal.config.keyboard = true;
    this.modal.show();
  }

  /**
  * Close modal
  */
  closeModal() {
    this.modal.hide();
    this.containerLoaders.actions = false;
  }

  /**
  * Accept popup event
  */
  accept() {
    this.containerLoaders.actions = true;
    this.modal.config.backdrop = 'static';
    this.modal.config.keyboard = false;
    if (!this.waitResponse) { this.closeModal(); }
    this.callResponse.emit(this.temporalData);
    this.temporalData = {};
  }

}
