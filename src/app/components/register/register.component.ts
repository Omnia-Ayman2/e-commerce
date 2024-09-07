import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { AuthApiService } from '../../core/services/auth-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {
  isLoading:boolean=false
  isRegister:boolean=false
  msgError:string=""
  registerFormSubmitSub !:Subscription
 private readonly _AuthApiService=inject(AuthApiService)
 private readonly _Router=inject(Router)
  registerForm:FormGroup=new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)
    ]),
    rePassword:new FormControl(null)
  },this.confirmPassword);

confirmPassword (g : AbstractControl){
  if(g.get('password')?.value===g.get('rePassword')?.value){
    return null;
  }
  else{
    return {mismatch:true}
  }
}
registerFormSubmit():void{
  if(this.registerForm.valid){
    this.isLoading=true
this.registerFormSubmitSub= this._AuthApiService.sendRegisterData(this.registerForm.value).subscribe({
  next:(res)=>{
    console.log(res)
    if(res.message=='success'){
      this.isRegister=true     
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
    console.log(this.registerForm.value);
  }
}
ngOnDestroy(): void {
    this.registerFormSubmitSub?.unsubscribe()
}
}














