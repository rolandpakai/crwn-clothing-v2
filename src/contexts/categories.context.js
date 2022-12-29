import { useEffect, createContext, useReducer } from "react";
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';
import { createAction } from '../utils/reducer/reducer.utils';

export const CategoriesContext = createContext({
  categoriesMap: [],
});

export const CATEGORIES_ACTION_TYPES = {
  GET_CATEGORIES: 'GET_CATEGORIES'
}

const categoriesReducer = (state, action) => {
  const { type, payload } = action; 

  switch(type) {
    case CATEGORIES_ACTION_TYPES.GET_CATEGORIES: return {
      ...state,
      categoriesMap: payload
    }
    default: throw new Error(`Unhandled type: ${type}`)
  }
}

const INITIAL_STATE = {
  categoriesMap: []
};

export const CategoriesProvider = ({children}) => {
  const [ state, dispatch ] = useReducer(categoriesReducer, INITIAL_STATE)
  const { categoriesMap } = state;

  const setCategoriesMap = (categoryMap) => {
    dispatch(
      createAction(CATEGORIES_ACTION_TYPES.GET_CATEGORIES, categoryMap)
    );
  }
  
  const value = { categoriesMap, setCategoriesMap }

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    }
    getCategoriesMap();
  }, []);

  return (
     <CategoriesContext.Provider value={value}>
      {children}
     </CategoriesContext.Provider>
  );
}