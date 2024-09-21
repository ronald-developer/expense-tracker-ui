import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
//   {
//     path: '',
//     component: DashboardPage
//   },
//   {
//     path: 'charts',
//     loadChildren: () => import('./charts/charts.module').then( m => m.ChartsPageModule)
//   }

  {
	path: '',
	component: DashboardPage,
	children: [
		{
			path: '',
			pathMatch: 'full',
			redirectTo: 'charts',
		},
		{
			path: 'charts',
			loadChildren: () => import('./charts/charts.module').then( m => m.ChartsPageModule)
		}
	]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
