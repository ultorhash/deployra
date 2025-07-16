import { Fragment, useEffect, useState, type JSX } from "react";
import {
  useChainId,
  useSwitchChain,
  useAccount,
  useConnect,
  useWalletClient,
  useWaitForTransactionReceipt
} from "wagmi";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  Snackbar,
  Tab,
  Tabs,
  Tooltip,
  Typography
} from "@mui/material";
import { FieldValues } from "react-hook-form";
import { DeployOption, SnackbarState } from "@app-types";
import { deployOptions } from "./data";
import { Form } from "components";
import { Address, parseEther } from "viem";
import MuiAlert from '@mui/material/Alert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Token from "@app-contracts/Token.json";

export const DeployPanel = (): JSX.Element => {
  const rowSize = 9;
  const rows = Array.from({ length: Math.ceil(deployOptions.length / rowSize) }, (_, rowIndex) =>
    deployOptions.slice(rowIndex * rowSize, rowIndex * rowSize + rowSize)
  );
  
  const [deployments, setDeployments] = useState<Address[]>([]);
  const [txHash, setTxHash] = useState<Address | undefined>(undefined);
  const [selectedOption, setSelectedOption] = useState<DeployOption>();
  const [tab, setTab] = useState<number>(0);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info"
  });

  const { data: receipt, isLoading: isPending, isSuccess, isError } = useWaitForTransactionReceipt({ hash: txHash });
  const { data: walletClient } = useWalletClient();
  const { switchChain, isPending: isSwitchPending } = useSwitchChain();
  const { isConnected } = useAccount();
  const { connect } = useConnect();
  const chainId = useChainId();

  const handleClick = (option: DeployOption): void => {
    if (chainId !== option.chainId) {
      switchChain({ chainId: option.chainId });
    }

    setSelectedOption(option);
  };

  const getButtonText = (): string => {
    if (!isConnected) return "Connect wallet";
    if (isSwitchPending) return "Switching chain...";
    return isPending ? "Deploying..." : "Deploy";
  }

  const shortenAddress = (address: Address): string => {
    return `${address.slice(0, 5)}...${address.slice(-4)}`;
  }

  const handleChange = (_: React.SyntheticEvent, newValue: number): void => {
    setTab(newValue);
  }

  const onSubmit = async (formData: FieldValues, fee: number): Promise<void> => {
    try {
      setSnackbar({ open: true, message: "Confirm in your wallet...", severity: "info" });

      const hash = await walletClient?.deployContract({
        abi: Token.abi,
        bytecode: Token.bytecode as Address,
        args: [formData.name, formData.symbol, parseEther(fee.toString())],
        value: parseEther(fee.toString())
      });

      if (hash) {
        setTxHash(hash);
        setSnackbar({ open: true, message: "Deploying...", severity: "info" });
      }

    } catch (error: any) {
      if (
        error?.code === 4001 ||
        error?.message?.toLowerCase().includes("user rejected") ||
        error?.message?.toLowerCase().includes("cancelled")
      ) {
        setSnackbar({
          open: true,
          message: "Failed to deploy. Transaction rejected",
          severity: "error"
        });
      }
    }
  };

  useEffect(() => {
    if (isSuccess && receipt?.contractAddress && txHash) {
      setSnackbar({ open: true, message: `Deployed at ${receipt.contractAddress}`, severity: "success" });

      setDeployments((prev) => [...prev, txHash]);
    }

    if (isError) {
      setSnackbar({ open: true, message: 'Transaction failed or reverted', severity: 'error' });
    }

    setTxHash(undefined);
  }, [isSuccess, isError, receipt]);

  const TabPanel = (props: any): JSX.Element => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        id={`tabpanel-${index}`}
        aria-labelledby={`tabpanel-${index}`}
        hidden={value !== index}
        {...other}
      >
        {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
      </div>
    );
  }

  return (
    <Fragment>
      <Card sx={{
        p: 2,
        borderRadius: 2,
        zIndex: 10,
        boxShadow: '0 0 10px rgba(225, 225, 220, 0.2)'
      }}>
        <CardHeader
          title={`Deploy your smart contract`}
          subheader={selectedOption?.chain ? `Selected chain: ${selectedOption?.chain}` : 'Please select chain'}
          sx={{ textAlign: "center", pb: 3 }}
        />
        <CardContent sx={{ py: 0 }}>
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
                          boxShadow: selectedOption?.chain === option.chain ? "0 0 12px #FFF" : "none"
                        }}
                      />
                    </Tooltip>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
          <Box sx={{ width: '100%' }}>
            <Box>
              <Tabs
                aria-label="deploy type"
                value={tab}
                onChange={handleChange}
                sx={(theme) => ({
                  mt: 2,
                  '& .Mui-selected': { color: theme.palette.text.primary },
                  '& .MuiTabs-indicator': { backgroundColor: theme.palette.text.primary },
                })}
              >
                <Tab disableRipple label="Token" />
                <Tab disableRipple label="Contract" />
              </Tabs>
            </Box>
            <TabPanel
              value={tab}
              index={0}
            >
              <Form
                isSwitchPending={isSwitchPending}
                isConnected={isConnected}
                isPending={isPending}
                isOptionSelected={!!selectedOption}
                onSubmit={(formData) => onSubmit(formData, selectedOption!.fee)}
                connect={connect}
                getButtonText={getButtonText}
              />
            </TabPanel>
            <TabPanel
              value={tab}
              index={1}
            >
              Coming soon...
            </TabPanel>
          </Box>
        </CardContent>
        <CardActions sx={{ py: 0 }}>
          <List
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
              maxHeight: 3 * 38,
              gap: 0.5,
              mr: 1,
              mt: 1
            }}
          >
            {deployments.map((address: Address) => {
              return (
                <ListItem
                  key={address}
                  sx={{ py: 0 }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%'
                    }}
                  >
                    <Typography variant="body2">
                      Tx: {shortenAddress(address)}
                    </Typography>
                    <IconButton
                      size="small"
                      edge="end"
                      aria-label="copy txHash"
                      onClick={() => navigator.clipboard.writeText(address)}
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </ListItem>
              );
            })}
          </List>
        </CardActions>
      </Card>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar((prev: SnackbarState) => ({ ...prev, open: false }))}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          sx={{ width: '100%' }}
          severity={snackbar.severity}
          onClose={() => setSnackbar((prev: SnackbarState) => ({ ...prev, open: false }))}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Fragment>
  );
};
