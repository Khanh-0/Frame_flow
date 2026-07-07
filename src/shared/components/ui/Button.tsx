import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-inter font-semibold transition-all duration-200 ease-out cursor-pointer rounded-[14px] focus-visible:outline-offset-2 focus-visible:outline-2 focus-visible:outline-[#FF2E9A] disabled:opacity-60 disabled:cursor-not-allowed';

    const sizeStyles = {
      sm: 'px-4 py-2 text-sm min-h-10',
      md: 'px-6 py-2.5 text-sm min-h-11',
      lg: 'px-8 py-3 text-base min-h-12',
    };

    const variantStyles = {
      primary: 'bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#FF2E9A] text-white shadow-[0_8px_30px_rgba(168,85,247,0.35)] hover:shadow-[0_8px_30px_rgba(168,85,247,0.45)] hover:enabled:-translate-y-0.5 active:enabled:-translate-y-0 active:enabled:shadow-[0_8px_30px_rgba(168,85,247,0.25)]',
      secondary: 'bg-[#161622] border border-[#2B2B45] text-white hover:enabled:border-[#FF2E9A] hover:enabled:shadow-[0_0_16px_rgba(255,46,154,0.3)] hover:enabled:-translate-y-0.5',
      danger: 'bg-[#FF3D71] text-white shadow-[0_8px_30px_rgba(255,61,113,0.35)] hover:enabled:shadow-[0_8px_30px_rgba(255,61,113,0.45)] hover:enabled:brightness-110',
      ghost: 'text-[#FFFFFF] hover:enabled:bg-rgba(255,46,154,0.1) hover:enabled:text-[#FF2E9A]',
    };

    return (
      <button
        ref={ref}
        className={[
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          className
        ].filter(Boolean).join(' ')}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';