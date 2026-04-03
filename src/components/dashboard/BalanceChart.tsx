import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { monthlyBalanceData } from '@/data/mockData';

const chartConfig = {
  income: { label: 'Income', color: 'hsl(142 71% 45%)' },
  expenses: { label: 'Expenses', color: 'hsl(0 84% 60%)' },
};

export const BalanceChart = () => (
  <Card className="animate-fade-in">
    <CardHeader>
      <CardTitle className="text-lg">Balance Trend</CardTitle>
    </CardHeader>
    <CardContent>
      <ChartContainer config={chartConfig} className="h-[280px] w-full">
        <AreaChart data={monthlyBalanceData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(142 71% 45%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(142 71% 45%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(0 84% 60%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(0 84% 60%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis dataKey="month" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
          <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area type="monotone" dataKey="income" stroke="hsl(142 71% 45%)" fill="url(#incomeGrad)" strokeWidth={2} />
          <Area type="monotone" dataKey="expenses" stroke="hsl(0 84% 60%)" fill="url(#expenseGrad)" strokeWidth={2} />
        </AreaChart>
      </ChartContainer>
    </CardContent>
  </Card>
);
