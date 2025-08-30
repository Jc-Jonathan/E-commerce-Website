import  { useContext, useState } from 'react';
import '../ProductDisplay/ProductDisplay.css';
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { ShopContext } from '../../Context/ShopContext';
import { useNavigate } from "react-router-dom";

const ProductDisplay = (props: any) => {
  const { Products } = props;
  const shopCtx = useContext(ShopContext);
  const navigate = useNavigate();

  const [selectedSize, setSelectedSize] = useState<string>("");

  const sizeOptions: { label: string; values: number[] }[] = [
    { label: "3-5", values: [3, 4, 5] },
    { label: "5-7", values: [5, 6, 7] },
    { label: "7-9", values: [7, 8, 9] },
    { label: "9-12", values: [9, 10, 11, 12] },
  ];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("⚠️ Please select a size before adding to cart.");
      return;
    }
    shopCtx?.addToCart({ ...Products, size: selectedSize });
    navigate("/CartScreen");
  };

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={Products.image} alt='' />
          <img src={Products.image} alt='' />
          <img src={Products.image} alt='' />
          <img src={Products.image} alt='' />
        </div>
        <div className="productdisplay-img">
          <img className='productdisplay-main-img' src={Products.image} alt=''/>
        </div>
      </div>

      <div className="productdisplay-right">
        <h1 className='editstyle'>{Products.name}</h1>
        <div className="productdisplay-right-star">
          <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
          <p>(122)</p>
        </div>

        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">₹{Products.oldPrice}</div>
          <div className="productdisplay-right-price-new">₹{Products.newPrice}</div>
        </div>

        <div className="productdisplay-right-description">
          Step into comfort and style with our premium shoes!<br/> Crafted with high-quality materials,
          these shoes are designed to<br/> give you durability, all-day comfort, and a sleek modern look
        </div>

        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            {sizeOptions.map((option) => (
              <div key={option.label}>
                <label>{option.label}: </label>
                <select
                  onChange={(e) => setSelectedSize(e.target.value)}
                  value={selectedSize}
                >
                  <option value="">Select</option>
                  {option.values.map((val) => (
                    <option key={val} value={val}>{val}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleAddToCart}>ADD TO CART</button>

        <p className='productdisplay-right-category'>
         Category: <span className='spanedit'>{Products.category} </span>shoe
        </p>
      </div>
    </div>
  )
}

export default ProductDisplay;
