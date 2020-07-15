import { Component, OnInit, Input } from '@angular/core';

/**
 * API
 */
import { AuthService } from '@service/auth/auth.service';

/**
 * Services
 */
import { StorageService } from '@util/storage/storage.service';

@Component({
  selector: 'app-private-header',
  templateUrl: './private-header.component.html',
  styleUrls: ['./private-header.component.scss']
})
export class PrivateHeaderComponent implements OnInit {

  /* Title value  */
  @Input() title = 'Usuarios';

  /* Complete name */
  completeName = '';

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.completeName = `${this.storageService.getFirstName()} ${this.storageService.getLastName()}`;
  }

  /**
   * Close session
   */
  closeSession(): void {
    this.authService.logout();
  }

}
