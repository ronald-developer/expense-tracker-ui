import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseCategorySelectorComponent } from './expense-category-selector.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
	declarations: [ExpenseCategorySelectorComponent],
	imports: [
		CommonModule,
		IonicModule,
		FormsModule,
	],
	exports: [ExpenseCategorySelectorComponent]
})
export class ExpenseCategorySelectorModule { }
