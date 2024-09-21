import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeeklyExpensePageRoutingModule } from './weekly-expense-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { WeeklyExpensePage } from './weekly-expense.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeeklyExpensePageRoutingModule,
	SharedModule
  ],
  declarations: [WeeklyExpensePage]
})
export class WeeklyExpensePageModule {}
