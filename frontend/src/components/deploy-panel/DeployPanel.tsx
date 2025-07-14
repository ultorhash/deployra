import { Fragment, useEffect, useState, type JSX } from "react";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Tab, Tabs, TextField, Tooltip } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { useChainId,
  useChains,
  useSwitchChain,
  useAccount,
  useConnect,
  injected,
  useWriteContract
} from "wagmi";
import { sepolia } from "viem/chains";
import { DeployOption } from "@app-types";
import { ethers } from "ethers";
import { deployOptions } from "./data";
import Token from "@app-contracts/Token.json";

export const DeployPanel = (): JSX.Element => {

  const rowSize = 9;
  
  const rows = Array.from({ length: Math.ceil(deployOptions.length / rowSize) }, (_, rowIndex) =>
    deployOptions.slice(rowIndex * rowSize, rowIndex * rowSize + rowSize)
  );
  
  const [value, setValue] = useState(0);
  const { switchChainAsync } = useSwitchChain();
  const { address, isConnected } = useAccount();
  const chains = useChains();
  const chainId = useChainId();
  const { connect } = useConnect();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm();

  const [selectedOption, setSelectedOption] = useState<DeployOption>();
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleClick = (option: DeployOption) => {
    setSelectedOption(option);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }

  const onSubmit = async (data: FieldValues): Promise<void> => {
    setIsPending(true);
    console.log(chainId);
    console.log(sepolia.id);

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const factory = new ethers.ContractFactory(
      Token.abi,
      Token.bytecode,
      signer
    );

    try {
      const contract = await factory.deploy(data.name, data.symbol);
      console.log("Deploying contract...");

      await contract.waitForDeployment();
      const address = await contract.getAddress();

      console.log("Token deployed at:", address);
      alert(`Token deployed at: ${address}`);
    } catch (err) {
      console.error("Deploy error:", err);
    } finally {
      setIsPending(false);
    }
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
        subheader={selectedOption?.chain ? `Selected chain: ${selectedOption?.chain}` : 'Please select chain'}
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
                      onClick={() => handleClick(option)}
                      sx={{
                        width: 44,
                        height: 44,
                        cursor: "pointer",
                        transition: "0.1s",
                        opacity: selectedOption?.chain === option.chain ? 1 : 0.4,
                        boxShadow: selectedOption?.chain === option.chain ? "0 0 8px #000" : "none"
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
              <Tab label="Token" />
              <Tab label="Contract" />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <form
              noValidate
              method="post"
              onSubmit={(e) => {
                e.preventDefault();
                isConnected ? handleSubmit(onSubmit)() : connect({ connector: injected() })
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  mb: 2
                }}
              >
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  autoComplete="off"
                  {...register('name', { required: 'name is required' })}
                  error={!!errors.name}
                  helperText={errors.name && typeof errors.name.message === 'string' ? errors.name.message : ''}
                />
                <TextField
                  fullWidth
                  label="Symbol"
                  variant="outlined"
                  autoComplete="off"
                  {...register('symbol', { required: 'symbol is required' })}
                  error={!!errors.symbol}
                  helperText={errors.symbol && typeof errors.symbol.message === 'string' ? errors.symbol.message : ''}
                />
              </Box>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={isPending}
              >
                {
                  isPending
                    ? "Deploying..."
                    : isConnected
                    ? "Deploy"
                    : "Connect wallet"
                }
              </Button>
            </form>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Item two
          </CustomTabPanel>
        </Box>
      </CardActions>
    </Card>
  );
};
