import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-creat-product',
  templateUrl: './creat-product.component.html',
  styleUrls: ['./creat-product.component.css']
})
export class CreatProductComponent implements OnInit {
  myform: any;
  cd: any;
  url: string | any;


  constructor(private fb: FormBuilder,
     private productService: ProductService, 
     private router:Router ) { }

  ngOnInit(): void {
    this.myform = this.fb.group({
      for: [''],
      catName:[''],
      pname: [''],
      url: [null],
      description: [''],
      rating: [''],
      price: ['']
    })
  }

  onSelectedFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myform.patchValue({
        url: file
      });
    }
  }

  onSubmit(formDirective: FormGroupDirective): void {
    console.log(this.myform.value)

    const formData = new FormData();
    formData.append('for', this.myform.get('for').value);
    formData.append('catName', this.myform.get('catName').value);
    formData.append('url', this.myform.get('url').value);
    formData.append('pname', this.myform.get('pname').value);
    formData.append('rating', this.myform.get('rating').value);
    formData.append('price', this.myform.get('price').value);
    formData.append('description', this.myform.get('description').value);

    this.productService.creatProduct(formData).subscribe
      ({
        next: (result: any) => {
          console.log(result);
          this.router.navigate(['/ad-product-list'])
          
          Swal.fire({
            title: ' Created !',
            text: 'Product created  successfully',
            icon: 'success',
            confirmButtonText: 'Woow'
          }); 

        },
        error: (e: any) => { },
        complete: () => { }
      })
  }

}





