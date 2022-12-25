import { useState, useEffect, createContext } from "react";
//import SHOP_DATA from '../shop-data.js';
//import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

export const CategoriesContext = createContext({
  categoriesMap: [],
});

export const CategoriesProvider = ({children}) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const value = { categoriesMap, setCategoriesMap }

  /*useEffect(() => {
    addCollectionAndDocuments("categories", SHOP_DATA); 
  }, []);*/

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