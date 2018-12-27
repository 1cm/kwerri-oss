import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TalksComponent } from './talks.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TalksComponent,
        data: {
          metadata: {
            title: 'Talks and workshops',
            description: `The things I talk about can be of all kinds. Mostly I share the things I do for the projects I'm involved in, but it can also just be a good incentive to learn in-depth about a specific technology. Or trying to solve a problem I faced during my day-to-day coding battles, setting up architectures, etc.`,
            shareImg: 'assets/share/projects-talksworkshops.png',
          },
        },
      },
    ]),
  ],
  exports: [
    RouterModule,
  ],
})
export class TalksRoutingModule {
}
