// src/components/EmptyState.jsx

'use client';

import Link from 'next/link';
import { PackageOpen } from 'lucide-react';

export default function EmptyState({
  icon: Icon = PackageOpen,
  title = 'Nothing Found',
  description = 'There are no items matching your criteria right now.',
  actionText = 'Explore Products',
  actionHref = '/products',
  onAction = null,
  className = ''
}) {
  return (
    <div
      className={`text-center py-16 px-6 bg-white rounded-extra border border-primary/15 shadow-subtle max-w-lg mx-auto ${className}`}
    >
      <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mx-auto mb-4 text-primary border border-primary/10 shadow-inner">
        <Icon className="w-8 h-8 text-primary/80" />
      </div>

      <h3 className="text-xl font-poppins font-bold text-charcoal mb-2">
        {title}
      </h3>

      <p className="text-xs sm:text-sm text-charcoal-light font-inter max-w-sm mx-auto mb-6 leading-relaxed">
        {description}
      </p>

      {actionText && (
        actionHref ? (
          <Link
            href={actionHref}
            className="inline-flex items-center gap-2 bg-primary text-cream px-6 py-2.5 rounded-large font-poppins font-bold text-xs hover:bg-primary-hover transition-all shadow-subtle hover:shadow-medium active:scale-95"
          >
            {actionText}
          </Link>
        ) : (
          <button
            type="button"
            onClick={onAction}
            className="inline-flex items-center gap-2 bg-primary text-cream px-6 py-2.5 rounded-large font-poppins font-bold text-xs hover:bg-primary-hover transition-all shadow-subtle hover:shadow-medium active:scale-95"
          >
            {actionText}
          </button>
        )
      )}
    </div>
  );
}
