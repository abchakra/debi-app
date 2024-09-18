import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./form-input-props";

export const FormInputNumber = ({ name, control, label }: FormInputProps) => {
  // const validate = (value: string) => {
  //   const matches = value.match(
  //     /^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:\.\d{1,2})?)(?:e[+-]?\d+)?$/
  //   );
  //   return matches && matches?.length > 0 || "Not a Number";
  // };



  return (
    <Controller
      name={name}
      control={control}
      // rules={{ validate }}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          fullWidth
          label={label}
          value={value}
          type="number"
          variant="outlined"


        />
      )}
    />
  );
};