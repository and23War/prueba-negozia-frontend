import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent implements OnInit {

  /** Local configuration component **/
  localConfig: any = { loaded: false, formLoader: false, formCase: 0, title: '' };

  /** Component inputs **/
  @Input() properties: {title: string, updated: Date, description: string, srcImage: string, textButton: string, redirect: string } = {
    title: 'Titulo',
    updated: new Date(),
    description: 'Descripción',
    srcImage: 'https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(97).jpg',
    textButton: 'Ver más',
    redirect: '#'
  };

  /*Actions*/
  @Input() actions: Array<{name: string, slug: string, icon: string}> = [];

  /*Ellipsis actions*/
  @Input() ellipsisActions: Array<{name: string, slug: string, icon: string}> = [];

  /*Flag locked*/
  @Input() set locked(isLocked: boolean) {
    this.isLocked = isLocked;
  }
  isLocked = false;

  /** Outputs of component **/
  @Output() eventAction: EventEmitter<any> = new EventEmitter<any>();

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
  * Impartial events
  */
  private impartialCalls() {
  }

  /**
  * Partials events
  */
  private partialCalls(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      resolve(true);
    });
  }

  /**
  * Trigget action
  * @param slug: Slug action
  */
  triggerAction(slug: string) {
    const response = { slug: slug, data: Object.assign({}, this.properties) };
    this.eventAction.emit(response);
  }

}
