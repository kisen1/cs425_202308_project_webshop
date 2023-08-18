import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from '../user-data.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export class User {
  #_id!:string;
  #name!: string;
  #userName!: string;
  #password!: string;

  constructor(id:string, name: string, userName: string, password: string) {
    this.#_id = id;
    this.#name = name;
    this.#userName = userName;
    this.#password = password;
  }

  set name(name: string) {
    this.#name = name;
  }
  set userName(userName: string) {
    this.#userName = userName;
  }
  set password(password: string) {
    this.#password = password;
  }
  set _id(id: string) {
    this.#_id = id;
  }

  get name() {
    return this.#name;
  }
  get userName() {
    return this.#userName;
  }
  get password() {
    return this.#password;
  }
  get _id() {
    return this.#_id;
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  fb: FormBuilder = new FormBuilder();
  showSignUpBtn: boolean = true;
  registerFormGroup: FormGroup = this.fb.group({
    name: [environment.EMPTY_STRING, Validators.required],
    userName: [environment.EMPTY_STRING, Validators.required],
    password: [environment.EMPTY_STRING, Validators.required],
    repeatPassowrd: [environment.EMPTY_STRING, Validators.required]
  });

  constructor(private _userService: UserDataService, private _router: Router){}

  register() {
    this.showSignUpBtn = false;
    const user: User = this.registerFormGroup.value;
    console.log(user);
    this._userService.register(user).subscribe({
      next: (user) => this._router.navigate([environment.LOGIN_URL]),
      error: (error) => console.log(error),
      complete: () => this.showSignUpBtn = true
    });
  }
}
