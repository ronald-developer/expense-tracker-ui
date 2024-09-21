import { NgModule } from "@angular/core";
import { ChartModule } from "angular-highcharts";
import { ExpenseCategorySelectorModule } from "./components/expense-category-selector/expense-category-selector.module";

@NgModule({
	imports: [
		ChartModule,
		ExpenseCategorySelectorModule
	],
	exports: [ChartModule, ExpenseCategorySelectorModule]
})
export class SharedModule { }
