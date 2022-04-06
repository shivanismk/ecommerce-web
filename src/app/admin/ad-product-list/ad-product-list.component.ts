import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
// import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';


type AOA = any[][];

@Component({
  selector: 'app-ad-product-list',
  templateUrl: './ad-product-list.component.html',
  styleUrls: ['./ad-product-list.component.css']
})
export class AdProductListComponent implements OnInit {
  productList: Product|any;
  hostname:string|any;
  // myform : any;
  constructor(private productsService:ProductService,
    private fb:FormBuilder,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.hostname = environment.hosturl
    this.productsService.viewProductList().subscribe( {
      next:(data:any)=>{
        this.productList = data.product;
        console.log(this.productList);
        console.log(data.product);    
        
      }
       
       
    });

//for create excelfile
// this.myform = this.fb.group({
// excel:[null]
// })

  }

  data: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';


  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      console.log(this.data);
      this.productsService.creatExcelProduct(this.data).subscribe
      ({
        
        next: (result: any) => {
          console.log(result);
          console.log(this.data);
          this.router.navigate(['/ad-product-list'])
          
          // Swal.fire({
          //   title: ' Created !',
          //   text: 'Product created  successfully',
          //   icon: 'success',
          //   confirmButtonText: 'Woow'
          // }); 

        },
        error: (e: any) => { },
        complete: () => { }
        
      })
      
    };
    
    reader.readAsBinaryString(target.files[0]);
  }

//   onSubmit(formDirective: FormGroupDirective):void{
// console.log(this.myform.value);

//   }


export(): void {
  /* generate worksheet */
  const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

  /* generate workbook and add the worksheet */
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  /* save to file */
  XLSX.writeFile(wb, this.fileName);
}

}

