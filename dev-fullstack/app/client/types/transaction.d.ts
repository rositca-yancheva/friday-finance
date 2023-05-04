interface Transaction {
  id: string;
  reference: string;
  category: Category;
  currency: string;
  amount: number;
  date: Date;
  account?: Account;
}
