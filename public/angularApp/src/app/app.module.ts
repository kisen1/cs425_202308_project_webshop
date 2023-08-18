import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatGridListModule} from '@angular/material/grid-list';
import { JWT_OPTIONS, JwtHelperService, JwtModule } from "@auth0/angular-jwt";

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { ErrorComponent } from './error/error.component';
import { routes } from './routes';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { SingleReviewComponent } from './single-review/single-review.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationIntercepterInterceptor } from './authentication-intercepter.interceptor';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HeaderComponent,
    HomeComponent,
    ProductsComponent,
    SingleProductComponent,
    ErrorComponent,
    AddProductComponent,
    UpdateProductComponent,
    ReviewsComponent,
    AddReviewComponent,
    SingleReviewComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatGridListModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    JwtModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationIntercepterInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
