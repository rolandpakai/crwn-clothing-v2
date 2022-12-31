import { createSelector } from 'reselect';

import { CategoriesSate } from './category.reducer';
import { CategoryMap } from './category.types';

const selectCategoryReducer = (state): CategoriesSate => {
  return state.categories
}

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => {
    return categoriesSlice.categories
  }
)

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap => {
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
  
      return acc;
    }, {} as CategoryMap)
  }
)

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
)