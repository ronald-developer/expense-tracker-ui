import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateExpenseCategoryPage } from './create-expense-category.page';

describe('CreateExpenseCategoryPage', () => {
  let component: CreateExpenseCategoryPage;
  let fixture: ComponentFixture<CreateExpenseCategoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExpenseCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
