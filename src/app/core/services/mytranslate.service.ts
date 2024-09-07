import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MytranslateService {
private readonly _TranslateService=inject(TranslateService)
  constructor() {
    let saveLang=localStorage.getItem('lang')
    this._TranslateService.setDefaultLang('en')
    this._TranslateService.use(saveLang !)
    this.changeDir()
   }
   changeDir():void{
    let saveLang=localStorage.getItem('lang')

    if(saveLang ==='en'){
      document.documentElement.dir='ltr'
    }
    else if(saveLang ==='ar'){
      document.documentElement.dir='rtl'
    }
   }
}
