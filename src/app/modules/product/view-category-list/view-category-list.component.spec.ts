import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCategoryListComponent } from './view-category-list.component';

describe('ViewCategoryListComponent', () => {
  let component: ViewCategoryListComponent;
  let fixture: ComponentFixture<ViewCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCategoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
