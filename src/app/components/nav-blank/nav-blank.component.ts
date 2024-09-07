import { CartService } from './../../core/services/cart.service';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthApiService } from '../../core/services/auth-api.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit{
  countNum:number=0
 readonly _AuthApiService=inject(AuthApiService)
 readonly _CartService=inject(CartService)

ngOnInit(): void {
  this._CartService.userCart().subscribe({
    next:(res)=>{
      console.log(res);
      this._CartService.cartNum.next(res.
        numOfCartItems)
      
    }
  })
    this._CartService.cartNum.subscribe({
      next:(data)=>
        this.countNum=data,  
      
    })
}
}
