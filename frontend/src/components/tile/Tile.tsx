import { Fragment, useEffect, useRef, useState } from "react";
import { Avatar, Box, Button, CardContent, CardHeader, IconButton, Stack, Typography} from "@mui/material"
import { useAccount, useChainId, useConnect, usePublicClient, useSwitchChain, useWaitForTransactionReceipt, useWalletClient } from "wagmi"
import { Address, parseEther } from "viem"
import { FieldValues } from "react-hook-form"
import { enqueueSnackbar } from "notistack"
import { RainbowKitChain } from "@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitChainContext"
import { DeployOption, FieldConfig } from "@app-types"
import { DynamicForm } from "@app-components"
import { DeployTypes, Messages } from "@app-enums"
import { useReferralStore } from "@app-store";
import { chains } from "chains";
import { StyledTile, StyledToggleButton, StyledToggleButtonGroup } from "./styled";
import Message from "@app-contracts/Message.json";
import Token from "@app-contracts/Token.json";
import NFT from "@app-contracts/NFT.json";
import GM from "@app-contracts/GM.json";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import MessageIcon from '@mui/icons-material/Message';
import GeneratingTokensIcon from "@mui/icons-material/GeneratingTokens";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import axios from "axios";

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
  const referrerAddress = useReferralStore((s) => s.referrerAddress);

  const messageFields: FieldConfig[] = [
    { type: 'text', name: 'message', placeholder: 'Message', required: true, defaultValue: `Hello ${option.chain}!` }
  ];

  const tokenFields: FieldConfig[] = [
    { type: 'text', name: 'name', placeholder: 'Name', required: true, defaultValue: "" },
    { type: 'text', name: 'symbol', placeholder: 'Symbol', required: true, defaultValue: "" }
  ];

  const nftFields: FieldConfig[] = [
    { type: 'text', name: 'name', placeholder: 'Name', required: true, defaultValue: "" },
    { type: 'text', name: 'description', placeholder: 'Description', required: true, defaultValue: "" },
    { type: 'file', name: 'image', placeholder: 'Description', required: true, defaultValue: "" }
  ];

  const tabs = [
    { value: 0, label: 'Message', icon: <MessageIcon /> },
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
  const publicClient = usePublicClient({ chainId: option.chainId });

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

  const uploadToPinata = async (name: string, description: string, image: File): Promise<string> => {
    try {
      const imageData = new FormData();
      imageData.append('file', image);

      const imageRes = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', imageData, {
        maxBodyLength: Infinity,
          headers: {
            'Content-Type': 'multipart/form-data',
            pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
            pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET
          }
        });

      const imageHash = imageRes.data.IpfsHash;
      const imageUri = `ipfs://${imageHash}`;

      const metadata = {
        name,
        description,
        image: imageUri
      };

      const metadataRes = await axios.post(
        'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        metadata,
        {
          headers: {
            'Content-Type': 'application/json',
            pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
            pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET
          }
        }
      );

      const metadataHash = metadataRes.data.IpfsHash;
      return `ipfs://${metadataHash}`;
    } catch (error) {
      console.error('Pinata upload failed:', error);
      throw new Error('Upload to Pinata failed');
    }
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
      enqueueSnackbar(Messages.CONFIRM, { variant: 'default' });

      const selectedChain = chains.find((c) => (c as RainbowKitChain).id === option.chainId) as RainbowKitChain;
      explorerRef.current = selectedChain!.blockExplorers!.default!.url;
      
      switch (deployType) {
        case DeployTypes.MESSAGE:
          hash = await walletClient?.deployContract({
            abi: Message.abi,
            bytecode: Message.bytecode as Address,
            args: [formData.message, parseEther(fee.toString()), referrerAddress],
            value: parseEther(fee.toString())
          });
          break;
        case DeployTypes.TOKEN:
          hash = await walletClient?.deployContract({
            abi: Token.abi,
            bytecode: Token.bytecode as Address,
            args: [formData.name, formData.symbol, parseEther(fee.toString())],
            value: parseEther(fee.toString())
          });
          break;
        case DeployTypes.NFT:
          hash = await walletClient?.deployContract({
            abi: NFT.abi,
            bytecode: NFT.bytecode as Address,
            args: [parseEther(fee.toString())]
          });
          break;
        case DeployTypes.GM:
          hash = await walletClient?.deployContract({
            abi: GM.abi,
            bytecode: GM.bytecode as Address,
            args: [parseEther(fee.toString())],
            value: parseEther(fee.toString())
          });
          break;
        default:
          break;
      }

      if (hash) {
        setTxHash(hash);
        enqueueSnackbar(Messages.DEPLOY_PENDING, { variant: 'default' });
      }

      if (deployType === DeployTypes.NFT) {
        const tokenURI = await uploadToPinata(formData.name, formData.description, formData.image[0]);

        const receipt = await publicClient!.waitForTransactionReceipt({ hash: hash! });
        const contractAddress = receipt.contractAddress!;

        const mintTx = await walletClient?.writeContract({
          address: contractAddress,
          abi: NFT.abi,
          functionName: 'mint',
          args: [tokenURI],
          value: parseEther(fee.toString())
        });

        // TODO: Wait for success (currently indexing) and change name NFT by passing args to solidity

        enqueueSnackbar(Messages.MINT_SUCCESS, { variant: 'success', action: () => (
          <Button
            color="inherit"
            size="small"
            endIcon={<OpenInNewIcon />}
            sx={{ fontSize: 14, textTransform: 'none' }}
            onClick={() => {
              window.open(`${explorerRef.current}/tx/${mintTx}`, '_blank');
            }}
          >
            View
          </Button>
        )});
      }

    } catch (error: any) {
      if (
        error?.code === 4001 ||
        error?.message?.toLowerCase().includes("user rejected") ||
        error?.message?.toLowerCase().includes("cancelled")
      ) {
        enqueueSnackbar(Messages.REJECTED, { variant: 'error' });
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
      enqueueSnackbar(Messages.DEPLOY_SUCCESS, { variant: 'success', action: () => (
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
      enqueueSnackbar(Messages.REJECTED, { variant: 'error' });
    }

    setTxHash(undefined);
  }, [isSuccess, isError, receipt]);

  return (
    <StyledTile elevation={0}>
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
              : (<StarBorderIcon sx={{ color: (theme) => theme.palette.text.primary }} />)
            }
          </IconButton>
        }
      />
      <CardContent sx={{ pb: 1 }}>
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
              disableRipple
              disableFocusRipple
              data-testid={label}
              value={value}
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
            fields={messageFields}
            disabled={isPending || isSwitchPending}
            isConnected={isConnected}
            backgroundColor={option.backgroundColor}
            color={option.color}
            connect={connect}
            getButtonText={getButtonText}
            onSubmit={(formData) => onSubmit(formData, option.fee, DeployTypes.MESSAGE)}
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
        <TogglePanel
          value={tabIndex}
          index={2}
        >
          <DynamicForm
            fields={nftFields}
            disabled={isPending || isSwitchPending}
            isConnected={isConnected}
            backgroundColor={option.backgroundColor}
            color={option.color}
            connect={connect}
            getButtonText={getButtonText}
            onSubmit={(formData) => onSubmit(formData, option.fee, DeployTypes.NFT)}
          />
        </TogglePanel>
        <TogglePanel
          value={tabIndex}
          index={3}
        >
          <DynamicForm
            fields={[]}
            disabled={isPending || isSwitchPending}
            isConnected={isConnected}
            backgroundColor={option.backgroundColor}
            color={option.color}
            connect={connect}
            getButtonText={getButtonText}
            onSubmit={(formData) => onSubmit(formData, option.fee, DeployTypes.GM)}
          />
        </TogglePanel>
      </CardContent>
      <Box sx={{ p: 2, pt: 0 }}>
        <Typography
          variant="subtitle2"
          sx={{ fontSize: 10 }}
        >
          Fee: {option.fee} {chains.find(c => c.id === option.chainId)?.nativeCurrency.symbol}
        </Typography>
      </Box>
    </StyledTile>
  )
}
