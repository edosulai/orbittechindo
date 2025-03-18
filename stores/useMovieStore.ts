import { create } from 'zustand';
import { MovieState } from '@/types';

export const useMovieStore = create<MovieState>((set: (partial: Partial<MovieState>) => void) => ({
    title: '',
    setTitle: (title: string) => set({ title }),
}));
