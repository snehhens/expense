
'use client';

import { Button } from '@/components/ui/button';

export function TransactionFilters({ onFilter }: { onFilter: (period: 'day' | 'week' | 'month') => void }) {
  return (
    <div className="flex gap-2">
      <Button onClick={() => onFilter('day')}>Daily</Button>
      <Button onClick={() => onFilter('week')}>Weekly</Button>
      <Button onClick={() => onFilter('month')}>Monthly</Button>
    </div>
  );
}