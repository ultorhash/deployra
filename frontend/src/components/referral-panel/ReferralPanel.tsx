import { JSX, useEffect, useState } from "react";
import { useAccount, usePublicClient, useWalletClient, useSwitchChain } from "wagmi";
import { stringToHex, hexToBytes, createPublicClient, http } from "viem";
import { readContract, writeContract } from "viem/actions";
import { baseSepolia } from "viem/chains";
import { enqueueSnackbar } from "notistack";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { ReferralSection } from "@app-components";
import { ReferralActionButton, ReferralIconButton, ReferralPanelBox } from "./styled";
import ReferralRegistry from "@app-contracts/ReferralRegistry.json";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IosShareIcon from '@mui/icons-material/IosShare';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function bytes6ToString(code: `0x${string}`): string {
  const bytes = hexToBytes(code);
  return new TextDecoder().decode(bytes);
}

export const ReferralPanel = (): JSX.Element => {
  const REGISTRY_ADDRESS = "0xEC854a7885FD1F09272aC2fA9E5fFAee6623edc0";

  const [userCode, setUserCode] = useState<string>("");
  const [referrerCode, setReferrerCode] = useState<string>("");
  const [enteredReferrerCode, setEnteredReferrerCode] = useState<string>("");
  const [enteredUserCode, setEnteredUserCode] = useState<string>("");
  const [isBound, setIsBound] = useState<boolean>(false);
  const [isCreated, setIsCreated] = useState<boolean>(false);
  const [referralCount, setReferralCount] = useState<number>(0);

  const { address } = useAccount();
  const { data: walletClient } = useWalletClient({ chainId: baseSepolia.id });
  const { switchChainAsync } = useSwitchChain();
  const publicClient = usePublicClient({ chainId: baseSepolia.id });
  const viemClient = createPublicClient({
    chain: baseSepolia,
    transport: http(),
  });

  const handleBindCode = async (): Promise<void> => {
    if (enteredReferrerCode.length !== 6) {
      enqueueSnackbar("Code must be exactly 6 alphanumeric characters", { variant: "warning" })
      return
    }
    const success = await new Promise<boolean>((resolve) => {
      setTimeout(() => resolve(true), 2000)
    })
    if (success) {
      setReferrerCode(enteredReferrerCode)
      setIsBound(true)
    }
  }

  const handleCreateCode = async (): Promise<void> => {
    if (enteredUserCode.length !== 6) {
      enqueueSnackbar("Code must be exactly 6 alphanumeric characters", { variant: "warning" })
      return;
    }

    if (!walletClient || !address) {
      enqueueSnackbar("Wallet not connected", { variant: "error" })
      return
    }

    await switchChainAsync({ chainId: baseSepolia.id });

    try {
      const codeBytes = stringToHex(enteredUserCode, { size: 6 }) as `0x${string}`;

      enqueueSnackbar('Confirm in your wallet...', { variant: 'default' });

      const txHash = await writeContract(walletClient, {
        address: REGISTRY_ADDRESS,
        abi: ReferralRegistry.abi,
        functionName: 'registerRefCode',
        args: [codeBytes]
      });

      enqueueSnackbar('Creating...', { variant: 'default' });

      const receipt = await publicClient!.waitForTransactionReceipt({ hash: txHash });
      
      setIsCreated(true);
      enqueueSnackbar(`Referral code created!`, { variant: 'success', action: () => (
        <Button
          color="inherit"
          size="small"
          endIcon={<OpenInNewIcon />}
          sx={{ fontSize: 14, textTransform: 'none' }}
          onClick={() => {
            window.open(`${baseSepolia.blockExplorers.default.url}/tx/${receipt.transactionHash}`, '_blank');
          }}
        >
          View
        </Button>
      )});
    } catch (error: any) {
      if (
        error?.code === 4001 ||
        error?.message?.toLowerCase().includes("user rejected") ||
        error?.message?.toLowerCase().includes("cancelled")
      ) {
        enqueueSnackbar('Failed to create. Transaction rejected.', { variant: 'error' });
      }
    }
  }

  useEffect(() => {
    const fetchUserData = async (): Promise<void> => {
      if (!address) return;

      try {
        const code = await readContract(viemClient, {
          address: REGISTRY_ADDRESS,
          abi: ReferralRegistry.abi,
          functionName: "userRefCode",
          args: [address]
        });

        const hexCode = code as `0x${string}`;

        if (hexCode !== "0x000000000000") {
          const strCode = bytes6ToString(hexCode);
          setUserCode(strCode);
          setIsCreated(true);
        }

        const referralCount = await readContract(viemClient, {
          address: REGISTRY_ADDRESS,
          abi: ReferralRegistry.abi,
          functionName: "getReferralCount",
          args: [address]
        });

        setReferralCount(Number(referralCount));

      } catch (err: any) {
        console.error("Failed to fetch user code:", err);
      }
    };

    fetchUserData();
  }, [address, viemClient]);

  return (
    <ReferralPanelBox>
      <Typography variant="caption">Referred by</Typography>
      <ReferralSection
        id="referrerCode"
        code={referrerCode}
        disabled={isBound}
        initialButtons={[
          <ReferralActionButton onClick={handleBindCode} key="bind">
            <Typography variant="button">Bind</Typography>
          </ReferralActionButton>
        ]}
        resultButtons={[
          <ReferralActionButton disabled key="bound">
            <Typography variant="button">Bound</Typography>
          </ReferralActionButton>
        ]}
        onCodeChange={setEnteredReferrerCode}
      />

      <Box display="flex" justifyContent="space-between">
        <Typography variant="caption">{!isCreated ? "Create" : "Your"} referral code</Typography>
        <Typography variant="caption">Active users: <b>{referralCount}</b></Typography>
      </Box>

      <ReferralSection
        id="userCode"
        code={userCode}
        disabled={isCreated}
        initialButtons={[
          <ReferralActionButton onClick={handleCreateCode} key="create">
            <Typography variant="button">Create</Typography>
          </ReferralActionButton>
        ]}
        resultButtons={[
          <Tooltip arrow title="Copy code" key="copy">
            <ReferralIconButton onClick={() => {
              navigator.clipboard.writeText(userCode);
              enqueueSnackbar("Referral code copied!", { variant: "success" });
            }}>
              <ContentCopyIcon sx={{ fontSize: 16 }} />
            </ReferralIconButton>
          </Tooltip>,
          <Tooltip arrow title="Share link" key="share">
            <ReferralIconButton onClick={() => {
              navigator.clipboard.writeText(`https://app.deployra.xyz?ref=${userCode}`);
              enqueueSnackbar("Referral link copied!", { variant: "success" });
            }}>
              <IosShareIcon sx={{ fontSize: 16 }} />
            </ReferralIconButton>
          </Tooltip>
        ]}
        onCodeChange={setEnteredUserCode}
      />
    </ReferralPanelBox>
  )
}
