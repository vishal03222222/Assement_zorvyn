import { Transaction } from '@/types/finance';

export const mockTransactions: Transaction[] = [
  { id: '1', date: '2026-04-01', description: 'Monthly Salary', amount: 5200, category: 'Salary', type: 'income' },
  { id: '2', date: '2026-04-01', description: 'Rent Payment', amount: 1200, category: 'Bills & Utilities', type: 'expense' },
  { id: '3', date: '2026-03-30', description: 'Grocery Store', amount: 85.50, category: 'Food & Dining', type: 'expense' },
  { id: '4', date: '2026-03-29', description: 'Freelance Project', amount: 800, category: 'Freelance', type: 'income' },
  { id: '5', date: '2026-03-28', description: 'Electric Bill', amount: 95, category: 'Bills & Utilities', type: 'expense' },
  { id: '6', date: '2026-03-27', description: 'Online Shopping', amount: 150, category: 'Shopping', type: 'expense' },
  { id: '7', date: '2026-03-26', description: 'Movie Tickets', amount: 30, category: 'Entertainment', type: 'expense' },
  { id: '8', date: '2026-03-25', description: 'Uber Ride', amount: 22, category: 'Transportation', type: 'expense' },
  { id: '9', date: '2026-03-24', description: 'Investment Returns', amount: 350, category: 'Investments', type: 'income' },
  { id: '10', date: '2026-03-23', description: 'Restaurant Dinner', amount: 65, category: 'Food & Dining', type: 'expense' },
  { id: '11', date: '2026-03-22', description: 'Gym Membership', amount: 45, category: 'Healthcare', type: 'expense' },
  { id: '12', date: '2026-03-21', description: 'Online Course', amount: 29.99, category: 'Education', type: 'expense' },
  { id: '13', date: '2026-03-20', description: 'Gas Station', amount: 55, category: 'Transportation', type: 'expense' },
  { id: '14', date: '2026-03-19', description: 'Coffee Shop', amount: 12.50, category: 'Food & Dining', type: 'expense' },
  { id: '15', date: '2026-03-18', description: 'Freelance Design Work', amount: 450, category: 'Freelance', type: 'income' },
  { id: '16', date: '2026-03-15', description: 'Monthly Salary', amount: 5200, category: 'Salary', type: 'income' },
  { id: '17', date: '2026-03-14', description: 'Internet Bill', amount: 60, category: 'Bills & Utilities', type: 'expense' },
  { id: '18', date: '2026-03-12', description: 'Clothing Store', amount: 120, category: 'Shopping', type: 'expense' },
  { id: '19', date: '2026-03-10', description: 'Doctor Visit', amount: 75, category: 'Healthcare', type: 'expense' },
  { id: '20', date: '2026-03-08', description: 'Concert Tickets', amount: 90, category: 'Entertainment', type: 'expense' },
  { id: '21', date: '2026-02-28', description: 'Monthly Salary', amount: 5200, category: 'Salary', type: 'income' },
  { id: '22', date: '2026-02-25', description: 'Grocery Store', amount: 110, category: 'Food & Dining', type: 'expense' },
  { id: '23', date: '2026-02-20', description: 'Phone Bill', amount: 45, category: 'Bills & Utilities', type: 'expense' },
  { id: '24', date: '2026-02-15', description: 'Freelance Writing', amount: 300, category: 'Freelance', type: 'income' },
  { id: '25', date: '2026-02-10', description: 'Book Purchase', amount: 25, category: 'Education', type: 'expense' },
];

export const monthlyBalanceData = [
  { month: 'Oct', income: 5500, expenses: 3200, balance: 2300 },
  { month: 'Nov', income: 5800, expenses: 3500, balance: 2300 },
  { month: 'Dec', income: 6200, expenses: 4100, balance: 2100 },
  { month: 'Jan', income: 5200, expenses: 2900, balance: 2300 },
  { month: 'Feb', income: 5500, expenses: 2800, balance: 2700 },
  { month: 'Mar', income: 6450, expenses: 2100, balance: 4350 },
];
