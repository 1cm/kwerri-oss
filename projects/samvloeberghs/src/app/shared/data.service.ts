import { Injectable } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private path = `${environment.url}/assets/`;

  constructor(
    private readonly http: HttpClient,
    private readonly transferState: TransferState,
  ) {
  }

  getData(file: string): Observable<any> {

    const key = makeStateKey(file);
    if (this.transferState.hasKey(key)) {
      return of(this.transferState.get(key, null));
    }
    console.log('doing http call');
    return this.http
      .get(`${this.path}${file}`)
      .pipe(
        tap(response => {
          console.log('in tap get data');
          console.log(response);
          this.transferState.set(key, response);
        }),
      );

  }

  getDataText(file: string): Observable<any> {

    const key = makeStateKey(file);
    if (this.transferState.hasKey(key)) {
      return of(this.transferState.get(key, null));
    }
    console.log('doing http call text');
    return this.http
      .get(`${this.path}${file}`, {responseType: 'text'})
      .pipe(
        tap(response => {
          console.log('in tap get data text');
          console.log(response);
          this.transferState.set(key, response);
        }),
      );

  }

}
