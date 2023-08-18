import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable()
export class AuthenticationIntercepterInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authHead: string = environment.BEARER + localStorage.getItem(environment.TOKEN_KEY);
    const authReq = request.clone({ setHeaders: { authorization: authHead } });
    return next.handle(authReq);
  }
}
