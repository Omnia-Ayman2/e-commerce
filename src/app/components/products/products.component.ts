
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { Iproducts } from '../../core/interfaces/iproducts';
import { ProductsApiService } from '../../core/services/products-api.service';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/services/wish-list.service';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink,SearchPipe,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnDestroy,OnInit{
  text:string=""
  isAdded:string[]=[]
  productList:Iproducts[]=[]
  private readonly  _ProductsApiService=inject(ProductsApiService)
  private readonly  _CartService=inject(CartService)
  private readonly _ToastrService=inject(ToastrService)
  private readonly _WishListService=inject(WishListService)
  getAllProductsSub !:Subscription
ngOnInit(): void {
  this.getAllProductsSub= this._ProductsApiService.getAllProducts().subscribe({
    next:(res)=>{
      console.log(res.data);   
 this.productList=res.data;     
      },
      error:(err)=>{
        console.log(err);     
    } 
})
this._WishListService.userWishlist().subscribe({
  next:(res)=>{
    const newDta =res.data.map((item:any)=>item._id)
// this.isAdded=res.data
console.log(newDta);
    this.isAdded=newDta
  },
  error:(err)=>{
    console.log(err);
    
  }
})
}
ngOnDestroy(): void {
  this.getAllProductsSub?.unsubscribe()
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
addToWishlist(id:string):void{
  this._WishListService.addToWishlist(id).subscribe({
   next:(res)=>{
 this.isAdded=res.data
     this._ToastrService.success(res.message)
     console.log(this.isAdded);     
   },
   error:(err)=>{
     console.log(err);
     
   }
  })
 }
 deleteProduct(id:string):void{
   this._WishListService.deleteproduct(id).subscribe({
     next:(res)=>{
 this.isAdded=res.data
 
       this._ToastrService.success('Product removed successfully')
 this.ngOnInit()
       // this.wishlistDetails=res.data
       console.log(this.isAdded);
     },
     error:(err)=>{
       console.log(err);
       
     }
   })
 }
}
