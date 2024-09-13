import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import React from "react";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./form-input-props";


export const FormInputCheckbox: React.FC<FormInputProps> = ({
    name,
    control,
    label,
}) => {
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={false}
            render={({ field: { onChange, value } }) => (
                <FormControlLabel
                    label={label}
                    control={
                        <Checkbox checked={value} onChange={onChange} />
                    }
                />
            )}
        />
    );
};