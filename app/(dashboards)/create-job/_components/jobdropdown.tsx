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
  ClassName?: string;
}

const JobDropdown: React.FC<DropdownProps> = ({
  placeholder,
  options,
  name,
  errors,
  control,
  setValue,
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
                  ? field.value.map((val: string) =>
                      options?.find((option) => option.value === val)
                    )
                  : options?.find((option) => option.value === field.value) ||
                    null
              }
              onChange={(selectedOption) => {
                const selectedValue = Array.isArray(selectedOption)
                  ? selectedOption.map((option: OptionType) => option.value)
                  : selectedOption
                    ? selectedOption.value
                    : '';
                field.onChange(selectedValue);
                setValue(name, selectedValue, { shouldValidate: true });
              }}
              options={options}
              placeholder={placeholder}
              className={`w-full ${ClassName}`}
              styles={customStyles}
              isSearchable={false}
            />
            {fieldState.invalid && errors && (
              <span className='absolute mt-2 flex justify-start text-sm text-red-500 font-medium'>
                {errors[name]?.message}
              </span>
            )}
          </div>
        </div>
      )}
    />
  );
};

export default JobDropdown;
