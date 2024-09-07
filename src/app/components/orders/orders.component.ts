import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';
@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit{
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly _OrdersService=inject(OrdersService)
  cartId:string|null=''
order: FormGroup=new FormGroup({
details:new FormControl(null,Validators.required),
  phone:new FormControl(null,Validators.required),
  city:new FormControl(null,Validators.required)
})
orderSubmit():void{
console.log(this.order.value); 
}
ngOnInit(): void {
this._ActivatedRoute.paramMap.subscribe({
 next:(params)=>{
this.cartId= params.get('id')
console.log(this.cartId);   
this._OrdersService.chekOut(this.cartId,this.order.value).subscribe({
  next:(res)=>{
    console.log(res);
    if(res.status=='success'){
      window.open(res.session.url,'_self')
    }
  },
  error:(err)=>{
    console.log(err);
    
  }
})

}
})
}
}
