import { Fragment, useState, type JSX } from "react";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Tab, Tabs, TextField, Tooltip } from "@mui/material";
import { useForm } from "react-hook-form";
import { DeployOption } from "@app-types";
import { deployOptions } from "./data";

export const DeployPanel = (): JSX.Element => {

  const rowSize = 9;
  
  const rows = Array.from({ length: Math.ceil(deployOptions.length / rowSize) }, (_, rowIndex) =>
    deployOptions.slice(rowIndex * rowSize, rowIndex * rowSize + rowSize)
  );
  
  const [chain, setChain] = useState<string>("");
  const [value, setValue] = useState(0);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleClick = (chain: string) => {
    setChain(chain);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }

  const onSubmit = (data: any) => {
    console.log(data);
  };

  function CustomTabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  return (
    <Card sx={(theme) => ({
      p: 2,
      borderRadius: 2
    })}>
      <CardHeader
        title={`Deploy your smart contract`}
        subheader={chain ? `Selected chain: ${chain}` : 'Please select chain'}
        sx={{ textAlign: "center" }}
      />
      <CardContent>
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
        >
          {rows.map((row: DeployOption[], rowIndex: number) => (
            <Box display="flex" key={rowIndex} gap={2}>
              {row.map((option: DeployOption, index: number) => (
                <Box key={index} width={44} height={44}>
                  <Tooltip
                    arrow
                    title={
                      <Fragment>
                        <p style={{ margin: 0 }}>{option.chain}</p>
                        <p style={{ margin: 0 }}>Fee: {option.fee}</p>
                      </Fragment>
                    }
                    slotProps={{
                      transition: {
                        timeout: 0
                      }
                    }}
                  >
                    <Avatar
                      alt={option.chain}
                      src={`/assets/logos/${option.icon}`}
                      onClick={() => handleClick(option.chain)}
                      sx={{
                        width: 44,
                        height: 44,
                        cursor: "pointer",
                        transition: "0.1s",
                        opacity: chain === option.chain ? 1 : 0.4,
                        boxShadow: chain === option.chain ? "0 0 8px #000" : "none"
                      }}
                    />
                  </Tooltip>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </CardContent>
      <CardActions>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              aria-label="deploy type"
              value={value}
              onChange={handleChange}
              sx={(theme) => ({
                '& .Mui-selected': { color: theme.palette.text.primary },
                '& .MuiTabs-indicator': { backgroundColor: theme.palette.text.primary }
              })}
            >
              <Tab label="Contract" />
              <Tab label="Token" />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            Item One
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  mb: 2
                }}
              >
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  {...register('name', { required: 'name is required' })}
                  error={!!errors.name}
                  helperText={errors.name && typeof errors.name.message === 'string' ? errors.name.message : ''}
                />
                <TextField
                  label="Symbol"
                  variant="outlined"
                  fullWidth
                  {...register('symbol', { required: 'symbol is required' })}
                  error={!!errors.symbol}
                  helperText={errors.symbol && typeof errors.symbol.message === 'string' ? errors.symbol.message : ''}
                />
              </Box>

              <Button type="submit" variant="contained" color="primary" fullWidth>
                Deploy
              </Button>
            </form>
          </CustomTabPanel>
        </Box>
      </CardActions>
    </Card>
  );
};
