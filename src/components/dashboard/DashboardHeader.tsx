import { useFinance } from '@/context/FinanceContext';
import { Moon, Sun, Shield, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const DashboardHeader = () => {
  const { role, setRole, darkMode, toggleDarkMode } = useFinance();

  return (
    <header className="border-b bg-card px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Finance Dashboard</h1>
          <p className="text-sm text-muted-foreground">Track your financial activity</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border bg-background p-1">
            <Button
              variant={role === 'admin' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setRole('admin')}
              className="gap-1.5"
            >
              <Shield className="h-3.5 w-3.5" /> Admin
            </Button>
            <Button
              variant={role === 'viewer' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setRole('viewer')}
              className="gap-1.5"
            >
              <Eye className="h-3.5 w-3.5" /> Viewer
            </Button>
          </div>
          <Button variant="outline" size="icon" onClick={toggleDarkMode} aria-label="Toggle dark mode">
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
};
