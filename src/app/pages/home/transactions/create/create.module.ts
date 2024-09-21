import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePageRoutingModule } from './create-routing.module';

import { CreatePage } from './create.page';
import { ExpenseCategorySelectorModule } from 'src/app/shared/components/expense-category-selector/expense-category-selector.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	ReactiveFormsModule,
    CreatePageRoutingModule,
	ExpenseCategorySelectorModule
  ],
  declarations: [CreatePage]
})
export class CreatePageModule {}
