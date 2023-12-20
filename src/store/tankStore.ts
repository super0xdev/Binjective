import { create } from "zustand";

interface ITankAmount {
  amount: number;
  updateAmount: (amount: number) => void;
}

export const useTankStore = create<ITankAmount>((set) => ({
  amount: 0,
  updateAmount: (newAmount: number) => {
    set(() => ({ amount: newAmount }));
  },
}));
