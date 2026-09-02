// src/components/Spinner.jsx

'use client';

export default function Spinner({
  size = 'md',
  text = null,
  color = 'primary',
  className = ''
}) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-3',
    xl: 'w-12 h-12 border-4'
  };

  const colorClasses = {
    primary: 'border-primary/25 border-t-primary',
    secondary: 'border-secondary/25 border-t-secondary',
    cream: 'border-white/30 border-t-white'
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-3 py-6 ${className}`}>
      <div
        className={`${sizeClasses[size] || sizeClasses.md} ${colorClasses[color] || colorClasses.primary} rounded-full animate-spin`}
      />
      {text && (
        <span className="text-xs font-poppins font-medium text-charcoal-light">
          {text}
        </span>
      )}
    </div>
  );
}
