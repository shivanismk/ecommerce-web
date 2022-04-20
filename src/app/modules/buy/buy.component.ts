import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { Product } from 'src/app/models/product';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ProductService } from 'src/app/services/product.service';
import jspdf  from 'jspdf';
import html2canvas from 'html2canvas';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';
import { StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  submitted = false;
  error = '';
  data:any
  myform: any;
  productId: any;
  productData:Product| any;
  totalPrice = 0;
  paymentHandler: any = null;
  success: boolean = false
  failure:boolean = false


  @ViewChild(StripeCardComponent)
  card!: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'es'
  };
  userid:any;
 constructor(private fb: FormBuilder,
     private cartService: CartService,
      private route:ActivatedRoute,
       private checkoutservice:CheckoutService,
       private router:Router
       ) { }

  ngOnInit(): void {
    this.myform = this.fb.group({
    // quantity      : [''],
      fname       : ['',[Validators.required,Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z]+$')]],
      lname       : ['',[Validators.required,Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z]+$')]],
      // uname: ['',[Validators.required,Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      uname       : ['',[Validators.required]],
      email       : ['',[Validators.required]],
      mobile      : ['',[Validators.required]],
      address     : ['',[Validators.required]],
      state       : ['',[Validators.required]],
      city        : ['',[Validators.required]],
      zip         : ['',[Validators.required]],
      amount      : [],
      cardnumber  : [''],
      expdate     : [''],
      cvc         : ['']

    })
    
    this.route.params.subscribe((data)=>{
      this.userid=data.id
    })
  this.cartService.viewCart(this.userid ).subscribe((result)=> {
   this.productData = result;
      console.log(this.productData);
      for (let index = 0; index < result.length; index++) {
        const ele =   result[index];
        console.log(ele.quantity);
        this.totalPrice =  this.totalPrice + (ele.price*ele.quantity)
        // var tt=this.totalPrice;
        console.log(this.totalPrice);
        
    }
   });

  //  this.invokeStripe();
  }




  // createToken(): void {
  //   const name = this.stripeTest.get('name').value;
  //   this.stripeService
  //     .createToken(this.card.element, { name })
  //     .subscribe((result) => {
  //       if (result.token) {
  //         // Use the token
  //         console.log(result.token.id);
  //       } else if (result.error) {
  //         // Error creating the token
  //         console.log(result.error.message);
  //       }
  //     });
  // }

  get f() {
    return this.myform.controls;
  }

  downloadReceipt() {
    html2canvas(document.body).then((canvas) => {
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL("image/png");
      const pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save("checkout.pdf"); // Generated PDF
    });
  }

  onSubmit(formDirective: FormGroupDirective){
    this.submitted = true;
    if (this.myform.invalid) {
     return;
    }
    console.log(this.myform.value);

    this.checkoutservice.checkout(this.myform.value,).subscribe
      ({
        next: (result: any) => {
          console.log(result);
          Swal.fire({
            title: 'Checkout!',
            text: 'checkout successfully',
            icon: 'success',
            confirmButtonText: 'Woow'
          });
          this.router.navigate(['/'])
        },
        error: (e: any) => { },
        complete: () => { }
      })
  }


  // makePayment(amount: number) {
  //   const paymentHandler = (<any>window).StripeCheckout.configure({
  //     key: 'pk_test_51KjKdSSD8WAUVnUwNNn2C4gyb45GgpTk6vMyHkO5QRxoo57oP3t2fsUH09qOJixYbajgwDhfTbI7DXhuogtPv6L200PYrtTLfr',
  //     locale: 'auto',
  //     token: function (stripeToken: any) {
  //       console.log(stripeToken);
  //       paymentstripe(stripeToken);
  //     },
  //   });

    // const paymentstripe = (stripeToken: any) => {
    //   this.checkoutservice.makePayment(stripeToken).subscribe((data: any) => {
    //     console.log(data);
    //     if (data.data === "success") {
    //       this.success = true
    //     }
    //     else {
    //       this.failure = true
    //     }
    //   });
    // };

  //   paymentHandler.open({
  //     name: 'Coding Shiksha',
  //     description: 'This is a sample pdf file',
  //     amount: amount * 100,
  //   });
  // }

  // invokeStripe() {
  //   if (!window.document.getElementById('stripe-script')) {
  //     const script = window.document.createElement('script');
  //     script.id = 'stripe-script';
  //     script.type = 'text/javascript';
  //     script.src = 'https://checkout.stripe.com/checkout.js';
  //     script.onload = () => {
  //       this.paymentHandler = (<any>window).StripeCheckout.configure({
  //         key: 'pk_test_51KjKdSSD8WAUVnUwNNn2C4gyb45GgpTk6vMyHkO5QRxoo57oP3t2fsUH09qOJixYbajgwDhfTbI7DXhuogtPv6L200PYrtTLfr',
  //         locale: 'auto',
  //         token: function (stripeToken: any) {
  //           console.log(stripeToken ,'----------------->>>>>>>>>>> ');

  //         },
  //       });
  //     };

  //     window.document.body.appendChild(script);
  //   }
  // }
}
