import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { MaterialModule } from '../../shared/material.module';

@NgModule({
  imports: [
    CommonModule,
    NewsRoutingModule,
    MaterialModule
  ],
  declarations: [
    NewsComponent
  ]
})
export class NewsModule { }
