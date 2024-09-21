import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { take } from "rxjs";
import { ApiTokenConfig } from "src/app/core/injection-tokens/api-token-config";
import { APP_API_URL_CFG } from "src/app/core/injection-tokens/injection-token-configurations";
import { PostCreateExpenseRequest } from "./requests/post-create-expense-request";
import { GetExpenseResponse } from "./responses/get-expense-response";

@Injectable({
	providedIn: 'root'
})
export class ExpenseApiService {
	constructor(private http: HttpClient,
		@Inject(APP_API_URL_CFG) private apiConfig: ApiTokenConfig
	) { }


	public all() {
		const url = this.apiConfig.composeUrl('expense/all');
		return this.http.get<GetExpenseResponse>(url).pipe(
			take(1)
		);
	}

	public create(request: PostCreateExpenseRequest) {
		const url = this.apiConfig.composeUrl('expense');
		return this.http.post<string>(url, request).pipe(
			take(1)
		);
	}
}
