import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpenseCategoriesPageRoutingModule } from './expense-categories-routing.module';

import { ExpenseCategoriesPage } from './expense-categories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpenseCategoriesPageRoutingModule
  ],
  declarations: [ExpenseCategoriesPage]
})
export class ExpenseCategoriesPageModule {}
