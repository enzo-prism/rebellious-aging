import React from 'react';

import { cn } from '@/lib/utils';

interface PageTopUtilityRowProps {
  children: React.ReactNode;
  className?: string;
}

const PageTopUtilityRow: React.FC<PageTopUtilityRowProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn('relative z-10 mb-4 flex items-center justify-end sm:mb-6', className)}>
      {children}
    </div>
  );
};

export default PageTopUtilityRow;
