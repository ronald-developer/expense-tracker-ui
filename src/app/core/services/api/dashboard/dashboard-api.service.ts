import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { take } from "rxjs";
import { ApiTokenConfig } from "src/app/core/injection-tokens/api-token-config";
import { APP_API_URL_CFG } from "src/app/core/injection-tokens/injection-token-configurations";
import { GetMonthlyExpensesChartResponse } from "./responses/get-monthly-expenses-chart-response";
import { GetWeeklyExpensesChartResponse } from "./responses/get-weekly-expenses-chart-response";
import { GetDailyExpensesChartResponse } from "./responses/get-daily-expenses-chart-response";

@Injectable({
	providedIn: 'root'
})
export class DashboardApiService {
	constructor(private http: HttpClient,
		@Inject(APP_API_URL_CFG) private apiConfig: ApiTokenConfig
	) { }

	public GetDailyExpensesChart() {
		const url = this.apiConfig.composeUrl('dashboard/charts/daily');
		return this.http.get<GetDailyExpensesChartResponse>(url).pipe(
			take(1)
		);
	}

	public GetWeeklyExpensesChart() {
		const url = this.apiConfig.composeUrl('dashboard/charts/weekly');
		return this.http.get<GetWeeklyExpensesChartResponse>(url).pipe(
			take(1)
		);
	}

	public GetMonthlyExpensesChart() {
		const url = this.apiConfig.composeUrl('dashboard/charts/monthly');
		return this.http.get<GetMonthlyExpensesChartResponse>(url).pipe(
			take(1)
		);
	}

}
