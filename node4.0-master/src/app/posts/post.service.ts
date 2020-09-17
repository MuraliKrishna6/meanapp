import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Subject   } from 'rxjs'
import {   Post     } from './post.model';
import {    map     } from 'rxjs/operators'; 
import {  Router    } from '@angular/router';
import { environment } from 'src/environments/environment';

const BACKEND_URL=environment.apiUrl+"/posts/";
 
@Injectable({ 
  providedIn: 'root'
})
export class PostService {
  public posts:Post[]=[];
  private postUpdated = new Subject<Post[]>() 

  constructor(private http:HttpClient,private router:Router) { }


  getPosts(){
   this.http.get<{message:string;posts:any}>(BACKEND_URL).pipe(map((postData)=>{
    
      return postData.posts.map(post=>{
        // console.log("post",post);
        return {
          title:post.title,
          content:post.content,
          id:post._id,
          creator:post.creator
        };
      });
   }))
   .subscribe(transformedposts=>{
     this.posts=transformedposts;
     this.postUpdated.next([...this.posts]);
    })
  }

  

  getPostUpdateListener(){
    return this.postUpdated.asObservable();
  }

  getPost(id:string){
  return this.http.get<{_id:string,title:string,content:string,creator:string}>(BACKEND_URL + id);
  }

  addPost(title:string,content:string){
     const post : Post ={id:null, title:title,content:content,creator:null};
     this.http.post<{message:string,postId:string}>(BACKEND_URL,post).subscribe((responseData)=>{
       const id=responseData.postId;
       post.id=id;  
       this.posts.push(post);
       this.postUpdated.next([...this.posts]);
       this.router.navigate(["/"])
    })
  }


    updatePost(id:string,title:string,content:string){
        const post:Post = {id:id,title:title,content:content,creator:null}
        this.http.put(BACKEND_URL + id,post).subscribe(res=>{
         const updatedPosts=[...this.posts];
         const oldPostIndex=updatedPosts.findIndex(p=>p.id === post.id);
         updatedPosts[oldPostIndex]=post;
         this.posts=updatedPosts;
         this.postUpdated.next([...this.posts]);
         this.router.navigate(["/"])
        })
      }


    deletePost(postId:string){
         this.http.delete(BACKEND_URL + postId).subscribe((res)=>{
         const updatedPosts=this.posts.filter(post=>post.id !== postId);   
         this.posts=updatedPosts;
         this.postUpdated.next([...this.posts]);
         })
    }

  
}
