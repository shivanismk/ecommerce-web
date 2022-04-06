import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-filtered-product',
  templateUrl: './filtered-product.component.html',
  styleUrls: ['./filtered-product.component.css']
})
export class FilteredProductComponent implements OnInit {
  productList:Product[]=[];
  hostname: string | undefined;
  product: any;
   productData:Product[]=[]
  productId: any;

  constructor(private productsService:ProductService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: any) => {
      this.productId = data.id;
      console.log(data.id);


    })
    this.hostname = environment.hosturl
    this.productsService.viewProductList().subscribe({
      next:(data:any)=>{
        
        this.productData = data.product
        
        this.productList = this.productData.filter( x => x.catName == this.productId)
        console.log(this.productList);
        
      }
    });
  }
  sortByName(){
    this.productList.sort(function(a, b) {
      var textA = a.pname.toUpperCase();
      var textB = b.pname.toUpperCase(); 
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });
  }
  sortByRating(){
    this.productList.sort(function(a, b) {
      var textA = a.rating;
      var textB = b.rating;
      console.log(textA);
      
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });
  }
  sortByPrice(){
    this.productList.sort(function(a, b) {
      var textA = a.price;
      var textB = b.price;
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });
  }
  sortById(){
    this.productList.sort(function(a, b) {
      var textA = a.id;
      var textB = b.id;
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });
  }
}
