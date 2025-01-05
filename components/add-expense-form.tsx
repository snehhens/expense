'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { addExpense } from '@/utils/sheets';
import { useQueryClient } from '@tanstack/react-query';

export function AddExpenseForm({ type, onSuccess }: { type: 'income' | 'expense'; onSuccess: () => void }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [expenseId, setExpenseId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Different categories for income and expenses
  const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Gift'];
  const expenseCategories = ['Tea & Snacks', 'Coffee', 'Gift', 'Subscription', 'Shopping'];

  useEffect(() => {
    setExpenseId(crypto.randomUUID());
  }, []);

  const handleSubmit = async () => {
    if (!expenseId) return;

    const expense = {
      id: expenseId,
      amount: parseFloat(amount),
      category: { id: category, name: category, icon: getCategoryIcon(category) },
      description,
      date: new Date().toISOString(),
      currency: 'USD',
      type,
    };

    const result = await addExpense(expense);
    if (result.success) {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      onSuccess();
    } else {
      console.error('Failed to add expense:', result.error);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Add Amount</h2>
          <span className="text-sm text-muted-foreground">USD</span>
        </div>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="text-4xl font-bold text-center"
          placeholder="0"
        />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {type === 'income'
                ? incomeCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))
                : expenseCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a note"
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="w-full p-4 text-2xl font-medium bg-black text-white rounded-full"
        >
          →
        </motion.button>
      </div>
    </div>
  );
}

function getCategoryIcon(category: string): string {
  switch (category.toLowerCase()) {
    case 'coffee':
    case 'tea & snacks':
      return 'coffee';
    case 'gift':
      return 'gift';
    case 'subscription':
      return 'mail';
    case 'shopping':
      return 'shopping-cart';
    default:
      return 'dollar-sign';
  }
}