import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type PreferenceState = {
	country: string | null;
	continent: string | null;
	destination: string | null;
	isHydrated: boolean;

	setCountry: (country: string) => void;
	setContinent: (continent: string) => void;
	setDestination: (destination: string) => void;
	setIsHydrated: (isHydrated: boolean) => void;
};

export const usePreferenceStore = create<PreferenceState>()(
	persist(
		(set) => ({
			country: null,
			continent: null,
			destination: null,
			isHydrated: false,

			setCountry: (country: string) => set({ country }),
			setContinent: (continent: string) => set({ continent }),
			setDestination: (destination: string) => set({ destination }),
			setIsHydrated: (isHydrated: boolean) => set({ isHydrated }),
		}),
		{
			name: "preferences",
			storage: createJSONStorage(() => localStorage),
			onRehydrateStorage: () => (state) => {
				if (state) {
					state.setIsHydrated(true);
				}
			},
		}
	)
);
