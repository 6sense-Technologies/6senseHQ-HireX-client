'use client';
import * as React from 'react';
import { Controller } from 'react-hook-form';
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
  onChange: (value: string) => void;
  value?: string;
  ClassName?: string;
}

const InterviewStageDropdown: React.FC<InterviewStageDropdownProps> = ({
  placeholder,
  options,
  name,
  errors,
  control,
  onChange,
  value,
  ClassName,
}) => {
  const customStyles = {
    control: (provided: any, state: any) => {
      let backgroundColor = 'white';
      if (state.hasValue) {
        const selectedValue = state.getValue()[0].value;
        if (selectedValue.includes('Online')) {
          backgroundColor = '#DCFCE7';
        } else {
          backgroundColor = '#E5E7EB';
        }
      }
      return {
        ...provided,
        borderColor: errors[name] ? 'red' : '',
        borderRadius: '200px',
        width: '140px',
        height: '24px',
        minHeight: '24px',
        backgroundColor: backgroundColor,
        boxShadow: 'none',
        '&:hover': {
          borderColor: '',
        },
        '&:focus': {
          borderColor: '',
          boxShadow: 'none',
        },
        '&:active': {
          borderColor: '',
          boxShadow: 'none',
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
      height: '24px',
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: '0.375rem',
      width: '120px',
      color: 'black',
      zIndex: 9999,
    }),
    menuPortal: (provided: any) => ({
      ...provided,
      zIndex: 9999,
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
              value={options?.find((option) => option.value === value) || null}
              onChange={(selectedOption) => {
                const selectedValue = selectedOption
                  ? selectedOption.value
                  : '';
                field.onChange(selectedValue);
                onChange(selectedValue);
              }}
              options={options}
              placeholder={placeholder}
              className={`text-nowrap text-twelve ${ClassName}`}
              styles={customStyles}
              isSearchable={false}
              menuPortalTarget={document.body}
              classNamePrefix={'select'}
            />
          </div>
        </div>
      )}
    />
  );
};

export default InterviewStageDropdown;
