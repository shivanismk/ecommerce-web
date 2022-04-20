import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { ViewCategoryListComponent } from '../modules/product/view-category-list/view-category-list.component';
import { LoginService } from '../services/login.service';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  productList: Product[] = [];
  filteredString = [''];
  catData: any;
  dataTraget: any;
  userid: any;
  constructor(private router: Router, private login: LoginService, private productsService: ProductService, private catService: CategoryService) { }

  ngOnInit(): void {
    this.userid = localStorage.getItem('userId')
    this.productsService.viewProductList().subscribe({
      next: (data: any) => {
        this.productList = data.product
      }
    });
    this.catService.getCategories().subscribe({
      next: (data: any) => {
        this.catData = data.category
      }
    })
  }

  onSearch(event: any) {
    console.log(event.target.id);
    this.dataTraget = event.target.id
    this.router.navigate(['/filterProduct', this.dataTraget])

  }
  isLoggedIn() {
    return this.login.loggedIn();
  }



  logout() {
    this.login.clear()
    this.router.navigate(['/login']);
  }
  sortByName() {
    //console.log(this.productList);

    this.productList.sort(function (a, b) {
      var textA = a.pname.toUpperCase();

      var textB = b.pname.toUpperCase();
      console.log((textA < textB) ? -1 : (textA > textB) ? 1 : 0);

      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;

    });


  }
}
