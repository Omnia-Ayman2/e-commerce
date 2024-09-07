import { ProductsApiService } from './../../core/services/products-api.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproducts } from '../../core/interfaces/iproducts';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/services/wish-list.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, OnDestroy{
  detailsProduct:Iproducts |null = null

  private readonly _ToastrService=inject(ToastrService)

  private readonly _CartService=inject(CartService)
  getSpecificProductsSub !:Subscription
private readonly _ActivatedRoute=inject(ActivatedRoute)
private readonly _ProductsApiService=inject(ProductsApiService)
private readonly _WishListService=inject(WishListService)
isAdded:string[]=[]

ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
  let idProduct=p.get('id');

 this.getSpecificProductsSub=this._ProductsApiService.getSpecificProducts(idProduct).subscribe({
          next:(res)=>{
          this.detailsProduct=res.data
          console.log(this.detailsProduct);
          },
          error:(err)=>{
            console.log(err);
            
          }
        })
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
    this.getSpecificProductsSub.unsubscribe()
}

customOptionsOne: OwlOptions = {
  loop: true,
  // autoplay:true,
  // autoplayTimeout:3000,
  // autoplayHoverPause:true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: true,
  navSpeed: 700,
  // navText: ['<i class="fa-solid fa-backward m-0 p-0 text-black"></i>', '<i class="fa-solid fa-forward text-black"></i>'],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  },
  nav: false
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