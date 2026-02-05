import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoriteState {
  favorites: string[];
  _hasHydrated: boolean;
  toggleFavorite: (carId: string) => void;
  setHasHydrated: (state: boolean) => void;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      _hasHydrated: false,

      setHasHydrated: (state) => set({ _hasHydrated: state }),

      toggleFavorite: (carId: string) => {
        const { favorites } = get();
        const isFav = favorites.includes(carId);

        if (isFav) {
          set({ favorites: favorites.filter((id) => id !== carId) });
        } else {
          set({ favorites: [...favorites, carId] });
        }
      },
    }),
    {
      name: "favorite-cars",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
