import { Inject, Injectable, inject } from "@angular/core";
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { PostLoginRequest } from "../api/account/requests/post-login-request.";
import { AccountApiService } from "../api/account/account-api.service";
import { PostLoginResponse } from "../api/account/responses/post-login-response";
import { BehaviorSubject, catchError, filter, finalize, from, map, of, switchMap, take, tap } from "rxjs";
import { TokenUserModel } from "../api/account/models/token-user-model";
import { TokenSecurityModel } from "../api/account/models/token-security-model";
import { TokenModel } from "../api/account/models/token-model";
import { PostRefreshTokenRequest } from "../api/account/requests/post-refresh-token-request";
import { Preferences } from '@capacitor/preferences';
import { TOKEN_STORAGE_CFG } from "../../injection-tokens/injection-token-configurations";
import { TokenStorageConfig } from "../../injection-tokens/token-storage-config";

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(
		private router: Router, private accountService: AccountApiService,
		@Inject(TOKEN_STORAGE_CFG) private tokenStorage: TokenStorageConfig) {
		console.log("AuthService");
		this.initTokenValue();
		console.log(this.tokenValue);
	}
	private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
	public isRefreshing!: boolean;
	private tokenValue!: TokenModel | null;
	private jwtHelper = new JwtHelperService();
	private async initTokenValue() {
		const tokenValue = await this.tokenStorage.retrieve();
		this.tokenValue = tokenValue;
		return tokenValue;
	}

	get user() {
		const user = this.tokenValue?.token ? this.getTokenUserModel(this.tokenValue?.token) : null;
		return user;
	}

	get token() {
		return this.tokenValue;
	}

	public async setTokenModel(value: TokenModel | null) {
		if (!value) {
			this.logOut();
		}
		this.tokenValue = value;
		await this.tokenStorage.store(this.tokenValue);
	}

	private getTokenUserModel(token: string): TokenUserModel {
		const jwtSecurityModel: TokenSecurityModel = this.jwtHelper.decodeToken(token) as any;

		const tokenUserModel = new TokenUserModel(jwtSecurityModel);

		return tokenUserModel;
	}

	public logOut() {
		console.log('AuthService logOut navigating to login');
		this.router.navigate(['/', 'login']);
	}

	public loginRequest(username: string, password: string) {
		const request = new PostLoginRequest(username, password);
		return this.accountService.login(request).pipe(
			map((response: PostLoginResponse) => response.data),
			take(1),
			catchError((errr) => of(null)))
	}

	public roleMatch(allowedRoles: string[]): boolean {
		const userRoles = this.user?.roles;
		if (!userRoles) {
			return false;
		}

		return allowedRoles.some(x => userRoles.some(y => y == x));
	}

	public authenticate() {
		if (!this.isRefreshing) {
			return from(this.initTokenValue()).pipe(
				switchMap(tokenVal => {
					if (tokenVal) {
						const token = tokenVal.token;
						const refreshToken = tokenVal.refreshToken;

						if (this.user?.tokenExpired) {
							this.isRefreshing = true;
							return this.accountService.refreshToken(new PostRefreshTokenRequest(token, refreshToken)).pipe(
								tap(response => this.setTokenModel(response.data)),
								tap(response => this.refreshTokenSubject.next(response.data.refreshToken)),
								map(response => this.getTokenUserModel(response.data.token)),
								finalize(() => this.isRefreshing = false),
								catchError(() => of(tokenVal)));
						}
					}

					return of(this.user);
				}),
				map(user => !!user)
			);
		} else {
			// If refresh is in progress, queue the requests
			return this.refreshTokenSubject.pipe(
				filter(refreshToken => refreshToken !== null),
				take(1),
				switchMap(() => of(!!this.user))
			);
		}
	}
}
