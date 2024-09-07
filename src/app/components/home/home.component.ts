import { DetailsComponent } from './../details/details.component';
import { WishListService } from './../../core/services/wish-list.service';
import { FormGroup, FormsModule } from '@angular/forms';

import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsApiService } from '../../core/services/products-api.service';
import { error } from 'console';
import { Iproducts } from '../../core/interfaces/iproducts';
import { CategoryService } from '../../core/services/category.service';
import { Icategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink,RouterLinkActive,SearchPipe,FormsModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit ,OnDestroy{
  productList:Iproducts[]=[]
  text:string=""
  isAdded:string[]=[]
  catList:Icategory[]=[]
  getAllCategoriesSub !:Subscription
  getAllProductsSub !:Subscription
  private readonly _CartService=inject(CartService)
private readonly  _ProductsApiService=inject(ProductsApiService)
private readonly  _CategoryService=inject(CategoryService)
private readonly  _ToastrService=inject(ToastrService)
private readonly  _WishListService=inject(WishListService)
private readonly  _Router=inject(Router)
private readonly  _NgxSpinnerService=inject(NgxSpinnerService)

ngOnInit(): void {
//  this._NgxSpinnerService.show()

  this.getAllCategoriesSub=  this._CategoryService.getAllCategories().subscribe({
    next:(res)=>{

      console.log(res.data); 
this.catList=res.data
// this._NgxSpinnerService.hide()

  },
error:(err)=>{
  console.log(err);
  
}})
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
    this.getAllCategoriesSub?.unsubscribe()

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
customOptionsTwo: OwlOptions = {
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

      items: 1,
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