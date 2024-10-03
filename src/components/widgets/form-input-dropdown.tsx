import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./form-input-props";

interface OptionType {
  label: string;
  value: string;
  default?: boolean;
}
interface FormInputDropdownProps extends FormInputProps {
  options: OptionType[];
}

export const FormInputDropdown: React.FC<FormInputDropdownProps> = ({
  name,
  control,
  label,
  options,
}) => {
  const generateSingleOptions = () => {
    return options.map((option: any) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <FormControl size={"small"}>
      <InputLabel>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select onChange={onChange} value={value}>
            {generateSingleOptions()}
          </Select>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};
