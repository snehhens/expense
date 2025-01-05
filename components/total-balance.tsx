'use client';

import { useQuery } from '@tanstack/react-query';
import { getExpenses } from '@/utils/sheets';
import { formatCurrency } from '@/utils/format';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function TotalBalance() {
  const { data: expenses = [] } = useQuery({
    queryKey: ['expenses'],
    queryFn: getExpenses,
  });

  // Sum all amounts (positive for income, negative for expenses)
  const totalBalance = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <Card className="bg-primary text-primary-foreground">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Total Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold">{formatCurrency(totalBalance, 'USD')}</p>
      </CardContent>
    </Card>
  );
}


// Compare this snippet from components/reset-button.tsx:

export function ResetButton({ onReset }: { onReset: () => void }) {
  return (
    <Button
      onClick={onReset}
      className="w-full bg-blue-500 hover:bg-blue-600 text-white"
    >
      Start New Period
    </Button>
  );
}