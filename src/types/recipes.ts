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
