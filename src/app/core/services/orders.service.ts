import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  user:any
  myHeader:any = {token:localStorage.getItem('userToken')}
private readonly _HttpClient =inject(HttpClient)
chekOut(idCart:string |null,shippingDetails:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${idCart}?url=${environment.serverUrl}`,
    {
      "shippingAddress":shippingDetails
    },
    {
      headers:this.myHeader
    }
  )
}
getUserOrders(id:string|null):Observable<any>{
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}`)
}
}
