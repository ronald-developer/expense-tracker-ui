import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { take } from "rxjs";
import { ApiTokenConfig } from "src/app/core/injection-tokens/api-token-config";
import { APP_API_URL_CFG } from "src/app/core/injection-tokens/injection-token-configurations";
import { PostLoginRequest } from "./requests/post-login-request.";
import { PostLoginResponse } from "./responses/post-login-response";
import { PostRefreshTokenRequest } from "./requests/post-refresh-token-request";
import { PostRefreshTokenResponse } from "./responses/post-refresh-token-response";
import { PostCreateUserRequest } from "./requests/post-create-user-request";
@Injectable({
	providedIn: 'root'
})
export class AccountApiService {
	constructor(private http: HttpClient,
		@Inject(APP_API_URL_CFG) private apiConfig: ApiTokenConfig
	) { }

	public login(request: PostLoginRequest) {
		const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
		const url = this.apiConfig.composeUrl('account/login');
		return this.http.post<PostLoginResponse>(url, request, { headers: reqHeader }).pipe(
			take(1)
		);
	}

	public refreshToken(request: PostRefreshTokenRequest) {
		const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
		const url = this.apiConfig.composeUrl('account/refreshToken');
		return this.http.post<PostRefreshTokenResponse>(url, request, { headers: reqHeader }).pipe(
			take(1)
		);
	}

	public register(request: PostCreateUserRequest) {
		const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
		const url = this.apiConfig.composeUrl('account/register');
		return this.http.post<unknown>(url, request, { headers: reqHeader }).pipe(
			take(1)
		);
	}
}
