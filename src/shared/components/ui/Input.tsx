import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      error = false,
      errorMessage = '',
      label,
      disabled = false,
      placeholder,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'w-full px-3 py-2.5 bg-[#11111B] border rounded-[14px] font-inter text-sm text-[#FFFFFF] placeholder-[#7E86A4] transition-all duration-200 ease-out focus:outline-none';

    const borderStyles = error
      ? 'border-[#FF3D71] shadow-[0_0_16px_rgba(255,61,113,0.3)] focus:border-[#FF3D71]'
      : 'border-[#2A2A40] shadow-none focus:border-[#FF2E9A] focus:shadow-[0_0_16px_rgba(255,46,154,0.3)]';

    const disabledStyles = disabled
      ? 'bg-[rgba(26,26,38,0.5)] border-[#2A2A40] text-[#7E86A4] opacity-60 cursor-not-allowed'
      : '';

    const inputClasses = [baseStyles, borderStyles, disabledStyles, className]
      .filter(Boolean)
      .join(' ');

    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 text-sm font-semibold text-[#FFFFFF]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          className={inputClasses}
          {...props}
        />
        {error && errorMessage && (
          <p className="mt-1 text-xs font-medium text-[#FF3D71]">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';