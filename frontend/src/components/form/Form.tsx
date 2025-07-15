import { FormProps } from "@app-types";
import { Box, Button, TextField } from "@mui/material";
import { JSX } from "react";
import { useForm } from "react-hook-form";
import { injected } from "wagmi";

export const Form = (props: FormProps): JSX.Element => {
  const { isConnected, isPending, isOptionSelected, onSubmit, connect, getButtonText } = props;

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      symbol: ''
    }
  });

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
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          autoComplete="off"
          {...register('name', { required: 'name is required' })}
          error={!!errors.name}
          helperText={errors.name?.message ?? ''}
        />
        <TextField
          fullWidth
          label="Symbol"
          variant="outlined"
          autoComplete="off"
          {...register('symbol', { required: 'symbol is required' })}
          error={!!errors.symbol}
          helperText={errors.symbol?.message ?? ''}
        />
      </Box>

      <Button
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
        disabled={isPending || !isOptionSelected}
      >
        {getButtonText()}
      </Button>
    </form>
  );
};
