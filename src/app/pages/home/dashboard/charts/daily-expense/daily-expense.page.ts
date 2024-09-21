import { Component } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { Chart } from 'angular-highcharts';
import { Observable, map } from 'rxjs';
import { DashboardApiService } from 'src/app/core/services/api/dashboard/dashboard-api.service';
import { ExpenseChartModel } from 'src/app/core/services/api/dashboard/models/expense-chart-model';

@Component({
	selector: 'app-daily-expense',
	templateUrl: './daily-expense.page.html'
})
export class DailyExpensePage implements ViewDidEnter {
	source!: Observable<Chart>;
	constructor(private dashboardApiService: DashboardApiService) { }

	ionViewDidEnter(): void {
		this.source = this.dashboardApiService.GetDailyExpensesChart().pipe(map(x => {
			const chart = this.buildChart(x.data);

			return chart;
		}));
	}
	private buildChart(data: ExpenseChartModel[]) {
		const categories = data.map(x => `${x.dateStr}`);
		const values = data.map(x => x.amount);
		const chart = new Chart({
			chart: {
				type: 'line'
			},
			title: {
				text: 'Daily Expense'
			},
			subtitle: {
				text: ''
			},
			xAxis: {
				categories: categories
			},
			yAxis: {
				title: {
					text: 'Amount'
				}
			},
			plotOptions: {
				line: {
					dataLabels: {
						enabled: true
					},
					enableMouseTracking: false
				}
			},
			series: [
				{
					name: 'Expense date',
					data: values,
					type: 'line'
				}
			]
		});
		return chart;
	}

}
