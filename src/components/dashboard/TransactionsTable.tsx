import { useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Trash2, ArrowUpDown, Download } from 'lucide-react';
import { Category, TransactionType } from '@/types/finance';
import { AddTransactionDialog } from './AddTransactionDialog';

const categories: Category[] = ['Food & Dining', 'Shopping', 'Transportation', 'Entertainment', 'Bills & Utilities', 'Healthcare', 'Education', 'Salary', 'Freelance', 'Investments', 'Other'];

export const TransactionsTable = () => {
  const { filteredTransactions, filters, setFilters, role, deleteTransaction } = useFinance();
  const [addOpen, setAddOpen] = useState(false);

  const exportCSV = () => {
    const header = 'Date,Description,Amount,Category,Type\n';
    const rows = filteredTransactions.map(t => `${t.date},"${t.description}",${t.amount},${t.category},${t.type}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'transactions.csv';
    a.click();
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <CardTitle className="text-lg">Transactions</CardTitle>
          <div className="flex items-center gap-2">
            {role === 'admin' && (
              <Button size="sm" onClick={() => setAddOpen(true)} className="gap-1.5">
                <Plus className="h-3.5 w-3.5" /> Add
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={exportCSV} className="gap-1.5">
              <Download className="h-3.5 w-3.5" /> Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={filters.search}
              onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
              className="pl-9"
            />
          </div>
          <Select value={filters.type} onValueChange={(v) => setFilters(f => ({ ...f, type: v as TransactionType | 'all' }))}>
            <SelectTrigger className="w-full sm:w-[140px]"><SelectValue placeholder="Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filters.category} onValueChange={(v) => setFilters(f => ({ ...f, category: v as Category | 'all' }))}>
            <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setFilters(f => ({ ...f, sortOrder: f.sortOrder === 'asc' ? 'desc' : 'asc' }))}
            aria-label="Toggle sort order"
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>

        {/* Table */}
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg font-medium">No transactions found</p>
            <p className="text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  {role === 'admin' && <TableHead className="w-[50px]" />}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map(t => (
                  <TableRow key={t.id}>
                    <TableCell className="text-muted-foreground whitespace-nowrap">
                      {new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </TableCell>
                    <TableCell className="font-medium">{t.description}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">{t.category}</Badge>
                    </TableCell>
                    <TableCell className={`text-right font-mono font-medium ${t.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                      {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                    </TableCell>
                    {role === 'admin' && (
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => deleteTransaction(t.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
      <AddTransactionDialog open={addOpen} onOpenChange={setAddOpen} />
    </Card>
  );
};
