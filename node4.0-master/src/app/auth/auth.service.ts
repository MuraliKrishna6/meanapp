import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{Authdata} from './authmodel'
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


const BACKEND_URL=environment.apiUrl+"/user";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoading: boolean;

  constructor(private http:HttpClient,private router :Router) { }

  private token:string;
  private isAuthenticated = false;

  private authStatusListener = new Subject<boolean>();
  private userId:string;

  private tokenTimer:any;

 

  getToken(){
    return this.token;
  }

  getUserId(){
    return this.userId;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  gerIsAuth(){
    return this.isAuthenticated;
  }

allUsers(){
 return this.http.get<any>("http://localhost:5000/api/user/allUsers")
}


  autoAuthUser(){
    const authInformation=this.getAuthData();
    if(!authInformation){
      return
    }
    const now = new Date();
    const expiresIn=authInformation.expirationDate.getTime()-now.getTime();
    if(expiresIn > 0){

      this.token=authInformation.token;
      this.isAuthenticated=true;
      this.userId=authInformation.userId;
      this.setAuthTimer(expiresIn/1000);
      this.authStatusListener.next(true);
    }
  }

  createUser(email:string,password:string){
    const authData:Authdata={email:email,password:password}
  
    this.http.post(BACKEND_URL+"/signup",authData).subscribe(res=>{
    this.login(authData.email,authData.password)
    this.router.navigate(['/'])
    this.authStatusListener.next(true);
    },error=>{
      this.authStatusListener.next(false);   
    }); 
  }

  login(email:string,password:string){

    
    
    const authData:Authdata={email:email,password:password}
    
    
    this.http.post<{token:string,expiresIn:number,userId:string}>(BACKEND_URL+"/login",authData).subscribe(res=>{
    console.log("res",res);



     const token=res.token;
     this.token=token;
     this.userId=res.userId;
    
     if(token){
      
      const expiresInDuration= res.expiresIn
      const userId=this.userId

     
      
      // this.isAuthenticated=true;
      // this.authStatusListener.next(true);
     
   
      this.setAuthTimer(expiresInDuration);
      const now = new Date();
      const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
      

      this.saveAuthData(token,expirationDate,userId)
      this.autoAuthUser();
      this.router.navigate(['/']);

     }
    },error=>{
        this.authStatusListener.next(false);
    })
  }

  logout(){

    // this.token=null;
    // this.userId=null;
    
    this.isAuthenticated=false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(['/']);
    clearTimeout(this.tokenTimer);

  }

  private setAuthTimer(duration:number){
    this.tokenTimer=setTimeout(()=>{
      this.logout();
    },duration * 1000)
  }

  private saveAuthData(token:string,expirationDate:Date,userId:string){
    localStorage.setItem("token",token)
    localStorage.setItem("expirationDate",expirationDate.toISOString());
    localStorage.setItem("userId",userId);
  }

  private clearAuthData(){
    localStorage.removeItem("token")
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate=localStorage.getItem("expirationDate");
    const userId=localStorage.getItem("userId");
    if(!token || !expirationDate){
      return
    }
    return{
      token:token,
      expirationDate:new Date(expirationDate),
      userId:userId
    }
  }
  
}
