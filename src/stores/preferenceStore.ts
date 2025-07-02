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
	resetPreferences: () => void;
};

export const usePreferenceStore = create<PreferenceState>()(
	persist(
		(set) => ({
			country: null,
			continent: null,
			destination: null,
			// isHydrated is needed to wait until data is loaded from localStorage
			isHydrated: false,

			setCountry: (country: string) => set({ country }),
			setContinent: (continent: string) => set({ continent }),
			setDestination: (destination: string) => set({ destination }),
			setIsHydrated: (isHydrated: boolean) => set({ isHydrated }),
			resetPreferences: () =>
				set({ country: null, continent: null, destination: null }),
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
