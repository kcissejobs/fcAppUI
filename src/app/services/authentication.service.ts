import { Injectable } from '@angular/core';
import { AppUser } from '../models/user.model';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';

type JwtToken = {
  access_token: string;
  refresh_token: string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  users: AppUser[]= [];
  private currentUser: AppUser | undefined;

  //PATH_OF_API = "https://app-h6f9.onrender.com/api/v1"
  PATH_OF_API = environment.apiUrl;

  requestHeaders = new HttpHeaders(
    {"No-Auth": "True"}
  )

  constructor(private http: HttpClient) { 
    //this.users.push({username: "user1", userId: "123", password:"1234", roles:["USER"]});
    //this.users.push({username: "user2", userId: "123", password:"1234", roles:["ADMIN"]});
  }

  public login(username: string, password: string) : Observable<JwtToken> {
   
    return this.http.post<JwtToken>(this.PATH_OF_API +"/auth/authenticate", {email: username, password});
    /**
     *  let appUser = this.users.find(user=> user.username == username);
    if(!appUser) return throwError(()=> new Error("User not found"));
    if(appUser.password != password) return throwError(()=> new Error("Bad credentials")); 

    return of(appUser);
     */
   
  }

  public authenticateUser(appUser: AppUser) {
    //this.authenticatedUser = appUser;
    localStorage.setItem("authUser", JSON.stringify({username: appUser.username, roles: appUser.role, jwt: "JWT TOKEN"}))
  }

  public hasRole(role :string) : boolean{
    return this.currentUser!.role==role;
  }

  public isAuthenticated() : boolean {
    
   // return this.authenticatedUser != undefined;
   return true;
  }

  public logout() : Observable<boolean> {
    //this.authenticatedUser = undefined;
    localStorage.removeItem("authUser");

    return of(true);
  }

  public setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  public getAuthenticatedUser() : Observable<AppUser> {

    if(this.currentUser) return of(this.currentUser);
    return this.http.get<AppUser>(this.PATH_OF_API +"/user/findCurrentUser");

  }

  public setAuthenticatedUser(appUser: AppUser) {
    this.currentUser = appUser;
  }
  public getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
