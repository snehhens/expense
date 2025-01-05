'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AddExpenseForm } from '@/components/add-expense-form';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export function AddExpenseButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<'income' | 'expense'>('expense');

  return (
    <div className="flex gap-2 w-full">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setType('income')}
            className="w-full bg-black text-white hover:bg-gray-800 transition-colors duration-300"
          >
            Add Income
          </Button>
        </DialogTrigger>
        <DialogTrigger asChild>
          <Button
            onClick={() => setType('expense')}
            className="w-full bg-black text-white hover:bg-gray-800 transition-colors duration-300"
          >
            Add Expense
          </Button>
        </DialogTrigger>
        <DialogContent>
          <VisuallyHidden>
            <DialogTitle>Add {type === 'income' ? 'Income' : 'Expense'}</DialogTitle>
          </VisuallyHidden>
          <AddExpenseForm type={type} onSuccess={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}