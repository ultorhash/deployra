import { Fragment, useEffect, useRef, useState } from "react";
import { Avatar, Box, Button, Card, CardContent, CardHeader, IconButton, Stack} from "@mui/material"
import { useAccount, useChainId, useConnect, useSwitchChain, useWaitForTransactionReceipt, useWalletClient } from "wagmi"
import { Address, parseEther } from "viem"
import { FieldValues } from "react-hook-form"
import { enqueueSnackbar } from "notistack"
import { RainbowKitChain } from "@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitChainContext"
import { DeployOption, FieldConfig } from "@app-types"
import { DynamicForm } from "@app-components"
import { DeployTypes } from "@app-enums"
import { chains } from "chains";
import { StyledToggleButton, StyledToggleButtonGroup } from "./styled";
import Token from "@app-contracts/Token.json"
import Message from "@app-contracts/Message.json"
import StarIcon from "@mui/icons-material/Star"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import DescriptionIcon from "@mui/icons-material/Description"
import GeneratingTokensIcon from "@mui/icons-material/GeneratingTokens"
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import ColorLensIcon from '@mui/icons-material/ColorLens';
import WavingHandIcon from '@mui/icons-material/WavingHand';

interface TogglePanelProps {
  index: number;
  value: number;
  children: React.ReactNode;
}

export const Tile = (option: DeployOption) => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<Address | undefined>(undefined);
  const explorerRef = useRef<string | undefined>(undefined);

  const contractFields: FieldConfig[] = [
    { name: 'message', placeholder: 'Message', required: true, defaultValue: `Hello ${option.chain}!` }
  ];

  const tokenFields: FieldConfig[] = [
    { name: 'name', placeholder: 'Name', required: true, defaultValue: "" },
    { name: 'symbol', placeholder: 'Symbol', required: true, defaultValue: "" }
  ];

  const tabs = [
    { value: 0, label: 'Contract', icon: <DescriptionIcon /> },
    { value: 1, label: 'Token', icon: <GeneratingTokensIcon /> },
    { value: 2, label: 'NFT', icon: <ColorLensIcon /> },
    { value: 3, label: 'GM', icon: <WavingHandIcon /> }
  ];

  const { data: receipt, isLoading: isPending, isSuccess, isError } = useWaitForTransactionReceipt({ hash: txHash });
  const { data: walletClient } = useWalletClient();
  const { switchChainAsync, isPending: isSwitchPending } = useSwitchChain();
  const { isConnected } = useAccount();
  const { connect } = useConnect();
  const chainId = useChainId();

  const toggleFavorite = (): void => {
    const stored = localStorage.getItem('favorites');
    const favorites = stored ? JSON.parse(stored) : {};

    const updatedFavorites = {
      ...favorites,
      [option.chainId]: !favorites[option.chainId],
    };

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(updatedFavorites[option.chainId]);
  };

  const handleTabChange = (_: React.SyntheticEvent, value: number): void => {
    setTabIndex(value);
  };

  const getButtonText = (): string => {
    if (!isConnected) return "Connect wallet";
    if (isSwitchPending) return "Switching chain...";
    if (option.chainId !== chainId) return "Switch chain"
    return isPending ? "Deploying..." : "Deploy";
  }

  const onSubmit = async (
    formData: FieldValues,
    fee: number,
    deployType: DeployTypes
  ): Promise<void> => {

    if (option.chainId !== chainId) {
      await switchChainAsync({ chainId: option.chainId });
      return;
    }

    let hash: Address | undefined = undefined;

    try {
      enqueueSnackbar('Confirm in your wallet...', { variant: 'default' });

      const selectedChain = chains.find((c) => (c as RainbowKitChain).id === option.chainId) as RainbowKitChain;
      explorerRef.current = selectedChain!.blockExplorers!.default!.url;
      
      switch (deployType) {
        case DeployTypes.TOKEN:
          hash = await walletClient?.deployContract({
            abi: Token.abi,
            bytecode: Token.bytecode as Address,
            args: [formData.name, formData.symbol, parseEther(fee.toString())],
            value: parseEther(fee.toString())
          });
          break;
        case DeployTypes.CONTRACT:
          hash = await walletClient?.deployContract({
            abi: Message.abi,
            bytecode: Message.bytecode as Address,
            args: [formData.message, parseEther(fee.toString())],
            value: parseEther(fee.toString())
          });
          break;
        default:
          break;
      }

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
        enqueueSnackbar('Failed to deploy. Transaction rejected.', { variant: 'error' });
      }
    }
  };

  const TogglePanel = (props: TogglePanelProps) => {
    const { value, index, children } = props;

    return (
      <Box>
        {value === index && (
          <Fragment>{children}</Fragment>
        )}
      </Box>
    );
  }

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      const favorites = JSON.parse(stored);
      setIsFavorite(!!favorites[option.chainId]);
    }
  }, [option.chainId]);

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
      enqueueSnackbar('Failed to deploy. Transaction rejected.', { variant: 'error' });
    }

    setTxHash(undefined);
  }, [isSuccess, isError, receipt]);

  return (
    <Card
      sx={{
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: 2
      }}
    >
      <CardHeader
        title={option.chain}
        slotProps={{ title: { variant: 'h6' } }}
        avatar={
          <Avatar
            alt={option.chain}
            src={`/assets/chains/${option.icon}`}
          />
        }
        action={
          <IconButton onClick={toggleFavorite}>
            {isFavorite
              ? (<StarIcon sx={{ color: "#FFD700" }} />)
              : (<StarBorderIcon sx={{ color: "#FFF" }} />)
            }
          </IconButton>
        }
      />
      <CardContent>
        <StyledToggleButtonGroup
          value={tabIndex}
          exclusive
          onChange={handleTabChange}
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            mb: 1
          }}
        >
          {tabs.map(({ value, label, icon }) => (
            <StyledToggleButton
              value={value}
              backgroundColor={option.backgroundColor}
              textColor={option.color}
              sx={{ textTransform: 'none' }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                gap={1}
              >
                <span>{label}</span>
                {icon}
              </Stack>
            </StyledToggleButton>
          ))}
        </StyledToggleButtonGroup>
        <TogglePanel
          value={tabIndex}
          index={0}
        >
          <DynamicForm
            fields={contractFields}
            disabled={isPending || isSwitchPending}
            isConnected={isConnected}
            backgroundColor={option.backgroundColor}
            color={option.color}
            connect={connect}
            getButtonText={getButtonText}
            onSubmit={(formData) => onSubmit(formData, option.fee, DeployTypes.CONTRACT)}
          />
        </TogglePanel>
        <TogglePanel
          value={tabIndex}
          index={1}
        >
          <DynamicForm
            fields={tokenFields}
            disabled={isPending || isSwitchPending}
            isConnected={isConnected}
            backgroundColor={option.backgroundColor}
            color={option.color}
            connect={connect}
            getButtonText={getButtonText}
            onSubmit={(formData) => onSubmit(formData, option.fee, DeployTypes.TOKEN)}
          />
        </TogglePanel>
      </CardContent>
    </Card>
  )
}
