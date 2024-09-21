import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ViewDidEnter } from '@ionic/angular';
import { Observable, map } from 'rxjs';
import { ExpenseCategoryApiService } from 'src/app/core/services/api/expense-category/expense-category-api.service';
import { ExpenseCategoryModel } from 'src/app/core/services/api/expense-category/models/expense-category-model';

const EXPENSE_CATEGORY_CONTROL_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => ExpenseCategorySelectorComponent),
	multi: true
}

@Component({
	selector: 'app-expense-category-selector',
	templateUrl: './expense-category-selector.component.html',
	styleUrls: ['./expense-category-selector.component.scss'],
	providers: [EXPENSE_CATEGORY_CONTROL_ACCESSOR]
})
export class ExpenseCategorySelectorComponent implements ViewDidEnter, ControlValueAccessor {
	source!: Observable<ExpenseCategoryModel[]>;
	public expenseCategoryId!: string | null;
	private onChange!: Function;
	private onTouch!: Function;

	constructor(private expenseCategoryApiService: ExpenseCategoryApiService,) { }

	ionViewDidEnter(): void {
		this.source = this.expenseCategoryApiService.all().pipe(map(response => response.data));
	}
	setDisabledState?(isDisabled: boolean): void {
		throw new Error('Method not implemented.');
	}

	writeValue(obj: any): void {
		this.expenseCategoryId = obj !== null ? obj : null;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	public selectionChanged() {
		this.onChange(this.expenseCategoryId);
	}

	public onClick() {
		this.onTouch();
	}
}
