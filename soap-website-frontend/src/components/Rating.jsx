// src/components/Rating.jsx

'use client';

import { Star } from 'lucide-react';

export default function Rating({
  value = 5,
  count = null,
  size = 'sm',
  interactive = false,
  onChange = () => {},
  showNumber = false,
  className = ''
}) {
  const numValue = Number(value) || 0;

  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6'
  };

  const starSize = sizeClasses[size] || sizeClasses.sm;

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= Math.round(numValue);
          return (
            <button
              key={star}
              type={interactive ? 'button' : undefined}
              disabled={!interactive}
              aria-label={`Rate ${star} out of 5 stars`}
              onClick={() => interactive && onChange(star)}
              className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'} focus:outline-none`}
            >
              <Star
                className={`${starSize} ${
                  isFilled
                    ? 'fill-secondary text-secondary drop-shadow-xs'
                    : 'fill-cream-dark text-cream-dark'
                }`}
              />
            </button>
          );
        })}
      </div>

      {showNumber && (
        <span className="text-xs font-poppins font-bold text-charcoal">
          {numValue.toFixed(1)}
        </span>
      )}

      {count !== null && count !== undefined && (
        <span className="text-[11px] font-inter text-charcoal-light">
          ({count})
        </span>
      )}
    </div>
  );
}
