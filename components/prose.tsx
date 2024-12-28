import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const proseVariants = cva('prose dark:prose-invert prose-h2:capitalize prose-a:no-underline', {
  variants: {
    theme: {
      light: '',
      dark: 'prose-h2:text-gray-50 prose-h3:text-gray-100 prose-p:text-gray-200 prose-strong:text-gray-50 prose-li:text-gray-200 prose-li:marker:text-gray-50 prose-th:text-gray-50 prose-td:text-gray-100',
    },
  },
  defaultVariants: {
    theme: 'light',
  },
});

export interface ProseProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof proseVariants> {}

export function Prose({ children, theme, className, ...props }: ProseProps) {
  return (
    <div className={cn(proseVariants({ theme, className }))} {...props}>
      {children}
    </div>
  );
}
