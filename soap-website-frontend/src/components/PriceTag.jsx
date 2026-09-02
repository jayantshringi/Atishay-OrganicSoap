// src/components/PriceTag.jsx

'use client';

export default function PriceTag({
  price = 399,
  compareAtPrice = null,
  size = 'md',
  showBadge = true,
  className = ''
}) {
  const numPrice = Number(price) || 0;
  const numCompare = compareAtPrice ? Number(compareAtPrice) : null;
  const hasDiscount = numCompare && numCompare > numPrice;
  const discountPercent = hasDiscount
    ? Math.round(((numCompare - numPrice) / numCompare) * 100)
    : 0;

  const sizeConfigs = {
    sm: {
      price: 'text-sm font-bold',
      compare: 'text-xs',
      badge: 'text-[9px] px-1.5 py-0.5'
    },
    md: {
      price: 'text-lg font-bold',
      compare: 'text-xs',
      badge: 'text-[10px] px-2 py-0.5'
    },
    lg: {
      price: 'text-2xl font-extrabold',
      compare: 'text-sm',
      badge: 'text-xs px-2.5 py-0.5'
    },
    xl: {
      price: 'text-3xl font-extrabold',
      compare: 'text-base',
      badge: 'text-xs px-2.5 py-1'
    }
  };

  const conf = sizeConfigs[size] || sizeConfigs.md;

  return (
    <div className={`flex items-baseline gap-2 flex-wrap ${className}`}>
      <span className={`font-poppins text-primary ${conf.price}`}>
        ₹{numPrice}
      </span>

      {hasDiscount && (
        <>
          <span className={`font-inter text-charcoal-light line-through ${conf.compare}`}>
            ₹{numCompare}
          </span>
          {showBadge && (
            <span className={`font-poppins font-bold bg-secondary/20 text-secondary-dark rounded-full uppercase tracking-wider ${conf.badge}`}>
              {discountPercent}% OFF
            </span>
          )}
        </>
      )}
    </div>
  );
}
