'use client';

import { motion } from 'framer-motion';
import { Coffee, Gift, Mail, DollarSign, Utensils, ShoppingCart } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { formatCurrency } from '@/utils/format';
import { Card, CardContent } from '@/components/ui/card';
import { Expense } from '@/types/expense';
import { getExpenses } from '@/utils/sheets';

const categoryIcons = {
  'Tea & Snacks': Utensils,
  Coffee: Coffee,
  Gift: Gift,
  Subscription: Mail,
  Shopping: ShoppingCart,
  default: DollarSign,
} as const;

type CategoryIconKey = keyof typeof categoryIcons;

export function ExpenseList() {
  const { data: expenses = [], isLoading, error } = useQuery({
    queryKey: ['expenses'],
    queryFn: getExpenses,
  });

  // Sort transactions by date (newest first)
  const sortedExpenses = expenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Group transactions by date
  const groupedExpenses = sortedExpenses.reduce((groups, expense) => {
    const date = new Date(expense.date).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(expense);
    return groups;
  }, {} as Record<string, Expense[]>);

  if (isLoading) return <div>Loading expenses...</div>;
  if (error) return <div>Error loading expenses</div>;

  return (
    <div className="space-y-4">
      {Object.entries(groupedExpenses).map(([date, expenses]) => (
        <div key={date}>
          {/* Date Header */}
          <p className="text-sm text-muted-foreground mb-2">
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>

          {/* Transactions for the Date */}
          <div className="space-y-2">
            {expenses.map((expense, index) => {
              const iconKey = (expense.category.name in categoryIcons ? expense.category.name : 'default') as CategoryIconKey;
              const Icon = categoryIcons[iconKey];

              // Ensure the key is unique
              const uniqueKey = expense.id || `expense-${index}`;

              return (
                <motion.div
                  key={uniqueKey} // Use a unique key
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-gray-100 rounded-full">
                          <Icon className="w-5 h-5 text-black" />
                        </div>
                        <div>
                          <p className="font-medium">{expense.category.name}</p>
                          <p className="text-sm text-muted-foreground">{expense.description}</p>
                        </div>
                      </div>
                      <p className="font-semibold">
                        {expense.type === 'expense' ? '' : ''}
                        {formatCurrency(expense.amount, expense.currency)}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}