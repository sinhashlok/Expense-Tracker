export interface UserData {
  id: number;
  name: string;
  expenses:
    | [
        {
          id: number;
          title: string;
          amount: number;
          createdAt: Date;
          month: number;
          expenseType: number;
        }
      ]
    | [];
  budget: {
    id: number;
    spendingAmount: number;
    investmentAmount: number;
    totalIncome: number;
  };
}
