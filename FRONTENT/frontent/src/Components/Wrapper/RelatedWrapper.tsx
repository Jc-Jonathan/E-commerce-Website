import  { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext"; // adjust path if needed
import RelatedProduct from "../../Relatedproduct/RelatedProduct";

const RelatedProductWrapper = () => {
  const shop = useContext(ShopContext);

  if (!shop) return null; // context not ready yet

  return (
    <div className="Newcollection-wrapper-container">
      <RelatedProduct data_product={shop.relatedProducts} />
    </div>
  );
};

export default RelatedProductWrapper;
