import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
	{
		path: '',
		component: HomePage,
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'dashboard',
			},
			{
				path: 'dashboard',
				loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
			},
			{
				path: 'transactions',
				loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsPageModule)
			},
			{
				path: 'setup',
				loadChildren: () => import('./setup/setup.module').then(m => m.SetupPageModule)
			}
		]
	},  {
    path: 'setup',
    loadChildren: () => import('./setup/setup.module').then( m => m.SetupPageModule)
  }


];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class HomePageRoutingModule { }
