import ProductCard from "../../components/product-card/product-card.component";
import './category-preview.styles.scss';

const CategoryPreview = ({ title, products }) => {
  
  return (
    <div className="category-preview-container">
      <h2>
        <span className="title">{title.toUpperCase()}</span>
      </h2>
      <div className="preview">
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
      </div>
    </div>
  )
}

export default CategoryPreview;