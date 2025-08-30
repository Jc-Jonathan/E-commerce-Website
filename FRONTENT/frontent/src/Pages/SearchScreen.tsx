import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Item/Item";
import "../Components/PagesStyles/SearchScreen.css";

const SearchScreen: React.FC = () => {
  const shopContext = useContext(ShopContext);
  const [query, setQuery] = useState("");

  if (!shopContext) {
    return <div>Loading...</div>;
  }

  const { allProducts } = shopContext;

  // 🔍 Filter products based on search input
  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().startsWith(query.toLowerCase())
  );

  return (
    <div className="search-container">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      {/* Product Results */}
      <div className="search-results">
        {query && filteredProducts.length === 0 && (
          <p className="no-results">No products found.</p>
        )}

        {filteredProducts.map((product) => (
          <Item
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            new_price={product.newPrice}
            old_price={product.oldPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchScreen;
