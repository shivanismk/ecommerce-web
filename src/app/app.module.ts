import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { HomeComponent } from './admin/home/home.component';

import { ViewProductListComponent } from './modules/product/view-product-list/view-product-list.component';
import { ViewProductComponent } from './modules/product/view-product/view-product.component';
import { CreatProductComponent } from './modules/product/creat-product/creat-product.component';
import { UpdateProductComponent } from './modules/product/update-product/update-product.component';
import { DeleteProductComponent } from './modules/product/delete-product/delete-product.component';
import { CartComponent } from './modules/cart/cart.component';
import {HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ViewCategoryListComponent } from './modules/product/view-category-list/view-category-list.component';
import { CreateCategoryComponent } from './modules/create-category/create-category.component';
import { BuyComponent } from './modules/buy/buy.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { AdProductListComponent } from './admin/ad-product-list/ad-product-list.component';
import { DeleteOrderComponent } from './admin/delete-order/delete-order.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AuthGuard } from './auth.guard';
import { FilterPipe } from './pipes/filter.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FilteredProductComponent } from './modules/product/filtered-product/filtered-product.component';
import { NgxStripeModule } from 'ngx-stripe';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ViewProductListComponent,
    ViewProductComponent,
    CreatProductComponent,
    UpdateProductComponent,
    DeleteProductComponent,
    CartComponent,
    ViewCategoryListComponent,
    CreateCategoryComponent,
    BuyComponent,
    OrdersComponent,
    AdProductListComponent,
    DeleteOrderComponent,
    FilterPipe,
    FilteredProductComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    SweetAlert2Module.forRoot(),
    NgxStripeModule.forRoot('pk_test_51KjKdSSD8WAUVnUwNNn2C4gyb45GgpTk6vMyHkO5QRxoo57oP3t2fsUH09qOJixYbajgwDhfTbI7DXhuogtPv6L200PYrtTLfr'),
  

    // jsPDF,
    
    
  ],
  providers: [
    CookieService,AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
