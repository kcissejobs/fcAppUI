import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    //debugger

    if (token) {
      request = request.clone({
        setHeaders: {
          'Access-Control-Allow-Credentials': 'true',
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
