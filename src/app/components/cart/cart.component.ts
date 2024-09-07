import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { log } from 'console';
import { Icart } from '../../core/interfaces/icart';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
private readonly  _NgxSpinnerService=inject(NgxSpinnerService)

private readonly _CartService=inject(CartService)
  private readonly _ToastrService=inject(ToastrService)
  cartDetails:Icart={} as Icart
ngOnInit(): void {
    this._CartService.userCart().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cartDetails=res.data
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
}
deleteProduct(id:string):void{
  this._CartService.deleteproduct(id).subscribe({
    next:(res)=>{
      this._ToastrService.success('Product removed successfully')

      this.cartDetails=res.data
      this._CartService.cartNum.next(res.numOfCartItems)

      console.log(res);
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
clearCart():void{
  this._CartService.clearCart().subscribe({
    next:(res)=>{
      if(res.message=='success')
      this.cartDetails={} as Icart
    this.cartDetails.totalCartPrice=0 
    this._CartService.cartNum.next(0)

    this._ToastrService.success('Cart cleared successfully')

      console.log(res);
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
updateCount(id:string,count:number):void{
  this._CartService.updateCount(id,count).subscribe({
    next:(res)=>{
      this.cartDetails=res.data
      console.log(res);
      
    },
    error:(err=>{
      console.log(err);
      
    })
  })
}
}
