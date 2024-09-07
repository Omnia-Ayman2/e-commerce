import { CategoryService } from './../../core/services/category.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Icategory } from '../../core/interfaces/icategory';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnDestroy,OnInit{
  text:string=""
cattList:Icategory[]=[]
  private readonly  _CategoryService=inject(CategoryService)
  getAllProductsSub !:Subscription
ngOnInit(): void {
  this.getAllProductsSub= this._CategoryService.getAllCategories().subscribe({
    next:(res)=>{
      console.log(res.data);   
 this.cattList=res.data;     
      },
      error:(err)=>{
        console.log(err);     
    } 
})
}
ngOnDestroy(): void {
  this.getAllProductsSub?.unsubscribe()
}
}
