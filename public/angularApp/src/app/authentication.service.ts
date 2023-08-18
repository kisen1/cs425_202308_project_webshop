import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Token } from './login/login.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoggedIn:boolean = false;
  token!:Token | null;
  _tokenSubject:Subject<Token | null> =  new Subject<Token | null>();

  constructor(private _jwtHelper: JwtHelperService) { 
    this.token = this.getTokenFromLocalStorage();
  }

  decodeToken(token: string){
    return this._jwtHelper.decodeToken(token);
  }

  getTokenSubjectAsObservalbe():Observable<Token | null>{
    return this._tokenSubject.asObservable();
  }

  emitTokenUpdate(token: Token | null){
    this._tokenSubject.next(token);
  }

  private getTokenFromLocalStorage(): Token | null{
    const token: string | null =  localStorage.getItem(environment.TOKEN_KEY);
    if(token){
      return new Token(token);
    }
    return null;
  }

  
}
