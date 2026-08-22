// src/components/Toast.jsx

'use client';

import { useState, useEffect } from 'react';

export default function Toast({ message, type = 'info', onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible || !message) return null;

  const typeStyles = {
    success: 'bg-emerald-800 text-emerald-100 border-emerald-600',
    error: 'bg-red-900 text-red-100 border-red-700',
    warning: 'bg-amber-900 text-amber-100 border-amber-700',
    info: 'bg-primary text-neutral border-accent',
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠️',
    info: 'ℹ️',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-xl backdrop-blur-md ${typeStyles[type] || typeStyles.info}`}>
        <span className="text-lg font-bold">{icons[type]}</span>
        <p className="text-sm font-poppins font-medium">{message}</p>
        <button
          onClick={() => {
            setVisible(false);
            if (onClose) onClose();
          }}
          className="ml-4 opacity-70 hover:opacity-100 transition-opacity text-xs font-bold"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
