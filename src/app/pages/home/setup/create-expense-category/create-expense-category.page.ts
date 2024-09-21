import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { tap } from 'rxjs';
import { ExpenseCategoryApiService } from 'src/app/core/services/api/expense-category/expense-category-api.service';
import { PostCreateExpenseCategoryRequest } from 'src/app/core/services/api/expense-category/requests/post-create-expense-category-request';

@Component({
	selector: 'app-create-expense-category',
	templateUrl: './create-expense-category.page.html',
	styleUrls: ['./create-expense-category.page.scss'],
})
export class CreateExpenseCategoryPage implements OnInit {

	constructor(
		private expenseCategoryApiService: ExpenseCategoryApiService,
		private fb: FormBuilder,
		private toastController: ToastController,
		private loadingCtrl: LoadingController) { }

	public form!: FormGroup;

	ngOnInit() {
		this.form = this.fb.group({
			name: ['', [Validators.required]]
		});
	}

	public async create() {
		const loader = await this.showLoading("Saving...");
		const name = this.form.get('name')?.value;
		const payload: PostCreateExpenseCategoryRequest = new PostCreateExpenseCategoryRequest(name);
		this.expenseCategoryApiService.create(payload).pipe(
			tap(() => {
				this.presentToast('top', 'Expense category saved!');
				this.form.reset();
				loader.dismiss();
			})).subscribe();
	}

	async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
		const toast = await this.toastController.create({
			message: message,
			duration: 2000,
			position: position,
		});

		await toast.present();
	}

	async showLoading(message: string) {
		const loading = await this.loadingCtrl.create({
			message: message,
			duration: 5000,
		});

		loading.present();

		return loading;
	}
}
