import {Injectable} from '@angular/core';
import {AppConfig, UserSession} from 'blockstack';
import {AppDataComplete} from '../../imex/sync/sync.model';
import {Subject} from 'rxjs';
import {auditTime} from 'rxjs/operators';

export const appConfig = new AppConfig(['store_write', 'publish_data']);


@Injectable({
  providedIn: 'root'
})
export class BlockstackService {
  us: UserSession = new UserSession({appConfig});

  private _allData$ = new Subject();
  private _allDataSave$ = this._allData$.pipe(
    auditTime(5000),
  );

  private _lastData: any;

  constructor() {
    console.log(this.us.isUserSignedIn());
    this._allDataSave$.subscribe((v) => {
      console.log('allDataSave$', v);
      this._write('COMPLETE', v);
    });

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


  async save(key: string, data: any, localDataComplete: AppDataComplete) {
    // this.lastUpdate = Date.now();
    let all;
    try {
      all = await this._read('COMPLETE');
    } catch (e) {
      all = localDataComplete;
    }
    this._allData$.next({
      ...all,
      [key]: data,
    });
  }

  async load(key: string): Promise<any> {
    try {
      const all = await this._read('COMPLETE');
      return all[key] || undefined;
    } catch (e) {
      // NOTE: we use undefined as null does not trigger default function arguments
      return undefined;
    }
  }

  private async _write(key: string, data: any): Promise<any> {
    console.log(data);
    if (!this.us.isUserSignedIn()) {
      return false;
    }

    const options = {encrypt: true};
    return this.us.putFile(key, JSON.stringify(data), options).catch(console.log);
  }

  private async _read(key: string): Promise<any> {
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

