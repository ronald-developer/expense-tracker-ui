import { Component, OnInit } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { Observable, map } from 'rxjs';
import { ExpenseCategoryApiService } from 'src/app/core/services/api/expense-category/expense-category-api.service';
import { ExpenseCategoryModel } from 'src/app/core/services/api/expense-category/models/expense-category-model';

@Component({
	selector: 'app-expense-categories',
	templateUrl: './expense-categories.page.html',
	styleUrls: ['./expense-categories.page.scss'],
})
export class ExpenseCategoriesPage implements ViewDidEnter {

	source!: Observable<ExpenseCategoryModel[]>;
	constructor(
		private expenseCategoryApiService: ExpenseCategoryApiService) { }
	ionViewDidEnter(): void {
		this.source = this.expenseCategoryApiService.all().pipe(map(response => response.data));
	}

}
