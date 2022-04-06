import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  myform: any;
  constructor(private fb: FormBuilder,private productService: ProductService) { }

  ngOnInit(): void {
    this.myform = this.fb.group({
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

onSubmit(formDirective: FormGroupDirective){
  const formData = new FormData();

  formData.append('url', this.myform.get('url').value);
  formData.append('pname', this.myform.get('pname').value);
  formData.append('rating', this.myform.get('rating').value);
  formData.append('price', this.myform.get('price').value);
  formData.append('description', this.myform.get('description').value);

this.productService.updateProduct(formData).subscribe({
  
    next: (result: any) => {
      console.log(result);
      // this.router.navigate(['/'])
    },
    error: (e: any) => { },
    complete: () => { }
  
})

}

}
