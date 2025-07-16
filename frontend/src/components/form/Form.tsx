import { FormProps } from "@app-types";
import { Box, Button, TextField } from "@mui/material";
import { JSX } from "react";
import { useForm } from "react-hook-form";
import { injected } from "wagmi";

export const Form = (props: FormProps): JSX.Element => {
  const {
    isConnected, isPending, isSwitchPending, isOptionSelected,
    onSubmit, connect, getButtonText
  } = props;

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
          size="small"
          variant="outlined"
          autoComplete="off"
          {...register('name', { required: 'name is required' })}
          disabled={isSwitchPending}
          error={!!errors.name}
          helperText={errors.name?.message ?? ''}
        />
        <TextField
          fullWidth
          label="Symbol"
          size="small"
          variant="outlined"
          autoComplete="off"
          {...register('symbol', { required: 'symbol is required' })}
          disabled={isSwitchPending}
          error={!!errors.symbol}
          helperText={errors.symbol?.message ?? ''}
        />
      </Box>

      <Button
        fullWidth
        disableRipple
        type="submit"
        variant="contained"
        color="primary"
        disabled={isPending || isSwitchPending || !isOptionSelected}
      >
        {getButtonText()}
      </Button>
    </form>
  );
};
