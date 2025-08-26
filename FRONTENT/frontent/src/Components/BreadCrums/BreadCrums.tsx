import React from 'react'
import "../BreadCrums/BreadCrums.css"
import { IoIosArrowForward } from "react-icons/io";
const BreadCrums = (props:any) => {
    const {Products} = props;
  return (
    <div className='breadcrums'>
        HOME<IoIosArrowForward /> SHOP<IoIosArrowForward /> {Products.category}<IoIosArrowForward /> {Products.name}
    </div>
  )
} 

export default BreadCrums