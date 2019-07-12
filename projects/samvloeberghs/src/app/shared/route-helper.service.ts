import { Injectable } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { JsonLdService, SeoSocialShareData, SeoSocialShareService } from 'ngx-seo';

import { environment } from '../../environments/environment';

// inject in root
@Injectable({
  providedIn: 'root',
})
export class RouteHelper {

  private routes = [, '/', '/posts', '/talks-workshops', '/projects', '/about', '/kwerri'];

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
    private readonly seoSocialShareService: SeoSocialShareService,
    private readonly jsonLdService: JsonLdService,
  ) {
    this.angulartics2GoogleAnalytics.startTracking();
    this.setupRouting();
  }

  keyboardNavigate(key: string | number) {
    if (this.routes[key]) {
      this.router.navigateByUrl(this.routes[key]);
    }
  }

  private setupRouting() {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
    ).subscribe((route: ActivatedRoute) => {
      const seo: any = route.snapshot.data['seo'];
      if (seo) {
        const jsonLd = this.jsonLdService.getObject('Website', {
          name: seo.title,
          url: environment.url + this.router.routerState.snapshot.url,
        });
        this.jsonLdService.setData(jsonLd);
        const seoData: SeoSocialShareData = {
          title: seo.title,
          description: seo.description,
          image: environment.url + seo.shareImg,
          author: environment.seo.author,
          url: environment.url + this.router.routerState.snapshot.url,
          type: 'website',
        };
        this.seoSocialShareService.setData(seoData);
      } else {
        const jsonLd = this.jsonLdService.getObject('Website', {
          name: environment.seo.title,
          url: environment.url,
        });
        this.jsonLdService.setData(jsonLd);
        const seoData: SeoSocialShareData = {
          title: environment.seo.title,
          description: environment.seo.description,
          image: environment.url + environment.seo.shareImg,
          author: environment.seo.author,
          url: environment.url,
          type: 'website',
        };
        this.seoSocialShareService.setData(seoData);
      }
    });
  }

}
