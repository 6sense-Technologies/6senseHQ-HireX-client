'use client';
import * as React from 'react';
import { Controller, UseFormSetValue } from 'react-hook-form';
import Select from 'react-select';
import { Warning } from '@phosphor-icons/react';

type OptionType = {
  value: string;
  label: string;
};

interface DropdownProps {
  placeholder?: string;
  options?: OptionType[];
  errors?: any;
  name: string;
  control: any;
  setValue: UseFormSetValue<any>;
  value?: string;
  onchange?: (value: string[]) => void;
  ClassName?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  placeholder,
  options,
  name,
  errors,
  control,
  setValue,
  onchange,
  ClassName,
}) => {
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderColor: errors[name] ? 'red' : provided.borderColor,
      '&:hover': {
        borderColor: errors[name] ? 'red' : provided.borderColor,
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className={`relative flex items-center gap-7`}>
          <div className='relative w-full'>
            <Select
              {...field}
              instanceId={name}
              value={
                Array.isArray(field.value)
                  ? options?.find(
                      (option) => option.value === field.value[0]
                    ) || null
                  : null
              }
              onChange={(selectedOption) => {
                const selectedValue = selectedOption
                  ? [selectedOption.value]
                  : [];
                field.onChange(selectedValue);
                setValue(name, selectedValue, { shouldValidate: true });
                if (onchange) {
                  onchange(selectedValue);
                }
              }}
              options={options}
              placeholder={placeholder}
              className={`w-full ${ClassName}`}
              styles={customStyles}
            />
            {fieldState.invalid && errors && (
              <span className='absolute mt-2 flex justify-start text-xs text-red-500'>
                <Warning className='mr-1 mt-[1px]' />
                {errors[name]?.message}
              </span>
            )}
          </div>
        </div>
      )}
    />
  );
};

export default Dropdown;
