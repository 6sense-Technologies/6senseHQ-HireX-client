'use client';
import * as React from 'react';
import { Controller, UseFormSetValue } from 'react-hook-form';
import Select from 'react-select';
import { Warning } from '@phosphor-icons/react';

type OptionType = {
  value: string;
  label: React.ReactNode;
};

interface InterviewStageDropdownProps {
  placeholder?: string;
  options?: OptionType[];
  errors?: any;
  name: string;
  control: any;
  setValue: UseFormSetValue<any>;
  value?: string;
  ClassName?: string;
}

const InterviewStageDropdown: React.FC<InterviewStageDropdownProps> = ({
  placeholder,
  options,
  name,
  errors,
  control,
  setValue,
  ClassName,
}) => {
  const customStyles = {
    control: (provided: any, state: any) => {
      let backgroundColor = 'white';
      if (state.hasValue) {
        const selectedValue = state.getValue()[0].value;
        if (selectedValue.includes('Online')) {
          backgroundColor = '#DCFCE7';
        } else if (selectedValue.includes('Offline')) {
          backgroundColor = '#E5E7EB';
        }
      }
      return {
        ...provided,
        borderColor: errors[name] ? 'red' : "",
        borderRadius: '200px',
        width: '120px',
        backgroundColor: backgroundColor,
        boxShadow: 'none', // Remove box shadow
        '&:hover': {
          borderColor: "",
        },
        '&:focus': {
          borderColor: "", // Remove border color on focus
          boxShadow: 'none', // Remove box shadow on focus
        },
        '&:active': {
          borderColor: "", // Remove border color on active
          boxShadow: 'none', // Remove box shadow on active
        },
      };
    },
    singleValue: (provided: any, state: any) => {
      const selectedValue = state.getValue()[0].value;
      return {
        ...provided,
        color: selectedValue.includes('Online') ? '#166534' : 'black',
      };
    },
    option: (provided: any, state: any) => ({
      ...provided,
      color: 'black',
      '&:hover': {
        color: 'black',
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    indicatorsContainer: () => ({
      color: 'black',
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: '0.375rem',
      width: '120px',
      color: 'black',
    }),
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className={`relative flex items-center`}>
          <div className='relative w-full max-w-[110px]'>
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
              }}
              options={options}
              placeholder={placeholder}
              className={`text-nowrap text-twelve ${ClassName}`}
              styles={customStyles}
            />
            {/* {fieldState.invalid && errors && (
              <span className='absolute mt-2 flex justify-start text-xs text-red-500'>
                <Warning className='mr-1 mt-[1px]' />
                {errors[name]?.message}
              </span>
            )} */}
          </div>
        </div>
      )}
    />
  );
};

export default InterviewStageDropdown;