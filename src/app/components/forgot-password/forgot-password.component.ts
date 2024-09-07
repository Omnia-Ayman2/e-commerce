import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from '../../core/services/auth-api.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  private readonly _AuthApiService=inject(AuthApiService)
  private readonly _Router=inject(Router)

  step:number=1
verifyEmail:FormGroup=new FormGroup({
  email:new FormControl(null,[Validators.required,Validators.email])
})
verifyCode:FormGroup=new FormGroup({
  recetCode:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)])
})

recetPassword:FormGroup=new FormGroup({
  email:new FormControl(null,[Validators.required,Validators.email]),
  newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)])
})
verifyEmailSubmit():void{
  let emailValue=this.verifyEmail.get('email')?.value
  this.recetPassword.get('email')?.patchValue(emailValue)
  this._AuthApiService.setVerifyEmail(this.verifyEmail.value).subscribe(
    {
      next:(res)=>{
        console.log(res);
        if(res.statusText ==="success"){
          this.step=2
        }
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    }
  )
}
verifyCodeSubmit():void{
  this._AuthApiService.setVerifyeCode(this.verifyCode.value).subscribe(
    {
      next:(res)=>{
        console.log(res);
        if(res.statusText ==="Success"){
          this.step=3
        }
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    }
  )
}
ResetPasswordSubmit():void{
  this._AuthApiService.setVResetPassword(this.recetPassword.value).subscribe(
    {
      next:(res)=>{
        console.log(res);
        localStorage.setItem('userToken',res.token)
        this._AuthApiService.saveToken()
  this._Router.navigate(['/home'])
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    }
  )
}
}
