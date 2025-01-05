'use client';

import { Button } from '@/components/ui/button';

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