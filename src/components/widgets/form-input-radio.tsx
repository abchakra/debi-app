import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { FormInputProps } from "././form-input-props";

interface OptionType {
  label: string;
  value: string;
  default?: boolean;
}

interface FormInputOptionProps extends FormInputProps {
  options: OptionType[];
}

export const FormInputRadio: React.FC<FormInputOptionProps> = ({
  name,
  control,
  label,
  options,
}) => {
  const generateRadioOptions = () => {
    return options.map((singleOption) => (
      <FormControlLabel
        value={singleOption.value}
        label={singleOption.label}
        control={<Radio />}
      />
    ));
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <RadioGroup value={value} onChange={onChange}>
            {generateRadioOptions()}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};
