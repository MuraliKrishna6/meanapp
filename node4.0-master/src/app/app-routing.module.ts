import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostComponent } from './posts/post/post.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  
  {path:'',component:PostListComponent},
  {path:'create',component:PostComponent,canActivate:[AuthGuard]},
  {path:'edit/:postId',component:PostComponent,canActivate:[AuthGuard]},
  {path:"auth",loadChildren:"./auth/auth.module#AuthModule"}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
