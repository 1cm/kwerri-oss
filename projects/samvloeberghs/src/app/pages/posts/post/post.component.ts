import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { map, switchMap } from 'rxjs/operators';
import { JsonLdService } from 'ngx-sv-json-ld';
import { SeoSocialShareData, SeoSocialShareService } from 'ngx-sv-sss';

import { Post } from './post.model';
import { DataService } from '../../../shared/data.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'sv-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  post: Post;
  error: any;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly dataService: DataService,
    private readonly seoSocialShareService: SeoSocialShareService,
    private readonly sanitizer: DomSanitizer,
    private readonly jsonLdService: JsonLdService,
  ) {

  }

  ngOnInit() {
    const slug = this.route.snapshot.params['slug'];
    this.dataService
      .getData('/posts/data.json')
      .pipe(
        map((posts: Post[]): Post => {
          return posts.find((post: Post) => {
            return post.slug === slug;
          });
        }),
        switchMap((post: Post) => {
            this.post = post;

            const jsonLd = {
              name: `${post.title} - Posts - ${environment.seo.title}`,
              url: environment.url + this.router.routerState.snapshot.url,
              author: this.jsonLdService.getObject('Person', {
                name: 'Sam Vloeberghs',
              }),
              publisher: this.jsonLdService.getObject('Person', {
                name: 'Sam Vloeberghs',
              }),
              headline: post.title,
              description: post.short,
              image: `${environment.url}/${post.imgShare}`,
              dateCreated: post.publishDatetime,
              datePublished: post.publishDatetime,
              dateModified: post.updateDatetime,
            };
            this.jsonLdService.setData('BlogPosting', jsonLd);
            const seoData: SeoSocialShareData = {
              title: `${post.title} - Posts - ${environment.seo.title}`,
              description: post.short,
              image: `${environment.url}${post.imgShare}`,
              url: environment.url + this.router.routerState.snapshot.url,
              type: 'article',
              author: post.author,
              published: post.publishDatetime,
              modified: post.updateDatetime,
            };
            this.seoSocialShareService.setData(seoData);
            return this.dataService.getDataText(`/posts/${slug}/post.html`);
          },
        ),
      )
      .subscribe(
        content => {
          this.post.content = this.sanitizer.bypassSecurityTrustHtml(content);
        },
        error => {
          this.error = error;
        },
      );
  }

}
