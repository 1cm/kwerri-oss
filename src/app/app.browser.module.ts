import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UniversalModule, isBrowser, isNode } from 'angular2-universal/browser'; // for AoT we need to manually split universal packages
import { Angulartics2GoogleAnalytics } from 'angulartics2';

import { SharedModule } from './shared';
import { HomeModule } from './pages/home';
import { PostsModule } from './pages/posts';
import { TalksModule } from './pages/talks-workshops';
import { ProjectsModule } from './pages/projects';
import { AppComponent, AppRoutingModule } from './';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [
    UniversalModule, // BrowserModule, HttpModule, and JsonpModule are included
    FormsModule,

    SharedModule,
    HomeModule,
    PostsModule,
    TalksModule,
    ProjectsModule,

    AppRoutingModule
  ],
  providers: [
    Angulartics2GoogleAnalytics,
    { provide: 'isBrowser', useValue: isBrowser },
    { provide: 'isNode', useValue: isNode }
  ]

})
export class MainModule {
  constructor() {}
}
