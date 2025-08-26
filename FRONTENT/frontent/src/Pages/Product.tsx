import React,  { useContext }  from 'react'
import "../Components/PagesStyles/Product.css"
import { ShopContext } from "../Context/ShopContext";
import {useParams}  from 'react-router-dom'
import BreadCrums from "../Components/BreadCrums/BreadCrums"
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import RelatedProductWrapper from '../Components/Wrapper/RelatedWrapper';
const Product = () => {
   const { allProducts } = useContext(ShopContext)!;
   const {productId} = useParams();
   const product = allProducts.find((e) => e.id === productId);
  return (
    <div>
      <BreadCrums Products = {product}/>
      <ProductDisplay Products = {product}/>
     <RelatedProductWrapper/>
    </div>
  )
}

export default Product