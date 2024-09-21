import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateExpenseCategoryPageRoutingModule } from './create-expense-category-routing.module';

import { CreateExpenseCategoryPage } from './create-expense-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	ReactiveFormsModule,
    CreateExpenseCategoryPageRoutingModule
  ],
  declarations: [CreateExpenseCategoryPage]
})
export class CreateExpenseCategoryPageModule {}
