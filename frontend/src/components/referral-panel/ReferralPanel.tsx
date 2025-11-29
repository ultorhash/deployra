import { JSX, useState } from "react";
import { BindButton, CharBox, CharTextField, CodeBox, ReferralIconButton, ReferralPanelBox } from "./styled";
import { Box, Tooltip, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IosShareIcon from '@mui/icons-material/IosShare';

export const ReferralPanel = (): JSX.Element => {
  const [inputChars, setInputChars] = useState(Array(6).fill(""));

  const generatedCode = "L72D13";
  const inputCode = inputChars.join("");
  const isCodeComplete = inputChars.every((c) => c !== "") && inputCode.length === 6;

  const handleCharChange = (index: number, value: string): void => {
    let char = value.slice(0, 1).toUpperCase();
    if (!/^[A-Z0-9]$/.test(char)) {
      char = ""
    };

    const newChars = [...inputChars];
    newChars[index] = char;
  
    setInputChars(newChars);

    if (char && index < inputChars.length - 1) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleCodePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
  
    const pasted = e.clipboardData.getData("text").toUpperCase();
    const chars = pasted.slice(0, 6).split("");
    const newChars = Array(6).fill("");
    chars.forEach((c, i) => {
      if (/^[A-Z0-9]$/.test(c)) newChars[i] = c;
    });
  
    setInputChars(newChars);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Backspace" && inputChars[index] === "") {
      if (index > 0) {
        const newChars = [...inputChars];
        newChars[index - 1] = "";
        setInputChars(newChars);
        document.getElementById(`code-input-${index - 1}`)?.focus();
      }
    }
  };

  return (
    <ReferralPanelBox>
      <Typography variant="caption">Referred by</Typography>
      <CodeBox>
        <Box display="flex" gap={1}>
          {inputChars.map((char, index) => (
            <CharTextField
              id={`code-input-${index}`}
              autoComplete="off"
              key={index}
              value={char}
              onChange={(e) => handleCharChange(index, e.target.value)}
              onPaste={index === 0 ? handleCodePaste : undefined}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </Box>
        <BindButton disabled={!isCodeComplete}>
          <Typography variant="button">Bind</Typography>
        </BindButton>
      </CodeBox>
      <Box
        display="flex"
        justifyContent="space-between"
      >
        <Typography variant="caption">Your referral code</Typography>
        <Typography variant="caption">Active users: <b>1</b></Typography>
      </Box>
      <CodeBox>
        <Box
          display="flex"
          gap={1}
        >
          {generatedCode.split("").map((char, index) => (
            <CharBox key={index}>
              <Typography variant="button">{char}</Typography>
            </CharBox>
          ))}
        </Box>
        <Box
          display="flex"
          gap={1}
        >
          <Tooltip
            arrow
            title="Copy code"
          >
            <ReferralIconButton onClick={() => {
              navigator.clipboard.writeText(generatedCode);
              enqueueSnackbar('Referral code copied!', { variant: 'success' });
            }}>
              <ContentCopyIcon sx={{ fontSize: 16 }} />
            </ReferralIconButton>
          </Tooltip>
          <Tooltip
            arrow
            title="Share link"
          >
            <ReferralIconButton onClick={() => {
              navigator.clipboard.writeText(`https://app.deployra.xyz?ref=${generatedCode}`);
              enqueueSnackbar('Referral link copied!', { variant: 'success' });
            }}>
              <IosShareIcon sx={{ fontSize: 16 }} />
            </ReferralIconButton>
          </Tooltip>
        </Box>
      </CodeBox>
    </ReferralPanelBox>
  );
}
