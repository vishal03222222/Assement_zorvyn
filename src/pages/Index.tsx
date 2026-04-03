import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { BalanceChart } from '@/components/dashboard/BalanceChart';
import { SpendingBreakdown } from '@/components/dashboard/SpendingBreakdown';
import { TransactionsTable } from '@/components/dashboard/TransactionsTable';
import { InsightsSection } from '@/components/dashboard/InsightsSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <SummaryCards />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <BalanceChart />
          </div>
          <SpendingBreakdown />
        </div>
        <InsightsSection />
        <TransactionsTable />
      </main>
    </div>
  );
};

export default Index;
