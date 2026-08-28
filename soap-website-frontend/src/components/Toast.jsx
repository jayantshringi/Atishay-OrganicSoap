// src/components/Toast.jsx

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'info', onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  const typeConfig = {
    success: {
      bg: 'bg-primary-darker/95 text-cream border-secondary/50',
      icon: CheckCircle2,
      iconColor: 'text-status-success',
    },
    error: {
      bg: 'bg-charcoal/95 text-cream border-status-error/40',
      icon: XCircle,
      iconColor: 'text-status-error',
    },
    warning: {
      bg: 'bg-charcoal/95 text-cream border-secondary/40',
      icon: AlertTriangle,
      iconColor: 'text-secondary',
    },
    info: {
      bg: 'bg-charcoal/95 text-cream border-primary/40',
      icon: Info,
      iconColor: 'text-primary-light',
    },
  };

  const current = typeConfig[type] || typeConfig.info;
  const IconComponent = current.icon;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm"
        >
          <div
            className={`flex items-center gap-3 px-5 py-3.5 rounded-extra border shadow-large backdrop-blur-xl ${current.bg}`}
          >
            <IconComponent className={`w-5 h-5 shrink-0 ${current.iconColor}`} />
            <p className="text-xs font-poppins font-medium leading-snug flex-grow">
              {message}
            </p>
            <button
              onClick={() => {
                setVisible(false);
                if (onClose) onClose();
              }}
              className="p-1 text-cream/60 hover:text-cream transition-colors rounded-default"
              aria-label="Close Notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
