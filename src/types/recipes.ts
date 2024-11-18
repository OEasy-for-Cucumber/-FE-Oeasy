export interface Recipe {
  id: number;
  title: string;
  imgUrl: string;
}

export interface RecipeResponse {
  nowPage: number;
  lastPage: number;
  view: number;
  hasNextPage: boolean;
  list: Recipe[];
}

export interface ManualList {
  content: string;
  order: number;
}

export interface selectRecipe {
  ingredients: string;
  manualList: ManualList[];
  recipeImg: string;
  tip: string;
  title: string;
}
