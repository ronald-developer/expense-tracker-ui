import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseCategoriesPage } from './expense-categories.page';

describe('ExpenseCategoriesPage', () => {
  let component: ExpenseCategoriesPage;
  let fixture: ComponentFixture<ExpenseCategoriesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseCategoriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
