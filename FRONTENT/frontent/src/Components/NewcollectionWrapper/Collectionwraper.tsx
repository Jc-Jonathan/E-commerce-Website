import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext"; // adjust path if needed
import NewCollection from "../NewCollection/NewCollection";
import "../NewcollectionWrapper/Newcollectionwraper.css";

const CollectionWrapper = () => {
  const shop = useContext(ShopContext);

  if (!shop) return null; // context not ready yet

  return (
    <div className="Newcollection-wrapper-container">
      <NewCollection data_product={shop.newCollection} />
    </div>
  );
};

export default CollectionWrapper;
