import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './register/register.component';
import { Observable } from 'rxjs';
import { Credentials, Token } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  _baseURL: string = 'http://localhost:3000/api/users'

  constructor(private _http: HttpClient) { }

  register(user: User): Observable<User>{
    return this._http.post<User>(this._baseURL, user);
  }

  login(credentials: Credentials): Observable<Token>{
    const url:string = this._baseURL + "/login";
    return this._http.post<Token>(url, credentials);
  }

  getProfile(name: string) : Observable<User>{
    const url: string = this._baseURL + "/" + name;
    return this._http.get<User>(url);
  }

  updateProfile(user: User, userId: string){
    const url:string = this._baseURL + "/update/" + userId;
    return this._http.patch(url, user); 
  }
}
