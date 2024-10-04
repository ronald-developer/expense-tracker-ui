import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ViewDidEnter } from '@ionic/angular';
import { catchError, finalize, noop, of, tap } from 'rxjs';
import { AccountApiService } from 'src/app/core/services/api/account/account-api.service';
import { PostCreateUserRequest } from 'src/app/core/services/api/account/requests/post-create-user-request';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.page.html',
	styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements ViewDidEnter {

	constructor(private router: Router,
		private accountService: AccountApiService,
		private loadingCtrl: LoadingController,
		private alertCtrl: AlertController) { }
	ionViewDidEnter(): void {
	}

	switchToLogin() {
		this.router.navigateByUrl('');
	}
	onSubmit(form: NgForm) {

		if (!form.valid) {
			return;
		}
		const firstname = form.value.firstname;
		const lastname = form.value.lastname;
		const email = form.value.email;
		const password = form.value.password;
		const repassword = form.value.repassword;
		const request = new PostCreateUserRequest(firstname, lastname, email, password, repassword);
		this.router.navigateByUrl('login');
		this.register(request);
	}

	private register(request: PostCreateUserRequest) {
		this.loadingCtrl
			.create({ keyboardClose: true, message: 'Logging in...' })
			.then(loadingEl => {
				loadingEl.present();
				this.accountService.register(request).pipe(
					catchError(() => {
						this.showAlert('Registration failed!');
						return of(noop());
					}),
					tap(()=>this.router.navigateByUrl('login')),
					finalize(() => {
						loadingEl.dismiss();
					})).subscribe();
			});
	}

	private showAlert(message: string) {
		this.alertCtrl
			.create({
				header: 'Failed',
				message: message,
				buttons: ['Okay']
			})
			.then(alertEl => alertEl.present());
	}
}
