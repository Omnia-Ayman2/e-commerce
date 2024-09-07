import { blankGuard } from './core/guards/blank.guard';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { logedGuard } from './core/guards/loged.guard';
import { DetailsComponent } from './components/details/details.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { OrdersComponent } from './components/orders/orders.component';

export const routes: Routes = [
    {path:'',component:AuthLayoutComponent,canActivate:[logedGuard],children:[
        {path:'',redirectTo:'login',pathMatch:'full'},
       {path:'login',component:LoginComponent,title:'login'},
       {path:'register',component:RegisterComponent,title:'register'},
       {path:'forgot',component:ForgotPasswordComponent,title:'forgot'}
]
    },
    {path:'',component:BlankLayoutComponent,canActivate:[blankGuard],children :[
        {path:'',redirectTo:'home',pathMatch:'full'},
       {path:'home',component:HomeComponent,title:'home'} ,
       {path:'wishList',component:WishListComponent,title:'wishList'} ,
       {path:'cart',component:CartComponent,title:'cart'},
       {path:'categories',component:CategoriesComponent,title:'categories'},
       {path:'products',component:ProductsComponent,title:'products'},
       {path:'brands',component:BrandsComponent,title:'brands'},
       {path:'details/:id',component:DetailsComponent,title:'details'},
       {path:'allorders',component:AllordersComponent,title:'allorders'},
       {path:'orders/:id',component:OrdersComponent,title:'orders'}
    ]
    },
    {path:'**',component:NotFoundComponent}
];
