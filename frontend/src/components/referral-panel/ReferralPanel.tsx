import { JSX, useState } from "react";
import { ReferralActionButton, ReferralIconButton, ReferralPanelBox } from "./styled";
import { Box, Tooltip, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { ReferralSection } from "@app-components";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IosShareIcon from '@mui/icons-material/IosShare';

export const ReferralPanel = (): JSX.Element => {
  const [userCode, setUserCode] = useState<string>("")
  const [referrerCode, setReferrerCode] = useState<string>("")
  const [enteredReferrerCode, setEnteredReferrerCode] = useState<string>("")
  const [enteredUserCode, setEnteredUserCode] = useState<string>("")
  const [isBound, setIsBound] = useState<boolean>(false)
  const [isCreated, setIsCreated] = useState<boolean>(false)

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
      return
    }
    const success = await new Promise<boolean>((resolve) => {
      setTimeout(() => resolve(true), 2000)
    })
    if (success) {
      setUserCode(enteredUserCode)
      setIsCreated(true)
    }
  }

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
        <Typography variant="caption">Your referral code</Typography>
        <Typography variant="caption">Active users: <b>1</b></Typography>
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
              navigator.clipboard.writeText(userCode)
              enqueueSnackbar("Referral code copied!", { variant: "success" })
            }}>
              <ContentCopyIcon sx={{ fontSize: 16 }} />
            </ReferralIconButton>
          </Tooltip>,
          <Tooltip arrow title="Share link" key="share">
            <ReferralIconButton onClick={() => {
              navigator.clipboard.writeText(`https://app.deployra.xyz?ref=${userCode}`)
              enqueueSnackbar("Referral link copied!", { variant: "success" })
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
