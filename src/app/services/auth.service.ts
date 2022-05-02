import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'node_modules/jwt-decode';

const TOKEN_KEY = '_edt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient
  ) { }

  loginUser(form) {
    return this.http.post(`${this.baseUrl}/auth/login`, form);
  }

  recuperarSenha(form) {
    return this.http.post(`${this.baseUrl}/auth/forgotPassword`, form);
  }

  resetarSenha(form) {
    return this.http.post(`${this.baseUrl}/auth/resetPassword`, form);
  }

  createUser(form, file: File) {

    const formData: FormData = new FormData();
    if (file != null) {
      formData.append('file', file, `${file.name}`);
    }
    formData.append('formulario', JSON.stringify(form));



    return this.http.post(`${this.baseUrl}/auth/register`, formData);
  }

  refresh() {
    return this.http.get(`${this.baseUrl}/auth/refresh`);
  }

  me() {
    this.http.get(`${this.baseUrl}/auth/me`).subscribe((res: any) => {
      this.setUser(null, res.token);
    });
  }

  public adminData() {
    return this.http.get(`${this.baseUrl}/admin/usrs`);
  }

  setUser(user, token): void {
    window.localStorage.setItem(TOKEN_KEY, token);
    (<any>window).user = user;
  }

  public getUser() {
    return (<any>window).user;
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public logout() {
    localStorage.removeItem(TOKEN_KEY);
  }

  public getUserLogado(): any {

    const token = this.getToken();
    return this.getDecodedAccessToken(token);

  }

  public getDecodedAccessToken(token: string): any {

    try {
      return jwt_decode(token);
    } catch (error) {
      return null;
    }

  }

}
