import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { AppComponent } from './app.component';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { HeaderComponent } from './header/header/header.component';
import { AuthInterceptor } from './auth/auth-interceptor';

import { ErrorInterceptor } from './auth/error-interceptor';
import { ErrorComponent } from './Error/error/error.component';

import { AngularmatrialModule } from './angular-material.module';

import { PostsModule } from './posts/posts.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent 
  ],
  imports: [
    BrowserModule,
    AngularmatrialModule,
    HttpClientModule,
    AppRoutingModule,
   
    BrowserAnimationsModule,
  
    PostsModule,
   ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true},
  ],
  bootstrap: [AppComponent],
  entryComponents:[ErrorComponent]
})
export class AppModule { }
