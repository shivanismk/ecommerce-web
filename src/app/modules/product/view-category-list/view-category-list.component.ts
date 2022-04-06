import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-view-category-list',
  templateUrl: './view-category-list.component.html',
  styleUrls: ['./view-category-list.component.css']
})
export class ViewCategoryListComponent implements OnInit {
  categoryList: Category | any;
  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data: any)=> {
      this.categoryList = data.category;
      console.log(data.category);
    });
  }

}
