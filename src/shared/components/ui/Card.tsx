import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated';
  hover?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      hover = true,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'rounded-[22px] transition-all duration-200 ease-out';

    const variantStyles = {
      default: 'bg-[#181827] border border-[rgba(255,255,255,0.05)] shadow-[0_4px_12px_rgba(0,0,0,0.15)]',
      glass: 'bg-[rgba(22,22,34,0.8)] backdrop-blur-[18px] border border-[rgba(255,255,255,0.05)] shadow-[0_8px_24px_rgba(0,0,0,0.2)]',
      elevated: 'bg-[#181827] border border-[rgba(255,255,255,0.05)] shadow-[0_8px_24px_rgba(0,0,0,0.2)]',
    };

    const hoverStyles = hover
      ? 'hover:border-[rgba(255,46,154,0.3)] hover:shadow-[0_0_20px_rgba(255,46,154,0.2)]'
      : '';

    const cardClasses = [baseStyles, variantStyles[variant], hoverStyles, className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={cardClasses} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={['px-4 py-6 border-b border-[rgba(255,255,255,0.05)]', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h2
      ref={ref}
      className={['text-lg font-semibold text-[#FFFFFF]', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </h2>
  )
);

CardTitle.displayName = 'CardTitle';

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={['text-sm text-[#AAB2D5]', className]
      .filter(Boolean)
      .join(' ')}
    {...props}
  >
    {children}
  </p>
));

CardDescription.displayName = 'CardDescription';

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={['px-4 py-4', className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  )
);

CardContent.displayName = 'CardContent';

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={['px-4 py-4 border-t border-[rgba(255,255,255,0.05)] flex gap-3', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';