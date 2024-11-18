import { create } from "zustand";
import { selectRecipe } from "../types/recipes";
import instance from "../api/axios";

interface RecipeStore {
  selectRecipe: selectRecipe | null;
  fetchRecipe: (id?: string) => Promise<void>;
}

export const useRecipeStore = create<RecipeStore>((set) => ({
  selectRecipe: null,
  fetchRecipe: async (id?: string) => {
    try {
      const endpoint = id ? `/api/recipe?id=${id}` : `/api/recipe/random`;
      const res = await instance.get(endpoint);
      set({ selectRecipe: res.data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}));
