import { useFinance } from '@/context/FinanceContext';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

export const SummaryCards = () => {
  const { summary } = useFinance();

  const cards = [
    { label: 'Total Balance', value: formatCurrency(summary.totalBalance), icon: DollarSign, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Income', value: formatCurrency(summary.totalIncome), icon: TrendingUp, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Expenses', value: formatCurrency(summary.totalExpenses), icon: TrendingDown, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-500/10' },
    { label: 'Savings Rate', value: `${summary.savingsRate.toFixed(1)}%`, icon: PiggyBank, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(c => (
        <Card key={c.label} className="animate-fade-in">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{c.label}</p>
                <p className="text-2xl font-bold mt-1 text-foreground">{c.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${c.bg}`}>
                <c.icon className={`h-5 w-5 ${c.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
