import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
myHeaders:any={token :localStorage.getItem('userToken')}
  private readonly _HttpClient=inject(HttpClient)
  cartNum:BehaviorSubject<number>=new BehaviorSubject(0)
  addToCart(id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,{
      
    "productId":id
    },{
      headers:this.myHeaders
    }
  )
  }
 userCart():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`,{
      headers:this.myHeaders
    }
  )
  }
  deleteproduct(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`,{
      headers:this.myHeaders
    }
  )
  }
  clearCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/`,{
      headers:this.myHeaders
    }
  )
  }
updateCount(id:string,newCount:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
{
  "count":newCount
},
{
  headers:this.myHeaders
      
    }
  
  )
  }
}
