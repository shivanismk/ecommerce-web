import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-product-list',
  templateUrl: './view-product-list.component.html',
  styleUrls: ['./view-product-list.component.css']
})
export class ViewProductListComponent implements OnInit {
  productList: Product[]=[];
  hostname:string|any;
  userId: any;
  filteredString:string="";
  searchTerm:string | any
  products: any;
  order: any;
  // a:any;
  // b:any
  data: Product[]=[];
  constructor(private productsService:ProductService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.hostname = environment.hosturl
    this.productsService.viewProductList().subscribe({
      next:(data:any)=>{
        this.productList = data.product
      }
    });
  
  }
  search(term: string) {
    if(!term) {
      this.products = this.productList;
    } else {
      this.products = this.productList.filter(x => 
         x.pname.trim().toLowerCase().includes(term.trim().toLowerCase())
      );
    }
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

