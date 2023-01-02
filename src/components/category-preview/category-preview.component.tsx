import { FC} from 'react';

import { CategoryItem } from '../../store/categories/category.types';
import ProductCard from "../../components/product-card/product-card.component";
import { CategoryPreviewContainer, CategoryPreviewLink, CategoryPreviewDiv } from './category-preview.styles';

type CategoryPreviewProps = {
  title: string;
  products: CategoryItem[];
}

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
  
  return (
    <CategoryPreviewContainer>
      <h2>
        <CategoryPreviewLink className="title" to={title}>
          {title.toUpperCase()}
        </CategoryPreviewLink>
      </h2>
      <CategoryPreviewDiv>
        {
          products.filter((_, idx) => {
            return (
              idx < 4
            )
          }).map((product) => {
            return ( 
            <ProductCard key={product.id} product = {product} />
            )
          })
        }
      </CategoryPreviewDiv>
    </CategoryPreviewContainer>
  )
}

export default CategoryPreview;