import { Fragment, useEffect, useRef, useState, type JSX } from "react";
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
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Tab,
  Tabs,
  Tooltip
} from "@mui/material";
import { FieldValues } from "react-hook-form";
import { useSnackbar } from "notistack";
import { DeployOption } from "@app-types";
import { deployOptions } from "./data";
import { Form } from "components";
import { Address, parseEther } from "viem";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Token from "@app-contracts/Token.json";
import { customChains, supportedChains } from "@app-chains";
import { RainbowKitChain } from "@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitChainContext";

export const DeployPanel = (): JSX.Element => {
  const chains = [...supportedChains, customChains];

  const iconSize = 36;
  const rowSize = 10;

  const mainnetOptions = deployOptions.filter(option => option.type === "mainnet");
  const testnetOptions = deployOptions.filter(option => option.type === "testnet");

  const makeRows = (options: DeployOption[]) =>
    Array.from({ length: Math.ceil(options.length / rowSize) }, (_, rowIndex: number) =>
      options.slice(rowIndex * rowSize, rowIndex * rowSize + rowSize)
    );

  const mainnetRows = makeRows(mainnetOptions);
  const testnetRows = makeRows(testnetOptions);

  const explorerRef = useRef<string | undefined>(undefined);

  const [txHash, setTxHash] = useState<Address | undefined>(undefined);
  const [selectedOption, setSelectedOption] = useState<DeployOption>();
  const [deployTab, setDeployTab] = useState<number>(0);
  const [networkTab, setNetworkTab] = useState<number>(0);

  const { enqueueSnackbar } = useSnackbar();

  const { data: receipt, isLoading: isPending, isSuccess, isError } = useWaitForTransactionReceipt({ hash: txHash });
  const { data: walletClient } = useWalletClient();
  const { switchChainAsync, isPending: isSwitchPending } = useSwitchChain();
  const { isConnected } = useAccount();
  const { connect } = useConnect();
  const chainId = useChainId();

  const handleClick = async (option: DeployOption): Promise<void> => {
    if (chainId !== option.chainId) {
      await switchChainAsync({ chainId: option.chainId });
      setSelectedOption(option);
    } else {
      setSelectedOption(option);
    }
  };

  const getButtonText = (): string => {
    if (!isConnected) return "Connect wallet";
    if (isSwitchPending) return "Switching chain...";
    return isPending ? "Deploying..." : "Deploy";
  }

  const handleDeployTypeChange = (_: React.SyntheticEvent, newValue: number): void => {
    setDeployTab(newValue);
  }

  const handleNetworkTypeChange = (_: React.SyntheticEvent, newValue: number): void => {
    setNetworkTab(newValue);
  } 

  const onSubmit = async (formData: FieldValues, fee: number): Promise<void> => {
    try {
      enqueueSnackbar('Confirm in your wallet...', { variant: 'default' });

      const hash = await walletClient?.deployContract({
        abi: Token.abi,
        bytecode: Token.bytecode as Address,
        args: [formData.name, formData.symbol, parseEther(fee.toString())],
        value: parseEther(fee.toString())
      });

      if (hash) {
        setTxHash(hash);
        enqueueSnackbar('Deploying...', { variant: 'default' });
      }

    } catch (error: any) {
      if (
        error?.code === 4001 ||
        error?.message?.toLowerCase().includes("user rejected") ||
        error?.message?.toLowerCase().includes("cancelled")
      ) {
        enqueueSnackbar('Failed to deploy. Transaction rejected', { variant: 'error' });
      }
    }
  };

  useEffect(() => {
    if (isSuccess && receipt?.contractAddress && txHash) {
      enqueueSnackbar(`Deployed successfully!`, { variant: 'success', action: () => (
        <Button
          color="inherit"
          size="small"
          endIcon={<OpenInNewIcon />}
          sx={{ fontSize: 14, textTransform: 'none' }}
          onClick={() => {
            window.open(`${explorerRef.current}/tx/${txHash}`, '_blank');
          }}
        >
          View
        </Button>
      )});
    }

    if (isError) {
      enqueueSnackbar('Failed to deploy. Transaction rejected', { variant: 'error' });
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

  const renderRows = (
    rows: DeployOption[][],
    selectedOption: DeployOption | undefined,
    handleClick: (option: DeployOption) => void
  ) => (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      sx={{
        p: 2,
        height: 160,
        overflowY: 'scroll'
      }}
    >
      {rows.map((row: DeployOption[], rowIndex) => (
        <Box
          display="flex"
          key={rowIndex}
          gap={2}
        >
          {row.map((option: DeployOption, index: number) => (
            <Box
              key={index}
              width={iconSize}
              height={iconSize}
            >
              <Tooltip
                arrow
                title={
                  <Fragment>
                    <p style={{ margin: 0 }}>{option.chain}</p>
                    <p style={{ margin: 0 }}>Fee: {option.fee}</p>
                  </Fragment>
                }
                slotProps={{ transition: { timeout: 0 } }}
              >
                {option.chain === "HyperEVM" || option.chain === "Pharos Testnet" || option.chain === "Citrea Testnet" ? (
                  <Badge
                    badgeContent="New!"
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    sx={{
                      '& .MuiBadge-badge': {
                        fontSize: '0.6rem',
                        padding: '0 4px',
                        borderRadius: '4px',
                        backgroundColor: '#00A86B'
                      },
                    }}
                  >
                    <Avatar
                      alt={option.chain}
                      src={`/assets/chains/${option.icon}`}
                      onClick={() => handleClick(option)}
                      sx={{
                        width: iconSize,
                        height: iconSize,
                        cursor: "pointer",
                        transition: "0.1s",
                        opacity: selectedOption?.chain === option.chain ? 1 : 0.4,
                        boxShadow: selectedOption?.chain === option.chain ? "0 0 12px #FFF" : "none"
                      }}
                    />
                  </Badge>
                ) : (
                  <Avatar
                    alt={option.chain}
                    src={`/assets/chains/${option.icon}`}
                    onClick={() => handleClick(option)}
                    sx={{
                      width: iconSize,
                      height: iconSize,
                      cursor: "pointer",
                      transition: "0.1s",
                      opacity: selectedOption?.chain === option.chain ? 1 : 0.4,
                      boxShadow: selectedOption?.chain === option.chain ? "0 0 12px #FFF" : "none"
                    }}
                  />
                )}
              </Tooltip>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );

  return (
    <Fragment>
      <Card sx={{
        p: 1,
        borderRadius: 2,
        zIndex: 10,
        boxShadow: '0 0 10px rgba(225, 225, 220, 0.2)'
      }}>
        <CardHeader
          title={`Deploy your smart contract`}
          subheader={selectedOption?.chain ? `Selected chain: ${selectedOption?.chain}` : 'Please select chain'}
          sx={{ textAlign: "center", pt: 2, pb: 1 }}
        />
        <CardContent sx={{ py: 0 }}>
          <Box sx={{ width: '100%' }}>
            <Tabs
              aria-label="deploy type"
              value={networkTab}
              onChange={handleNetworkTypeChange}
              sx={(theme) => ({
                '& .Mui-selected': { color: theme.palette.text.primary },
                '& .MuiTabs-indicator': { backgroundColor: theme.palette.text.primary },
              })}
            >
              <Tab disableRipple label="Mainnets" />
              <Tab disableRipple label="Testnets" />
            </Tabs>
            <TabPanel
              value={networkTab}
              index={0}
            >
              <Box display="flex" flexDirection="column" gap={2}>
                {renderRows(mainnetRows, selectedOption, handleClick)}
              </Box>
            </TabPanel>
            <TabPanel
              value={networkTab}
              index={1}
            >
              <Box display="flex" flexDirection="column" gap={2}>
                {renderRows(testnetRows, selectedOption, handleClick)}
              </Box>
            </TabPanel>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Tabs
              aria-label="deploy type"
              value={deployTab}
              onChange={handleDeployTypeChange}
              sx={(theme) => ({
                '& .Mui-selected': { color: theme.palette.text.primary },
                '& .MuiTabs-indicator': { backgroundColor: theme.palette.text.primary },
              })}
            >
              <Tab disableRipple label="Token" />
              <Tab disableRipple label="Contract" />
            </Tabs>
            <TabPanel
              value={deployTab}
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
              value={deployTab}
              index={1}
            >
              Coming soon...
            </TabPanel>
          </Box>
        </CardContent>
      </Card>
    </Fragment>
  );
};
