import { Component } from '@angular/core';

import { Post } from './post/post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'sv-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent {

  posts: Post[];
  error: any;

  constructor(
    private postsService: PostsService,
  ) {

    this.postsService
      .getPosts()
      .then(posts => this.posts = posts)
      .catch(error => this.error = error);
  }

}
