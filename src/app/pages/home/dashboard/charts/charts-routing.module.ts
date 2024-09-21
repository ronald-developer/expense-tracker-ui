import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'daily-expense'
	},
	{
		path: 'daily-expense',
		loadChildren: () => import('./daily-expense/daily-expense.module').then(m => m.DailyExpensePageModule)
	},
	{
		path: 'weekly-expense',
		loadChildren: () => import('./weekly-expense/weekly-expense.module').then(m => m.WeeklyExpensePageModule)
	},
	{
		path: 'monthly-expense',
		loadChildren: () => import('./monthly-expense/monthly-expense.module').then(m => m.MonthlyExpensePageModule)
	}

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ChartsPageRoutingModule { }
