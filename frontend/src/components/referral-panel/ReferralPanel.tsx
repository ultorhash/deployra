import { Fragment, JSX, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAccount, usePublicClient, useWalletClient, useSwitchChain } from "wagmi";
import { stringToHex, hexToBytes, createPublicClient, http, parseEther } from "viem";
import { readContract, writeContract } from "viem/actions";
import { baseSepolia } from "viem/chains";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { ReferralSection } from "@app-components";
import { Messages } from "@app-enums";
import { ReferralActionButton, ReferralIconButton, ReferralPanelBox } from "./styled";
import ReferralRegistry from "@app-contracts/ReferralRegistry.json";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IosShareIcon from '@mui/icons-material/IosShare';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export const ReferralPanel = (): JSX.Element => {
  const REGISTRY_ADDRESS = "0x0D4B0fe4017BCd32868E9921a6E2aC56586c0CBe";

  const [userCode, setUserCode] = useState<string>("");
  const [referredByCode, setReferredByCode] = useState<string>("");
  const [refCodes, setRefCodes] = useState<string[]>([]);
  const [enteredReferredByCode, setEnteredReferredByCode] = useState<string>("");
  const [enteredUserCode, setEnteredUserCode] = useState<string>("");
  const [isBound, setIsBound] = useState<boolean>(false);
  const [isCreated, setIsCreated] = useState<boolean>(false);
  const [referralCount, setReferralCount] = useState<number>(0);
  const [referrerAddress, setReferrerAddress] = useState<string>("");

  const [searchParams] = useSearchParams();

  const { address } = useAccount();
  const { data: walletClient } = useWalletClient({ chainId: baseSepolia.id });
  const { switchChainAsync } = useSwitchChain();
  const publicClient = usePublicClient({ chainId: baseSepolia.id });

  const viemClient = useMemo(() => createPublicClient({
    chain: baseSepolia, // TODO: Change to Base when ready
    transport: http(),
  }), []);

  const bytes6ToString = (code: `0x${string}`): string => {
    const bytes = hexToBytes(code);
    return new TextDecoder().decode(bytes);
  }

  const validateCode = (code: string, refCodes: string[], mustExist: boolean) => {
    const validFormat = new RegExp(/^[A-Za-z0-9]{6}$/);

    if (code.length !== 6 || !validFormat.test(code)) {
      return { valid: false, message: Messages.CODE_FORMAT };
    }

    if (code === userCode) {
      return { valid: false, message: Messages.CODE_DUPLICATE };
    }

    if (mustExist) {
      if (!refCodes.includes(code)) {
        return { valid: false, message: Messages.CODE_INVALID };
      }
    } else {
      if (refCodes.includes(code)) {
        return { valid: false, message: Messages.CODE_EXISTS };
      }
    }

    return { valid: true };
  }

  const handleBindCode = async (code: string): Promise<void> => {
    if (!walletClient || !address) {
      enqueueSnackbar(Messages.NOT_CONNECTED, { variant: "warning" });
      return;
    }

    const { valid, message } = validateCode(code, refCodes, true);

    if (!valid) {
      enqueueSnackbar(message, { variant: "warning" });
      return;
    }

    await switchChainAsync({ chainId: baseSepolia.id });

    try {
      const codeBytes = stringToHex(code, { size: 6 }) as `0x${string}`;

      enqueueSnackbar(Messages.CONFIRM, { variant: 'default' });

      const txHash = await writeContract(walletClient!, {
        address: REGISTRY_ADDRESS,
        abi: ReferralRegistry.abi,
        functionName: 'bindRefCode',
        args: [codeBytes]
      });

      enqueueSnackbar(Messages.BIND_PENDING, { variant: 'default' });

      const receipt = await publicClient!.waitForTransactionReceipt({ hash: txHash });

      if (receipt.status === "success") {
        setIsBound(true);
        setReferredByCode(code);
        enqueueSnackbar(Messages.BIND_SUCCESS, { variant: 'success', action: () => (
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
      } else {
        enqueueSnackbar(Messages.BIND_ERROR, { variant: 'error' });
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
  }

  const handleCreateCode = async (): Promise<void> => {
    if (!walletClient || !address) {
      enqueueSnackbar(Messages.NOT_CONNECTED, { variant: "warning" });
      return;
    }

    const { valid, message } = validateCode(enteredUserCode, refCodes, false);

    if (!valid) {
      enqueueSnackbar(message, { variant: "warning" });
      return;
    }

    await switchChainAsync({ chainId: baseSepolia.id });

    try {
      const codeBytes = stringToHex(enteredUserCode, { size: 6 }) as `0x${string}`;

      enqueueSnackbar(Messages.CONFIRM, { variant: 'default' });

      const txHash = await writeContract(walletClient!, {
        address: REGISTRY_ADDRESS,
        abi: ReferralRegistry.abi,
        functionName: 'createRefCode',
        args: [codeBytes],
        value: parseEther("0.000033")
      });

      enqueueSnackbar(Messages.CREATE_PENDING, { variant: 'default' });

      const receipt = await publicClient!.waitForTransactionReceipt({ hash: txHash });

      if (receipt.status === "success") {
        setIsCreated(true);
        setUserCode(enteredUserCode);
        enqueueSnackbar(Messages.CREATE_SUCCESS, { variant: 'success', action: () => (
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
      } else {
        enqueueSnackbar(Messages.CREATE_ERROR, { variant: "error" });
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
  }

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
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

        const refCodes = await readContract(viemClient, {
          address: REGISTRY_ADDRESS,
          abi: ReferralRegistry.abi,
          functionName: 'getRefCodes',
          args: []
        });

        const codes = (refCodes as `0x${string}`[]).map(c => bytes6ToString(c));
        setRefCodes(codes);

        const referredByCodeHex = await readContract(viemClient, {
          address: REGISTRY_ADDRESS,
          abi: ReferralRegistry.abi,
          functionName: "getReferredByCode",
          args: [address],
        });

        const referredByCode = referredByCodeHex as `0x${string}`;

        if (referredByCodeHex !== "0x000000000000") {
          setReferredByCode(bytes6ToString(referredByCode));
          setIsBound(true);
        }

        const referrer = await readContract(viemClient, {
          address: REGISTRY_ADDRESS,
          abi: ReferralRegistry.abi,
          functionName: "referredBy",
          args: [address]
        });

        if (referrer && referrer !== "0x0000000000000000000000000000000000000000") {
          setReferrerAddress(referrer as string);
        }

      } catch (err: any) {
        console.error("Failed to fetch user code:", err);
      }
    };

    fetchData();
  }, [address, viemClient]);

  useEffect(() => {
    if (!walletClient || !address) return;
    if (refCodes.length === 0) return;
    // TODO: Check if already bound to prevent bind proposal and user binding his generated code

    const refCodeParam = (searchParams.get("ref") || "").trim();
    if (!refCodeParam) return;

    const { valid } = validateCode(refCodeParam, refCodes, true);

    if (valid) {
      enqueueSnackbar(Messages.CODE_DETECTED, {
        variant: "info",
        persist: true,
        action: (key) => {
          return (
            <Fragment>
              <Button
                color="inherit"
                size="small"
                sx={{ fontSize: 14, textTransform: 'none' }}
                onClick={() => {
                  handleBindCode(refCodeParam);
                  closeSnackbar(key);
                }}
              >
                Bind
              </Button>
              <Button
                color="inherit"
                size="small"
                sx={{ fontSize: 14, textTransform: 'none' }}
                onClick={() => closeSnackbar(key)}
              >
                Dismiss
              </Button>
            </Fragment>
          )
        }
      }); 
    } else {
      enqueueSnackbar("Invalid referral code in link", { variant: "warning" });
    }
  }, [walletClient, address, refCodes]);

  return (
    <ReferralPanelBox>
      <Typography variant="caption">{!isBound ? "Bind your" : "Your"} referrer</Typography>
      <ReferralSection
        id="referrerCode"
        code={referredByCode}
        disabled={isBound}
        initialButtons={[
          <ReferralActionButton
            key="bind"
            onClick={() => handleBindCode(enteredReferredByCode)}
          >
            <Typography variant="button">Bind</Typography>
          </ReferralActionButton>
        ]}
        resultButtons={[
          <ReferralActionButton
            disabled
            key="bound"
          >
            <Typography variant="button">Bound</Typography>
          </ReferralActionButton>
        ]}
        onCodeChange={setEnteredReferredByCode}
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
