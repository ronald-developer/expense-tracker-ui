import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonthlyExpensePageRoutingModule } from './monthly-expense-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { MonthlyExpensePage } from './monthly-expense.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonthlyExpensePageRoutingModule,
	SharedModule
  ],
  declarations: [MonthlyExpensePage]
})
export class MonthlyExpensePageModule {}
