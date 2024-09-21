export class PostCreateExpenseRequest {
	constructor(public description: string,
		public amount: number,
		public date: Date,
		public expenseCategoryId: string) { }
}
