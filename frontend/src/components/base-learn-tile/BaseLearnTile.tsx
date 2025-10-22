import { useEffect, useRef, useState } from "react";
import { Avatar, Box, Button, Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material"
import { useAccount, useChainId, useConnect, useSwitchChain, useWaitForTransactionReceipt, useWalletClient, injected } from "wagmi"
import { DeployOption } from "@app-types"
import { DeployTypes } from "@app-enums"
import { chains } from "chains";
import { Address, parseEther } from "viem"
import { FieldValues, set } from "react-hook-form"
import { enqueueSnackbar } from "notistack"
import { RainbowKitChain } from "@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitChainContext"
import StarIcon from "@mui/icons-material/Star"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import BasicMath from "@app-contracts/BasicMath.json"
import ControlStructures from "@app-contracts/ControlStructures.json"
import EmployeeStorage from "@app-contracts/EmployeeStorage.json"
import ArraysExercise from "@app-contracts/ArraysExercise.json"
import FavoriteRecords from "@app-contracts/FavoriteRecords.json"
import GarageManager from "@app-contracts/GarageManager.json"
import Inheritance from "@app-contracts/InheritanceSubmission.json"
import ImportsExercise from "@app-contracts/ImportsExercise.json"
import ErrorTriageExercise from "@app-contracts/ErrorTriageExercise.json"
import AddressBook from "@app-contracts/AddressBook.json"
import UnburnableToken from "@app-contracts/UnburnableToken.json"
import WeightedVoting from "@app-contracts/WeightedVoting.json"
import HaikuNFT from "@app-contracts/HaikuNFT.json"
import { contractAddresses } from "contract-addresses";
import { mint } from "viem/chains";
import { ethers } from "ethers";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

export const BaseLearnTile = (option: DeployOption) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<Address | undefined>(undefined);
  const [deployType, setDeployType] = useState<DeployTypes>("" as DeployTypes);
  const [enableMint, setEnableMint] = useState<boolean>(false);
  const [deploymentAddress, setDeploymentAddress] = useState<`0x${string}` | undefined>(undefined);
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

  const onDeploy = async (deployType?: DeployTypes): Promise<void> => {
    if (deployType === undefined) return;

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
        case DeployTypes.BASIC_MATH:
          hash = await walletClient?.deployContract({
            abi: BasicMath.abi,
            bytecode: BasicMath.bytecode as Address
          });
          break;
        case DeployTypes.CONTROL_STRUCTURES:
          hash = await walletClient?.deployContract({
            abi: ControlStructures.abi,
            bytecode: ControlStructures.bytecode as Address
          });
          break;
        case DeployTypes.EMPLOYEE_STORAGE:
          hash = await walletClient?.deployContract({
            abi: EmployeeStorage.abi,
            bytecode: EmployeeStorage.bytecode as Address
          });
          break;
        case DeployTypes.ARRAYS_EXERCISE:
          hash = await walletClient?.deployContract({
            abi: ArraysExercise.abi,
            bytecode: ArraysExercise.bytecode as Address
          });
          break;
        case DeployTypes.FAVORITE_RECORDS:
          hash = await walletClient?.deployContract({
            abi: FavoriteRecords.abi,
            bytecode: FavoriteRecords.bytecode as Address
          });
          break;
        case DeployTypes.GARAGE_MANAGER:
          hash = await walletClient?.deployContract({
            abi: GarageManager.abi,
            bytecode: GarageManager.bytecode as Address
          });
          break;
        case DeployTypes.INHERITANCE:
          hash = await walletClient?.deployContract({
            abi: Inheritance.abi,
            bytecode: Inheritance.bytecode as Address
          });
          break;
        case DeployTypes.IMPORTS_EXERCISE:
          hash = await walletClient?.deployContract({
            abi: ImportsExercise.abi,
            bytecode: ImportsExercise.bytecode as Address
          });
          break;
        case DeployTypes.ERROR_TRIAGE_EXERCISE:
          hash = await walletClient?.deployContract({
            abi: ErrorTriageExercise.abi,
            bytecode: ErrorTriageExercise.bytecode as Address
          });
          break;
        case DeployTypes.ADDRESS_BOOK:
          hash = await walletClient?.deployContract({
            abi: AddressBook.abi,
            bytecode: AddressBook.bytecode as Address
          });
          break;
        case DeployTypes.UNBURNABLE_TOKEN:
          hash = await walletClient?.deployContract({
            abi: UnburnableToken.abi,
            bytecode: UnburnableToken.bytecode as Address
          });
          break;
        case DeployTypes.WEIGHTED_VOTING:
          hash = await walletClient?.deployContract({
            abi: WeightedVoting.abi,
            bytecode: WeightedVoting.bytecode as Address
          });
          break;
        case DeployTypes.HAIKU_NFT:
          hash = await walletClient?.deployContract({
            abi: HaikuNFT.abi,
            bytecode: HaikuNFT.bytecode as Address
          });
          break;
        default:
          break;
      }

      if (hash) {
        setTxHash(hash);
        setDeployType(deployType);
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

  const getSigner = async () => {
    if (!walletClient) return null;
    const { account, chain } = walletClient;
    const provider = new ethers.BrowserProvider(window.ethereum, chain?.id);
    return provider.getSigner(account.address);
  };

  const onMintBadge = async (): Promise<void> => {
    if (deploymentAddress === undefined) return;

    const signer = await getSigner();
    const graderAddress = contractAddresses[deployType].verifyAddress;

    const iface = new ethers.Interface([
      "function testContract(address _submissionAddress)",
    ]);

    const data = iface.encodeFunctionData("testContract", [deploymentAddress]);
    const tx = await signer!.sendTransaction({ to: graderAddress, data });
    
    const mintReceipt = await tx.wait();

    console.log(mintReceipt);

    enqueueSnackbar('Badge minted successfully!', { variant: 'success' });
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
      console.log(receipt);
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

      setDeploymentAddress(receipt.contractAddress);
      setEnableMint(true);
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            name="action"
            value="deploy"
            disabled={isPending || isSwitchPending}
            sx={{ backgroundColor: "#0000FF" }}
            onClick={() => onDeploy(option.deployType)}
          >
            <Typography
              variant="inherit"
              sx={{ color: "#FFF" }}
            >
              {getButtonText()}
            </Typography>
          </Button>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            name="action"
            value="mint"
            disabled={!enableMint}
            sx={{ backgroundColor: "#0000FF" }}
            onClick={() => onMintBadge()}
          >
            Mint Badge
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}
