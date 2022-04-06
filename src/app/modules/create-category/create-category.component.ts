import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  myform: any;

  constructor(private fb:FormBuilder,private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.myform=this.fb.group({
      cname:[''],
     description:[''],
        })
  }
  onSubmit(formDirective:FormGroupDirective):void{
     this.categoryService.createcategory(this.myform.value).subscribe
    ({
      next:(result:any)=>{
console.log(result);
      },
      error:(e:any)=>{},
      complete:()=>{}
        })
  }

}
