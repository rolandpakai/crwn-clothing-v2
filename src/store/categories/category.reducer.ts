import { AnyAction } from "redux";

import { Category } from "./category.types";
import { 
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed 
} from "./category.action";

export type CategoriesSate = {
  readonly categories: Category[];
  isLoading: boolean;
  error: Error | null;
}

export const CATEGORIES_INITIAL_STATE: CategoriesSate = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE, 
  action = {} as AnyAction
  ): CategoriesSate => {
    if(fetchCategoriesStart.match(action)) {
      return { 
        ...state, 
        isLoading: true,
      }
    }

    if(fetchCategoriesSuccess.match(action)) {
      return {      
        ...state,
        categories: action.payload,
        isLoading: false, 
      }
    }

    if(fetchCategoriesFailed.match(action)) {
      return { 
        ...state, 
        isLoading: false,
        error: action.payload,
      }
    }

    return state;
}