import "../Offers/Offers.css"
import exclusive_image from "../assets/images/image2.png"
import { Link } from "react-router-dom";
const Offers = () => {
  return (
    <div className='offers'>
      <div className="second-container">
        <div className="offers-left">
          <h1>Exclusive</h1>
          <h1>Offers For You</h1>
          <p>ONLY ON BEST SELLERS PRODUCTS</p>
         <Link to="/ExclusiveOffer" className="offeredit"><button className='btn1'>Check Now</button></Link> 
        </div>
        <div className="offers-right">
          <img className='editimg1' src={exclusive_image} alt='reload'/>
        </div>
      </div>
    </div>
  )
}

export default Offers
