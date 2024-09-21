import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateExpenseCategoryPage } from './create-expense-category.page';

const routes: Routes = [
  {
    path: '',
    component: CreateExpenseCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateExpenseCategoryPageRoutingModule {}
