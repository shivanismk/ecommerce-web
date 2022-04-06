import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  productId: any;
  productData:Product|any
  hostname:string|any;
  cartData: any;
  cartId: any;
  element: any
  cartPrice: any;
  totalPrice = 0
  
  constructor(private productService: CartService,
     private route:ActivatedRoute,
     private router:Router, 
     private cart:CartService) { }
    
  ngOnInit(): void {
    this.hostname = environment.hosturl
  
     this.productService.viewCart().subscribe((data)=> {
      
      this.productData = data.cart;
      for (let index = 0; index < data.cart.length; index++) {
          const ele = data.cart[index];
          this.totalPrice += (ele.price*ele.Quantity)

      }
      console.log(this.totalPrice);
          
      console.log(this.productData);    
   });
  }



  onDelete(id : any){
   
      Swal.fire({  
        title: 'Are you sure want to remove?',  
        text: 'You will not be able to recover this file!',  
        icon: 'warning',  
        showCancelButton: true,  
        confirmButtonText: 'Yes, delete it!',  
        cancelButtonText: 'No, keep it'  
      }).then((cartData) => {  
        
        if (cartData.value) {
          this.cart.deleteCartProduct(id).subscribe((data) => {
            this.cartData = data.cart;
            console.log(data);
            this.router.navigate(['/cart'])  
          Swal.fire(  
            'Deleted!',  
            'Your imaginary file has been deleted.',  
            'success'  
          )  
          }
          )
        } else if (cartData.dismiss === Swal.DismissReason.cancel) {  
          Swal.fire(  
            'Cancelled',  
            'Your imaginary file is safe :)',  
            'error'  
          )  
        }  
     
    }) .then(() => {
            window.location.reload();
          }); 
  }


}
