import ProductCard from "../../components/product-card/product-card.component";
import { CategoryPreviewContainer, CategoryPreviewLink, CategoryPreviewDiv } from './category-preview.styles';

const CategoryPreview = ({ title, products }) => {
  
  return (
    <CategoryPreviewContainer>
      <h2>
        <CategoryPreviewLink className="title" to={title}>
          {title.toUpperCase()}
        </CategoryPreviewLink>
      </h2>
      <CategoryPreviewDiv>
        {
          products.filter((product, idx) => {
            return (
              idx <4
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