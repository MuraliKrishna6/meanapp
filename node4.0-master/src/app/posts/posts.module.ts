import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularmatrialModule } from '../angular-material.module';
import {  RouterModule } from '@angular/router';

@NgModule({
  declarations: [PostComponent,PostListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularmatrialModule,
    RouterModule
  ]
})
export class PostsModule { }
