import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage {
	constructor(
		private authService: AuthService,
		private router: Router,
		private loadingCtrl: LoadingController,
		private alertCtrl: AlertController) { }

	authenticate(email: string, password: string) {
		this.loadingCtrl
			.create({ keyboardClose: true, message: 'Logging in...' })
			.then(loadingEl => {
				loadingEl.present();
				this.authService.loginRequest(email, password).pipe(
					finalize(() => {
						loadingEl.dismiss();
					})).subscribe(authResult => {
						if (authResult) {
							this.authService.setTokenModel(authResult);
							loadingEl.dismiss();
							this.router.navigateByUrl('');
						} else {
							this.showAlert('Authentication failed!');
						}
					});
			});
	}

	onSubmit(form: NgForm) {
		if (!form.valid) {
			return;
		}
		const email = form.value.email;
		const password = form.value.password;

		this.authenticate(email, password);
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

	public switchToSignup() {
		this.router.navigateByUrl('sign-up');
	}
}
