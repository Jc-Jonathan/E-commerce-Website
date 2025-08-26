import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";

interface ItemProps {
  id: number | string;
  name: string;
  image: string;
  new_price: number;
  old_price: number;
}

const Item: React.FC<ItemProps> = ({ id, name, image, new_price, old_price }) => {
  return (
    <div className="item">
     <Link to={`/product/${id}`}><img src={image} alt={name} className="item-image" /></Link> 
      <h3 className="item-name">{name}</h3>
      <div className="item-prices">
        <span className="old-price">₹{old_price}</span>
        <span className="new-price">₹{new_price}</span>
      </div>
    </div>
  );
};

export default Item;
