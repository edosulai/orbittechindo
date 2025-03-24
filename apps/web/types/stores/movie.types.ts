import { MovieFormData } from "@/schemas";

export interface MovieDataStore extends MovieFormData {
  setTitle: (title: string) => void;
  setTypeFilter: (typeFilter: string) => void;
  setYearRange: (yearRange: [number, number]) => void;
}
