import { Component } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { Observable, map } from 'rxjs';
import { ExpenseCategoryApiService } from 'src/app/core/services/api/expense-category/expense-category-api.service';
import { ExpenseCategoryModel } from 'src/app/core/services/api/expense-category/models/expense-category-model';
import { ExpenseApiService } from 'src/app/core/services/api/expense/expense-api.service';
import { ExpenseModel } from 'src/app/core/services/api/expense/models/expense-model';

@Component({
	selector: 'app-expenses',
	templateUrl: './expenses.page.html',
	styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements ViewDidEnter {

	source!: Observable<ExpenseModel[]>;
	expenseCategories!: Observable<ExpenseCategoryModel[]>;
	constructor(
		private expenseApiService: ExpenseApiService,
		private expenseCategoryApiService: ExpenseCategoryApiService) { }
	ionViewDidEnter(): void {
		this.source = this.expenseApiService.all().pipe(map(response => response.data));
		this.expenseCategories = this.expenseCategoryApiService.all().pipe(map(response => response.data));
	}

}
