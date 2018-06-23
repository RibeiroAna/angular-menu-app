import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: '[YOUR_CLIENT_ID]',
    domain: '[YOUR_DOMAIN]',
    responseType: 'token id_token',
    audience: 'http://localhost:3000',
    redirectUri: 'http://localhost:4200/login',
    scope: 'openid profile'
  });

  constructor() {}

  public login(): void {
    this.auth0.authorize();
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this._setSession(authResult);
        window.location.reload();
      } else if (err) {
        console.log(err);
      }
    });
  }

  private _setSession(authResult): void {
    // Set the time that the Access Token will expire at
    // console.log(authResult);
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public isAdmin(): boolean {
    // check if there is a property Admin in access token
    const token = localStorage.getItem('access_token');
    if (token) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      if (decodedToken['http://localhost:3000/roles'].indexOf('admin') > -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public getProfile(): Object {
    const token = localStorage.getItem('id_token');
    if (token) {
      const helper = new JwtHelperService();
      return helper.decodeToken(token);
    }
  }

  public getAccessToken(): String {
    return  localStorage.getItem('access_token');
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }
}
