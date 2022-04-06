import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  productData: Product[] | any;
  productId: any;
  hostname: string | any;
  myform: any;

  

  constructor(private fb: FormBuilder,  private router:Router, private cartService:CartService, private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.myform = this.fb.group({

      size: ['S',[Validators.required]],
      Quantity: ['1',[Validators.required]]

    })

    this.hostname = environment.hosturl
    this.route.params.subscribe((data: any) => {
      this.productId = data.id;
      console.log(data.id);


    })
    this.productService.viewProduct(this.productId).subscribe((data) => {

      this.productData = data;
      console.log(this.productData);

    });
  }

  get f() {
    return this.myform.controls;
  }
  onSubmit(formDirective: FormGroupDirective): void {
    console.log(this.myform.value)

    this.cartService.addOrder(this.myform.value,this.productId).subscribe
      ({
        next: (result: any) => {
          console.log(result);
          this.router.navigate(['/cart'])
          Swal.fire({
            title: 'Added!',
            text: 'Added product successfully',
            icon: 'success',
            confirmButtonText: 'Woow'
          });
        },
        error: (e: any) => { },
        complete: () => { }
      })
  }
}






