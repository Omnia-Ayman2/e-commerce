import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  user:any
 private readonly _Router=inject(Router)
private readonly _HttpClient=inject(HttpClient)
sendRegisterData(data:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data)
}
sendLoginData(data:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
}
saveToken():void{
if(localStorage.getItem('userToken')!==null)
{
this.user= jwtDecode( localStorage.getItem('userToken')!)
console.log(this.user)
}}
logOut():void{
  localStorage.removeItem('userToken')
  this.user = null
this._Router.navigate(['/login'])
}
setVerifyEmail(data:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data)
}
setVerifyeCode(data:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data)
}
setVResetPassword(data:object):Observable<any>{
  return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
}

}






















