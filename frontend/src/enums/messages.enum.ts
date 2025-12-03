export enum Messages {
  NOT_CONNECTED = "Wallet not connected.",

  CONFIRM = "Confirm in your wallet...",
  REJECTED = "Transaction rejected.",

  DEPLOY_PENDING = "Deploying...",
  DEPLOY_SUCCESS = "Deployed successfully!",
  MINT_PENDING = "Minting...",
  MINT_SUCCESS = "Minted successfully!",

  BIND_PENDING = "Binding...",
  BIND_SUCCESS = "Referral code bound!",
  BIND_ERROR = "Failed to bind. Invalid code or loop detected.",
  BIND_ALREADY = "You have been already bound to different referred.",

  CREATE_PENDING = "Creating...",
  CREATE_SUCCESS = "Referral code created!",
  CREATE_ERROR = "Failed to create referral code.",

  CODE_DETECTED = "Referral code detected.",
  CODE_FORMAT = "Referral code must be 6 uppercase letters or digits.",
  CODE_INVALID = "Invalid referral code.",
  CODE_EXISTS = "Referral ode already exists.",
  CODE_DUPLICATE = "Duplicated referral code."
}
