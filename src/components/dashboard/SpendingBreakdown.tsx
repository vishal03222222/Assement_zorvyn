import { useMemo } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell } from 'recharts';

const COLORS = [
  'hsl(262 83% 58%)', 'hsl(142 71% 45%)', 'hsl(38 92% 50%)',
  'hsl(0 84% 60%)', 'hsl(199 89% 48%)', 'hsl(328 85% 46%)',
  'hsl(180 60% 45%)', 'hsl(45 93% 47%)',
];

export const SpendingBreakdown = () => {
  const { transactions } = useFinance();

  const data = useMemo(() => {
    const map: Record<string, number> = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value: Math.round(value * 100) / 100 }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const chartConfig = Object.fromEntries(data.map((d, i) => [d.name, { label: d.name, color: COLORS[i % COLORS.length] }]));

  if (!data.length) {
    return (
      <Card className="animate-fade-in">
        <CardHeader><CardTitle className="text-lg">Spending Breakdown</CardTitle></CardHeader>
        <CardContent className="flex items-center justify-center h-[280px] text-muted-foreground">No expense data</CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in">
      <CardHeader><CardTitle className="text-lg">Spending Breakdown</CardTitle></CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={3}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {data.map((d, i) => (
            <div key={d.name} className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
              <span className="text-muted-foreground truncate">{d.name}</span>
              <span className="ml-auto font-medium text-foreground">${d.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
