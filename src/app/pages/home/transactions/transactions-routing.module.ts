import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionsPage } from './transactions.page';

const routes: Routes = [
	{
		path: '',
		component: TransactionsPage,
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'expenses',
			},
			{
				path: 'create',
				loadChildren: () => import('./create/create.module').then(m => m.CreatePageModule)
			},
			{
				path: 'edit',
				loadChildren: () => import('./edit/edit.module').then(m => m.EditPageModule)
			},
			{
				path: 'expenses',
				loadChildren: () => import('./expenses/expenses.module').then(m => m.ExpensesPageModule),
				data: { attach: false }
			}
		]
	}

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TransactionsPageRoutingModule { }
