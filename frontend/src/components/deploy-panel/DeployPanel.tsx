import { Fragment, useState, type JSX } from "react";
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, Snackbar, Tab, Tabs, Tooltip } from "@mui/material";
import { FieldValues } from "react-hook-form";
import MuiAlert from '@mui/material/Alert';
import {
  useChainId,
  useChains,
  useSwitchChain,
  useAccount,
  useConnect
} from "wagmi";
import { sepolia } from "viem/chains";
import { DeployOption } from "@app-types";
import { ethers } from "ethers";
import { deployOptions } from "./data";
import Token from "@app-contracts/Token.json";
import { Form } from "components";

export const DeployPanel = (): JSX.Element => {

  const rowSize = 9;
  
  const rows = Array.from({ length: Math.ceil(deployOptions.length / rowSize) }, (_, rowIndex) =>
    deployOptions.slice(rowIndex * rowSize, rowIndex * rowSize + rowSize)
  );
  
  const [value, setValue] = useState(0);
  const { switchChainAsync } = useSwitchChain();
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { connect } = useConnect();

  const [selectedOption, setSelectedOption] = useState<DeployOption>();
  const [isPending, setIsPending] = useState<boolean>(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    status: ""
  });

  const handleClick = (option: DeployOption) => {
    console.log(chainId);
    console.log(sepolia.id);

    if (chainId !== option.chainId) {
      switchChainAsync({ chainId: option.chainId });
    }
  
    setSelectedOption(option);
  };

  const getButtonText = (): string => {
    if (!isConnected) return 'Connect wallet';
    return isPending ? 'Deploying...' : 'Deploy';
  }

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }

  const onSubmit = async (formData: FieldValues): Promise<void> => {
    setIsPending(true);
    setSnackbar({
      open: true,
      message: 'Deploying...',
      status: 'waiting',
    });

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const factory = new ethers.ContractFactory(
      Token.abi,
      Token.bytecode,
      signer
    );

    try {
      const contract = await factory.deploy(formData.name, formData.symbol);
      console.log("Deploying contract...");
      const txHash = contract.deploymentTransaction()?.hash;

      await contract.waitForDeployment();
      const address = await contract.getAddress();

      console.log("Token deployed at:", address);
      console.log("Tx hash:", txHash);
      
      setSnackbar({
        open: true,
        message: "Token deployed successfully!",
        status: "success"
      });

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
    <Fragment>
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
              <Form
                isConnected={isConnected}
                isPending={isPending}
                onSubmit={onSubmit}
                connect={connect}
                getButtonText={getButtonText}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              Item two
            </CustomTabPanel>
          </Box>
        </CardActions>
      </Card>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          sx={{ width: '100%' }}
          severity={
            snackbar.status === 'success'
              ? 'success' : snackbar.status === 'error'
              ? 'error' : snackbar.status === 'waiting'
              ? 'info' : undefined
          }
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Fragment>
  );
};
