import { Component, OnInit } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { Chart } from 'angular-highcharts';
import { Observable, map } from 'rxjs';
import { DashboardApiService } from 'src/app/core/services/api/dashboard/dashboard-api.service';
import { RangeExpenseChartModel } from 'src/app/core/services/api/dashboard/models/range-expense-chart-model';

@Component({
  selector: 'app-monthly-expense',
  templateUrl: './monthly-expense.page.html'
})
export class MonthlyExpensePage implements ViewDidEnter {
	source!: Observable<Chart>;
	constructor(private dashboardApiService: DashboardApiService) { }

	ionViewDidEnter(): void {
		this.source = this.dashboardApiService.GetMonthlyExpensesChart().pipe(map(x => {
			const chart = this.buildChart(x.data);

			return chart;
		}));
	}

	private buildChart(data: RangeExpenseChartModel[]) {
		const categories = data.map(x => `${x.key}`);
		const values = data.map(x => x.amount);
		const chart = new Chart({
			chart: {
				type: 'line'
			},
			title: {
				text: 'Monthly Expense'
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
