import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext"; // adjust path if needed
import Popular from "../Popular/Popular";

const PopularWrapper = () => {
  const shop = useContext(ShopContext);

  if (!shop) return null; // context not ready yet

  return (
    <div className="popular-wrapper-container">
      <Popular data_product={shop.popularProducts} />
    </div>
  );
};

export default PopularWrapper;
