import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { TokenUserModel } from '../api/account/models/token-user-model';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) { console.log("AuthGuard"); }

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		return this.authService.authenticate().pipe(this.isUserAuthorized(next),
			tap(isAuthenticated => {
				if (!isAuthenticated) {
					this.authService.logOut();
				}
			}));
	}

	private isUserAuthorized(next: ActivatedRouteSnapshot) {
		return switchMap(authSuccess => {
			// if token is expired exit
			if (!authSuccess) return of(false);

			// check for matching user roles if route is protected for certain roles
			// if not protected authorise user
			const allowedRoles = next.data['roles'] as Array<string>;
			if (allowedRoles) {
				const match = this.authService.roleMatch(allowedRoles);
				return of(match);
			} else {
				return of(true);
			}
		});
	}
}

