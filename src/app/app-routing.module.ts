import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth/auth.guard.service';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
		canActivate: [AuthGuard],
	},
	{
		path: 'login',
		loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
	},
	{
		path: 'sign-up',
		loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpPageModule)
	}
];
@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
