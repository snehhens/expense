'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function FloatingButton() {
  return (
    <motion.div
      className="fixed bottom-4 right-4"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Link
        href="https://myportfolio.ovrlzy.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 text-white p-3 rounded-full shadow-lg"
      >
        Built by Sneh
      </Link>
    </motion.div>
  );
}