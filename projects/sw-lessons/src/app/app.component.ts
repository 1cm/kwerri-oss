import { Component } from '@angular/core';
import { Store, set, del } from 'idb-keyval';
import { fromEvent } from 'rxjs';

declare const window: any;

@Component({
  selector: 'swl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  public currentOAuthToken;
  public mapTile: string;
  public newVersionAvailable = false;

  constructor() {

    if (window['newVersionAvailable']) {
      this.newVersionAvailable = true;
    }
    fromEvent(window, 'new-version-available').subscribe(() => {
      this.newVersionAvailable = true;
    });
  }

  public async setOAuthToken() {
    this.currentOAuthToken = 'header.payload.signature';
    const customStore = new Store('swl-db', 'swl-db-store');
    await set('token', this.currentOAuthToken, customStore);
  }

  public async unsetOAuthToken() {
    this.currentOAuthToken = undefined;
    const customStore = new Store('swl-db', 'swl-db-store');
    await del('token', customStore);
  }

  public loadMapTile() {
    this.mapTile = `/assets/map.png?t=${Date.now()}`;
  }

  public unloadMapTile() {
    this.mapTile = undefined;
  }

  public loadNewVersion() {
    window.dispatchEvent(new CustomEvent('application-update-requested'));
  }

}
