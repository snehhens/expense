'use client';

import { Suspense } from 'react';
import { ExpenseList } from '@/components/expense-list';
import { TotalBalance } from '@/components/total-balance';
import { AddExpenseButton } from '@/components/add-expense-button';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="container max-w-2xl mx-auto p-4 space-y-8">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link
          href="https://myportfolio.ovrlzy.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-gray-100 text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors duration-300">
            Snehens
          </button>
        </Link>
      </header>

      {/* Total Balance */}
      <Suspense fallback={<div className="h-20 w-full bg-muted animate-pulse rounded-lg"></div>}>
        <TotalBalance />
      </Suspense>

      {/* Add Income/Expense Buttons */}
      <div className="flex gap-2">
        <AddExpenseButton />
      </div>

      {/* Recent Expenses Section */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl font-semibold">Recent Expenses</h2>

        {/* Expense List */}
        <Suspense fallback={
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 w-full bg-muted animate-pulse rounded-lg"></div>
            ))}
          </div>
        }>
          <ExpenseList />
        </Suspense>
      </div>
    </div>
  );
}