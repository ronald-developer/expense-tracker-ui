import { ExpenseCategoryModel } from "../../expense-category/models/expense-category-model";

export interface ExpenseModel {
	id: string;
	description: string;
	amount: number;
	date: Date;
	expenseCategory: ExpenseCategoryModel;
}
