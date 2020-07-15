import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

/* Components */
import { ModalLayoutComponent } from '../modal-layout/modal-layout.component';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.sass']
})
export class ConfirmModalComponent {

  @Input() title: string;
  @Input() description: string;
  @Input() data: any;
  @Input() acceptText = 'Aceptar';
  @Input() acceptColor = 'primary';

  /* Modal layout reference */
  @ViewChild('modalLayout') modalLayout: ModalLayoutComponent;

  @Output() responseEvent: EventEmitter<any> = new EventEmitter<any>();

  loader = false;

  constructor() {}

  accept() {
    this.closeModal(this.data);
  }

  /**
   * Close modal component
   * @param response: Response of close modal
   */
  closeModal(response: any = null): void {
    this.modalLayout.closeModal();
    this.responseEvent.emit(response);
  }

}
