import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

// import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  aId: any;
  regi: any;
  userList: any;
  hostname: any;
  productList: Product[]=[];

  constructor(private router: Router, private login: LoginService, private route: ActivatedRoute, private productsService: ProductService) { }

  ngOnInit(): void {
    this.hostname = environment.hosturl
    this.route.params.subscribe((params: Params) => {
      console.log(params.Aid);
      this.aId = params.Aid;
      this.login.viewAdmin(this.aId).subscribe((data) => {
        console.log(data);
        this.regi = data.user;
        console.log(this.regi.url);


      })
    })

    this.login.viewUserList().subscribe(data => {
      this.userList = data.user;
      console.log(this.userList);
      console.log(data.user);


    });

    this.hostname = environment.hosturl
    this.productsService.viewProductList().subscribe( {
      next:(data:any)=>{
        this.productList = data.product;
        console.log(this.productList);
        console.log(data.product);
      }
      


    });
  }



  logout() {
    this.login.clear()
    this.router.navigate(['/login']);
  }

}
