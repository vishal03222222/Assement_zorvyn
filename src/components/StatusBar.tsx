import { Wifi, WifiOff, RefreshCw, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StatusBarProps {
  isOffline: boolean;
  isLoading: boolean;
  lastUpdated: Date | null;
  onRefresh: () => void;
}

export const StatusBar = ({ isOffline, isLoading, lastUpdated, onRefresh }: StatusBarProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex items-center justify-between mb-6 p-4 rounded-lg bg-card border border-border">
      <div className="flex items-center gap-4">
        <div className={`flex items-center gap-2 ${isOffline ? 'text-destructive' : 'text-green-500'}`}>
          {isOffline ? <WifiOff size={18} /> : <Wifi size={18} />}
          <span className="text-sm font-medium">
            {isOffline ? 'Offline - Showing cached images' : 'Online'}
          </span>
        </div>
        
        {lastUpdated && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock size={16} />
            <span className="text-sm">
              Last updated: {formatTime(lastUpdated)}
            </span>
          </div>
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={onRefresh}
        disabled={isLoading || isOffline}
        className="gap-2"
      >
        <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
        Refresh
      </Button>
    </div>
  );
};
