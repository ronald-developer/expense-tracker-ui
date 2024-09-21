import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, noop, of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private router: Router, private authService: AuthService) { console.log("AuthInterceptor"); }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (req.headers.get('No-Auth') === "True") {
			return next.handle(req.clone());
		}
		return this.authService.authenticate().pipe(
			mergeMap(authenticated => {
				if (!authenticated) {
					this.router.navigate(['/login']);
				}

				const clonedreq = req.clone({
					headers: req.headers.set("Authorization", "Bearer " + this.authService.token?.token)
				});

				return next.handle(clonedreq);
			})
		);

		// if (this.authService.token != null) {
		// 	const clonedreq = req.clone({
		// 		headers: req.headers.set("Authorization", "Bearer " + this.authService.token.token)
		// 	});

		// 	return next.handle(clonedreq).pipe(tap(
		// 		success => {

		// 		},
		// 		error => {
		// 			if (error.status === 401) {
		// 				this.router.navigate(['/login']);
		// 			}
		// 		}
		// 	));

		// }
		// else {
		// 	this.router.navigate(['/login']);
		// 	return of();
		// }
	}
}
