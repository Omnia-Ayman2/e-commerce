import { WishListService } from './../../core/services/wish-list.service';
import { Component, inject, OnInit } from '@angular/core';
import { Icart } from '../../core/interfaces/icart';
import { ToastrService } from 'ngx-toastr';
import { Iproducts } from '../../core/interfaces/iproducts';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit{
private readonly _WishListService=inject(WishListService)
private readonly _ToastrService=inject(ToastrService)
private readonly _CartService=inject(CartService)

wishlistDetails:Iproducts[]=[]

ngOnInit(): void {
    this._WishListService.userWishlist().subscribe({
      next:(res)=>{
        console.log(res);
      this.wishlistDetails=res.data
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
}
deleteProduct(id:string):void{
  this._WishListService.deleteproduct(id).subscribe({
    next:(res)=>{
      this._ToastrService.success('Product removed successfully')
this.ngOnInit()
      // this.wishlistDetails=res.data
      console.log(res);
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
addToCart(id:string):void{
  this._CartService.addToCart(id).subscribe({
    next:(res)=>{
      this._ToastrService.success(res.message)
      this._CartService.cartNum.next(res.numOfCartItems)

      console.log(res);     
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
}