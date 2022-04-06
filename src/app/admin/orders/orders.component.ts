import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { environment } from 'src/environments/environment';

import *as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

// import * as pdfMake from "pdfmake/build/pdfmake";
// import * as pdfFonts from "pdfmake/build/vfs_fonts";
// const htmlToPdfmake = require("html-to-pdfmake");
// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderlist:|any;
 

  hostname:string|any
  orders: any;

  constructor( private orderList:OrdersService) { }

  ngOnInit(): void {
    this.hostname = environment.hosturl
    this.orderList.orderList().subscribe(data =>{
        this.orderlist = data.checkout;
        console.log(this.orderlist );
        
        
for (let index = 0; index < this.orderlist.length; index++) {
  const element = this.orderlist[index];
  this.orders = element.cartdetail
  console.log(element.cartdetail );
  
}
      })

      
  }

  dawnloadPDF(){


    
    // let data = document.getElementById('contentToConvert');
    // this.data = data
    // html2canvas(this.data).then(canvas => {
    //   var imgWidth = 208;
    //   var imgHeight = canvas.height * imgWidth / canvas.width;
    //   const contentDataURL = canvas.toDataURL('/assets/img/png')
    //   let pdf = new jsPDF('p', 'mm', 'a4');
    //   var position = 0;
    //   pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
    //   pdf.save('newPDF.pdf');
    // });
  }
}
