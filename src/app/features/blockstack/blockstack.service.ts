import {Injectable} from '@angular/core';
import {AppConfig, UserSession} from 'blockstack';

export const appConfig = new AppConfig(['store_write', 'publish_data']);


@Injectable({
  providedIn: 'root'
})
export class BlockstackService {
  us: UserSession = new UserSession({appConfig});

  constructor() {
  }

  signIn() {
    this.us.redirectToSignIn();
  }

  signOut() {
    this.us.signUserOut(window.location.origin);
  }

  write() {
    // const options = { encrypt: true };
    // this.us.putFile(TASKS_FILENAME, JSON.stringify(tasks), options);
  }

  read() {
    // const options = { decrypt: true };
    // this.props.userSession.getFile(TASKS_FILENAME, options)
  }
}

