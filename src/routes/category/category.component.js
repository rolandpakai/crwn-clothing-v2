import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect, Fragment } from "react";
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category.selector';
import Spinner from '../../components/spinner/spinner.component';
import ProductCard from "../../components/product-card/product-card.component";

import { CategoryContainer, CategoryTitle } from './category.styles';

const Category = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  
  const { category } = useParams();
  const [ products, setProducts ] = useState(categoriesMap[category]);

  useEffect(() =>{
    setProducts(categoriesMap[category]);
  },[category, categoriesMap]);

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      {
        isLoading ? (
        <Spinner /> ) : (
          <CategoryContainer>
          {
            products && products.map((product) => {
              return (
                <ProductCard 
                  key={product.id}
                  product={product}  
                />
              ) 
            })
          }
        </CategoryContainer>
        ) 
      }
    </Fragment>
  )
}

export default Category;