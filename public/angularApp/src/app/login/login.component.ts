import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from '../user-data.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export class Credentials{
  #userName!: string;
  #password!: string;
 
  constructor(userName:string, password:string){
    this.userName = userName;
    this.password = password;
  }

  set userName(userName:string){
     this.#userName = userName;
  }
  set password(password:string){
     this.#password = password;
  }

  get userName(){
    return this.#userName;
  }
  get password(){
    return this.#password;
  }
}

export class Token{
  #token!:string;

  constructor(token:string){
    this.token = token;
  }

  set token(token:string){
    this.#token = token;
  }
  get token(){
    return this.#token;
  }
}





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showSuccessAlert: boolean = false;
  showFailedAlert: boolean = false;
  showLoginBtn: boolean = true;
  fb: FormBuilder = new FormBuilder();
  loginFormGroup: FormGroup = this.fb.group({
    userName: [environment.EMPTY_STRING, Validators.required],
    password: [environment.EMPTY_STRING, Validators.required]
  });

  constructor(private _userService:UserDataService, 
    private _authenticationService: AuthenticationService,
    private _router: Router
  ){}

  login(){
    this.showLoginBtn = false;
    this.showFailedAlert = false;
    this.showSuccessAlert = false;
    const credentials: Credentials = this.loginFormGroup.value;
    this._userService.login(credentials).subscribe({
      next: (token) =>  this.onLoginSuccess(token),
      error: (error) => this.onFailedLogin(error),
      complete: () => this._router.navigate([environment.HOME_URL]),
    });
  }

  onLoginSuccess(token: Token){
    this.setLoggedIn(token);
    this.setSuccessAlert();
  }

  onFailedLogin(error: any){
    this.setFailedAlert(error);
    this.showLoginBtn = true;
  }

  setLoggedIn(token: Token){
    this._authenticationService.emitTokenUpdate(token);
    localStorage.setItem(environment.TOKEN_KEY, token.token);
  }

  setSuccessAlert(){
    this.showSuccessAlert = true;
    this.showFailedAlert = false;
  }

  setFailedAlert(error: any){
    this.showSuccessAlert = false;
    console.log(error);
    if(error.status === environment.NOT_FOUND_404_HTTP_CODE || error.status === environment.FORBIDEN_403_HTTP_CODE){
      this.showFailedAlert = true;
    }
  }
}
