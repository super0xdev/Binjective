import { create } from "zustand";

type LocationProps = {
  countryCode: string;
  setCountryCode: (countryCode: string) => void;
};

export const useLocation = create<LocationProps>((set) => ({
  countryCode: "",
  setCountryCode: (countryCode: string) => set({ countryCode }),
}));
