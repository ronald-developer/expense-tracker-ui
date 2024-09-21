import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChartsPageRoutingModule } from './charts-routing.module';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ChartsPageRoutingModule
	],
	exports: []
})
export class ChartsPageModule { }
