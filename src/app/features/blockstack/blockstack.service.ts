import {Injectable} from '@angular/core';
import {AppConfig, UserSession} from 'blockstack';

export const appConfig = new AppConfig(['store_write', 'publish_data']);


@Injectable({
  providedIn: 'root'
})
export class BlockstackService {
  us: UserSession = new UserSession({appConfig});

  constructor() {
    console.log(this.us.isUserSignedIn());
    if (this.us.isSignInPending()) {
      this.us.handlePendingSignIn().then((userData) => {
        // window.location = window.location.origin;
      });
    } else if (!this.us.isUserSignedIn()) {
      this.signIn();
    }


    // this.signIn();
  }

  signIn() {
    this.us.redirectToSignIn();
  }

  signOut() {
    this.us.signUserOut(window.location.origin);
  }

  async write(key: string, data: any): Promise<any> {
    if (!this.us.isUserSignedIn()) {
      return false;
    }

    const options = {encrypt: true};
    return this.us.putFile(key, JSON.stringify(data), options);
  }

  async read(key: string): Promise<any> {
    if (!this.us.isUserSignedIn()) {
      return false;
    }

    const options = {decrypt: true};
    const data = await this.us.getFile(key, options);
    if (data) {
      return JSON.parse(data.toString());
    }
  }
}

