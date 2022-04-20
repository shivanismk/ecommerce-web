import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './modules/cart/cart.component';
import { DeleteProductComponent } from './modules/product/delete-product/delete-product.component';
import { HomeComponent } from './admin/home/home.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { UpdateProductComponent } from './modules/product/update-product/update-product.component';
import { ViewProductListComponent } from './modules/product/view-product-list/view-product-list.component';
import { ViewProductComponent } from './modules/product/view-product/view-product.component';
import { CreatProductComponent } from './modules/product/creat-product/creat-product.component';
import { ViewCategoryListComponent } from './modules/product/view-category-list/view-category-list.component';
import { CreateCategoryComponent } from './modules/create-category/create-category.component';
import { BuyComponent } from './modules/buy/buy.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { AdProductListComponent } from './admin/ad-product-list/ad-product-list.component';
import { DeleteOrderComponent } from './admin/delete-order/delete-order.component';
import { AuthGuard } from './auth.guard';
import { FilteredProductComponent } from './modules/product/filtered-product/filtered-product.component';




const routes: Routes=[
  //{path:'', component:HomeComponent},
  // {path: '', redirectTo: 'register', pathMatch: 'full'},
  {path:'',component:ViewProductListComponent},
  {
      path:'home/:Aid',
      component:HomeComponent,
      canActivate:[AuthGuard]
  },
  {path:'login',  component:LoginComponent},

  {path:'register', component:RegisterComponent},
  {path:'cart/:id', component:CartComponent,},
  {path:'view-product/:id',component:ViewProductComponent},
  {path:'view-product-list/:id',component:ViewProductListComponent},
  {
     path:'update-product/:id',
     component:UpdateProductComponent,
     canActivate:[AuthGuard]
  },
   {
     path:'delete-product/:id',
     component:DeleteProductComponent,
     canActivate:[AuthGuard]
  },
   {
     path:'creat-product',
     component:CreatProductComponent,
     canActivate:[AuthGuard]
    },
   {path:'view-category-list',component:ViewCategoryListComponent},
   {path:'create-category',component:CreateCategoryComponent},
   { path:'buy',component:BuyComponent},
   { path:'buy/:id',component:BuyComponent},
   {
      path:'orders',
      component:OrdersComponent,
      canActivate:[AuthGuard]
    },
   {path:'ad-product-list',component:AdProductListComponent},
   {path:'delete-order/:Oid',component:DeleteOrderComponent},
   {path:'deleteCartProduct/:id', component:DeleteOrderComponent},
   {path:'filterProduct/:id', component:FilteredProductComponent}
   
  
]

@NgModule({
  imports: 
  [RouterModule.forRoot(routes)],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
