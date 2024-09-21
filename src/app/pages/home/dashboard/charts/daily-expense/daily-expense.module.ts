import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyExpensePageRoutingModule } from './daily-expense-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { DailyExpensePage } from './daily-expense.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		DailyExpensePageRoutingModule,
		SharedModule
	],
	declarations: [DailyExpensePage]
})
export class DailyExpensePageModule { }
