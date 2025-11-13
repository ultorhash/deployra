import { Fragment, JSX } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, FormControl, FormHelperText, TextField, Typography } from "@mui/material";
import { injected } from "wagmi";
import { DynamicFormProps } from "@app-types";

export const DynamicForm = (props: DynamicFormProps): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {
    fields, disabled, isConnected, backgroundColor, color,
    connect, getButtonText, onSubmit
  } = props;

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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          mb: 1
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          {fields
            .filter((f) => f.type === 'text')
            .map((field) => (
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                autoComplete="off"
                key={field.name}
                placeholder={field.placeholder}
                {...register(field.name, field.required ? { required: `${field.name} is required` } : {})}
                error={!!errors[field.name]}
                helperText={errors[field.name]?.message?.toString() ?? ''}
                disabled={disabled}
                defaultValue={field.defaultValue}
              />
            ))}
        </Box>
        {fields
          .filter((f) => f.type === 'file')
          .map((field) => (
            <FormControl
              key={field.name}
              fullWidth
              error={!!errors[field.name]}
              disabled={disabled}
            >
              <TextField
                fullWidth
                key={field.name}
                type="file"
                slotProps={{
                  input: {
                    inputProps: {
                      accept: "image/*"
                    }
                  }
                }}
                {...register(
                  field.name,
                  field.required ? { required: `${field.name} is required` } : {}
                )}
                disabled={disabled}
              />
              <FormHelperText>
                {errors[field.name]?.message?.toString() ?? ''}
              </FormHelperText>
            </FormControl>
          ))}
      </Box>
      <Button
        variant="contained"
        type="submit"
        disabled={disabled}
        fullWidth
        sx={{ backgroundColor: backgroundColor }}
      >
        <Typography
          variant="inherit"
          sx={{ color: color }}
        >
          {getButtonText()}
        </Typography>
      </Button>
    </form>
  );
};
