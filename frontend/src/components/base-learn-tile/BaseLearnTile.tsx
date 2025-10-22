import { Fragment, useEffect, useRef, useState } from "react";
import { Avatar, Button, Card, CardContent, CardHeader, IconButton } from "@mui/material"
import { useAccount, useChainId, useConnect, useSwitchChain, useWaitForTransactionReceipt, useWalletClient } from "wagmi"
import { DeployOption, FieldConfig } from "@app-types"
import { DynamicForm } from "@app-components"
import { DeployTypes } from "@app-enums"
import { chains } from "chains";
import { Address, parseEther } from "viem"
import { FieldValues } from "react-hook-form"
import { enqueueSnackbar } from "notistack"
import { RainbowKitChain } from "@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitChainContext"
import StarIcon from "@mui/icons-material/Star"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import Token from "@app-contracts/Token.json"
import Message from "@app-contracts/Message.json"

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

export const BaseLearnTile = (option: DeployOption) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<Address | undefined>(undefined);
  const explorerRef = useRef<string | undefined>(undefined);

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
        enqueueSnackbar('Failed to deploy. Transaction rejected', { variant: 'error' });
      }
    }
  };

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Fragment>{children}</Fragment>
        )}
      </div>
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
      enqueueSnackbar('Failed to deploy. Transaction rejected', { variant: 'error' });
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
        borderRadius: 2,
        overflow: 'visible',
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
        <DynamicForm
          fields={[]}
          disabled={isPending || isSwitchPending}
          isConnected={isConnected}
          color={option.color}
          textColor={option.textColor}
          connect={connect}
          getButtonText={getButtonText}
          onSubmit={(formData) => onSubmit(formData, option.fee, DeployTypes.CONTRACT)}
        />
      </CardContent>
    </Card>
  )
}
