import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController, ViewDidEnter } from '@ionic/angular';
import { Observable, finalize, map, tap } from 'rxjs';
import { ExpenseCategoryApiService } from 'src/app/core/services/api/expense-category/expense-category-api.service';
import { ExpenseCategoryModel } from 'src/app/core/services/api/expense-category/models/expense-category-model';
import { ExpenseApiService } from 'src/app/core/services/api/expense/expense-api.service';
import { PostCreateExpenseRequest } from 'src/app/core/services/api/expense/requests/post-create-expense-request';


@Component({
	selector: 'app-create',
	templateUrl: './create.page.html',
	styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit, ViewDidEnter {
	form!: FormGroup;
	source!: Observable<ExpenseCategoryModel[]>;

	constructor(private toastController: ToastController,
		private router: Router,
		private loadingCtrl: LoadingController,
		private fb: FormBuilder,
		private expenseApiService: ExpenseApiService,
		private expenseCategoryApiService: ExpenseCategoryApiService,
		private alertCtrl: AlertController) { }

	ngOnInit() {
		this.form = this.fb.group({
			description: ['', [Validators.required]],
			amount: ['', [Validators.required]],
			date: ['', [Validators.required]],
			expenseCategoryId: ['', [Validators.required]]
		});
	}

	ionViewDidEnter(): void {
		this.source = this.expenseCategoryApiService.all().pipe(map(response => response.data));
	}

	private payload() {
		const payload = new PostCreateExpenseRequest(
			this.form.get('description')?.value,
			this.form.get('amount')?.value,
			this.form.get('date')?.value,
			this.form.get('expenseCategoryId')?.value);
		return payload;
	}


	async create() {
		console.log(this.payload());

		this.loadingCtrl
			.create({ keyboardClose: true, message: 'Saving...' })
			.then(loadingEl => {
				loadingEl.present();

				const authObs = this.expenseApiService.create(this.payload()).pipe(
					finalize(() => {
						loadingEl.dismiss();
					})).subscribe(res => {
						if (res) {
							loadingEl.dismiss();
							this.router.navigateByUrl('transactions/expenses');
						} else {
							this.showAlert('Saving expense failed!');
						}
					});
			});
	}

	private showAlert(message: string) {
		this.alertCtrl
			.create({
				header: 'Authentication failed',
				message: message,
				buttons: ['Okay']
			})
			.then(alertEl => alertEl.present());
	}


}
