import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ReferralState = {
  referrerAddress: string;
  setReferrerAddress: (address: string) => void;
}

export const useReferralStore = create<ReferralState>()(
  persist((set) => ({
    referrerAddress: "0x0000000000000000000000000000000000000000",
    setReferrerAddress: (address: string) => set({ referrerAddress: address })
  }), { name: "referral-store" })
);
