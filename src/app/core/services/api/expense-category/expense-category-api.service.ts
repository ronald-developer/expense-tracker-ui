import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ApiTokenConfig } from "src/app/core/injection-tokens/api-token-config";
import { APP_API_URL_CFG } from "src/app/core/injection-tokens/injection-token-configurations";
import { PostCreateExpenseCategoryRequest } from "./requests/post-create-expense-category-request";
import { take } from "rxjs";
import { GetExpenseCategoriesResponse } from "./responses/get-expense-category-response";

@Injectable({
	providedIn: 'root'
})
export class ExpenseCategoryApiService {
	constructor(private http: HttpClient,
		@Inject(APP_API_URL_CFG) private apiConfig: ApiTokenConfig
	) { }

	public all() {
		const url = this.apiConfig.composeUrl('expensecategory/all');
		return this.http.get<GetExpenseCategoriesResponse>(url).pipe(
			take(1)
		);
	}


	public create(request: PostCreateExpenseCategoryRequest) {
		const url = this.apiConfig.composeUrl('expensecategory');
		return this.http.post<string>(url, request).pipe(
			take(1)
		);
	}
}
