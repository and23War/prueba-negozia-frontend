import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap';

/* Modules */
import { NotificationsService } from 'angular2-notifications';

/* Services */
import { UserService } from '@service/user/user.service';

/* Utils */
import { ManagePathsService } from '@util/manage-paths/manage-paths.service';
import { ManageUpSideNavService } from '@util/manage-up-side-nav/manage-up-side-nav.service';
import { StorageService } from '@util/storage/storage.service';

/* Components */
import { CardComponent } from '@shared/card/card.component';

/* Models */
import { User } from '@model/User';
import { PhoneType } from '@app/models/PhoneType';
import { PhoneTypeService } from '@app/providers/services/phone-type/phone-type.service';
import { UserManagerModalComponent } from './user-manager-modal/user-manager-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  /** Local configuration component **/
  localConfig: any = {
    title: 'Proyecto',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum voluptatem facilis delectus reiciendis ' +
      'ut esse, provident libero! Totam blanditiis, ipsum voluptatum veritatis, hic laborum sed, quidem modi facere voluptatibus iure.',
  };

  /** Loaders  of component **/
  containerLoaders: { userList: boolean; actionList: boolean } = { userList: false, actionList: true };

  /* Section actions Subscription */
  sectionActionsSubscription;

  /* `User` records */
  userList: Array<User> = [];

  /* Target `User` */
  targetItems: Array<User> = [];

  /* Current page */
  currentPage = 1;

  /* Limit records by page */
  limit = 10;

  /* Total records */
  total = 0;

  /* Search value */
  search = '';

  /* Field value */
  field = 'name';

  /* Sort value*/
  sort: any = { created: -1, updated: -1 };

  /*Limit groups*/
  rowsGroups: Array<number> = [5, 10, 15];

  /* Actions to cards */
  actions: Array<object> = [{ name: 'Editar', slug: 'edit', icon: 'pencil' }];

  /* Ellipsis actions to cards */
  ellipsisActions: object[] = [
    { name: 'Eliminar', slug: 'delete', icon: 'trash' },
    { name: 'Copiar proyecto', slug: 'copy', icon: 'copy' },
  ];

  phoneTypeList: Array<PhoneType> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notificationsService: NotificationsService,
    private manageUpSideNavService: ManageUpSideNavService,
    private userService: UserService,
    private managePathsService: ManagePathsService,
    private storageService: StorageService,
    private phoneTypeService: PhoneTypeService,
    private modalService: BsModalService,
  ) {}

  /**
   *  Run when component loads
   */
  ngOnInit() {
    this.initListenSectionActions();
    this.prepareListItems();
  }

  /**
   * Evaluate status of response web services
   * @param error: Error of response
   */
  private evaluateError(error) {
    console.log(error);
    if (!error) {
      return false;
    }
    const body = error.error;
    switch (body.slug) {
      case 'invalid-token':
        this.notificationsService.error('La sesión ha expirado');
        break;
      default:
        this.notificationsService.error('Ups!', 'Ha ocurrido un error, intentalo de nuevo más tarde.');
        break;
    }
  }

  /**
   * Run when component is destroy
   */
  ngOnDestroy() {
    this.endListenSectionActions();
  }

  /**
   * Start listen trigger section actions
   */
  private initListenSectionActions() {
    this.sectionActionsSubscription = this.manageUpSideNavService.targetSectionAction.subscribe((slug) => {
      this.triggetSectionAction(slug);
    });
  }

  /**
   * Destroy listening section actions
   */
  private endListenSectionActions() {
    if (this.sectionActionsSubscription) {
      this.sectionActionsSubscription.unsubscribe();
    }
  }

  /**
   * Trigger section action
   * @param slug: Slug `SectionActions` record
   */
  private triggetSectionAction(slug: string) {
    switch (slug) {
      case 'create-user':
        // this.goToManageUser();
        break;
    }
  }

  /**
   * Change status of `User` actions
   * @param value: Boolean value
   */
  changeUserLoaderGroup(value) {
    this.manageUpSideNavService.changeEnableSectionAction('create-user', value);
    this.containerLoaders.userList = value;
  }

  /**
   * Prepare items to list
   */
  prepareListItems() {
    this.getUser()
      .then(() => {
        this.getPhoneType();
      })
      .then(() => {
        this.changeUserLoaderGroup(true);
      })
      .catch((error) => this.evaluateError(error));
  }

  /**
   * Get `User` records
   */
  private getUser(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.getUserFromApi()
        .then(() => this.prepareUserList())
        .then(() => resolve(true))
        .catch(reject);
    });
  }

  /**
   * Get `User` records from API
   */
  private getUserFromApi(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.userService
        .getAll()
        .then((response) => {
          this.userList = response['data'].userList;
          return resolve(true);
        })
        .catch(reject);
    });
  }

  /**
   * Get `PhoneType` records
   */
  private getPhoneType(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.getAllPhoneTypeFromAPI()
        .then(() => resolve(true))
        .catch(reject);
    });
  }

  /**
   * Get all `PhoneType` record from API
   */
  private async getAllPhoneTypeFromAPI() {
    return new Promise<boolean>((resolve, reject) => {
      this.phoneTypeService
        .getAll()
        .then((response) => {
          this.phoneTypeList = response['data'].phoneTypeList;
          return resolve(true);
        })
        .catch(reject);
    });
  }

  /**
   * Prepare `User` records to datatable
   */
  private prepareUserList(): Promise<boolean> {
    try {
      this.targetItems = [];
      this.userList.forEach((user) => {
        const targetUser = user;
        this.prepareUser(targetUser);
        this.targetItems.push(targetUser);
      });
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Prepare `User` record
   * @param user: `User` record
   */
  private prepareUser(user: User) {
    try {
      user.phoneType = this.phoneTypeList.find((pt) => pt._id === user.phoneTypeId);
    } catch (error) {
      this.evaluateError(error);
    }
  }

  /**
   * Call event of pagination controls
   * @param: Event object
   */
  public pageChange(event: { page: number; limit: number }) {
    this.changeUserLoaderGroup(false);
    this.currentPage = event.page;
    this.limit = event.limit;
    this.prepareListItems();
  }

  /**
   * Search records by filter
   * @param: Event object
   */
  searchByFilter(event) {
    this.changeUserLoaderGroup(false);
    this.currentPage = 1;
    this.prepareListItems();
  }

  openManage(user: User) {
    const bsModalRef = this.modalService.show(UserManagerModalComponent, {
      class: 'modal-lg',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        user,
        phoneTypeList: this.phoneTypeList,
      },
    });

    const subscription = bsModalRef.content.responseEvent.subscribe((response) => {
      if (response) {
        this.searchByFilter(null);
      }
      subscription.unsubscribe();
    });
  }
}
