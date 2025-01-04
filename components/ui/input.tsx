import * as React from 'react';
import { cn } from '@/lib/utils';
import { Controller } from 'react-hook-form';
import { Warning } from '@phosphor-icons/react';

interface InputProps extends React.ComponentProps<'input'> {
  control: any;
  name: string;
  errors?: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, control, name, errors, type = 'text', ...props }, ref) => {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className='relative'>
            <input
              {...field}
              value={field?.value || ''}
              type={type}
              className={cn(
                'border-input focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent py-1 pl-3 pr-10 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-subHeading focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
                {
                  'border-errorColor focus-visible:ring-errorColor/50':
                    errors[name]?.message,
                },
                className
              )}
              ref={ref}
              {...props}
            />
            {errors && errors[name] && (
              <p className='absolute ml-2 mt-1 flex items-center text-twelve text-red-500'>
                <Warning className='mr-1' />
                {errors[name].message}
              </p>
            )}
          </div>
        )}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
