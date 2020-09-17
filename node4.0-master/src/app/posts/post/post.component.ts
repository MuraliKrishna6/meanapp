import { Component, OnInit ,EventEmitter,Output} from '@angular/core';
// import {Post} from '../post.model'
import {  FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post.model';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {
   private mode='create';
   form:FormGroup;
   private postId:string;
   isLoading=false;
   post:Post
  constructor(public postService:PostService,public route:ActivatedRoute) { }

  ngOnInit() {
    this.form=new FormGroup({
      title:new FormControl(null,{validators:[Validators.required,Validators.minLength(3)]}),
      content:new FormControl(null,{validators:[Validators.required]})
    })
    this.route.paramMap.subscribe((paramMap)=>{
       if(paramMap.has('postId')){
          this.mode='edit';
          this.postId=paramMap.get('postId'); 
          this.isLoading=true;
          this.postService.getPost(this.postId).subscribe(postData=>{
            this.isLoading=false;
             this.post={id:postData._id,title:postData.title,content:postData.content,creator:postData.creator};
             
             
             this.form.setValue({
              title:this.post.title,
              content:this.post.content
              });

          });
        }
       else{
         this.mode='create';
         this.postId=null;
       }  
    })
  } 

onSavePost(){
  if(this.form.invalid){
    return;
  }
  // const post:Post ={title:form.value.title,content:form.value.content};
  // this.postCreated.emit(post)
  this.isLoading=true;
  if(this.mode === 'create'){
    this.postService.addPost(this.form.value.title,this.form.value.content)
  }
  else{
    this.postService.updatePost(this.postId,this.form.value.title,this.form.value.content)
  }
  this.form.reset();
}

};




