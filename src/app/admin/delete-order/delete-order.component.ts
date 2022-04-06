import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutService } from 'src/app/services/checkout.service';
import { OrdersService } from 'src/app/services/orders.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'





@Component({
  selector: 'app-delete-order',
  templateUrl: './delete-order.component.html',
  styleUrls: ['./delete-order.component.css']
})
export class DeleteOrderComponent implements OnInit {
  productId: any;

  constructor(private orderServices:OrdersService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {

    this.route.params.subscribe((data : any)=>{
      this.productId=data.Oid;
      console.log(this.productId);
      this.orderServices.deleteOrder(this.productId).subscribe(data=>{
        this.productId = data;
        this.router.navigate(['/orders'])
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })
        // alert("order deleted successfully");
        // console.log("Product has been Deleted") //delete Data  selected id
      })
      
    })
  }

}
