import { ExpenseCategoryModel } from "../../expense-category/models/expense-category-model";
import { ExpenseModel } from "../../expense/models/expense-model";

export interface GetExpenseResponse {
	data: ExpenseModel[];
}
