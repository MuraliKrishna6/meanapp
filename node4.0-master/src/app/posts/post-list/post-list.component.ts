import { Component, OnInit, OnDestroy } from '@angular/core';
import {Post} from '../post.model'
import { PostService } from '../post.service';
import{Subscription} from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
@Component({ 
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy {
  posts:Post[]=[];
  private postsSub:Subscription;
  private autoSatusSub:Subscription;
  userIsAuthnticated=false;
  isLoading=false;
  userId: string;

  constructor( public postService:PostService,private authService:AuthService) { }

  ngOnInit() {
    this.isLoading=true;

    this.postService.getPosts();


    // get userId
    this.userId=this.authService.getUserId();
  

  //get posts
  this.postsSub= this.postService.getPostUpdateListener().subscribe((posts:Post[])=>{
    this.isLoading=false;
    this.posts=posts;
  }); 

  // auth status
  this.userIsAuthnticated=this.authService.gerIsAuth();
  this.autoSatusSub=this.authService.getAuthStatusListener().subscribe(isAuthenticated=>{
    this.userIsAuthnticated=isAuthenticated;
    this.userId=this.authService.getUserId();
  })


  }

  onDelete(postId:string){
    this.postService.deletePost(postId);
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
    this.autoSatusSub.unsubscribe();
  }

}
