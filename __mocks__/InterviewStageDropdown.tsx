import React from 'react';

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

const MockInterviewStageDropdown: React.FC<InterviewStageDropdownProps> = ({
  placeholder,
  options,
  name,
  onChange,
  value,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
  };

  return (
    <div data-testid="mock-dropdown">
      <label htmlFor={name}>{placeholder || 'Dropdown'}</label>
      <select
        id={name}
        value={value}
        onChange={handleChange}
        data-testid="mock-select"
      >
        <option value="" disabled>
          Select an option
        </option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MockInterviewStageDropdown;
