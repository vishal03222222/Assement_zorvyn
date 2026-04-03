import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { Transaction, Role, TransactionType, Category, FinanceSummary } from '@/types/finance';
import { mockTransactions } from '@/data/mockData';

interface Filters {
  search: string;
  type: TransactionType | 'all';
  category: Category | 'all';
  sortBy: 'date' | 'amount';
  sortOrder: 'asc' | 'desc';
}

interface FinanceContextType {
  transactions: Transaction[];
  role: Role;
  setRole: (role: Role) => void;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  filteredTransactions: Transaction[];
  summary: FinanceSummary;
  addTransaction: (t: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const FinanceContext = createContext<FinanceContextType | null>(null);

export const useFinance = () => {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error('useFinance must be used within FinanceProvider');
  return ctx;
};

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [role, setRole] = useState<Role>('admin');
  const [darkMode, setDarkMode] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    type: 'all',
    category: 'all',
    sortBy: 'date',
    sortOrder: 'desc',
  });

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      return next;
    });
  }, []);

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];
    if (filters.search) {
      const s = filters.search.toLowerCase();
      result = result.filter(t => t.description.toLowerCase().includes(s) || t.category.toLowerCase().includes(s));
    }
    if (filters.type !== 'all') result = result.filter(t => t.type === filters.type);
    if (filters.category !== 'all') result = result.filter(t => t.category === filters.category);
    result.sort((a, b) => {
      const mul = filters.sortOrder === 'asc' ? 1 : -1;
      if (filters.sortBy === 'date') return mul * (new Date(a.date).getTime() - new Date(b.date).getTime());
      return mul * (a.amount - b.amount);
    });
    return result;
  }, [transactions, filters]);

  const summary = useMemo<FinanceSummary>(() => {
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    return {
      totalBalance: totalIncome - totalExpenses,
      totalIncome,
      totalExpenses,
      savingsRate: totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0,
    };
  }, [transactions]);

  const addTransaction = useCallback((t: Omit<Transaction, 'id'>) => {
    setTransactions(prev => [{ ...t, id: crypto.randomUUID() }, ...prev]);
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <FinanceContext.Provider value={{ transactions, role, setRole, filters, setFilters, filteredTransactions, summary, addTransaction, deleteTransaction, darkMode, toggleDarkMode }}>
      {children}
    </FinanceContext.Provider>
  );
};
