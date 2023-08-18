import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { environment } from 'src/environments/environment';
import { UserDataService } from '../user-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../register/register.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  name!: string;
  _user!:User;
  fb: FormBuilder = new FormBuilder();
  profileFormGroup: FormGroup = this.fb.group({
    name: [environment.EMPTY_STRING, Validators.required],
    userName: [environment.EMPTY_STRING, Validators.required]
  });

  constructor(private _authService: AuthenticationService, 
    private _userService: UserDataService,
    private _router: Router){}

  update(){
    const user:User = this.profileFormGroup.value;
    this._userService.updateProfile(user, this._user._id).subscribe({
      next: (user) => console.log(user),
      error: (error) => console.log(error),
      complete: () => this.onComplete()
    });
  }

  onComplete(){
    localStorage.clear();
    this._authService.isLoggedIn = false;
    this._authService.emitTokenUpdate(null);
    this._router.navigate([environment.LOGIN_URL]);
  }
  getProfile(){
    this._userService.getProfile(this.name).subscribe({
      next: (user) => this.fillProfile(user),
      error: (error) => console.log(error)
    })
  }

  fillProfile(user: User){
    this._user = user;
    this.profileFormGroup.setValue({
      name: user.name,
      userName: user.userName
    });
  }

  ngOnInit(){
    const token: string | null = localStorage.getItem(environment.TOKEN_KEY);
    if(token) {
      this.name = this._authService.decodeToken(token).user;
      this.getProfile();
    }
  }
}
