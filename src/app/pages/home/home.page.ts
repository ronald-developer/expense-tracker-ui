import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
})
export class HomePage {

	constructor(private menuCtrl: MenuController, private auth: AuthService) { }


	async showMenu() {
		const id = 'account-menu';
		await this.menuCtrl.toggle(id);
	}

	public logout() {
		this.auth.setTokenModel(null);
	}

}
