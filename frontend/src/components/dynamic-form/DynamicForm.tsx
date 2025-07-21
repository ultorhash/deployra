import { JSX } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, TextField } from "@mui/material";
import { injected } from "wagmi";
import { DynamicFormProps, FieldConfig } from "@app-types";

export const DynamicForm = (props: DynamicFormProps): JSX.Element => {
  const { fields, disabled, isConnected, connect, getButtonText, onSubmit } = props;
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form
      noValidate
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        isConnected
          ? handleSubmit(onSubmit)()
          : connect({ connector: injected() });
      }}
    >
      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
        {fields.map((field: FieldConfig) => (
          <TextField
            fullWidth
            key={field.name}
            placeholder={field.placeholder}
            {...register(field.name, field.required ? { required: `${field.name} is required` } : {})}
            error={!!errors[field.name]}
            helperText={errors[field.name]?.message?.toString() ?? ''}
            disabled={disabled}
            defaultValue={field.defaultValue}
            variant="outlined"
            size="small"
            autoComplete="off"
          />
        ))}
      </Box>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={disabled}
        fullWidth
      >
        {getButtonText()}
      </Button>
    </form>
  );
};
