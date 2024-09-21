import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetupPage } from './setup.page';

const routes: Routes = [
	{
		path: '',
		component: SetupPage,
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'expense-categories',
			},
			{
				path: 'create-expense-category',
				loadChildren: () => import('./create-expense-category/create-expense-category.module').then(m => m.CreateExpenseCategoryPageModule)
			},
			{
				path: 'expense-categories',
				loadChildren: () => import('./expense-categories/expense-categories.module').then(m => m.ExpenseCategoriesPageModule)
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SetupPageRoutingModule { }
