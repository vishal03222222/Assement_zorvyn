import { useMemo } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, AlertTriangle, Lightbulb, BarChart3 } from 'lucide-react';

export const InsightsSection = () => {
  const { transactions, summary } = useFinance();

  const insights = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const catMap: Record<string, number> = {};
    expenses.forEach(t => { catMap[t.category] = (catMap[t.category] || 0) + t.amount; });
    const sorted = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
    const highest = sorted[0];
    const lowest = sorted[sorted.length - 1];

    const monthMap: Record<string, number> = {};
    expenses.forEach(t => {
      const m = t.date.slice(0, 7);
      monthMap[m] = (monthMap[m] || 0) + t.amount;
    });
    const months = Object.entries(monthMap).sort((a, b) => b[0].localeCompare(a[0]));
    const currentMonth = months[0];
    const prevMonth = months[1];
    const monthChange = currentMonth && prevMonth ? ((currentMonth[1] - prevMonth[1]) / prevMonth[1]) * 100 : 0;

    return { highest, lowest, monthChange, avgExpense: expenses.length ? summary.totalExpenses / expenses.length : 0 };
  }, [transactions, summary]);

  const cards = [
    {
      icon: AlertTriangle,
      title: 'Highest Spending',
      value: insights.highest ? `${insights.highest[0]}` : 'N/A',
      subtitle: insights.highest ? `$${insights.highest[1].toLocaleString()} total` : '',
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-500/10',
    },
    {
      icon: TrendingUp,
      title: 'Monthly Trend',
      value: `${insights.monthChange >= 0 ? '+' : ''}${insights.monthChange.toFixed(1)}%`,
      subtitle: 'vs previous month',
      color: insights.monthChange <= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400',
      bg: insights.monthChange <= 0 ? 'bg-emerald-500/10' : 'bg-red-500/10',
    },
    {
      icon: BarChart3,
      title: 'Avg Transaction',
      value: `$${insights.avgExpense.toFixed(0)}`,
      subtitle: 'per expense',
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      icon: Lightbulb,
      title: 'Savings Rate',
      value: `${summary.savingsRate.toFixed(1)}%`,
      subtitle: summary.savingsRate > 20 ? 'Great job saving!' : 'Try to save more',
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-500/10',
    },
  ];

  return (
    <section aria-label="Financial Insights">
      <h2 className="text-lg font-semibold mb-4 text-foreground">Insights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(c => (
          <Card key={c.title} className="animate-fade-in">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-lg ${c.bg}`}>
                  <c.icon className={`h-4 w-4 ${c.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{c.title}</p>
                  <p className="text-xl font-bold text-foreground mt-0.5">{c.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{c.subtitle}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
