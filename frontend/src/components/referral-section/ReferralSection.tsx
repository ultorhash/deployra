import { JSX, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ReferralSectionBox, ReferralSectionCharInput } from "./styled";

interface ReferralSectionProps {
  id: string;
  code: string;
  disabled: boolean;
  initialButtons: JSX.Element[];
  resultButtons: JSX.Element[];
  onCodeChange?: (code: string) => void;
}

export const ReferralSection = (props: ReferralSectionProps): JSX.Element => {
  const { id, code, disabled, initialButtons, resultButtons, onCodeChange } = props;

  const [inputChars, setInputChars] = useState(
    code.length === 6 ? code.split("") : Array(6).fill("")
  );

  const emitCode = (chars: string[]) => {
    onCodeChange?.(chars.join(""));
  }

  const handleCharChange = (index: number, value: string): void => {
    let char = value.slice(0, 1).toUpperCase();
    if (!/^[A-Z0-9]$/.test(char)) {
      char = ""
    };

    const newChars = [...inputChars];
    newChars[index] = char;
  
    setInputChars(newChars);
    emitCode(newChars);

    if (char && index < inputChars.length - 1) {
      const nextInput = document.getElementById(`${id}-${index + 1}`);
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
    emitCode(newChars);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Backspace") {
      const newChars = [...inputChars]
      if (newChars[index] !== "") {
        newChars[index] = ""
        setInputChars(newChars);
        emitCode(newChars);
        return
      }
      if (index > 0) {
        newChars[index - 1] = ""
        setInputChars(newChars);
        emitCode(newChars);
        document.getElementById(`${id}-${index - 1}`)?.focus()
      }
    }
  }

  useEffect(() => {
    if (code.length === 6) {
      setInputChars(code.split(""));
    }
  }, [code]);

  return (
    <ReferralSectionBox>
      <Box
        display="flex"
        gap={1}
      >
        {inputChars.map((char, index) => (
          <ReferralSectionCharInput
            id={`${id}-${index}`}
            autoComplete="off"
            key={index}
            value={char}
            disabled={disabled}
            onChange={(e) => handleCharChange(index, e.target.value)}
            onPaste={index === 0 ? handleCodePaste : undefined}
            onKeyDown={(e) => handleKeyDown(index, e)}
          />
        ))}
      </Box>
      <Box
        display="flex"
        gap={1}
      >
        {!disabled ? initialButtons : resultButtons}
      </Box>
    </ReferralSectionBox>
  )
}
