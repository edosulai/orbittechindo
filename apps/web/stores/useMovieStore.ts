import { MovieDataStore } from "@/types";
import { create } from "zustand";

export const useMovieStore = create<MovieDataStore>(
  (set: (partial: Partial<MovieDataStore>) => void) => ({
    title: "",
    typeFilter: "",
    yearRange: [1990, 2020],
    setTitle: (title: string) => set({ title }),
    setTypeFilter: (typeFilter: string) => set({ typeFilter }),
    setYearRange: (yearRange: [number, number]) => set({ yearRange }),
  }),
);
