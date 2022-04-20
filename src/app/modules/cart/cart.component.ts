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
  productData: Product | any
  hostname: string | any;
  cartData: any;
  cartId: any;
  element: any
  cartPrice: any;
  totalPrice = 0
  userid: any
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cart: CartService) { }

  ngOnInit(): void {
    this.hostname = environment.hosturl
    this.route.params.subscribe((data: any) => {
      this.userid = data.id;
      console.log(data.id);
    });
    this.cart.viewCart(this.userid).subscribe({
      next: (result: any) => {
        console.log(result);

        this.productData = result;
        //  }   

        for (let index = 0; index < result.cart.length; index++) {
          const ele = result.cart[index];
          this.totalPrice += (ele.price * ele.Quantity)
        }}
      });

  }
  onDelete(id: any) {
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
        })
      } else if (cartData.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }

    }).then(() => {
      window.location.reload();
    });
  }


}
