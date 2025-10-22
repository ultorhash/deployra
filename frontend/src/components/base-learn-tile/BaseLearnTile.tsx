import { useEffect, useRef, useState } from "react";
import { Avatar, Box, Button, Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material"
import { injected, useAccount, useChainId, useConnect, useSwitchChain, useWaitForTransactionReceipt, useWalletClient, usePublicClient } from "wagmi"
import { DeployOption } from "@app-types"
import { DeployTypes } from "@app-enums"
import { chains } from "chains";
import { Address } from "viem"
import { enqueueSnackbar } from "notistack"
import { RainbowKitChain } from "@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitChainContext"
import { contractAddresses } from "contract-addresses";
import { ethers } from "ethers";
import StarIcon from "@mui/icons-material/Star"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import BasicMath from "@app-contracts/BasicMath.json"
import ControlStructures from "@app-contracts/ControlStructures.json"
import EmployeeStorage from "@app-contracts/EmployeeStorage.json"
import ArraysExercise from "@app-contracts/ArraysExercise.json"
import FavoriteRecords from "@app-contracts/FavoriteRecords.json"
import GarageManager from "@app-contracts/GarageManager.json"
import InheritanceSubmission from "@app-contracts/InheritanceSubmission.json"
import ImportsExercise from "@app-contracts/ImportsExercise.json"
import ErrorTriageExercise from "@app-contracts/ErrorTriageExercise.json"
import AddressBook from "@app-contracts/AddressBook.json"
import UnburnableToken from "@app-contracts/UnburnableToken.json"
import WeightedVoting from "@app-contracts/WeightedVoting.json"
import HaikuNFT from "@app-contracts/HaikuNFT.json"
import Salesperson from "@app-contracts/Salesperson.json"
import EngineeringManager from "@app-contracts/EngineeringManager.json"

const deployMap: Record<DeployTypes, { abi: any; bytecode: string }> = {
  [DeployTypes.BASIC_MATH]: BasicMath,
  [DeployTypes.CONTROL_STRUCTURES]: ControlStructures,
  [DeployTypes.EMPLOYEE_STORAGE]: EmployeeStorage,
  [DeployTypes.ARRAYS_EXERCISE]: ArraysExercise,
  [DeployTypes.FAVORITE_RECORDS]: FavoriteRecords,
  [DeployTypes.GARAGE_MANAGER]: GarageManager,
  [DeployTypes.INHERITANCE_SUBMISSION]: InheritanceSubmission,
  [DeployTypes.IMPORTS_EXERCISE]: ImportsExercise,
  [DeployTypes.ERROR_TRIAGE_EXERCISE]: ErrorTriageExercise,
  [DeployTypes.ADDRESS_BOOK]: AddressBook,
  [DeployTypes.UNBURNABLE_TOKEN]: UnburnableToken,
  [DeployTypes.WEIGHTED_VOTING]: WeightedVoting,
  [DeployTypes.HAIKU_NFT]: HaikuNFT,
  [DeployTypes.TOKEN]: { abi: "", bytecode: "" },
  [DeployTypes.CONTRACT]: { abi: "", bytecode: "" },
};


export const BaseLearnTile = (option: DeployOption) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [txHash, setTxHash] = useState<Address>();
  const [deployType, setDeployType] = useState<DeployTypes>("" as DeployTypes);
  const [enableMint, setEnableMint] = useState(false);
  const [deploymentAddress, setDeploymentAddress] = useState<`0x${string}`>();
  const explorerRef = useRef<string | undefined>(undefined);

  const { data: receipt, isLoading: isPending, isSuccess, isError } = useWaitForTransactionReceipt({ hash: txHash });
  const { data: walletClient } = useWalletClient();
  const { switchChainAsync, isPending: isSwitchPending } = useSwitchChain();
  const { isConnected } = useAccount();
  const { connect } = useConnect();
  const chainId = useChainId();
  const publicClient = usePublicClient();

  const toggleFavorite = () => {
    const stored = localStorage.getItem("favorites");
    const favorites = stored ? JSON.parse(stored) : {};
    const updated = { ...favorites, [option.chainId]: !favorites[option.chainId] };
    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(updated[option.chainId]);
  };

  const getButtonText = () => {
    if (!isConnected) return "Connect wallet";
    if (isSwitchPending) return "Switching chain...";
    if (option.chainId !== chainId) return "Switch chain";
    return isPending ? "Deploying..." : "Deploy";
  };

  const onDeploy = async (type?: DeployTypes) => {
    if (!type || !walletClient) return;
    if (option.chainId !== chainId) {
      await switchChainAsync({ chainId: option.chainId });
      return;
    }

    try {
      enqueueSnackbar("Confirm in your wallet...", { variant: "default" });

      const chain = chains.find(c => (c as RainbowKitChain).id === option.chainId) as RainbowKitChain;
      explorerRef.current = chain.blockExplorers?.default?.url;

      let hash: Address | undefined;

      if (type === DeployTypes.INHERITANCE_SUBMISSION) {
        const salespersonHash = await walletClient.deployContract({
          abi: Salesperson.abi,
          bytecode: Salesperson.bytecode as Address,
          args: [55555, 12345, 20]
        });
        await publicClient?.waitForTransactionReceipt({ hash: salespersonHash });

        const engineeringHash = await walletClient.deployContract({
          abi: EngineeringManager.abi,
          bytecode: EngineeringManager.bytecode as Address,
          args: [54321, 11111, 200000]
        });
        await publicClient?.waitForTransactionReceipt({ hash: engineeringHash });

        const inheritanceHash = await walletClient.deployContract({
          abi: InheritanceSubmission.abi,
          bytecode: InheritanceSubmission.bytecode as Address,
          args: option.args ?? []
        });

        hash = inheritanceHash;

      } else {
        const contract = deployMap[type];
        hash = await walletClient.deployContract({
          abi: contract.abi,
          bytecode: contract.bytecode as Address,
          args: option.args ?? []
        });
      }

      if (hash) {
        setTxHash(hash);
        setDeployType(type);
        enqueueSnackbar("Deploying...", { variant: "default" });
      }
    } catch (error: any) {
      const msg = error?.message?.toLowerCase() || "";
      if (error?.code === 4001 || msg.includes("user rejected") || msg.includes("cancelled")) {
        enqueueSnackbar("Failed to deploy. Transaction rejected", { variant: "error" });
      }
    }
  };

  const getSigner = async () => {
    if (!walletClient) return null;
    const { account, chain } = walletClient;
    const provider = new ethers.BrowserProvider(window.ethereum, chain?.id);
    return provider.getSigner(account.address);
  };

  const onMintBadge = async () => {
    if (!deploymentAddress) return;

    enqueueSnackbar("Confirm in your wallet...", { variant: "default" });

    const signer = await getSigner();
    const grader = contractAddresses[deployType].verifyAddress;

    const iface = new ethers.Interface(["function testContract(address _submissionAddress)"]);
    const data = iface.encodeFunctionData("testContract", [deploymentAddress]);

    const tx = await signer!.sendTransaction({ to: grader, data });
    enqueueSnackbar("Minting badge...", { variant: "default" });
    await tx.wait();

    enqueueSnackbar("Badge minted successfully!", {
      variant: "success",
      action: () => (
        <Button
          color="inherit"
          size="small"
          endIcon={<OpenInNewIcon />}
          sx={{ fontSize: 14, textTransform: "none" }}
          onClick={() => window.open(`${explorerRef.current}/tx/${tx.hash}`, "_blank")}
        >
          View
        </Button>
      ),
    });

    setEnableMint(false);
  };

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      const favorites = JSON.parse(stored);
      setIsFavorite(!!favorites[option.chainId]);
    }
  }, [option.chainId]);

  useEffect(() => {
    if (isSuccess && receipt?.contractAddress && txHash) {
      enqueueSnackbar("Deployed successfully!", {
        variant: "success",
        action: () => (
          <Button
            color="inherit"
            size="small"
            endIcon={<OpenInNewIcon />}
            sx={{ fontSize: 14, textTransform: "none" }}
            onClick={() => window.open(`${explorerRef.current}/tx/${txHash}`, "_blank")}
          >
            View
          </Button>
        ),
      });

      setDeploymentAddress(receipt.contractAddress);
      setEnableMint(true);
    }

    if (isError) {
      enqueueSnackbar("Failed to deploy. Transaction rejected", { variant: "error" });
    }

    setTxHash(undefined);
  }, [isSuccess, isError, receipt]);

  return (
    <Card
      sx={{
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        borderRadius: 2,
        overflow: "visible",
      }}
    >
      <CardHeader
        title={option.chain}
        slotProps={{ title: { variant: "h6" } }}
        avatar={<Avatar alt={option.chain} src={`/assets/chains/${option.icon}`} />}
        action={
          <IconButton onClick={toggleFavorite}>
            {isFavorite ? <StarIcon sx={{ color: "#FFD700" }} /> : <StarBorderIcon sx={{ color: "#FFF" }} />}
          </IconButton>
        }
      />
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Button
            fullWidth
            variant="contained"
            disabled={isPending || isSwitchPending || enableMint}
            sx={{ backgroundColor: "#0000FF" }}
            onClick={() =>
              isConnected
                ? onDeploy(option.deployType)
                : connect({ connector: injected() })
            }
          >
            <Typography variant="inherit" sx={{ color: "#FFF" }}>
              {getButtonText()}
            </Typography>
          </Button>
          <Button
            fullWidth
            variant="contained"
            disabled={!enableMint}
            sx={{ backgroundColor: "#0000FF" }}
            onClick={onMintBadge}
          >
            Mint Badge
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
