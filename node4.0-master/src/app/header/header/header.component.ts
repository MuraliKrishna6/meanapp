import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  private authListenersubs:Subscription ;
  userIsAuthnticated=false;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.userIsAuthnticated= this.authService.gerIsAuth();
    this.authListenersubs= this.authService.getAuthStatusListener().subscribe(isAuthenticated=>{
      console.log("isauth",isAuthenticated)
    this.userIsAuthnticated=isAuthenticated;
    })

  
    
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.authListenersubs.unsubscribe();
  }
  

}
