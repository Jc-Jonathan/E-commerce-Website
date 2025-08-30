import  { useContext } from 'react';
import '../Components/PagesStyles/ShopCategory.css';
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Item/Item"; // ✅ Import Item component

interface ShopCategoryProps {
  category: string;
  bannerUrl?: string;
}

const ShopCategory: React.FC<ShopCategoryProps> = ({ category, bannerUrl }) => {
  const { allProducts } = useContext(ShopContext)!; // Non-null assertion
 
  // Filter products for the given category
  const filteredProducts = allProducts?.filter(
    (product: any) => product.category?.toLowerCase() === category.toLowerCase()
  );
console.log("Filtered Products:", filteredProducts);
  return (
    
    <div className='shop-category'>
      {/* Banner */}
      {bannerUrl && (
        <div className="banner-container">
          <img src={bannerUrl} alt={`${category} banner`} className="category-banner" />
        </div>
        
      )}
    
      {/* Products */}
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="products-grid">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product: any) => (
            <Item
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              new_price={product.newPrice}
              old_price={product.oldPrice}
            />
          ))
        ) : (
          <p className="no-products">No products available in this category.</p>
        )}
      </div>
    </div>
  );
  
};

export default ShopCategory;
