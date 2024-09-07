import { Iorders } from '../../core/interfaces/iorders';
import { AuthApiService } from '../../core/services/auth-api.service';
import { OrdersService } from './../../core/services/orders.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit{
  orderDetails:Iorders[]=[]
userID:string=''
private readonly _OrdersService=inject(OrdersService)
private readonly _AuthApiService=inject(AuthApiService)
ngOnInit(): void {
  this._AuthApiService.saveToken()
  this.userID=this._AuthApiService.user.id
  this._OrdersService.getUserOrders( this.userID).subscribe({
next:(res)=>{
  console.log(res);
  this.orderDetails=res
  // localStorage.setItem('userToken',res.token)
  // this._OrdersService.saveToken()
},
error:(err)=>{
  console.log(err);
  
}

  })

    }
   
}

