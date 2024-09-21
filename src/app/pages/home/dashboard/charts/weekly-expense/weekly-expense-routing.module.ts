import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeeklyExpensePage } from './weekly-expense.page';

const routes: Routes = [
  {
    path: '',
    component: WeeklyExpensePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeeklyExpensePageRoutingModule {}
