import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpenseCategoriesPage } from './expense-categories.page';

const routes: Routes = [
  {
    path: '',
    component: ExpenseCategoriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpenseCategoriesPageRoutingModule {}
