import {Injectable} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

    constructor(private localStorageService: LocalStorageService) {

    }

    /**
    * Update token
    * @param token: New token
    */
    setToken(token: string) {
        this.localStorageService.store('token', token);
        return true;
    }

    /**
    * Get token
    */
    getToken() {
        const token = this.localStorageService.retrieve('token');
        return token;
    }

    /**
    * Update firstName
    * @param firstName: New firstName
    */
    setFirstName(firstName: string) {
        this.localStorageService.store('firstName', firstName);
        return true;
    }

    /**
    * Get name
    */
    getFirstName() {
        return this.localStorageService.retrieve('firstName');
    }

    /**
    * Update lastName
    * @param lastName: New lastName
    */
   setLastName(lastName: string) {
        this.localStorageService.store('lastName', lastName);
        return true;
    }

    /**
    * Get lastName
    */
    getLastName() {
        return this.localStorageService.retrieve('lastName');
    }

    /**
    * Update email
    * @param email: New email
    */
    setEmail(email: string) {
        this.localStorageService.store('email', email);
        return true;
    }

    /**
    * Get email
    */
    getEmail() {
        const email = this.localStorageService.retrieve('email');
        return email;
    }

    /**
    * Update skyMsg
    * @param skyMsg: New skyMsg
    */
    setSkyMsg(msg: string) {
        this.localStorageService.store('skyMsg', msg);
        return true;
    }

    /**
    * Get skyMsg
    */
    getSkyMsg() {
        const skyMsg = this.localStorageService.retrieve('skyMsg');
        return skyMsg;
    }

    /**
    * Remove item from local storage
    * @param key: Key value
    */
    removeItem(key: string) {
        const response = this.localStorageService.clear(key);
        return true;
    }

    /**
    * Clean all local storage
    */
    cleanStorage() {
        const response = this.localStorageService.clear();
        return true;
    }

}
