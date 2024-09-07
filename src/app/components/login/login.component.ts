import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthApiService } from '../../core/services/auth-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgClass,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  isLoading:boolean=false
  islogin:boolean=false
  msgError:string=""
  loginFormSubmitSub !:Subscription
 private readonly _AuthApiService=inject(AuthApiService)
 private readonly _Router=inject(Router)
  loginForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)
    ]),
  });
loginFormSubmit():void{
  if(this.loginForm.valid){
    this.isLoading=true
this.loginFormSubmitSub= this._AuthApiService.sendLoginData(this.loginForm.value).subscribe({
  next:(res)=>{
    console.log(res)
    if(res.message=='success'){
      this.islogin=true
  localStorage.setItem('userToken',res.token)
  this._AuthApiService.saveToken()
  localStorage.setItem('userID',res.token.id)
        this._Router.navigate(['/home'])

    }
    this.isLoading=false
  },
  error:(err:HttpErrorResponse)=>{
    this.msgError=err.error.message
    console.log(err);
    this.isLoading=false
  }
})
    console.log(this.loginForm.value);
  }
}
ngOnDestroy(): void {
    {
this.loginFormSubmitSub?.unsubscribe()
    }
}

}
