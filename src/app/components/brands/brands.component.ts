import { Isbrand } from './../../core/interfaces/isbrand';
import { Ibrand } from './../../core/interfaces/ibrand';
import { Subscription } from 'rxjs';
import { BrandsService } from './../../core/services/brands.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit ,OnDestroy{


private readonly _ActivatedRoute=inject(ActivatedRoute)
private readonly _BrandsService=inject(BrandsService)
// idBrand:any
getSpecificbrandSub !:Subscription
getAllBrandsSub!:Subscription
brandList:Ibrand[]=[]
brandDetails:Isbrand={} as Isbrand
ngOnInit(): void {
  this.getAllBrandsSub= this._BrandsService.getAllBrands().subscribe({
    next:(res)=>{
      console.log(res.data);   
 this.brandList=res.data;     
      },
      error:(err)=>{
        console.log(err);     
    } 
})}
ngOnDestroy(): void {
  this.getAllBrandsSub?.unsubscribe()
  this.getSpecificbrandSub.unsubscribe()
}
showModal(id:string):void{

  // this._ActivatedRoute.paramMap.subscribe({
  //   next:(p)=>{
  // this.idBrand=p.get("id");
  
  this.getSpecificbrandSub=this._BrandsService.getSpecificBrand(id).subscribe({
        next:(res)=>{
        this.brandDetails=res.data
        console.log(this.brandDetails);
        
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    // },
    // error:(err)=>{
    //   console.log(err);
      
    // }
  // })
}
}





